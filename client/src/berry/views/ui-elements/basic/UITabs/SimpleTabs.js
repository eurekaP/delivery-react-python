import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Box, Chip, Tab, Tabs, Typography } from '@material-ui/core';

// assets
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import PanoramaTwoToneIcon from '@material-ui/icons/PanoramaTwoTone';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import RecentActorsTwoToneIcon from '@material-ui/icons/RecentActorsTwoTone';

// tab content
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
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

// style constant
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
    },
    badgeSecondary: {
        color: theme.palette.secondary.main,
        background: theme.palette.secondary.light,
        marginLeft: '10px'
    }
}));

//================================|| UI TABS - SAMPLE ||================================//

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <Tabs value={value} variant="scrollable" onChange={handleChange} className={classes.accountTab}>
                <Tab
                    component={RouterLink}
                    to="#"
                    icon={<PersonOutlineTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                    label="Profile"
                    {...a11yProps(0)}
                />
                <Tab
                    component={RouterLink}
                    to="#"
                    icon={<RecentActorsTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                    label="followers"
                    {...a11yProps(1)}
                />
                <Tab
                    component={RouterLink}
                    to="#"
                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                    label={
                        <React.Fragment>
                            friends <Chip label="01" size="small" className={classes.badgeSecondary} />
                        </React.Fragment>
                    }
                    {...a11yProps(2)}
                ></Tab>
                <Tab
                    component={RouterLink}
                    to="#"
                    icon={<PanoramaTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                    label="Gallery"
                    {...a11yProps(3)}
                />
            </Tabs>
            <TabPanel value={value} index={0}>
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch.
            </TabPanel>
            <TabPanel value={value} index={1}>
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch.
            </TabPanel>
            <TabPanel value={value} index={2}>
                Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
            </TabPanel>
            <TabPanel value={value} index={3}>
                Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
                vice lomo. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
            </TabPanel>
        </React.Fragment>
    );
}
