import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Button, CardActions, CardContent, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from './../../../ui-component/cards/MainCard';

// assets
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

// style constant
const useStyles = makeStyles((theme) => ({
    incomingRequestsCard: {
        padding: '0px',
        paddingBottom: '0px !important'
    },
    textSuccess: {
        color: theme.palette.success.main
    },
    textPrimary: {
        color: theme.palette.primary.main
    },
    textWarning: {
        color: theme.palette.warning.main
    },
    textError: {
        color: theme.palette.error.main
    },
    ScrollHeight: {
        height: '290px'
    }
}));

//=========================|| DATA WIDGET - INCOMING REQUESTS CARD ||=========================//

const IncomingRequests = ({ title }) => {
    const classes = useStyles();

    return (
        <MainCard title={title} content={false}>
            <CardContent className={classes.incomingRequestsCard}>
                <PerfectScrollbar className={classes.ScrollHeight}>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button>
                            <ListItemIcon>
                                <FiberManualRecordIcon className={classes.textSuccess} />
                            </ListItemIcon>
                            <ListItemText primary="Incoming requests" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <FiberManualRecordIcon className={classes.textError} />
                            </ListItemIcon>
                            <ListItemText primary="You have 2 pending requests.." />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <FiberManualRecordIcon className={classes.textWarning} />
                            </ListItemIcon>
                            <ListItemText primary="You have 3 pending tasks" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <FiberManualRecordIcon className={classes.textPrimary} />
                            </ListItemIcon>
                            <ListItemText primary="New order received" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <FiberManualRecordIcon className={classes.textSuccess} />
                            </ListItemIcon>
                            <ListItemText primary="Incoming requests" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <FiberManualRecordIcon className={classes.textError} />
                            </ListItemIcon>
                            <ListItemText primary="You have 2 pending requests.." />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <FiberManualRecordIcon className={classes.textWarning} />
                            </ListItemIcon>
                            <ListItemText primary="You have 3 pending tasks" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <FiberManualRecordIcon className={classes.textPrimary} />
                            </ListItemIcon>
                            <ListItemText primary="New order received" />
                        </ListItem>
                    </List>
                </PerfectScrollbar>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="text" size="small" color="primary">
                    Show more
                </Button>
            </CardActions>
        </MainCard>
    );
};

IncomingRequests.propTypes = {
    title: PropTypes.string
};

export default IncomingRequests;
