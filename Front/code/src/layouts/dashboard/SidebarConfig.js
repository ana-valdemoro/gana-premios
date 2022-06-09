import { Icon } from '@iconify/react';
import personFill from '@iconify/icons-eva/person-fill';
import peopleFill from '@iconify/icons-eva/people-fill';

import homeFill from '@iconify/icons-eva/home-fill';
// import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
// import fileTextFill from '@iconify/icons-eva/file-text-fill';
// import lockFill from '@iconify/icons-eva/lock-fill';
// import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import i18n from '../../i18n';

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'home',
    path: '/dashboard/app',
    icon: getIcon(homeFill),
    priority: 0
  },
  {
    title: i18n.t('sideBarNav.profile'),
    path: '/dashboard/profile',
    icon: getIcon(personFill),
    priority: 0
  },
  {
    title: i18n.t('sideBarNav.clients'),
    path: '/dashboard/clients',
    icon: getIcon(peopleFill),
    priority: 1
  }
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: getIcon(shoppingBagFill)
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon(fileTextFill)
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon(lockFill)
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
