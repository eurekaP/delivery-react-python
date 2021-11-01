import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Slide,
    Stack,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tabs,
    TextField,
    Typography
} from '@material-ui/core';
import {
    Timeline,
    TimelineDot,
    TimelineItem,
    TimelineConnector,
    TimelineContent,
    TimelineOppositeContent,
    TimelineSeparator
} from '@material-ui/lab';

// third-party
import ReactToPrint from 'react-to-print';

// project imports
import MainCard from './../../../ui-component/cards/MainCard';
import AnimateButton from './../../../ui-component/extended/AnimateButton';
import SubCard from './../../../ui-component/cards/SubCard';
import Chip from './../../../ui-component/extended/Chip';
import Logo from './../../../ui-component/Logo';
import { gridSpacing } from './../../../store/constant';

// assets
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import LocalShippingTwoToneIcon from '@material-ui/icons/LocalShippingTwoTone';
import PhoneAndroidTwoToneIcon from '@material-ui/icons/PhoneAndroidTwoTone';
import ReceiptTwoToneIcon from '@material-ui/icons/ReceiptTwoTone';

// style constant
const useStyles = makeStyles((theme) => ({
    orderDetailsBox: {
        backgroundColor: theme.palette.background.default,
        paddingTop: '0px',
        paddingBottom: '0px'
    },
    primaryTail: {
        backgroundColor: theme.palette.primary.main
    },
    secondaryTail: {
        backgroundColor: theme.palette.grey[400]
    },
    orderDetails: {
        flex: '3'
    },
    timelineDot: {
        padding: '0px',
        '& > svg': {
            width: '14px',
            height: '14px'
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    timeline: {
        '& > li': {
            marginBottom: '14px',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                '& > div': {
                    paddingLeft: '0px',
                    paddingRight: '0px'
                },
                '& > div:first-child': {
                    textAlign: 'left'
                }
            }
        },
        [theme.breakpoints.down('sm')]: {
            padding: '0px'
        }
    },
    accountTab: {
        '& a': {
            minHeight: 'auto',
            minWidth: '10px',
            padding: '12px 8px',
            marginRight: '18px',
            color: theme.palette.grey[600]
        },
        '& a.Mui-selected': {
            color: theme.palette.primary.main
        },
        '& a > span': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        '& a > span > svg': {
            marginBottom: '0px !important',
            marginRight: '10px'
        },
        '& a > span > span + svg': {
            margin: '0px 0px 0px auto !important',
            width: '14px',
            height: '14px'
        }
    },
    userAddDialog: {
        '&>div:nth-child(3)': {
            justifyContent: 'flex-end',
            '&>div': {
                margin: '0px',
                borderRadius: '0px',
                maxWidth: '450px',
                maxHeight: '100%',
                height: '100vh'
            }
        }
    },
    statTitle: {
        backgroundColor: theme.palette.background.default,
        '& + div': {
            marginBottom: '10px'
        }
    },
    invoiceTable: {
        '& tr:last-child td': {
            borderBottom: 'none'
        },
        '& thead tr th': {
            borderBottom: 'none'
        },
        '& th:first-child, & td:first-child': {
            paddingLeft: '40px',
            [theme.breakpoints.down('sm')]: {
                paddingLeft: '20px'
            }
        },
        '& th:last-child, & td:last-child': {
            paddingRight: '70px',
            [theme.breakpoints.down('sm')]: {
                paddingRight: '50px'
            }
        }
    },
    invoiceCard: {
        maxWidth: '850px',
        margin: '0 auto 20px',
        '& > .MuiCardContent-root': {
            padding: '45px 40px',
            [theme.breakpoints.down('sm')]: {
                padding: '30px 20px'
            }
        }
    },
    customerHeadDetails: {
        '& > svg': {
            width: '15px',
            height: '15px',
            verticalAlign: 'text-top',
            marginRight: '5px',
            marginTop: '2px'
        }
    },
    invoiceLogo: {
        maxWidth: '100%',
        width: '120px',
        [theme.breakpoints.down('sm')]: {
            width: '70px'
        }
    },
    tableResponsive: {
        overflowX: 'auto'
    },
    totalBillAmount: {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light
    }
}));

const sxDivider = {
    borderColor: 'primary.light'
};

// tab animation
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

// tab content
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box p={0}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// table data
function createData(product, description, quantity, amount, total) {
    return { product, description, quantity, amount, total };
}

const rows = [
    createData('Logo Design', 'lorem ipsum dolor sit amat, connecter adieu siccing eliot', '6', '$200.00', '$1200.00'),
    createData('Landing Page', 'lorem ipsum dolor sit amat, connecter adieu siccing eliot', '7', '$100.00', '$700.00'),
    createData('Admin Template', 'lorem ipsum dolor sit amat, connecter adieu siccing eliot', '5', '$150.00', '$750.00')
];

//-----------------------|| ORDER DETAILS ||-----------------------//

const OrderDetails = () => {
    const classes = useStyles();
    const componentRef = useRef();

    // set selected tab
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // toggle write a review dialog
    const [open, setOpen] = React.useState(false);
    const handleClickOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    return (
        <MainCard>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                variant="scrollable"
                className={classes.accountTab}
                aria-label="simple tabs example"
                sx={{ mb: 3 }}
            >
                <Tab icon={<DescriptionTwoToneIcon />} component={Link} to="#" label="Details" {...a11yProps(0)} />
                <Tab icon={<ReceiptTwoToneIcon />} component={Link} to="#" label="Invoice" {...a11yProps(1)} />
                <Tab icon={<LocalShippingTwoToneIcon />} component={Link} to="#" label="Status" {...a11yProps(2)} />
            </Tabs>

            {/* tab - details */}
            <TabPanel value={value} index={0}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <SubCard title="Customer" secondary={<Typography variant="subtitle1">Placed on 12.07.2018 10:00</Typography>}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item>
                                            <Typography variant="body2" className={classes.customerHeadDetails}>
                                                <CalendarTodayTwoToneIcon /> Sophia Hale
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" className={classes.customerHeadDetails}>
                                                <PhoneAndroidTwoToneIcon /> 070 123 4567
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" className={classes.customerHeadDetails}>
                                                <EmailTwoToneIcon /> example@mail.com
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider sx={sxDivider} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={12} sm={4}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Typography variant="h4">Payment method</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h6">Credit Card</Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">
                                                                Transaction ID : &nbsp;
                                                                <Typography component="span" variant="body2">
                                                                    000001-TXT
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">
                                                                Amount : &nbsp;
                                                                <Typography component="span" variant="body2">
                                                                    $2500
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Typography variant="h4">Shipping method</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h6">Carrier</Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">
                                                                Tracking Code : &nbsp;
                                                                <Typography component="span" variant="body2">
                                                                    FX-012345-6
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">
                                                                Date : &nbsp;
                                                                <Typography component="span" variant="body2">
                                                                    12.15.2018
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Typography variant="h4"></Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">
                                                                Fulfillment status : &nbsp;
                                                                <Typography component="span" variant="body2">
                                                                    Delivered
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">
                                                                Payment status : &nbsp;
                                                                <Chip label="Paid" variant="outlined" size="small" chipcolor="success" />
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider sx={sxDivider} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item sm={4}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Typography variant="h4">Billing address</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">
                                                                First name : &nbsp;
                                                                <Typography component="span" variant="body2">
                                                                    Joseph
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">
                                                                Last name : &nbsp;
                                                                <Typography component="span" variant="body2">
                                                                    William
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">
                                                                Address : &nbsp;
                                                                <Typography component="span" variant="body2">
                                                                    4898 Joanne Lane street
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">
                                                                City : &nbsp;
                                                                <Typography component="span" variant="body2">
                                                                    Boston
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">
                                                                Country : &nbsp;
                                                                <Typography component="span" variant="body2">
                                                                    United States
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">
                                                                State : &nbsp;
                                                                <Typography component="span" variant="body2">
                                                                    Massachusetts
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">
                                                                Zip code : &nbsp;
                                                                <Typography component="span" variant="body2">
                                                                    02110
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">
                                                                Phone : &nbsp;
                                                                <Typography component="span" variant="body2">
                                                                    +1 (070) 123-4567
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item sm={4}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Typography variant="h4">Shipping address</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">
                                                                First name : &nbsp;
                                                                <Typography component="span" variant="body2">
                                                                    Sara
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">
                                                                Last name : &nbsp;
                                                                <Typography component="span" variant="body2">
                                                                    Soudan
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">
                                                                Address : &nbsp;
                                                                <Typography component="span" variant="body2">
                                                                    4898 Joanne Lane street
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">
                                                                City : &nbsp;
                                                                <Typography component="span" variant="body2">
                                                                    Boston
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">
                                                                Country : &nbsp;
                                                                <Typography component="span" variant="body2">
                                                                    United States
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">
                                                                State : &nbsp;
                                                                <Typography component="span" variant="body2">
                                                                    Massachusetts
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">
                                                                Zip code : &nbsp;
                                                                <Typography component="span" variant="body2">
                                                                    02110
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">
                                                                Phone : &nbsp;
                                                                <Typography component="span" variant="body2">
                                                                    +1 (070) 123-4567
                                                                </Typography>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12}>
                        <SubCard title="Products" content={false}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} className={classes.tableResponsive}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ pl: 3 }}>Description</TableCell>
                                                <TableCell align="right">Quantity</TableCell>
                                                <TableCell align="right">Amount</TableCell>
                                                <TableCell align="right">Total</TableCell>
                                                <TableCell align="right" sx={{ pr: 3 }}></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell sx={{ pl: 3 }}>
                                                        <Typography align="left" variant="subtitle1">
                                                            {row.product}
                                                        </Typography>
                                                        <Typography align="left" variant="body2">
                                                            {row.description}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="right">{row.quantity}</TableCell>
                                                    <TableCell align="right">{row.amount}</TableCell>
                                                    <TableCell align="right">{row.total}</TableCell>
                                                    <TableCell sx={{ pr: 3 }} align="right">
                                                        <IconButton color="primary">
                                                            <DeleteTwoToneIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Grid>
                                <Grid item xs={12}>
                                    <SubCard sx={{ mx: 3, mb: 3 }} contentClass={classes.totalBillAmount}>
                                        <Grid container justifyContent="flex-end" spacing={gridSpacing}>
                                            <Grid item sm={6} md={4}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={6}>
                                                                <Typography align="right" variant="subtitle1">
                                                                    Sub Total :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography align="right" variant="body2">
                                                                    $4725.00
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography align="right" variant="subtitle1">
                                                                    Taxes (10%) :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography align="right" variant="body2">
                                                                    $57.00
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography align="right" variant="subtitle1">
                                                                    Discount (5%) :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography align="right" variant="body2">
                                                                    $45.00
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Divider sx={{ bgcolor: 'dark.main' }} />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={6}>
                                                                <Typography align="right" color="primary" variant="subtitle1">
                                                                    Total :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography align="right" color="primary" variant="subtitle1">
                                                                    $4827.00
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            </TabPanel>

            {/* tab - invoice */}
            <TabPanel value={value} index={1}>
                <Grid container justifyContent="center" spacing={gridSpacing}>
                    <Grid item xs={12} md={10} lg={8} ref={componentRef}>
                        <SubCard darkTitle title="Invoice #125863478945" secondary={<Logo />}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle1">Demo Company Inc.</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2">1065 Mandan Road, Columbia MO,</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2">Missouri. (123)-65202</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography component={Link} to="#" variant="body2" color="primary">
                                                demo@company.com
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2">(+91) 9999 999 999</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item sm={5}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <Typography variant="h5">Customer :</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle1">John Doe</Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="body2">1065 Mandan Road, Columbia MO,</Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="body2">Missouri. (123)-65202</Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="body2">(+61) 9999 567 891</Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography component={Link} to="#" variant="body2" color="primary">
                                                                demo@company.com
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item sm={4}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <Typography variant="h5">Order Details :</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={4}>
                                                            <Typography variant="body2">Date :</Typography>
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            <Typography variant="body2">November 14</Typography>
                                                        </Grid>
                                                        <Grid item xs={4} sx={{ my: 0.5 }}>
                                                            <Typography variant="body2">Status :</Typography>
                                                        </Grid>
                                                        <Grid item xs={8} sx={{ my: 0.5 }}>
                                                            <Chip label="Pending" variant="outlined" size="small" chipcolor="warning" />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <Typography variant="body2">Order Id :</Typography>
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            <Typography variant="body2" component={Link} to="#">
                                                                #146859
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={classes.tableResponsive}>
                                        <Table className={classes.invoiceTable}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ pl: 3 }}>DESCRIPTION</TableCell>
                                                    <TableCell align="right">QUANTITY</TableCell>
                                                    <TableCell align="right">AMOUNT</TableCell>
                                                    <TableCell align="right" sx={{ pr: 3 }}>
                                                        TOTAL
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell sx={{ pl: 3 }}>
                                                            <Typography align="left" variant="subtitle1">
                                                                {row.product}
                                                            </Typography>
                                                            <Typography align="left" variant="body2">
                                                                {row.description}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="right">{row.quantity}</TableCell>
                                                        <TableCell align="right">{row.amount}</TableCell>
                                                        <TableCell align="right" sx={{ pr: 3 }}>
                                                            {row.total}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <SubCard contentClass={classes.totalBillAmount}>
                                        <Grid container justifyContent="flex-end" spacing={gridSpacing}>
                                            <Grid item sm={6} md={4}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={6}>
                                                                <Typography align="right" variant="subtitle1">
                                                                    Sub Total :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography align="right" variant="body2">
                                                                    $4725.00
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography align="right" variant="subtitle1">
                                                                    Taxes (10%) :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography align="right" variant="body2">
                                                                    $57.00
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography align="right" variant="subtitle1">
                                                                    Discount (5%) :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography align="right" variant="body2">
                                                                    $45.00
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Divider />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={6}>
                                                                <Typography align="right" color="primary" variant="subtitle1">
                                                                    Total :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography align="right" color="primary" variant="subtitle1">
                                                                    $4827.00
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="h6">Terms and Condition :</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2">
                                                lorem ipsum dolor sit connecter adieu siccing eliot, sed do elusion tempore incident ut
                                                laborer et dolors magna aliquot. Ut nim ad minim venin, quia nostrum exercitation ullages
                                                labors nisi ut aliquot ex ea commode consequent. Dui autre irusr dolor
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} md={10} lg={8}>
                        <Grid container spacing={1} justifyContent="center" className={classes.invoiceCard}>
                            <Grid item>
                                <AnimateButton>
                                    <ReactToPrint
                                        trigger={() => (
                                            <Button variant="contained" color="primary">
                                                Print
                                            </Button>
                                        )}
                                        content={() => componentRef.current}
                                    />
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </TabPanel>

            {/* tab - status */}
            <TabPanel value={value} index={2}>
                <SubCard title="ORDER STATUS">
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={6} lg={3}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} className={classes.statTitle}>
                                            <Typography variant="h5">Order Place Date</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2">10th Mar, 2021</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={2}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} className={classes.statTitle}>
                                            <Typography variant="h5">Order Status</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2">Processing</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} className={classes.statTitle}>
                                            <Typography variant="h5">Delivery Option</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2">Fedex Express Delivery</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} className={classes.statTitle}>
                                            <Typography variant="h5">Payment</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2">Credit Card</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={2}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} className={classes.statTitle}>
                                            <Typography variant="h5">Order Amount</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2">$90,020</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={8} lg={9}>
                            <Timeline className={classes.timeline}>
                                <TimelineItem>
                                    <TimelineOppositeContent>
                                        <Typography variant="h6">Order Placed</Typography>
                                        <Typography variant="body2">12 jun</Typography>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot color="primary" className={classes.timelineDot}>
                                            <FiberManualRecordIcon />
                                        </TimelineDot>
                                        <TimelineConnector className={classes.primaryTail} />
                                    </TimelineSeparator>
                                    <TimelineContent className={classes.orderDetails}>
                                        <List className={classes.orderDetailsBox}>
                                            <ListItem>
                                                <ListItemText primary="The order was validated." />
                                            </ListItem>
                                            <Divider />
                                            <ListItem>
                                                <ListItemText primary="The order was placed." />
                                            </ListItem>
                                            <Divider />
                                            <ListItem>
                                                <ListItemText primary="The order was placed." />
                                            </ListItem>
                                        </List>
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineOppositeContent>
                                        <Typography variant="h6">Order Processing</Typography>
                                        <Typography variant="body2">14 jun</Typography>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot color="primary" className={classes.timelineDot}>
                                            <FiberManualRecordIcon />
                                        </TimelineDot>
                                        <TimelineConnector className={classes.secondaryTail} />
                                    </TimelineSeparator>
                                    <TimelineContent className={classes.orderDetails}>
                                        <List className={classes.orderDetailsBox}>
                                            <ListItem>
                                                <ListItemText primary="Payment transaction [method: Credit Card, type: sale, amount: $90,020, status: Processing ]" />
                                            </ListItem>
                                        </List>
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineOppositeContent>
                                        <Typography variant="h6">Order Shipping</Typography>
                                        <Typography variant="body2">16 Jun</Typography>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot className={classes.timelineDot}>
                                            <FiberManualRecordIcon />
                                        </TimelineDot>
                                        <TimelineConnector className={classes.secondaryTail} />
                                    </TimelineSeparator>
                                    <TimelineContent className={classes.orderDetails}>
                                        <List className={classes.orderDetailsBox}>
                                            <ListItem>
                                                <ListItemText primary="Sent a notification to the client by e-mail." />
                                            </ListItem>
                                        </List>
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineOppositeContent>
                                        <Typography variant="h6">Order Delivered</Typography>
                                        <Typography variant="body2">17 Jun</Typography>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot className={classes.timelineDot}>
                                            <FiberManualRecordIcon />
                                        </TimelineDot>
                                        <TimelineConnector className={classes.secondaryTail} />
                                    </TimelineSeparator>
                                    <TimelineContent className={classes.orderDetails}>
                                        <List className={classes.orderDetailsBox}>
                                            <ListItem>
                                                <ListItemText primary="Order Delivered" />
                                            </ListItem>
                                        </List>
                                    </TimelineContent>
                                </TimelineItem>
                            </Timeline>
                            <Grid container spacing={1} justifyContent="center">
                                <Grid item>
                                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                                        <Button variant="contained" color="primary" onClick={handleClickOpenDialog}>
                                            Write a Review
                                        </Button>
                                        <Dialog
                                            open={open}
                                            TransitionComponent={Transition}
                                            keepMounted
                                            onClose={handleCloseDialog}
                                            className={classes.userAddDialog}
                                        >
                                            <DialogContent>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            id="outlined-basic1"
                                                            fullWidth
                                                            multiline
                                                            rows={10}
                                                            label="Write a Review"
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}></Grid>
                                                </Grid>
                                            </DialogContent>
                                            <DialogActions>
                                                <AnimateButton>
                                                    <Button variant="contained" color="primary">
                                                        Post Review
                                                    </Button>
                                                </AnimateButton>
                                                <Button variant="text" onClick={handleCloseDialog} color="secondary">
                                                    Close
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={4} lg={3}>
                            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="outlined-basic2"
                                            fullWidth
                                            multiline
                                            rows={10}
                                            label="Write a Review"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack direction="row">
                                            <AnimateButton>
                                                <Button variant="contained" color="primary">
                                                    Post Review
                                                </Button>
                                            </AnimateButton>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </SubCard>
            </TabPanel>
        </MainCard>
    );
};

export default OrderDetails;
