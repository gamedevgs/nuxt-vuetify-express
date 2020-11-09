const Menu = [
    { header: 'Apps' },
    {
        title: 'Dashboard',
        group: 'apps',
        icon: 'dashboard',
        name: 'Dashboard',
        href: '/admin/dashboard'
    },
    {
        title: 'Page',
        group: 'components',
        component: 'components',
        icon: 'widgets',
        items: [
            { name: 'product', title: 'Products', href: '/admin/products' },
            { name: 'cate', title: 'Categorys', badge: 'new', href: '/admin/cates' },
            { name: 'articles', title: 'Articles', href: '/admin/articles' },
        ]
    },
    {
        title: 'Media',
        group: 'apps',
        name: 'Media',
        icon: 'perm_media',
        href: '/admin/media'
    },
    { header: 'UI Elements' },
    {
        title: 'General',
        group: 'components',
        component: 'components',
        icon: 'tune',
        items: [
            { name: 'alerts', title: 'Alerts', href: '/general/alerts' },
        ]
    },
    {
        title: 'Hiển Thị',
        group: 'pickers',
        component: 'picker',
        icon: 'filter_vintage',
        items: [
            { name: 'xeptrang', title: 'Xếp Trang', href: '/admin/xeptrang' },

        ]
    },
    {
        title: 'Layout',
        group: 'layout',
        component: 'layout',
        icon: 'view_compact',
        items: [
            { name: 'bottom-sheets', title: 'Main Menu', href: '/admin/layout/menu' },
        ]
    },
];
// reorder menu
Menu.forEach((item) => {
    if (item.items) {
        item.items.sort((x, y) => {
            let textA = x.title.toUpperCase();
            let textB = y.title.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
    }
});

export default Menu;