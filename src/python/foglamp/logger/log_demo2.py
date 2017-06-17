import logging
import foglamp.env as env
logger = logging.getLogger('y_logger')


def foo():
    logger.info('Hi, foo')
    logger.warning('Warning')

class Bar(object):

    def bar(self):
        logger.info('Hi, bar')
        logger.error('Got an error?!')

if __name__ == '__main__':
    env.load_config()
    foo()
    Bar().bar()