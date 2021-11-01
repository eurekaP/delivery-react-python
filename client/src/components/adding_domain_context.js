import React from 'react'
import config from '../config'

import { Error404 as Error404Orig } from '../lib/others'
import { Sidebar as SidebarOrig } from '../lib/nav'
import { LogoSection } from './logo'
import menuItems from './menu_items'

export const Error404 = () => {
    return <Error404Orig homeUrl={config.urls.root} />
}

export const Sidebar = ({ ...props }) => {
    return <SidebarOrig { ...props} menuItems={menuItems} LogoSection={LogoSection} />
}
