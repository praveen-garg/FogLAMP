# -*- coding: utf-8 -*-

# FOGLAMP_BEGIN
# See: http://foglamp.readthedocs.io/
# FOGLAMP_END

import pytest
from . import foo

__author__ = "Praveen Garg"
__copyright__ = "Copyright (c) 2017 OSIsoft, LLC"
__license__ = "Apache 2.0"
__version__ = "${VERSION}"

# FIXME: Needs foglamp to start, and core mgt port

fs = None

name = "Foo"
core_host = "localhost"
core_port = "34981"


@pytest.allure.feature("common")
@pytest.allure.story("process")
class TestMicroserviceManagementClient:

    def setup_method(self, method):
        pass

    def teardown_method(self, method):
        pass

    @pytest.mark.run('first')
    def test_register(self):
        global fs
        fs = foo.get_instance(name, core_host, core_port)
        assert fs._microservice_id is not None

    def test_get_service(self):
        res = fs.get_service()
        found = res["services"]
        is_found = False
        for f in found:
            if f["name"] == "Foo":
                is_found = True
                break

        assert True is is_found

    @pytest.mark.run('last')
    def test_unregister(self):
        response = fs.unregister_service()
        assert fs._microservice_id == response["id"]

    @pytest.mark.skip(reason="Not implemented")
    def test_register_interest_in_category(self):
        pass

    @pytest.mark.skip(reason="Not implemented")
    def test_unregister_interest_in_category(self):
        pass
