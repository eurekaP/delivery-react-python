import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Box, Tab, Tabs } from '@material-ui/core';

// project imports
import Profile from './Profile';
import Billing from './Billing';
import Security from './Security';
import Notifications from './Notifications';
import MainCard from './../../../../../ui-component/cards/MainCard';

// style constant
const useStyles = makeStyles((theme) => ({
    accountTab: {
        marginBottom: '24px',
        '& button': {
            minWidth: '100px'
        },
        '& a': {
            minHeight: 'auto',
            minWidth: '10px',
            padding: '12px 8px',
            marginRight: '18px',
            color: theme.palette.grey[600]
        },
        '& a.Mui-selected': {
            color: theme.palette.primary.main
        }
    }
}));

// tabs
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

//-----------------------|| PROFILE 3 ||-----------------------//

const Profile3 = () => {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MainCard title="Account">
            <div className={classes.root}>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    onChange={handleChange}
                    className={classes.accountTab}
                    aria-label="simple tabs example"
                    variant="scrollable"
                >
                    <Tab component={RouterLink} to="#" label="Profile" {...a11yProps(0)} />
                    <Tab component={RouterLink} to="#" label="Billing" {...a11yProps(1)} />
                    <Tab component={RouterLink} to="#" label="Security" {...a11yProps(2)} />
                    <Tab component={RouterLink} to="#" label="Notifications" {...a11yProps(3)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Profile />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Billing />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Security />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Notifications />
                </TabPanel>
            </div>
        </MainCard>
    );
};

export default Profile3;
