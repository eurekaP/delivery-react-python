import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Button,
    CardMedia,
    Chip,
    Divider,
    Grid,
    Link,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';

// project imports
import BillCard from '../../../../../ui-component/cards/BillCard';
import SubCard from './../../../../../ui-component/cards/SubCard';
import AnimateButton from './../../../../../ui-component/extended/AnimateButton';
import { gridSpacing } from './../../../../../store/constant';

// assets
import imageDiscover from './../../../../../assets/images/pages/card-discover.png';
import imageMasterCard from './../../../../../assets/images/pages/card-master.png';
import imageVisa from './../../../../../assets/images/pages/card-visa.png';

// style constant
const useStyles = makeStyles((theme) => ({
    opacity50: {
        opacity: '.5'
    },
    projectTableCard: {
        padding: '0px',
        paddingBottom: '0px !important',
        overflowX: 'auto'
    },
    paymentEndContent: {
        minWidth: 'auto'
    }
}));

// table data
function createData(tid, date, amount, badgeText, badgeType) {
    return { tid, date, amount, badgeText, badgeType };
}

const rows = [
    createData('12877227695', '26 Feb 2021 9:16 am', '$56.32', 'Awaiting', 'secondary'),
    createData('12901477937', '30 Jan 2021 2:54 pm', '$75.56', 'Paid', 'primary'),
    createData('12767886919', '22 Jan 2021 12:01 pm', '$34.23', 'Paid', 'primary')
];

//-----------------------|| PROFILE 3 - BILLING ||-----------------------//

const Billing = () => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={6} md={4}>
                <BillCard
                    primary="Bill Due"
                    secondary="$150.00"
                    link="Pay Now"
                    color={theme.palette.orange.dark}
                    bg={theme.palette.orange.light}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <BillCard
                    primary="Total Credits"
                    secondary="1570 GB"
                    link="Full Report"
                    color={theme.palette.warning.dark}
                    bg={theme.palette.warning.light}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <BillCard
                    primary="Plan"
                    secondary="Basic"
                    link="Upgrade?"
                    color={theme.palette.success.dark}
                    bg={theme.palette.success.light}
                />
            </Grid>
            <Grid item xs={12}>
                <SubCard
                    title="Payment Methods"
                    secondary={
                        <AnimateButton>
                            <Button variant="contained" size="small" color="primary">
                                Add New Method
                            </Button>
                        </AnimateButton>
                    }
                >
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                                        <CardMedia component="img" image={imageVisa} title="payment" sx={{ width: '65px' }} />
                                        <div className={classes.paymentEndContent}>
                                            <Typography variant="subtitle1">Visa card</Typography>
                                            <Typography variant="subtitle2">Ending in 5269 07XX XXXX 8110</Typography>
                                        </div>
                                    </Stack>
                                </Grid>
                                <Grid item>
                                    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                                        <Chip label="Default" size="small" />
                                        <Typography variant="subtitle2" className={classes.opacity50}>
                                            |
                                        </Typography>
                                        <Link component={RouterLink} to="#">
                                            Edit
                                        </Link>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                                        <CardMedia component="img" image={imageDiscover} title="payment" sx={{ width: '65px' }} />
                                        <div className={classes.paymentEndContent}>
                                            <Typography component="div" variant="subtitle1">
                                                Discover
                                            </Typography>
                                            <Typography variant="subtitle2">Ending in 6109 07XX XXXX 8020</Typography>
                                        </div>
                                    </Stack>
                                </Grid>
                                <Grid item>
                                    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                                        <Link component={RouterLink} to="#" color="secondary">
                                            Make Default
                                        </Link>
                                        <Typography variant="subtitle2" className={classes.opacity50}>
                                            |
                                        </Typography>
                                        <Link component={RouterLink} to="#">
                                            Edit
                                        </Link>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                                        <CardMedia component="img" image={imageMasterCard} title="payment" sx={{ width: '65px' }} />
                                        <div className={classes.paymentEndContent}>
                                            <Typography component="div" variant="subtitle1">
                                                Mastercard
                                            </Typography>
                                            <Typography variant="subtitle2">Ending in 7278 07XX XXXX 4290</Typography>
                                        </div>
                                    </Stack>
                                </Grid>
                                <Grid item>
                                    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                                        <Link component={RouterLink} to="#" color="secondary">
                                            Make Default
                                        </Link>
                                        <Typography variant="subtitle2" className={classes.opacity50}>
                                            |
                                        </Typography>
                                        <Link component={RouterLink} to="#">
                                            Edit
                                        </Link>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12}>
                <SubCard title="Billing History" className={classes.projectTableCard} content={false}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 3 }}>Order No.</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell sx={{ pr: 3 }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow hover key={index}>
                                    <TableCell sx={{ pl: 3 }}>{row.tid}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.amount}</TableCell>
                                    <TableCell sx={{ pr: 3 }}>
                                        <Chip color={row.badgeType} label={row.badgeText} size="small" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default Billing;
