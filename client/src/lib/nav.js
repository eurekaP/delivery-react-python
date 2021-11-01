import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'


import { Link } from 'react-router-dom'
import {
    Box, Drawer, Divider, List, //Typography,
    Avatar, Chip, ListItem, ListItemIcon, ListItemText, Typography, useMediaQuery
    } from '@material-ui/core'
import { NavDrawerItem } from '../theme/components'

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar'
import { MobileView, CustomView, isBrowser, isTablet } from 'react-device-detect'

import config from './../config'

const MenuList = ({ menuItems, menuItemClasses }) => {
    const [opened, setOpened] = useState( null)
    const navItems = menuItems().items.map( (item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} devider={item.devider} className={menuItemClasses} opened={opened} setOpened={setOpened}/>
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                )
        }
    })
    return navItems
}

export default MenuList


const useStyles = makeStyles((theme) => ({
    menuDivider: {
            marginLeft: '22px',
            backgroundColor: theme.palette.grey50,
            height: '1px',
        }
}))
//if needed copy group title, caption and item collapse from berry/layout/MainLayout/Sidebar/MenuList/NavGroup/index.js
export const NavGroup = ({ item, className, devider, opened, setOpened }) => {
    const classes = useStyles()
    const items = item.children.map((menu) => {
        return <NavItem key={menu.id} item={menu} className={className} opened={opened} setOpened={setOpened} />
    })
    return (
        <React.Fragment>
            <List > {items} </List>
            {devider && <Divider className={classes.menuDivider} />}
        </React.Fragment>
    )
}

/*NavGroup.propTypes = {
    item: PropTypes.object
}*/


const NavItem = ({ item, className, opened, setOpened, /*level*/ }) => {
    var classNameCustom = ''
    if (item.useStyles)
        classNameCustom = item.useStyles().menuItem
    //const matchesSM = useMediaQuery((theme) => theme.breakpoints.down('md'))

    const Icon = item.icon
    const itemIcon = <Icon stroke={1.5} size="1.3rem" /*className={classes.listCustomIcon}*/ />

    let itemIconClass = ''//!item.icon ? classes.listIcon : classes.menuIcon

    let itemTarget = ''
    if (item.target) {
        itemTarget = '_blank'
    }
    let listItemProps = { component: React.forwardRef((props, ref) => <Link {...props} to={item.url} />) }
    if (item.external) {
        listItemProps = { component: 'a', href: item.url }
    }
    const itemHandler = (id) => {
        //dispatch({ type: MENU_OPEN, id: id })
        //matchesSM && dispatch({ type: SET_MENU, opened: false })
        setOpened( id)
    }
    // active menu item on page load
    React.useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id)
        if (currentIndex > -1) {
            setOpened( item.id)
            //dispatch({ type: MENU_OPEN, id: item.id })
        }
        // eslint-disable-next-line
    }, [])

    return (
        <ListItem
            {...listItemProps}
            className={className +' '+ classNameCustom}
            disabled={ item.disabled }
            //className={level > 1 ? classes.listItemNoBack : classes.listItem}
            //sx={{ borderRadius: customization.borderRadius + 'px' }}
            selected={ item.id === opened }
            onClick ={ () => itemHandler(item.id) }
            button
            target  ={ itemTarget }
            //style={{ paddingLeft: level * 23 + 'px' }}
        >
            <ListItemIcon className={itemIconClass}>{itemIcon}</ListItemIcon>
            <ListItemText
                primary={
                    <Typography /*variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'}*/ color="inherit">
                        {item.title}
                    </Typography>
                }
                /*secondary={
                    item.caption && (
                        <Typography variant="caption" className={classes.subMenuCaption} display="block" gutterBottom>
                            {item.caption}
                        </Typography>
                    )
                }*/
            />
            {item.chip && (
                <Chip
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label}
                    avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                />
            )}
        </ListItem>
    )
}


//-----------------------|| SIDEBAR DRAWER ||-----------------------//

const useStyles4Sidebar = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: theme.props.drawerWidth,
            flexShrink: 0
        }
    },
    drawerPaper: {
        width: theme.props.drawerWidth,
        background: theme.palette.white,
        color: theme.palette.text.primary,
        borderRight: '1px solid '+ theme.palette.grey[100],
        [theme.breakpoints.up('md')]: {
            top: '72px', //88
            paddingTop: '14px',
        },

    },
    ScrollHeight: {
        height: 'calc(100vh - 86px)',
        paddingLeft: theme.spacing(3),
        paddingRight: '11px',//theme.spacing(3), FIXME: hack border/extend theme.spacing to manage spacing with borders
        [theme.breakpoints.down('sm')]: {
            height: 'calc(100vh - 56px)'
        }
    },
    boxContainer: {
        display: 'flex',
        padding: theme.spacing(4),
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    menuItemClass: {
        paddingRight: '10px',
    },
    versionInfo: {
        width: theme.props.drawerWidth - 24,
        position: 'fixed',
        bottom: '0px',
        paddingBottom: '7px'
    }
}))

const Sidebar = ({ menuItems, LogoSection, drawerOpen, drawerToggle, window }) => {
    const classes = useStyles4Sidebar()
    const theme = useTheme()
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'))

    const [version, environment] = config.VERSION.split(' ')
    const drawer = (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <div className={classes.boxContainer}>
                    <LogoSection />
                </div>
            </Box>
            <CustomView condition={isBrowser && !isTablet} >
                <PerfectScrollbar component="div" className={classes.ScrollHeight}>
                    <List>
                        {menuItems().map( item => (<NavDrawerItem {...item}/>))}
                    </List>
                    <Box className={classes.versionInfo}>
                        <Typography variant="caption" component="p">Fleetpal version: {version}</Typography>
                        <Typography variant="caption">Env: {environment}</Typography>
                    </Box>
                </PerfectScrollbar>
            </CustomView>
            <MobileView>
                <Box sx={{ px: 2 }}>
                    <MenuList menuItems={menuItems} />
                </Box>
            </MobileView>
        </>
    )

    const container = window !== undefined ? () => window().document.body : undefined

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Drawer
                container={container}
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor="left"
                open={drawerOpen}
                onClose={drawerToggle}
                classes={{
                    paper: classes.drawerPaper
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                {drawer}
            </Drawer>
        </nav>
    )
}

Sidebar.propTypes = {
    menuItems: PropTypes.func,
    LogoSection: PropTypes.func,
    drawerOpen: PropTypes.bool,
    drawerToggle: PropTypes.func,
    window: PropTypes.object
}

export { Sidebar }

// vim:ts=4:sw=4:expandtab
