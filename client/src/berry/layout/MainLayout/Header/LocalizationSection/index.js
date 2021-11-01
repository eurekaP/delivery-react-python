import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Avatar,
    Box,
    ButtonBase,
    ClickAwayListener,
    Grid,
    List,
    ListItem,
    ListItemText,
    Paper,
    Popper,
    Typography,
    useMediaQuery
} from '@material-ui/core';

// project imports
import Transitions from '../../../../ui-component/extended/Transitions';
import * as actionTypes from '../../../../store/actions';

//assets
import TranslateTwoToneIcon from '@material-ui/icons/TranslateTwoTone';

const useStyles = makeStyles((theme) => ({
    navContainer: {
        width: '100%',
        minWidth: '200px',
        maxWidth: '280px',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '250px'
        }
    },
    headerAvatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
        color: theme.palette.primary.dark,
        transition: 'all .2s ease-in-out',
        '&[aria-controls="menu-list-grow"],&:hover': {
            borderColor: theme.palette.primary.main,
            background: theme.palette.primary.main,
            color: theme.palette.primary.light
        }
    },
    box: {
        marginLeft: '16px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '8px'
        }
    }
}));

//-----------------------|| LOCALIZATION ||-----------------------//

const LocalizationSection = () => {
    const classes = useStyles();
    const customization = useSelector((state) => state.customization);
    const dispatch = useDispatch();

    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('sm'));

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [language, setLanguage] = React.useState(customization.locale);

    const handleListItemClick = (event, index) => {
        setLanguage(index);
        dispatch({ type: actionTypes.THEME_LOCALE, locale: index });
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    React.useEffect(() => {
        setLanguage(customization.locale);
    }, [customization]);

    return (
        <React.Fragment>
            <Box component="span" className={classes.box}>
                <ButtonBase sx={{ borderRadius: '12px' }}>
                    <Avatar
                        variant="rounded"
                        className={classes.headerAvatar}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="inherit"
                    >
                        {language !== 'en' && (
                            <Typography variant="h5" sx={{ textTransform: 'uppercase' }} color="inherit">
                                {language}
                            </Typography>
                        )}
                        {language === 'en' && <TranslateTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                    </Avatar>
                </ButtonBase>
            </Box>

            <Popper
                placement={matchesXs ? 'bottom-start' : 'bottom'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 0 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps, placement }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper elevation={16}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <List component="nav" className={classes.navContainer}>
                                    <ListItem button selected={language === 'en'} onClick={(event) => handleListItemClick(event, 'en')}>
                                        <ListItemText
                                            primary={
                                                <Grid container>
                                                    <Typography color="textPrimary">English</Typography>
                                                    <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                                                        (UK)
                                                    </Typography>
                                                </Grid>
                                            }
                                        />
                                    </ListItem>
                                    <ListItem
                                        button
                                        component={Link}
                                        to="#"
                                        selected={language === 'fr'}
                                        onClick={(event) => handleListItemClick(event, 'fr')}
                                    >
                                        <ListItemText
                                            primary={
                                                <Grid container>
                                                    <Typography color="textPrimary">français</Typography>
                                                    <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                                                        (French)
                                                    </Typography>
                                                </Grid>
                                            }
                                        />
                                    </ListItem>
                                    <ListItem button selected={language === 'ro'} onClick={(event) => handleListItemClick(event, 'ro')}>
                                        <ListItemText
                                            primary={
                                                <Grid container>
                                                    <Typography color="textPrimary">Română</Typography>
                                                    <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                                                        (Romanian)
                                                    </Typography>
                                                </Grid>
                                            }
                                        />
                                    </ListItem>
                                    <ListItem button selected={language === 'zh'} onClick={(event) => handleListItemClick(event, 'zh')}>
                                        <ListItemText
                                            primary={
                                                <Grid container>
                                                    <Typography color="textPrimary">中国人</Typography>
                                                    <Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
                                                        (Chinese)
                                                    </Typography>
                                                </Grid>
                                            }
                                        />
                                    </ListItem>
                                </List>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </React.Fragment>
    );
};

export default LocalizationSection;
