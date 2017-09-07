import foglamp.configuration_manager as cf_mgr
from foglamp.configuration_manager import register


@register("CATEG2", callback_module="foglamp.abc")
def sync_do():
    # run callback2 first to have CATEG2 in db,
    # LAZY enough to call async create cat :]
    pass


def run(cat):
    print('abc called for category_name {}'.format(cat))


async def do_change():
    await cf_mgr.set_category_item_value_entry('CATEG2', "url", "abc url")
    json = await cf_mgr.get_category_all_items('CATEG2')
    print(json)

if __name__ == '__main__':
    import asyncio
    loop = asyncio.get_event_loop()
    loop.run_until_complete(do_change())
