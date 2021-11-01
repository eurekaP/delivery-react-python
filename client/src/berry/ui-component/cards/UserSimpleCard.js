import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, Chip, Grid, Menu, MenuItem, Typography } from '@material-ui/core';

// project imports
import Avatar from './../extended/Avatar';
import { gridSpacing } from './../../store/constant';

// assets
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const avatarImage = require.context('./../../assets/images/profile', true);

// style constant
const useStyles = makeStyles((theme) => ({
    followerBlock: {
        padding: '16px',
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? 'transparent' : theme.palette.grey[100],
        '&:hover': {
            border: '1px solid' + theme.palette.primary.main
        }
    },
    primaryLight: {
        color: theme.palette.grey[500],
        cursor: 'pointer'
    },
    btnProfile: {
        width: '100%',
        borderRadius: '4px',
        minWidth: '40px',
        transition: 'all .3s ease-in-out',
        '& svg': {
            width: '20px',
            height: '20px',
            margin: '4px 0px',
            transition: 'all .3s ease-in-out'
        }
    },
    facebook: {
        background: 'rgba(66, 103, 178, 0.2)',
        '& svg': {
            color: '#4267B2'
        },
        '&:hover': {
            background: '#4267B2',
            '& svg': {
                color: '#fff'
            }
        }
    },
    twitter: {
        background: 'rgba(29, 161, 242, 0.2)',
        '& svg': {
            color: '#1DA1F2'
        },
        '&:hover': {
            background: '#1DA1F2',
            '& svg': {
                color: '#fff'
            }
        }
    },
    linkedin: {
        background: 'rgba(14, 118, 168, 0.12)',
        '& svg': {
            color: '#0E76A8'
        },
        '&:hover': {
            background: '#0E76A8',
            '& svg': {
                color: '#fff'
            }
        }
    },
    active: {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.success.light,
        color: theme.palette.success.dark
    },
    reject: {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.error.light,
        color: theme.palette.error.dark
    },
    avatarBig: {
        width: '72px',
        height: '72px'
    }
}));

//-----------------------|| USER SIMPLE CARD ||-----------------------//

const UserSimpleCard = ({ avatar, name, status }) => {
    const classes = useStyles();
    let avatarProfile = avatar && avatarImage(`./${avatar}`).default;

    const btnFacebook = [classes['btnProfile'], classes['facebook']];
    const btnTwitter = [classes['btnProfile'], classes['twitter']];
    const btnLinkedin = [classes['btnProfile'], classes['linkedin']];

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
                            <Avatar alt={name} className={classes.avatarBig} src={avatarProfile} />
                        </Grid>
                        <Grid item>
                            <MoreHorizOutlinedIcon
                                fontSize="small"
                                className={classes.primaryLight}
                                aria-controls="menu-simple-card"
                                aria-haspopup="true"
                                onClick={handleClick}
                            />
                            <Menu
                                id="menu-simple-card"
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
                <Grid item xs={12} alignItems="center">
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs zeroMinWidth>
                            <Typography variant="h4">{name}</Typography>
                        </Grid>
                        <Grid item>
                            {status === 'Active' ? (
                                <Chip label="Active" size="small" className={classes.active} />
                            ) : (
                                <Chip label="Rejected" size="small" className={classes.reject} />
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Button variant="text" color="primary" size="small" className={btnFacebook.join(' ')}>
                                <FacebookIcon />
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="text" color="secondary" size="small" className={btnTwitter.join(' ')}>
                                <TwitterIcon />
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="text" color="secondary" size="small" className={btnLinkedin.join(' ')}>
                                <LinkedInIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

UserSimpleCard.propTypes = {
    avatar: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string
};

export default UserSimpleCard;
