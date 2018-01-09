# -*- coding: utf-8 -*-

# FOGLAMP_BEGIN
# See: http://foglamp.readthedocs.io/
# FOGLAMP_END

from foglamp.services.core.api import audit as api_audit
from foglamp.services.core.api import browser
from foglamp.services.core.api import common as api_common
from foglamp.services.core.api import configuration as api_configuration
from foglamp.services.core.api import scheduler as api_scheduler
from foglamp.services.core.api import statistics as api_statistics
from foglamp.services.core.api import backup_restore

__author__ = "Ashish Jabble, Praveen Garg"
__copyright__ = "Copyright (c) 2017 OSIsoft, LLC"
__license__ = "Apache 2.0"
__version__ = "${VERSION}"


def setup(app):
    app.router.add_route('GET', '/foglamp/ping', api_common.ping)

    # Configuration
    app.router.add_route('GET', '/foglamp/category', api_configuration.get_categories)
    app.router.add_route('GET', '/foglamp/category/{category_name}', api_configuration.get_category)
    app.router.add_route('GET', '/foglamp/category/{category_name}/{config_item}', api_configuration.get_category_item)
    app.router.add_route('PUT', '/foglamp/category/{category_name}/{config_item}', api_configuration.set_configuration_item)
    app.router.add_route('DELETE', '/foglamp/category/{category_name}/{config_item}/value', api_configuration.delete_configuration_item_value)

    # Scheduler
    # Scheduled_processes - As per doc
    app.router.add_route('GET', '/foglamp/schedule/process', api_scheduler.get_scheduled_processes)
    app.router.add_route('GET', '/foglamp/schedule/process/{scheduled_process_name}', api_scheduler.get_scheduled_process)

    # Schedules - As per doc
    app.router.add_route('GET', '/foglamp/schedule', api_scheduler.get_schedules)
    app.router.add_route('POST', '/foglamp/schedule', api_scheduler.post_schedule)
    app.router.add_route('GET', '/foglamp/schedule/type', api_scheduler.get_schedule_type)
    app.router.add_route('GET', '/foglamp/schedule/{schedule_id}', api_scheduler.get_schedule)
    app.router.add_route('PUT', '/foglamp/schedule/{schedule_id}/enable', api_scheduler.enable_schedule)
    app.router.add_route('PUT', '/foglamp/schedule/{schedule_id}/disable', api_scheduler.disable_schedule)
    app.router.add_route('POST', '/foglamp/schedule/start/{schedule_id}', api_scheduler.start_schedule)
    app.router.add_route('PUT', '/foglamp/schedule/{schedule_id}', api_scheduler.update_schedule)
    app.router.add_route('DELETE', '/foglamp/schedule/{schedule_id}', api_scheduler.delete_schedule)

    # Tasks - As per doc
    app.router.add_route('GET', '/foglamp/task', api_scheduler.get_tasks)
    app.router.add_route('GET', '/foglamp/task/state', api_scheduler.get_task_state)
    app.router.add_route('GET', '/foglamp/task/latest', api_scheduler.get_tasks_latest)
    app.router.add_route('GET', '/foglamp/task/{task_id}', api_scheduler.get_task)
    app.router.add_route('PUT', '/foglamp/task/cancel/{task_id}', api_scheduler.cancel_task)

    browser.setup(app)

    # Statistics - As per doc
    app.router.add_route('GET', '/foglamp/statistics', api_statistics.get_statistics)
    app.router.add_route('GET', '/foglamp/statistics/history', api_statistics.get_statistics_history)

    # Audit trail - As per doc
    app.router.add_route('GET', '/foglamp/audit', api_audit.get_audit_entries)
    app.router.add_route('GET', '/foglamp/audit/logcode', api_audit.get_audit_log_codes)
    app.router.add_route('GET', '/foglamp/audit/severity', api_audit.get_audit_log_severity)

    # Backup & Restore - As per doc
    app.router.add_route('GET', '/foglamp/backup', backup_restore.get_backups)
    app.router.add_route('POST', '/foglamp/backup', backup_restore.create_backup)
    app.router.add_route('GET', '/foglamp/backup/status', backup_restore.get_backup_status)
    app.router.add_route('GET', '/foglamp/backup/{backup_id}', backup_restore.get_backup_details)
    app.router.add_route('DELETE', '/foglamp/backup/{backup_id}', backup_restore.delete_backup)
    app.router.add_route('PUT', '/foglamp/backup/{backup_id}/restore', backup_restore.restore_backup)

    # enable cors support
    enable_cors(app)

    # enable a live debugger (watcher) for requests, see https://github.com/aio-libs/aiohttp-debugtoolbar
    # this will neutralize error middleware
    # Note: pip install aiohttp_debugtoolbar

    # enable_debugger(app)


def enable_cors(app):
    """ implements Cross Origin Resource Sharing (CORS) support """
    import aiohttp_cors

    # Configure default CORS settings.
    cors = aiohttp_cors.setup(app, defaults={
        "*": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*",
        )
    })

    # Configure CORS on all routes.
    for route in list(app.router.routes()):
        cors.add(route)


def enable_debugger(app):
    """ provides a debug toolbar for server requests """
    import aiohttp_debugtoolbar

    # dev mode only
    # this will be served at API_SERVER_URL/_debugtoolbar
    aiohttp_debugtoolbar.setup(app)
