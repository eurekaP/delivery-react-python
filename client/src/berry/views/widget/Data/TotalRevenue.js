import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from './../../../ui-component/cards/MainCard';

// assets
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

// style constant
const useStyles = makeStyles((theme) => ({
    incomingRequestsCard: {
        padding: '0px',
        paddingBottom: '0px !important'
    },
    textSuccess: {
        color: theme.palette.success.dark
    },
    textError: {
        color: theme.palette.error.main
    },
    ScrollHeight: {
        height: '370px',
        '& svg': {
            width: '32px',
            margin: '-6px 6px -6px -6px'
        }
    },
    coinText: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

//===========================|| DATA WIDGET - TOTAL REVENUE CARD ||===========================//

const TotalRevenue = ({ title }) => {
    const classes = useStyles();

    return (
        <MainCard title={title} content={false}>
            <CardContent className={classes.incomingRequestsCard}>
                <PerfectScrollbar className={classes.ScrollHeight}>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button>
                            <ListItemIcon>
                                <ArrowDropUpIcon className={classes.textSuccess} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Bitcoin</span>
                                        <span className={classes.textSuccess}>+ $145.85</span>
                                    </div>
                                }
                            />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <ArrowDropDownIcon className={classes.textError} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Ethereum</span>
                                        <span className={classes.textError}>- $6.368</span>
                                    </div>
                                }
                            />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <ArrowDropUpIcon className={classes.textSuccess} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Ripple</span>
                                        <span className={classes.textSuccess}>+ $458.63</span>
                                    </div>
                                }
                            />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <ArrowDropDownIcon className={classes.textError} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Neo</span>
                                        <span className={classes.textError}>- $5.631</span>
                                    </div>
                                }
                            />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <ArrowDropDownIcon className={classes.textError} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Ethereum</span>
                                        <span className={classes.textError}>- $6.368</span>
                                    </div>
                                }
                            />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <ArrowDropUpIcon className={classes.textSuccess} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Ripple</span>
                                        <span className={classes.textSuccess}>+ $458.63</span>
                                    </div>
                                }
                            />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <ArrowDropDownIcon className={classes.textError} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Neo</span>
                                        <span className={classes.textError}>- $5.631</span>
                                    </div>
                                }
                            />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <ArrowDropDownIcon className={classes.textError} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Ethereum</span>
                                        <span className={classes.textError}>- $6.368</span>
                                    </div>
                                }
                            />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <ArrowDropUpIcon className={classes.textSuccess} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Ripple</span>
                                        <span className={classes.textSuccess}>+ $458.63</span>
                                    </div>
                                }
                            />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <ArrowDropDownIcon className={classes.textError} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Neo</span>
                                        <span className={classes.textError}>- $5.631</span>
                                    </div>
                                }
                            />
                        </ListItem>
                    </List>
                </PerfectScrollbar>
            </CardContent>
        </MainCard>
    );
};

TotalRevenue.propTypes = {
    title: PropTypes.string
};

export default TotalRevenue;
