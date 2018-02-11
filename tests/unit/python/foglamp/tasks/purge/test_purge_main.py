# -*- coding: utf-8 -*-

# FOGLAMP_BEGIN
# See: http://foglamp.readthedocs.io/
# FOGLAMP_END

""" Test tasks/purge/__main__.py entry point

"""

import pytest
from unittest.mock import patch, MagicMock

from foglamp.tasks import purge

from foglamp.common import logger
from foglamp.common.storage_client.storage_client import StorageClient
from foglamp.tasks.purge.purge import Purge
from foglamp.common.process import FoglampProcess
from foglamp.common.audit_logger import AuditLogger


@pytest.fixture()
async def purge_instance():
    mockStorageClient = MagicMock(spec=StorageClient)
    mockAuditLogger = AuditLogger(mockStorageClient)
    with patch.object(FoglampProcess, "__init__"):
        with patch.object(logger, "setup"):
            with patch.object(mockAuditLogger, "__init__", return_value=None):
                p = Purge()
                return p


@pytest.allure.feature("unit")
@pytest.allure.story("tasks", "purge")
async def test_main(purge_instance):

    with patch.object(purge, "__name__", "__main__"):
        purge.purge_process = purge_instance
        with patch.object(Purge, 'run', return_value=None):
            purge.purge_process.run()
            purge.purge_process.run.assert_called_once_with()


    # with patch.object(Purge, 'run', return_value=None):
    #     with patch('foglamp.tasks.purge', return_value=None) as mockedPurge:
    #         assert isinstance(mockedPurge.purge_process, purge_instance)
    #         mockedPurge.purge_process = purge_instance
    #         mockedPurge.purge_process.run()
    #     purge_instance.run.assert_called_once_with()  # assert_called_once() is python3.6 onwards :]
    #
    #     # Okay, let's verify once more! :P
    #     assert 1 == purge_instance.run.call_count
