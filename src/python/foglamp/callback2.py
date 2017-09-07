import foglamp.configuration_manager as cf_mgr
from foglamp.configuration_manager import register_async


sample_json = {
        "port": {
            "description": "Port to listen on",
            "default": "5683",
            "type": "integer"
        },
        "url": {
            "description": "URL to accept data on",
            "default": "sensor/reading-values",
            "type": "string"
        },
        "certificate": {
            "description": "X509 certificate used to identify ingress interface",
            "default": "47676565",
            "type": "X509 certificate"
        }
    }


@register_async("CATEG2", callback_module="foglamp.callback2")
async def do():
    await cf_mgr.create_category('CATEG2', sample_json, 'CATEG_DESCRIPTION')
    json = await cf_mgr.get_category_all_items('CATEG2')
    print(json)


def run(cat):
    print('callback2 called for category_name {}'.format(cat))


async def do_change():
    await cf_mgr.set_category_item_value_entry('CATEG2', "url", "cb2 url")
    json = await cf_mgr.get_category_all_items('CATEG2')
    print(json)

if __name__ == '__main__':
    import asyncio
    loop = asyncio.get_event_loop()
    loop.run_until_complete(do())
    loop.run_until_complete(do_change())
