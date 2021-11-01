import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Card, Grid, ListItemIcon, Menu, MenuItem, Typography } from '@material-ui/core';

// assets
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import PinDropTwoToneIcon from '@material-ui/icons/PinDropTwoTone';

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
    btnBlock: {
        width: '100%'
    }
}));

//-----------------------|| SOCIAL PROFILE - FOLLOWER CARD ||-----------------------//

const FollowerCard = ({ avatar, follow, location, name }) => {
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
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Avatar alt="User 1" src={avatarProfile} />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                            >
                                {name}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                sx={{ mt: 0.25, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                            >
                                <PinDropTwoToneIcon sx={{ mr: '6px', fontSize: '16px', verticalAlign: 'text-top' }} />
                                {location}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <MoreHorizOutlinedIcon
                                fontSize="small"
                                className={classes.primaryLight}
                                aria-controls="menu-followers-card"
                                aria-haspopup="true"
                                onClick={handleClick}
                            />
                            <Menu
                                id="menu-followers-card"
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
                                    Removed
                                </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {follow === 2 ? (
                        <Button variant="contained" color="primary" className={classes.btnBlock} startIcon={<PersonAddTwoToneIcon />}>
                            Follow Back
                        </Button>
                    ) : (
                        <Button variant="outlined" color="primary" className={classes.btnBlock} startIcon={<PeopleAltTwoToneIcon />}>
                            Followed
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Card>
    );
};

FollowerCard.propTypes = {
    avatar: PropTypes.string,
    follow: PropTypes.number,
    location: PropTypes.string,
    name: PropTypes.string
};

export default FollowerCard;
