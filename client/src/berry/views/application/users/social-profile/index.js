import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, CardMedia, Grid, Tab, Tabs, Typography } from '@material-ui/core';

// project imports
import Profile from './Profile';
import Followers from './Followers';
import Friends from './Friends';
import Gallery from './Gallery';
import FriendRequest from './FriendRequest';
import Avatar from './../../../../ui-component/extended/Avatar';
import Chip from './../../../../ui-component/extended/Chip';
import MainCard from './../../../../ui-component/cards/MainCard';
import ImagePlaceholder from './../../../../ui-component/cards/Skeleton/ImagePlaceholder';
import { gridSpacing } from './../../../../store/constant';

// assets
import { IconFriends, IconInbox, IconPhoto, IconUserPlus, IconUsers } from '@tabler/icons';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';

import User1 from './../../../../assets/images/profile/img-user.png';
import Cover from './../../../../assets/images/profile/img-profile-bg.png';

// style constant
const useStyles = makeStyles((theme) => ({
    userTopContent: {
        padding: '12px',
        paddingBottom: '0px !important',
        [theme.breakpoints.down('md')]: {
            textAlign: 'center'
        }
    },
    userAvatar: {
        margin: '-70px 0 0 auto',
        borderRadius: '16px',
        [theme.breakpoints.down('md')]: {
            margin: '-70px auto 0'
        },
        [theme.breakpoints.down('sm')]: {
            margin: '-60px auto 0'
        }
    },
    userProfileTabs: {
        marginTop: '20px',
        '& .MuiTabs-flexContainer': {
            border: 'none'
        },
        '& a': {
            minHeight: 'auto',
            minWidth: '10px',
            padding: '12px 8px',
            marginRight: '18px',
            color: theme.palette.grey[700]
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
            marginBottom: '4px !important',
            marginRight: '10px'
        },
        '& a > span > span + svg': {
            margin: '0px 0px 0px auto !important',
            width: '14px',
            height: '14px'
        }
    },
    btnCover: {
        justifyContent: 'flex-end',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center'
        }
    }
}));

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

const tabOptions = [
    {
        to: '/user/social-profile/posts',
        icon: <IconInbox stroke={1.5} size="1.1rem" />,
        label: 'Profile'
    },
    {
        to: '/user/social-profile/follower',
        icon: <IconUsers stroke={1.5} size="1.1rem" />,
        label: 'Followers'
    },
    {
        to: '/user/social-profile/friends',
        icon: <IconFriends stroke={1.5} size="1.1rem" />,
        label: (
            <React.Fragment>
                friends <Chip label="100" size="small" chipcolor="secondary" sx={{ ml: 1.5 }} />
            </React.Fragment>
        )
    },
    {
        to: '/user/social-profile/gallery',
        icon: <IconPhoto stroke={1.5} size="1.1rem" />,
        label: 'Gallery'
    },
    {
        to: '/user/social-profile/friend-request',
        icon: <IconUserPlus stroke={1.5} size="1.1rem" />,
        label: 'Friend Request'
    }
];

//-----------------------|| SOCIAL PROFILE ||-----------------------//

const SocialProfile = () => {
    const classes = useStyles();
    const customization = useSelector((state) => state.customization);

    const { tab } = useParams();
    let selectedTab = 0;
    switch (tab) {
        case 'follower':
            selectedTab = 1;
            break;
        case 'friends':
            selectedTab = 2;
            break;
        case 'gallery':
            selectedTab = 3;
            break;
        case 'friend-request':
            selectedTab = 4;
            break;
        case 'posts':
        default:
            selectedTab = 0;
    }
    const [value, setValue] = React.useState(selectedTab);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard contentClass={classes.userTopContent}>
                    {isLoading ? (
                        <ImagePlaceholder
                            sx={{
                                borderRadius: customization.borderRadius + 'px',
                                overflow: 'hidden',
                                mb: 3,
                                height: { xs: '85px', sm: '150px', md: '260px' }
                            }}
                        />
                    ) : (
                        <CardMedia
                            component="img"
                            image={Cover}
                            sx={{ borderRadius: customization.borderRadius + 'px', overflow: 'hidden', mb: 3 }}
                        />
                    )}
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={3}>
                            {isLoading ? (
                                <ImagePlaceholder
                                    className={classes.userAvatar}
                                    sx={{
                                        width: { xs: '72px', sm: '100px', md: '140px' },
                                        height: { xs: '72px', sm: '100px', md: '140px' }
                                    }}
                                />
                            ) : (
                                <Avatar
                                    alt="User 1"
                                    src={User1}
                                    className={classes.userAvatar}
                                    sx={{
                                        width: { xs: '72px', sm: '100px', md: '140px' },
                                        height: { xs: '72px', sm: '100px', md: '140px' }
                                    }}
                                />
                            )}
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} md={4}>
                                    <Typography variant="h5">John Doe123</Typography>
                                    <Typography variant="subtitle2">Android Developer</Typography>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <Grid container spacing={1} className={classes.btnCover}>
                                        <Grid item>
                                            <Button variant="outlined" color="primary">
                                                Message
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" color="primary" startIcon={<PersonAddTwoToneIcon />}>
                                                Send Request
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="flex-end">
                                <Tabs value={value} variant="scrollable" onChange={handleChange} className={classes.userProfileTabs}>
                                    {tabOptions.map((tab, index) => (
                                        <Tab
                                            key={index}
                                            component={RouterLink}
                                            to={tab.to}
                                            icon={tab.icon}
                                            label={tab.label}
                                            {...a11yProps(index)}
                                        />
                                    ))}
                                </Tabs>
                            </Grid>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
            <Grid item xs={12}>
                <TabPanel value={value} index={0}>
                    <Profile />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Followers />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Friends />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Gallery />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <FriendRequest />
                </TabPanel>
            </Grid>
        </Grid>
    );
};

export default SocialProfile;
