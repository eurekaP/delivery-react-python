import React from 'react';

// material-ui
import {
    Box,
    Button,
    CardContent,
    Chip,
    Divider,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from '@material-ui/core';

// project imports
import Avatar from '../../../../../ui-component/extended/Avatar';
import SubCard from './../../../../../ui-component/cards/SubCard';
import { gridSpacing } from '../../../../../store/constant';

// assets
import { IconEdit } from '@tabler/icons';
import PhonelinkRingTwoToneIcon from '@material-ui/icons/PhonelinkRingTwoTone';
import PinDropTwoToneIcon from '@material-ui/icons/PinDropTwoTone';
import MailTwoToneIcon from '@material-ui/icons/MailTwoTone';

import Avatar3 from './../../../../../assets/images/users/avatar-3.png';

// progress
function LinearProgressWithLabel(props) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

// personal details table
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Full Name', ':', 'Anshan Handgun'),
    createData('Fathers Name', ':', 'Mr. Deepen Handgun'),
    createData('Address', ':', 'Street 110-B Kalians Bag, Dewan, M.P. INDIA'),
    createData('Zip Code', ':', '12345'),
    createData('Phone', ':', '+0 123456789 , +0 123456789'),
    createData('Email', ':', 'support@example.com'),
    createData('Website', ':', 'http://example.com')
];

//-----------------------|| PROFILE 1 - PROFILE ||-----------------------//

const Profile = () => {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item lg={4} xs={12}>
                <SubCard
                    title={
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Avatar alt="User 1" src={Avatar3} />
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Typography align="left" variant="subtitle1">
                                    Suzan
                                </Typography>
                                <Typography align="left" variant="subtitle2">
                                    UI/UX Designer
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Chip size="small" label="Pro" color="primary" />
                            </Grid>
                        </Grid>
                    }
                >
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button>
                            <ListItemIcon>
                                <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="subtitle1">Email</Typography>} />
                            <ListItemSecondaryAction>
                                <Typography variant="subtitle2" align="right">
                                    demo@sample.com
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <PhonelinkRingTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="subtitle1">Phone</Typography>} />
                            <ListItemSecondaryAction>
                                <Typography variant="subtitle2" align="right">
                                    (+99) 9999 999 999
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <PinDropTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="subtitle1">Location</Typography>} />
                            <ListItemSecondaryAction>
                                <Typography variant="subtitle2" align="right">
                                    Melbourne
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                    <CardContent>
                        <Grid container spacing={0}>
                            <Grid item xs={4}>
                                <Typography align="center" variant="h3">
                                    37
                                </Typography>
                                <Typography align="center" variant="subtitle2">
                                    Mails
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography align="center" variant="h3">
                                    2749
                                </Typography>
                                <Typography align="center" variant="subtitle2">
                                    Followers
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography align="center" variant="h3">
                                    678
                                </Typography>
                                <Typography align="center" variant="subtitle2">
                                    Following
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </SubCard>
            </Grid>
            <Grid item lg={8} xs={12}>
                <Grid container direction="column" spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <SubCard
                            title="About me"
                            secondary={
                                <Button>
                                    <IconEdit stroke={1.5} size="1.3rem" />
                                </Button>
                            }
                        >
                            <Grid container direction="column" spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                        Hello,I’m Anshan Handgun Creative Graphic Designer & User Experience Designer based in Website, I
                                        create digital Products a more Beautiful and usable place. Morbid accusant ipsum. Nam nec tellus at.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1">Personal Details</Typography>
                                </Grid>
                                <Divider sx={{ pt: 1 }} />
                                <Grid item xs={12}>
                                    <TableContainer>
                                        <Table
                                            sx={{
                                                '& td': {
                                                    borderBottom: 'none'
                                                }
                                            }}
                                            size="small"
                                        >
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow key={row.name}>
                                                        <TableCell variant="head">{row.name}</TableCell>
                                                        <TableCell>{row.calories}</TableCell>
                                                        <TableCell>{row.fat}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12}>
                        <SubCard title="Education">
                            <Grid container direction="column" spacing={1}>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={12} sm={4}>
                                            <Typography variant="subtitle1">2014-2017</Typography>
                                            <Typography variant="subtitle2">Master Degree</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <Typography variant="subtitle1">Master Degree in Computer Application</Typography>
                                            <Typography variant="subtitle2">University of Oxford, England</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                </Box>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={12} sm={4}>
                                            <Typography variant="subtitle1">2011-2013</Typography>
                                            <Typography variant="subtitle2">Bachelor</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <Typography variant="subtitle1">Bachelor Degree in Computer Engineering</Typography>
                                            <Typography variant="subtitle2">Imperial College London</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                </Box>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={12} sm={4}>
                                            <Typography variant="subtitle1">2009-2011</Typography>
                                            <Typography variant="subtitle2">School</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <Typography variant="subtitle1">Higher Secondary Education</Typography>
                                            <Typography variant="subtitle2">School of London, England</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12}>
                        <SubCard title="Employment">
                            <Grid container direction="column" spacing={2}>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={12} sm={4}>
                                            <Typography variant="subtitle1">Current</Typography>
                                            <Typography variant="subtitle2">Senior</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <Typography variant="subtitle1">Senior UI/UX designer</Typography>
                                            <Typography variant="subtitle2">
                                                Perform task related to project manager with the 100+ team under my observation. Team
                                                management is key role in this company.
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                </Box>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={12} sm={4}>
                                            <Typography variant="subtitle1">2017-2019</Typography>
                                            <Typography variant="subtitle2">Junior</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <Typography variant="subtitle1">Trainee cum Project Manager</Typography>
                                            <Typography variant="subtitle2">Microsoft, TX, USA</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12}>
                        <SubCard title="Skills">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body2">Junior</Typography>
                                    <LinearProgressWithLabel color="primary" variant="determinate" value={70} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body2">UX Researcher</Typography>
                                    <LinearProgressWithLabel color="primary" variant="determinate" value={80} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body2">Wordpress</Typography>
                                    <LinearProgressWithLabel color="secondary" variant="determinate" value={25} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body2">Graphic Designer</Typography>
                                    <LinearProgressWithLabel color="primary" variant="determinate" value={80} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body2">HTML</Typography>
                                    <LinearProgressWithLabel color="secondary" variant="determinate" value={45} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body2">PHP</Typography>
                                    <LinearProgressWithLabel color="primary" variant="determinate" value={65} />
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Profile;
