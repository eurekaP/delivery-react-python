import React from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';

// project imports
import MainCard from './../../../ui-component/cards/MainCard';
import { gridSpacing } from './../../../store/constant';

// assets
import CheckTwoToneIcon from '@material-ui/icons/CheckTwoTone';
import TwoWheelerTwoToneIcon from '@material-ui/icons/TwoWheelerTwoTone';
import AirportShuttleTwoToneIcon from '@material-ui/icons/AirportShuttleTwoTone';
import DirectionsBoatTwoToneIcon from '@material-ui/icons/DirectionsBoatTwoTone';

// style constant
const useStyles = makeStyles((theme) => ({
    priceTitle: {
        fontSize: '25px',
        fontWeight: '500',
        position: 'relative',
        marginBottom: '15px',
        '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-15px',
            left: 'calc(50% - 25px)',
            width: '50px',
            height: '4px',
            background: theme.palette.primary.main,
            borderRadius: '3px'
        }
    },
    priceAmount: {
        fontSize: '35px',
        fontWeight: '700',
        '& > span': {
            fontSize: '20px',
            fontWeight: '500'
        }
    },
    priceList: {
        margin: 0,
        padding: 0,
        '&> li': {
            padding: '5px 0px',
            '& svg': {
                fill: theme.palette.success.dark
            }
        }
    },
    priceIcon: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        width: '80px',
        height: '80px',
        background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.primary.light,
        color: theme.palette.primary.main,
        '& > svg': {
            width: '35px',
            height: '35px'
        }
    },
    priceListDisable: {
        opacity: '0.4',
        '& >div> svg': {
            fill: theme.palette.secondary.light
        }
    }
}));

const plans = [
    {
        active: false,
        icon: <TwoWheelerTwoToneIcon fontSize="large" color="inherit" />,
        title: 'Standard',
        description:
            'Create one end product for a client, transfer that end product to your client, charge them for your services. The license is then transferred to the client.',
        price: 69,
        permission: [0, 1]
    },
    {
        active: true,
        icon: <AirportShuttleTwoToneIcon fontSize="large" />,
        title: 'Standard Plus',
        description:
            'Create one end product for a client, transfer that end product to your client, charge them for your services. The license is then transferred to the client.',
        price: 129,
        permission: [0, 1, 2, 3]
    },
    {
        active: false,
        icon: <DirectionsBoatTwoToneIcon fontSize="large" />,
        title: 'Extended',
        description:
            'You are licensed to use the CONTENT to create one end product for yourself or for one client (a “single application”), and the end product may be sold or distributed for free.',
        price: 599,
        permission: [0, 1, 2, 3, 5]
    }
];

const planList = [
    'One End Product', // 0
    'No attribution required', // 1
    'TypeScript', // 2
    'Figma Design Resources', // 3
    'Create Multiple Products', // 4
    'Create a SaaS Project', // 5
    'Resale Product', // 6
    'Separate sale of our UI Elements?' // 7
];

//===============================|| PRICING - PRICE 1 ||===============================//

const Price1 = () => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Grid container spacing={gridSpacing}>
            {plans.map((plan, index) => {
                return (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <MainCard
                            className={classes.price}
                            boxShadow
                            sx={{
                                pt: 1.75,
                                border: plan.active ? '2px solid' : '1px solid',
                                borderColor: plan.active
                                    ? 'secondary.main'
                                    : theme.palette.mode === 'dark'
                                    ? theme.palette.background.default
                                    : theme.palette.primary[200] + 75
                            }}
                        >
                            <Grid container textAlign="center" spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <div className={classes.priceIcon}>{plan.icon}</div>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" className={classes.priceTitle}>
                                        {plan.title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">{plan.description}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography component="div" variant="body2" className={classes.priceAmount}>
                                        <sup>$</sup>
                                        {plan.price}
                                        <span>/Lifetime</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <List className={classes.priceList} component="ul">
                                        {planList.map((list, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <ListItem className={!plan.permission.includes(index) ? classes.priceListDisable : ''}>
                                                        <ListItemIcon>
                                                            <CheckTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                                        </ListItemIcon>
                                                        <ListItemText primary={list} />
                                                    </ListItem>
                                                    <Divider />
                                                </React.Fragment>
                                            );
                                        })}
                                    </List>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="outlined" color="primary">
                                        Order Now
                                    </Button>
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default Price1;
