# -*- coding: utf-8 -*-

# FOGLAMP_BEGIN
# See: http://foglamp.readthedocs.io/
# FOGLAMP_END

import json
from enum import IntEnum
from collections import OrderedDict
from aiohttp import web
from foglamp.common.storage_client.payload_builder import PayloadBuilder
from foglamp.services.core import connect

__author__ = "Amarendra K. Sinha, Ashish Jabble"
__copyright__ = "Copyright (c) 2017 OSIsoft, LLC"
__license__ = "Apache 2.0"
__version__ = "${VERSION}"

__DEFAULT_LIMIT = 20
__DEFAULT_OFFSET = 0

_help = """
    -------------------------------------------------------------------------------
    | GET             | /foglamp/audit                                            |
    | GET             | /foglamp/audit/logcode                                    |
    | GET             | /foglamp/audit/severity                                   |
    -------------------------------------------------------------------------------
"""


class Severity(IntEnum):
    """ Enumeration for log.severity """
    # TODO: FOGL-701
    FATAL = 1
    ERROR = 2
    WARNING = 3
    INFORMATION = 4


####################################
#  Audit Trail
####################################


async def get_audit_entries(request):
    """ Returns a list of audit trail entries sorted with most recent first and total count
        (including the criteria search if applied)

    :Example:

        curl -X GET http://localhost:8081/foglamp/audit

        curl -X GET http://localhost:8081/foglamp/audit?limit=5

        curl -X GET http://localhost:8081/foglamp/audit?limit=5&skip=3

        curl -X GET http://localhost:8081/foglamp/audit?skip=2

        curl -X GET http://localhost:8081/foglamp/audit?source=PURGE

        curl -X GET http://localhost:8081/foglamp/audit?severity=ERROR

        curl -X GET http://localhost:8081/foglamp/audit?source=LOGGN&severity=INFORMATION&limit=10
    """

    limit = __DEFAULT_LIMIT
    if 'limit' in request.query and request.query['limit'] != '':
        try:
            limit = int(request.query['limit'])
            if limit < 0:
                raise ValueError
        except ValueError:
            raise web.HTTPBadRequest(reason="Limit must be a positive integer")

    offset = __DEFAULT_OFFSET
    if 'skip' in request.query and request.query['skip'] != '':
        try:
            offset = int(request.query['skip'])
            if offset < 0:
                raise ValueError
        except ValueError:
            raise web.HTTPBadRequest(reason="Skip/Offset must be a positive integer")

    source = None
    if 'source' in request.query and request.query['source'] != '':
        try:
            source = request.query.get('source')
            # SELECT * FROM log_codes
            storage_client = connect.get_storage()
            result = storage_client.query_tbl("log_codes")
            log_codes = [key['code'] for key in result['rows']]
            if source not in log_codes:
                raise ValueError
        except ValueError:
            raise web.HTTPBadRequest(reason="{} is not a valid source".format(source))

    severity = None
    if 'severity' in request.query and request.query['severity'] != '':
        try:
            severity = Severity[request.query['severity'].upper()].value
        except KeyError as ex:
            raise web.HTTPBadRequest(reason="{} is not a valid severity".format(ex))

    try:
        # HACK: This way when we can more future we do not get an exponential
        # explosion of if statements
        payload = PayloadBuilder().WHERE(['1', '=', '1'])
        if source is not None:
            payload.AND_WHERE(['code', '=', source])

        if severity is not None:
            payload.AND_WHERE(['level', '=', severity])

        _and_where_payload = payload.chain_payload()
        # SELECT *, count(*) OVER() FROM log - No support yet from storage layer
        # TODO: FOGL-740, FOGL-663 once ^^ resolved we should replace below storage call for getting total rows
        # TODO: FOGL-643 - Aggregate with alias support needed to use payload builder
        aggregate = {"operation": "count", "column": "*", "alias": "count"}
        d = OrderedDict()
        d['aggregate'] = aggregate
        d.update(_and_where_payload)
        total_count_payload = json.dumps(d)

        # SELECT count (*) FROM log <_and_where_payload>
        storage_client = connect.get_storage()
        result = storage_client.query_tbl_with_payload('log', total_count_payload)
        total_count = result['rows'][0]['count']

        payload.ORDER_BY(['ts', 'desc'])
        payload.LIMIT(limit)

        if offset > 0:
            payload.OFFSET(offset)

        # SELECT * FROM log <payload.payload()>
        results = storage_client.query_tbl_with_payload('log', payload.payload())
        res = []
        for row in results['rows']:
            r = dict()
            r["details"] = row["log"]
            severity_level = int(row["level"])
            r["severity"] = Severity(severity_level).name if severity_level in range(1, 5) else "UNKNOWN"
            r["source"] = row["code"]
            r["timestamp"] = row["ts"]

            res.append(r)

    except Exception as ex:
        raise web.HTTPException(reason=str(ex))

    return web.json_response({'audit': res, 'totalCount': total_count})


async def get_audit_log_codes(request):
    """
    Args:
        request:

    Returns:
           an array of log codes with description

    :Example:

        curl -X GET http://localhost:8081/foglamp/audit/logcode
    """
    storage_client = connect.get_storage()
    result = storage_client.query_tbl('log_codes')

    return web.json_response({'logCode': result['rows']})


async def get_audit_log_severity(request):
    """
    Args:
        request:

    Returns:
            an array of audit severity enumeration key index values

    :Example:

        curl -X GET http://localhost:8081/foglamp/audit/severity
    """
    results = []
    for _severity in Severity:
        data = {'index': _severity.value, 'name': _severity.name}
        results.append(data)

    return web.json_response({"logSeverity": results})
