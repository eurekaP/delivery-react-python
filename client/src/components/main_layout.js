import { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'

import { makeStyles, useTheme } from '@material-ui/styles'
import { AppBar, CssBaseline, Toolbar, useMediaQuery,
    /*Avatar,*/ Divider, Typography,
    } from '@material-ui/core'

import clsx from 'clsx'
import Header from '../lib/header'
//import MenuList from '../lib/nav'
import { Sidebar } from './adding_domain_context'

import { profileMenuItems } from './menu_items'
import { Avatar } from '../theme/components'
import { NavDrawer } from './../theme/components'
import config from '../config'


// assets
import logo from '../assets/images/logo.svg'

// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        backgroundColor: theme.palette.background.default,
        borderColor: theme.palette.grey100
    },
    appBarWidth: {
        transition: theme.transitions.create('width'),
        backgroundColor: theme.palette.background.default
    },
    content: {
        ...theme.typography.mainContent,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        marginTop: "72px",
        minHeight: "calc(100vh - 72px)",
        padding: theme.spacing(6),
        paddingBottom: 0,
        display: "flex",
        flexDirection: "column",
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(theme.props.drawerWidth - 20),
            width: `calc(100% - ${theme.props.drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            width: `calc(100% - ${theme.props.drawerWidth}px)`,
            padding: '16px',
        },
        [theme.breakpoints.down('sm')]: {
            width: `calc(100% - ${theme.props.drawerWidth}px)`,
            padding: '16px',
        }
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    toolbar: {
        padding: "12px 24px 11px 21px",
        backgroundColor: theme.palette.white,
        borderBottom: "1px solid " + theme.palette.grey[100]
    },
    profileAvatarMargin: {
        margin: "0 auto 10px"
    },
    profileName: {
        lineHeight: '1.75',
        color: theme.palette.grey[900]
    },
    profileRole: {
        marginBottom: '36px',
        textTransform: 'lowercase',
        '&:first-letter': {
            textTransform: 'uppercase'
        }
    },
    profileMenuItem: {
        paddingTop: '16px',
        paddingBottom: '16px',
        borderRadius: 'unset !important',
        '&.MuiListItem-button': {
            paddingLeft: '22px',
        },
        '& .MuiListItemText-root': {
            margin: 0,
        },
        '& .MuiTypography-root': {
            fontSize: '14px',
        },
        "& .MuiListItemIcon-root": {
            paddingRight: theme.spacing(3)
        },
        '&.Mui-selected, &.Mui-selected .MuiListItemIcon-root, &.Mui-selected .MuiListItemText-root': {
            backgroundColor: 'unset',
        },
    },
}))


const MainLayout = inject('auth')( observer( ({ auth, children }) => {
    const [open, setOpen] = useState(true)

    const classes = useStyles()
    const theme = useTheme()

    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'))

    const userProps = {
        avatar: auth.user.avatar,
        googleAccountPicture: auth.googleAccount && auth.googleAccount.details.picture,
        userFullName: auth.userFullName,
        }

    // Handle left drawer
    const handleLeftDrawerToggle = () => {
        setOpen( !open)
    }

    useEffect(() => {
        const openLeftDrawerState = (val) => {
            setOpen( val)
        }
        openLeftDrawerState(matchUpMd)
    }, [ matchUpMd ])

    return (
    <div className={classes.root}>
        <CssBaseline />
        {/* header */}
        <AppBar position="fixed" color="inherit" elevation={0} className={open ? classes.appBarWidth : classes.appBar}>
            <Toolbar className={classes.toolbar} >
                <Header
                    handleLeftDrawerToggle={handleLeftDrawerToggle}
                    userProps={userProps}
                    logo={logo}
                    rootUrl={config.urls.root}
                    profilePopperItems={PopperItems}
                    />
            </Toolbar>
        </AppBar>

        {/* drawer */}
        <Sidebar drawerOpen={open} drawerToggle={handleLeftDrawerToggle} />

        {/* main content */}
        <main
            className={clsx([
                classes.content,
                {
                    [classes.contentShift]: open
                }
            ])}
        >
            {children}
        </main>
    </div>
    )
}))


const PopperItems = inject('auth')( observer( ({ auth, avatarProps }) => {
    const classes = useStyles()
    const role = auth.currentMembershipRole
    return (
        <>
            <Avatar {...avatarProps } noHover
                className={classes.profileAvatarMargin}
            />
            <Typography className={classes.profileName} variant="subtitle1" >{ auth.userFullName }</Typography>
            <Typography className={classes.profileRole} variant="body2" >{ role }</Typography>
            <Divider />
            <NavDrawer navItems={profileMenuItems} />
        </>
        )
}))

export default MainLayout

// vim:ts=4:sw=4:expandtab
