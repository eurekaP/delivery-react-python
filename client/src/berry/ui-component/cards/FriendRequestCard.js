import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Card, Grid, ListItemIcon, Menu, MenuItem, Typography } from '@material-ui/core';

//project import
import { gridSpacing } from './../../store/constant';

// assets
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import GroupTwoToneIcon from '@material-ui/icons/GroupTwoTone';

const avatarImage = require.context('./../../assets/images/profile', true);

// style constant
const useStyles = makeStyles((theme) => ({
    followerBlock: {
        padding: '16px',
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[100],
        '&:hover': {
            border: '1px solid' + theme.palette.primary.main
        }
    },
    primaryLight: {
        color: theme.palette.primary[200],
        cursor: 'pointer'
    },
    btnProfile: {
        width: '100%',
        borderRadius: '4px',
        background: '#fff',
        borderColor: '#EDE7F6',
        '&:hover': {
            borderColor: 'transparent'
        },
        '& svg': {
            width: '25px',
            height: '25px'
        }
    },
    bgError: {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.background.paper,
        borderColor: theme.palette.mode === 'dark' && theme.palette.dark.dark,
        '&:hover': {
            background: theme.palette.error.light,
            color: theme.palette.background.paper
        }
    },
    bgPrimary: {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.background.paper,
        borderColor: theme.palette.mode === 'dark' && theme.palette.dark.dark,
        '&:hover': {
            background: theme.palette.primary.light
        }
    }
}));

//-----------------------|| SOCIAL PROFILE - FRIEND REQUEST CARD ||-----------------------//

const FriendRequestCard = ({ avatar, name, mutual }) => {
    const classes = useStyles();
    let avatarProfile = avatar && avatarImage(`./${avatar}`).default;

    const errorActive = [classes['btnProfile'], classes['bgError']];
    const primaryActive = [classes['btnProfile'], classes['bgPrimary']];

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card className={classes.followerBlock}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item>
                            <Avatar alt="User 1" src={avatarProfile} />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography
                                variant="h5"
                                sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                            >
                                {name}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                sx={{ mt: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                            >
                                {mutual} mutual friends
                            </Typography>
                        </Grid>
                        <Grid item>
                            <MoreHorizOutlinedIcon
                                fontSize="small"
                                className={classes.primaryLight}
                                aria-controls="menu-friend-card"
                                aria-haspopup="true"
                                onClick={handleClick}
                            />
                            <Menu
                                id="menu-friend-card"
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
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <FavoriteTwoToneIcon fontSize="small" />
                                    </ListItemIcon>
                                    Favorites
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <GroupTwoToneIcon fontSize="small" />
                                    </ListItemIcon>
                                    Edit Friend List
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <DeleteTwoToneIcon fontSize="small" />
                                    </ListItemIcon>
                                    Unfriend
                                </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Button variant="outlined" color="primary" className={primaryActive.join(' ')}>
                                Confirm
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="outlined" color="error" className={errorActive.join(' ')}>
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

FriendRequestCard.propTypes = {
    avatar: PropTypes.string,
    mutual: PropTypes.number,
    name: PropTypes.string
};

export default FriendRequestCard;
