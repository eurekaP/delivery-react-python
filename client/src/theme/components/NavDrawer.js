import React from 'react'
import NavDrawerItem from './NavDrawerItem'
import { List as MuiList } from '@mui/material'


const NavDrawer = ({navItems, className}) => {
    const items = navItems().map( item => {
        return <NavDrawerItem {...item}/>
    })

    return (
        <MuiList className={className}>
            {items}
        </MuiList>
    )
}

export default NavDrawer

