import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, Card, CardContent, Grid, Stack, Typography } from '@material-ui/core';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

// project imports
import MainCard from './../../../ui-component/cards/MainCard';
import { gridSpacing } from './../../../store/constant';

// assets
import ToggleButton from '@material-ui/lab/ToggleButton';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircle';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

// style constant
const useStyles = makeStyles((theme) => ({
    priceTitle: {
        fontSize: '20px',
        fontWeight: '500',
        position: 'relative',
        color: theme.palette.primary.main
    },
    priceAmount: {
        fontSize: '25px',
        fontWeight: '700',
        '& > span': {
            fontSize: '20px',
            fontWeight: '500'
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '20px',
            '& > span': {
                fontSize: '14px'
            }
        }
    },
    featureTitle: {
        background:
            theme.palette.mode === 'dark' ? theme.palette.background.default + ' !important' : theme.palette.grey[100] + ' !important',
        textAlign: 'left',
        paddingTop: '12px',
        paddingBottom: '12px !important'
    },
    featureAction: {
        borderLeft: '1px solid',
        borderColor:
            theme.palette.mode === 'dark' ? theme.palette.background.default + ' !important' : theme.palette.grey[200] + ' !important',
        position: 'relative',
        overflow: 'hidden',
        [theme.breakpoints.down('md')]: {
            fontSize: '20px',
            padding: '40px 16px'
        }
    },
    priceBadge: {
        background: theme.palette.secondary.main,
        color: '#fff',
        display: 'inline-block',
        padding: '40px 40px 5px',
        fontSize: '13px',
        position: 'absolute',
        top: '-24px',
        right: '-55px',
        transform: 'rotate(45deg)'
    },
    featureBlock: {
        paddingTop: '12px',
        paddingBottom: '12px !important'
    },
    featureRow: {
        borderBottom: '1px solid',
        borderColor:
            theme.palette.mode === 'dark' ? theme.palette.background.default + ' !important' : theme.palette.grey[200] + ' !important'
    },
    textSuccess: {
        color: theme.palette.success.dark
    },
    textMuted: {
        opacity: '0.3'
    },
    btnToggle: {
        width: '100%',
        '& > button': {
            border: 'none',
            borderRadius: '5px ​!important'
        },
        '& > button.Mui-selected': {
            background: theme.palette.background.default + '!important',
            color: theme.palette.primary.main
        }
    }
}));

const plans = [
    {
        id: 1,
        popular: false,
        title: 'Starters',
        price: {
            monthly: 25,
            yearly: 225
        }
    },
    {
        id: 2,
        popular: true,
        title: 'Scalability',
        price: {
            monthly: 125,
            yearly: 825
        }
    },
    {
        id: 3,
        popular: false,
        title: 'Enterprise',
        price: {
            monthly: 225,
            yearly: 1025
        }
    }
];

const planList = [
    {
        type: 'group',
        label: 'Features'
    },
    {
        type: 'list',
        label: 'Only 1 User uses',
        permission: [1, 1, 1]
    },
    {
        type: 'list',
        label: '10 Projects for',
        permission: [0, 1, 1]
    },
    {
        type: 'list',
        label: 'Unlimited Bandwidth',
        permission: [0, 0, 1]
    },
    {
        type: 'list',
        label: 'Unlimited Data',
        permission: [0, 0, 1]
    },
    {
        type: 'group',
        label: 'Storage & Security'
    },
    {
        type: 'list',
        label: '5GB of Storage',
        permission: [0, 1, 1]
    },
    {
        type: 'list',
        label: 'Fully Security Suite',
        permission: [0, 0, 1]
    }
];

const PlanList = ({ plan, view, priceFlag }) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={3} md={3} sx={{ display: view !== plan.id ? { xs: 'none', sm: 'block' } : 'block' }}>
            <CardContent className={classes.featureAction}>
                {plan.popular && <div className={classes.priceBadge}>Popular</div>}
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Typography variant="h6" className={classes.priceTitle}>
                            {plan.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" className={classes.priceAmount}>
                            <sup>$</sup>
                            {priceFlag === 'yearly' ? plan.price.yearly : plan.price.monthly}
                            <span>/{priceFlag === 'yearly' ? 'Year' : 'Month'}</span>
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Grid>
    );
};

const ListItem = ({ item, index, view }) => {
    const classes = useStyles();
    return (
        <Grid item xs={4} sm={3} md={3} sx={{ display: view !== index + 1 ? { xs: 'none', sm: 'block' } : 'block' }}>
            {item === 1 && (
                <CardContent className={classes.featureBlock}>
                    <CheckCircleTwoToneIcon className={classes.textSuccess} />
                </CardContent>
            )}
            {item === 0 && (
                <CardContent className={classes.featureBlock}>
                    <RemoveRoundedIcon className={classes.textMuted} />
                </CardContent>
            )}
        </Grid>
    );
};

const OrderButton = ({ view, index, popular }) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={3} md={3} sx={{ display: view !== index ? { xs: 'none', sm: 'block' } : 'block' }}>
            <CardContent className={classes.featureAction}>
                <Button variant={popular ? 'contained' : 'outlined'} color={popular ? 'secondary' : 'primary'}>
                    Order Now
                </Button>
            </CardContent>
        </Grid>
    );
};

//=============================|| PRICING - PRICE 2 ||=============================//

const Price2 = () => {
    const classes = useStyles();
    const [priceFlag, setPriceFlag] = React.useState('monthly');

    const [view, setView] = React.useState(1);
    const handleChange = (event, newView) => {
        if (newView !== null) {
            setView(newView);
        }
    };

    return (
        <React.Fragment>
            <Stack direction="row" spacing={gridSpacing} justifyContent="center">
                <ButtonGroup disableElevation variant="contained" sx={{ mb: '24px' }}>
                    <Button
                        size="large"
                        sx={{ bgcolor: priceFlag === 'yearly' ? 'primary.main' : 'primary.200' }}
                        onClick={() => setPriceFlag('yearly')}
                    >
                        Annual
                    </Button>
                    <Button
                        size="large"
                        sx={{ bgcolor: priceFlag === 'monthly' ? 'primary.main' : 'primary.200' }}
                        onClick={() => setPriceFlag('monthly')}
                    >
                        Monthly
                    </Button>
                </ButtonGroup>
            </Stack>

            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Card sx={{ display: { xs: 'block', sm: 'none' } }}>
                        <CardContent>
                            <ToggleButtonGroup
                                orientation="vertical"
                                value={view}
                                exclusive
                                onChange={handleChange}
                                className={classes.btnToggle}
                            >
                                {plans.map((plan, index) => {
                                    return (
                                        <ToggleButton key={index} value={plan.id}>
                                            {plan.title}
                                        </ToggleButton>
                                    );
                                })}
                            </ToggleButtonGroup>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <MainCard content={false} sx={{ textAlign: 'center' }}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={3} md={3}></Grid>
                            {plans.map((plan, index) => {
                                return <PlanList plan={plan} view={view} priceFlag={priceFlag} key={index} />;
                            })}
                        </Grid>
                        {planList.map((list, index) => {
                            return (
                                <React.Fragment key={index}>
                                    {list.type === 'group' && (
                                        <CardContent className={classes.featureTitle}>
                                            <Typography variant="subtitle1">{list.label}</Typography>
                                        </CardContent>
                                    )}
                                    {list.type === 'list' && (
                                        <Grid container spacing={0} className={classes.featureRow}>
                                            <Grid item xs={8} sm={3} md={3}>
                                                <CardContent className={classes.featureBlock}>
                                                    <Typography component="div" align="left" variant="body2">
                                                        {list.label}
                                                    </Typography>
                                                </CardContent>
                                            </Grid>
                                            {list.permission.map((item, index) => {
                                                return <ListItem key={index} item={item} index={index} view={view} />;
                                            })}
                                        </Grid>
                                    )}
                                </React.Fragment>
                            );
                        })}
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={3} md={3}></Grid>
                            <OrderButton view={view} index={1} />
                            <OrderButton view={view} index={2} popular />
                            <OrderButton view={view} index={3} />
                        </Grid>
                    </MainCard>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Price2;
