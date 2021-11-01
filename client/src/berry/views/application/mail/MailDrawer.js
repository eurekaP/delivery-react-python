import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    CardContent,
    Chip,
    Divider,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    useMediaQuery
} from '@material-ui/core';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import ComposeDialog from './ComposeDialog';
import MainCard from './../../../ui-component/cards/MainCard';
import { appDrawerWidth as drawerWidth, gridSpacing } from './../../../store/constant';

// assets
import MailTwoToneIcon from '@material-ui/icons/MailTwoTone';
import InboxTwoToneIcon from '@material-ui/icons/InboxTwoTone';
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';
import HistoryEduTwoToneIcon from '@material-ui/icons/HistoryEduTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import LabelImportantTwoToneIcon from '@material-ui/icons/LabelImportantTwoTone';
import LabelTwoToneIcon from '@material-ui/icons/LabelTwoTone';
import NewReleasesTwoToneIcon from '@material-ui/icons/NewReleasesTwoTone';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';

// style constant
const useStyles = makeStyles((theme) => ({
    ScrollHeight: {
        height: 'calc(100vh - 295px)',
        overflowX: 'hidden',
        minHeight: '435px',
        [theme.breakpoints.down('lg')]: {
            height: 'calc(100vh - 115px)',
            minHeight: 0
        }
    }
}));

//-----------------------|| MAIL DRAWER ||-----------------------//

const MailDrawer = ({ filter, handleDrawerOpen, handleFilter, openMailSidebar, unreadCounts }) => {
    const classes = useStyles();
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const matchDownSM = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                zIndex: { xs: 1200, lg: 0 },
                '& .MuiDrawer-paper': {
                    height: 'auto',
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    position: 'relative',
                    border: 'none',
                    borderRadius: matchDownSM ? 0 : customization.borderRadius + 'px'
                }
            }}
            variant={matchDownSM ? 'temporary' : 'persistent'}
            anchor="left"
            open={openMailSidebar}
            ModalProps={{ keepMounted: true }}
            onClose={handleDrawerOpen}
        >
            <MainCard
                sx={{
                    bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'grey.50'
                }}
                border={!matchDownSM}
                content={false}
            >
                <CardContent sx={{ height: matchDownSM ? '100vh' : 'auto' }}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <ComposeDialog />
                        </Grid>
                        <Grid item xs={12}>
                            <PerfectScrollbar className={classes.ScrollHeight}>
                                <List
                                    component="nav"
                                    sx={{
                                        '& .MuiListItem-root': {
                                            mb: 0.75,
                                            borderRadius: customization.borderRadius + 'px',
                                            '& .MuiChip-root': {
                                                color:
                                                    theme.palette.mode === 'dark'
                                                        ? theme.palette.primary.main
                                                        : theme.palette.secondary.main,
                                                bgcolor:
                                                    theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.secondary.light
                                            }
                                        },
                                        '& .MuiListItem-root.Mui-selected': {
                                            bgcolor:
                                                theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.secondary.light,
                                            '& .MuiListItemText-primary': {
                                                color:
                                                    theme.palette.mode === 'dark'
                                                        ? theme.palette.primary.main
                                                        : theme.palette.secondary.main
                                            },
                                            '& .MuiChip-root': {
                                                color:
                                                    theme.palette.mode === 'dark'
                                                        ? theme.palette.primary.main
                                                        : theme.palette.secondary.light,
                                                bgcolor:
                                                    theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.main
                                            }
                                        }
                                    }}
                                >
                                    <ListItem button selected={filter === 'all'} onClick={() => handleFilter('all')}>
                                        <ListItemIcon>
                                            <MailTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="All Mail" />
                                        {unreadCounts.all !== 0 && <Chip label={unreadCounts.all} size="small" />}
                                    </ListItem>
                                    <ListItem button selected={filter === 'inbox'} onClick={() => handleFilter('inbox')}>
                                        <ListItemIcon>
                                            <InboxTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Inbox" />
                                        {unreadCounts.inbox !== 0 && <Chip label={unreadCounts.inbox} size="small" />}
                                    </ListItem>
                                    <ListItem button selected={filter === 'sent'} onClick={() => handleFilter('sent')}>
                                        <ListItemIcon>
                                            <SendTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Sent" />
                                        {unreadCounts.sent !== 0 && <Chip label={unreadCounts.sent} size="small" />}
                                    </ListItem>
                                    <ListItem button selected={filter === 'draft'} onClick={() => handleFilter('draft')}>
                                        <ListItemIcon>
                                            <HistoryEduTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Draft" />
                                        {unreadCounts.draft !== 0 && <Chip label={unreadCounts.draft} size="small" />}
                                    </ListItem>
                                    <ListItem button selected={filter === 'spam'} onClick={() => handleFilter('spam')}>
                                        <ListItemIcon>
                                            <NewReleasesTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Spam" />
                                        {unreadCounts.spam !== 0 && <Chip label={unreadCounts.spam} size="small" />}
                                    </ListItem>
                                    <ListItem button selected={filter === 'trash'} onClick={() => handleFilter('trash')}>
                                        <ListItemIcon>
                                            <DeleteTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Trash" />
                                        {unreadCounts.trash !== 0 && <Chip label={unreadCounts.trash} size="small" />}
                                    </ListItem>
                                    <Divider />
                                    <ListSubheader sx={{ bgcolor: 'transparent' }}>{`Filters`}</ListSubheader>
                                    <ListItem button selected={filter === 'starred'} onClick={() => handleFilter('starred')}>
                                        <ListItemIcon>
                                            <StarTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Starred" />
                                        {unreadCounts.starred !== 0 && <Chip label={unreadCounts.starred} size="small" />}
                                    </ListItem>
                                    <ListItem button selected={filter === 'important'} onClick={() => handleFilter('important')}>
                                        <ListItemIcon>
                                            <LabelImportantTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Important" />
                                        {unreadCounts.important !== 0 && <Chip label={unreadCounts.important} size="small" />}
                                    </ListItem>
                                    <Divider />
                                    <ListSubheader sx={{ bgcolor: 'transparent' }}>{`Label`}</ListSubheader>
                                    <ListItem button selected={filter === 'promotions'} onClick={() => handleFilter('promotions')}>
                                        <ListItemIcon>
                                            <LabelTwoToneIcon sx={{ color: theme.palette.primary.main }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Promotions" />
                                        {unreadCounts.promotions !== 0 && <Chip label={unreadCounts.promotions} size="small" />}
                                    </ListItem>
                                    <ListItem button selected={filter === 'forums'} onClick={() => handleFilter('forums')}>
                                        <ListItemIcon>
                                            <LabelTwoToneIcon sx={{ color: theme.palette.warning.main }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Forums" />
                                        {unreadCounts.forums !== 0 && <Chip label={unreadCounts.forums} size="small" />}
                                    </ListItem>
                                </List>
                            </PerfectScrollbar>
                        </Grid>
                    </Grid>
                </CardContent>
            </MainCard>
        </Drawer>
    );
};

MailDrawer.propTypes = {
    filter: PropTypes.string,
    handleDrawerOpen: PropTypes.func,
    handleFilter: PropTypes.func,
    openMailSidebar: PropTypes.bool,
    unreadCounts: PropTypes.object
};

export default MailDrawer;
