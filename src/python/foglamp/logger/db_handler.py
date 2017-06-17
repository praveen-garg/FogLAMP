import time
import logging
import logging.handlers
import asyncio
import sqlalchemy as sa
import aiopg.sa
import foglamp.env as env

metadata = sa.MetaData()


# using the table schema definition defined in src/sql/foglamp_ddl.sql
# TODO: use foglamp.log_codes for code
_log_tbl = sa.Table(
    'log',
    metadata,
    sa.Column('code', sa.types.VARCHAR(5)),
    sa.Column('level', sa.types.SMALLINT),
    sa.Column('log', sa.types.JSON),
    sa.Column('ts', sa.types.DATETIME)
)


def log_msg(record):
    """Construct log message from logging record components"""
    return record.msg.strip().replace('\'', '\'\'')


def get_insert_stmt(record):
    """prepare and return the INSERT statement using record's values"""
    log_message = log_msg(record)
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(record.created))

    return _log_tbl.insert().values(code=record.levelno,
                                    level=record.levelname,
                                    log=log_message,
                                    ts=timestamp
                                    )


class DbHandler(logging.Handler):
    """Customized logging handler that puts logs to the postgres database"""

    def __init__(self):
        logging.Handler.__init__(self)

    def _emit(self, record):
        conn = sa.create_engine(env.db_connection_string)
        try:
            conn.execute(get_insert_stmt(record=record))
        except Exception:
            self.handleError(record)

    def emit(self, record):
        return self._emit(record)


class AsyncDbHandler(logging.Handler):
    """Customized asynchronous logging handler that puts logs to the postgres database"""

    def __init__(self):
        logging.Handler.__init__(self)

    async def _emit(self, record):
        async with aiopg.sa.create_engine(env.db_connection_string) as engine:
            async with engine.acquire() as conn:
                try:
                    await conn.execute(get_insert_stmt(record=record))
                except Exception:
                    self.handleError(record)

    def emit(self, record):
        asyncio.get_event_loop().run_until_complete(self._emit(record))
