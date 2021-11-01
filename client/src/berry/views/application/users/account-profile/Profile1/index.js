import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Tab, Tabs } from '@material-ui/core';

// project imports
import Profile from './Profile';
import PersonalAccount from './PersonalAccount';
import MyAccount from './MyAccount';
import ChangePassword from './ChangePassword';
import Settings from './Settings';
import MainCard from '../../../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../../../store/constant';

// assets
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import LibraryBooksTwoToneIcon from '@material-ui/icons/LibraryBooksTwoTone';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import MailTwoToneIcon from '@material-ui/icons/MailTwoTone';

const useStyles = makeStyles((theme) => ({
    accountTab: {
        marginBottom: '24px',
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
    }
}));

// tabs panel
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box p={0}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// tabs option
const tabsOption = [
    {
        label: 'Profile',
        icon: <AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Personal Details',
        icon: <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'My Account',
        icon: <LibraryBooksTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Change Password',
        icon: <LockTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Settings',
        icon: <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    }
];

//-----------------------|| PROFILE 1 ||-----------------------//

const Profile1 = () => {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        className={classes.accountTab}
                        aria-label="simple tabs example"
                        variant="scrollable"
                    >
                        {tabsOption.map((tab, index) => (
                            <Tab key={index} component={Link} to="#" icon={tab.icon} label={tab.label} {...a11yProps(index)} />
                        ))}
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <Profile />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <PersonalAccount />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <MyAccount />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <ChangePassword />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <Settings />
                    </TabPanel>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Profile1;
