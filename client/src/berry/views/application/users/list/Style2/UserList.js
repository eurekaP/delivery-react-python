import React from 'react';

// material-ui
import {
    AvatarGroup,
    Button,
    Grid,
    LinearProgress,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography
} from '@material-ui/core';

// project imports
import Avatar from './../../../../../ui-component/extended/Avatar';
import { gridSpacing } from './../../../../../store/constant';

// asset
import Avatar1 from './../../../../../assets/images/users/avatar-1.png';
import Avatar2 from './../../../../../assets/images/users/avatar-2.png';
import Avatar3 from './../../../../../assets/images/users/avatar-3.png';
import Avatar4 from './../../../../../assets/images/users/avatar-4.png';
import Avatar5 from './../../../../../assets/images/users/avatar-5.png';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';
import BlockTwoToneIcon from '@material-ui/icons/BlockTwoTone';

const useStyles = makeStyles((theme) => ({
    successBadge: {
        color: theme.palette.success.dark,
        width: '14px',
        height: '14px'
    },
    tableAvatar: {
        width: '60px',
        height: '60px'
    },
    btnTable: {
        borderRadius: '4px',
        paddingLeft: '4px',
        paddingRight: '4px',
        width: '100%',
        minWidth: '120px',
        '&:hover': {
            background: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
            color: '#fff'
        }
    },
    tableResponsive: {
        overflowX: 'auto'
    },
    profileTable: {
        '& td': {
            whiteSpace: 'nowrap'
        },
        '& td:first-child': {
            paddingLeft: '0px'
        },
        '& td:last-child': {
            paddingRight: '0px',
            minWidth: '260px'
        },
        '& tbody tr:last-child  td': {
            borderBottom: 'none'
        },
        [theme.breakpoints.down('lg')]: {
            '& tr:not(:last-child)': {
                borderBottom: '1px solid',
                borderBottomColor: theme.palette.mode === 'dark' ? 'rgb(132, 146, 196, .2)' : 'rgba(224, 224, 224, 1)'
            },
            '& td': {
                display: 'inline-block',
                borderBottom: 'none',
                paddingLeft: '0px'
            },
            '& td:first-child': {
                display: 'block'
            }
        }
    },
    tableSubContent: {
        whiteSpace: 'break-spaces'
    }
}));

// table data
function createData(image, name, designation, badgeStatus, subContent, email, phone, location, progressValue) {
    return { image, name, designation, badgeStatus, subContent, email, phone, location, progressValue };
}

const rows = [
    createData(
        Avatar1,
        'Elnora',
        'Lead Marketing Facilitator',
        'active',
        'We need to generate the virtual CSS hard drive!',
        'Reid_OConnell4@yahoo.com',
        '506-654-1653',
        'Saucerize',
        '78%'
    ),
    createData(
        Avatar2,
        'Hirohito',
        'Investor Creative Liaison',
        'active',
        'If we synthesize the protocol, we can get to the RSS circuit through.',
        'Conner22@hotmail.com',
        '673-157-1670',
        'Port Narcos',
        '78%'
    ),
    createData(
        Avatar3,
        'Kathie',
        'Human Accountability Strategist',
        'inactive',
        'We need to generate the virtual CSS hard drive!',
        'Dangelo40@company.com',
        '506-654-1653',
        'Saucerize',
        '78%'
    )
];

//-----------------------|| USER LIST 2 ||-----------------------//

const UserCard = () => {
    const classes = useStyles();
    return (
        <div className={classes.tableResponsive}>
            <Table className={classes.profileTable}>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <Avatar alt="User 1" src={row.image} className={classes.tableAvatar} />
                                    </Grid>
                                    <Grid item sm zeroMinWidth>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <Typography align="left" variant="subtitle1">
                                                    {row.name}{' '}
                                                    {row.badgeStatus === 'active' && <CheckCircleIcon className={classes.successBadge} />}
                                                </Typography>
                                                <Typography align="left" variant="subtitle2" className={classes.tableSubContent}>
                                                    {row.designation}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography align="left" variant="body2" className={classes.tableSubContent}>
                                                    {row.subContent}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </TableCell>
                            <TableCell>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="caption">Email</Typography>
                                        <Typography variant="h6">{row.email}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="caption">Phone</Typography>
                                        <Typography variant="h6">{row.phone}</Typography>
                                    </Grid>
                                </Grid>
                            </TableCell>
                            <TableCell>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="caption">Location</Typography>
                                        <Typography variant="h6">{row.location}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <AvatarGroup
                                                max={4}
                                                size="small"
                                                sx={{
                                                    '& .MuiAvatar-root.MuiAvatarGroup-avatar': {
                                                        width: '32px',
                                                        height: '32px',
                                                        fontSize: '1rem'
                                                    }
                                                }}
                                            >
                                                <Avatar alt="User 1" src={Avatar1} />
                                                <Avatar alt="User 2" src={Avatar2} />
                                                <Avatar alt="User 3" src={Avatar3} />
                                                <Avatar alt="User 4" src={Avatar4} />
                                                <Avatar alt="User 5" src={Avatar5} />
                                            </AvatarGroup>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </TableCell>
                            <TableCell>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" spacing={gridSpacing}>
                                            <Grid item>
                                                <Typography variant="caption">Progress</Typography>
                                            </Grid>
                                            <Grid item sm zeroMinWidth>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={56}
                                                    color="primary"
                                                    sx={{ minWidth: '90px' }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="h6" component="div">
                                                    {row.progressValue}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} container spacing={1}>
                                        <Grid item xs={6}>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                                className={classes.btnTable}
                                                startIcon={<ChatBubbleTwoToneIcon />}
                                            >
                                                Message
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                className={classes.btnTable}
                                                startIcon={<BlockTwoToneIcon />}
                                            >
                                                Block
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UserCard;
