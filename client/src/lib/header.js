import React, { useEffect, useState } from 'react'
import { useTheme } from '@material-ui/styles'
import { alpha } from '@mui/material/styles'

// material-ui
import { makeStyles } from '@mui/styles'
import { Link } from 'react-router-dom'
import { /*Avatar,*/ Box, ButtonBase, Card, CardContent, Popper,
    ClickAwayListener, Paper,
} from '@material-ui/core'

// project imports
//import SearchSection from './search_section'
//import MobileSection from './mobile_section'
//import ProfileSection from './components/profile_section'
//import NotificationSection from './notification_section'

// assets
import { IconMenu2 } from '@tabler/icons'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import { Logo } from '../components/logo'

import { Button, Avatar, SearchBar } from '../theme/components'


const useStyles = makeStyles((theme) => ({
    boxContainer: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
        width: theme.props.drawerWidth - 22,
        paddingRight: theme.spacing(3)
    },
    bars: {
        color: theme.palette.primary.main
    },
    grow: {
        flexGrow: 1
    },
    searchInput: {
        paddingLeft: "24px !important",
        width: "256px",
        '& .MuiOutlinedInput-root': {
            backgroundColor: alpha( theme.palette.grey[500], 0.05),
        }
    },
    searchControl: {
        marginLeft: '26px',
        width: "257px",
        backgroundColor: alpha( theme.palette.grey[500], 0.05),
        paddingLeft: theme.spacing(3),
        "& .MuiOutlinedInput-notchedOutline": {
            border: 0,
        },
        "&:hover, &.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid " + theme.palette.blue[500],
            },
        },
        "& input": {
            padding: "12px 0",
            "&::placeholder": {
                color: theme.palette.grey[300],
                lineHeight: "1.75",
                letterSpacing: "0.15px",
                fontSize: "16px"
            }
        }
    },
    startAdornment: {
        color: theme.palette.grey[300],
    },
    endAdornment: {
        color: theme.palette.grey[300]
    },
    simpleIcon: {
        marginLeft: theme.spacing(6),
        color: theme.palette.grey[400]
    },

    profileButton: {
        backgroundColor: theme.palette.blue[100],
        color: theme.palette.blue[500],
        fontSize: "14px",
        lineHeight: "1.43",
        letterSpacing: "0.15px"
        },
    profilePopperPaper: {
        width: '320px',
        textAlign: 'center',
        boxShadow: "unset",
        marginTop: '26.5px',
    },
    profileCardContent: {
        padding: "40px 0 0 !important",
        '& .MuiList-root.MuiList-padding': {
            paddingTop: 0,
            paddingBottom: 0,
            },
    },
}))

const Header = ({ handleLeftDrawerToggle, userProps, logo, rootUrl, profilePopperItems }) => {
    const classes = useStyles()

    return (
        <>
            {/* logo & toggler button */}
            <div className={classes.boxContainer}>
                <Box component="span" >
                    <LogoSection src={logo} url={rootUrl}/>
                </Box>
                <ButtonBase onClick={handleLeftDrawerToggle}>
                    <IconMenu2 className={classes.bars} />
                    {/* <Avatar className={classes.headerAvatar} onClick={handleLeftDrawerToggle} color="inherit">
                        <IconMenu2 />
                    </Avatar> */}
                </ButtonBase>
            </div>

            {/* header search */}
            <SearchSection />
            <div className={classes.grow} />

            {/* notification & profile */}
            <CreateNewButton />
            <NotificationSection />
            <ProfileSection userProps={userProps} PopperItems={profilePopperItems}/>

            {/* mobile header */}
            {/*
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box>
            */}
        </>
    )
}


export default Header

const LogoSection = ({ url }) => {
    return (
    <ButtonBase disableRipple component={Link} to={url}>
        <Logo width={101} />
        {/* <img src={src} width="140" /> */}
    </ButtonBase>
    )
}


const SearchSection = () => {
    const classes = useStyles()

    return (
        <SearchBar className={classes.searchInput} leadingIcon/>
    )
}


const CreateNewButton = () => {
    return (
        <Button
        startIcon={ <ArrowDropDownIcon /> }
        variant="outlined"
        >
        CREATE A NEW
        </Button>
    )
}


const NotificationSection = () => {
    const classes = useStyles()
    return (
        <ButtonBase className={classes.simpleIcon}>
            <NotificationsNoneIcon />
            {/* <Avatar className={classes.headerAvatar} >
                <NotificationsNoneIcon />
            </Avatar> */}
        </ButtonBase>
    )
}

export const make_avatarProps = ( userProps ) => {
    var avatarProps = { size: 'medium' }
    var avatarProps4PopperItems = { size: 'extraLarge' }
    const avatarUrl = userProps.avatar || userProps.googleAccountPicture
    if (avatarUrl) {
        avatarProps.src = avatarUrl
        avatarProps4PopperItems.src = avatarUrl
    } else if (userProps.userFullName) {
        avatarProps.fromText = userProps.userFullName
        avatarProps4PopperItems.fromText = userProps.userFullName
        avatarProps.type = 'text'
        avatarProps4PopperItems.type = 'text'
    }
    return [avatarProps, avatarProps4PopperItems]
}

const ProfileSection = ({ userProps, PopperItems }) => {
    const classes = useStyles()
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const anchorRef = React.useRef(null)

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen)
    }
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return
        }
        setOpen(false)
    }
    const prevOpen = React.useRef(open)
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus()
        }

        prevOpen.current = open
    }, [open])

    /* eslint-disable */
    useEffect(() => {
        setOpen(false)
    }, [window.location.href])

    const [ avatarProps, avatarProps4PopperItems ] = make_avatarProps( userProps, classes)

    return (
    <>
        <ButtonBase
            ref={anchorRef}
            onClick={handleToggle}
            className={classes.simpleIcon}
            >
            <Avatar
                {...avatarProps}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                color={theme.palette.primaryMain}
                className={classes.profileButton}
            />
        </ButtonBase>
        <Popper
            placement="bottom-end"
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
        >
            <Paper className={classes.profilePopperPaper}>
                <ClickAwayListener onClickAway={handleClose}>
                    <Card border={0} content={0}>
                        <CardContent className={classes.profileCardContent}>
                            <PopperItems avatarProps={avatarProps4PopperItems} />
                        </CardContent>
                    </Card>
                </ClickAwayListener>
            </Paper>
        </Popper>
    </>
    )
}


