import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, Grid, Menu, MenuItem, Typography } from '@material-ui/core';

// project card
import { gridSpacing } from './../../store/constant';
import Avatar from './../extended/Avatar';

// assets
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import NotInterestedTwoToneIcon from '@material-ui/icons/NotInterestedTwoTone';
import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';

const avatarImage = require.context('./../../assets/images/profile', true);

// style card
const useStyles = makeStyles((theme) => ({
    followerBlock: {
        padding: '16px',
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
        border: theme.palette.mode === 'dark' ? '1px solid transparent' : '1px solid' + theme.palette.grey[100],
        '&:hover': {
            borderColor: theme.palette.primary.main
        }
    },
    primaryLight: {
        color: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[500],
        cursor: 'pointer'
    },
    btnProfile: {
        width: '100%',
        '&:hover ': {
            color: '#fff'
        },
        '&.MuiButton-outlinedPrimary:hover ': {
            background: theme.palette.primary.main
        },
        '&.MuiButton-outlinedSecondary': {
            color: theme.palette.error.main,
            borderColor: theme.palette.error.main
        },
        '&.MuiButton-outlinedSecondary:hover ': {
            background: theme.palette.error.main,
            color: '#fff'
        }
    }
}));

//-----------------------|| USER DETAILS CARD ||-----------------------//

const UserDetailsCard = ({ about, avatar, contact, email, location, name, role }) => {
    const classes = useStyles();
    let avatarProfile = avatar && avatarImage(`./${avatar}`).default;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card className={classes.followerBlock}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs zeroMinWidth>
                            <Avatar alt={name} size="lg" src={avatarProfile} />
                        </Grid>
                        <Grid item>
                            <MoreHorizOutlinedIcon
                                fontSize="small"
                                className={classes.primaryLight}
                                aria-controls="menu-user-details-card"
                                aria-haspopup="true"
                                onClick={handleClick}
                            />
                            <Menu
                                id="menu-user-details-card"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                variant="selectedMenu"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                            >
                                <MenuItem onClick={handleClose}>Edit</MenuItem>
                                <MenuItem onClick={handleClose}>Delete</MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h3" component="div">
                        {name}
                    </Typography>
                    <Typography variant="caption">{role}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ color: 'grey.700' }}>
                        {about}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption">Email</Typography>
                    <Typography variant="h6">{email}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={6}>
                            <Typography variant="caption">Phone</Typography>
                            <Typography variant="h6">{contact}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="caption">Location</Typography>
                            <Typography variant="h6">{location}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Button variant="outlined" color="primary" className={classes.btnProfile} startIcon={<ChatBubbleTwoToneIcon />}>
                                Message
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                className={classes.btnProfile}
                                startIcon={<NotInterestedTwoToneIcon />}
                            >
                                Block
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

UserDetailsCard.propTypes = {
    about: PropTypes.string,
    avatar: PropTypes.string,
    contact: PropTypes.string,
    email: PropTypes.string,
    location: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string
};

export default UserDetailsCard;
