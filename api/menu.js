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
            { name: 'media', title: 'Media', href: '/widgets/list' },
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
            { name: 'avatars', title: 'Avatars', href: '/general/avatars' },
            { name: 'badges', title: 'Badges', href: '/general/badges' },
            { name: 'buttons', title: 'Buttons', href: '/general/buttons' },
            { name: 'cards', title: 'Cards', href: '/general/cards' },
            { name: 'carousels', title: 'Carousels', href: '/general/carousels' },
            { name: 'chips', title: 'Chips', href: '/general/chips' },
            { name: 'dialogs', title: 'Dialogs', href: '/general/dialogs' },
            { name: 'icons', title: 'Icons', href: '/general/icons' },
            { name: 'tables', title: 'Data Tables', href: '/general/tables' },
            { name: 'parallax', title: 'Parallax  image', href: '/general/parallax' },
            { name: 'snackbar', title: 'Snackbar', href: '/general/snackbar' },
            { name: 'progress', title: 'Progress', href: '/general/progress' },
            { name: 'slider', title: 'Slider', href: '/general/sliders' },
            { name: 'tooltip', title: 'Tooltip', href: '/general/tooltips' },
            { name: 'pagination', title: 'Pagination', href: '/general/pagination' },
            { name: 'typography', title: 'Typography', href: '/general/typography' },
            { name: 'color', title: 'Color', href: '/general/colors' },

        ]
    },
    {
        title: 'Pickers',
        group: 'pickers',
        component: 'picker',
        icon: 'filter_vintage',
        items: [
            { name: 'timepicker', title: 'Timepicker', href: '/pickers/timepicker' },
            { name: 'datepicker', title: 'Datepicker', href: '/pickers/datepicker' },

        ]
    },
    {
        title: 'Layout',
        group: 'layout',
        component: 'layout',
        icon: 'view_compact',
        items: [
            { name: 'bottom-sheets', title: 'Bottom panels', component: 'components/bottom-sheets' },
            { name: 'expansion-panels', title: 'Expansion panels', component: 'components/expansion-panels' },
            { name: 'footer', title: 'Footer', component: 'components/footer' },
            { name: 'lists', title: 'Lists', component: 'components/lists' },
            { name: 'jumbotrons', title: 'Jumbotrons', badge: 'new', component: 'components/jumbotrons' },
            { name: 'menus', title: 'Menus', component: 'components/menus' },
            { name: 'tabs', title: 'Tabs', component: 'components/tabs' },
            { name: 'toolbar', title: 'Toolbars', component: 'components/toolbar' },
            { name: 'timeline', title: 'Timeline', component: 'components/timeline' },
        ]
    },

    { divider: true },
    { header: 'Extras' },
    {
        title: 'Login',
        group: 'extra',
        icon: 'list',
        href: '/login'
    },
    {
        title: 'Empty',
        group: 'extra',
        icon: 'insert_drive_file',
        href: '/empty'
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