import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, CardMedia, Chip, Grid, Typography } from '@material-ui/core';

// project imports
import Avatar from './../extended/Avatar';
import { gridSpacing } from './../../store/constant';

// assets
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';

const avatarImage = require.context('./../../assets/images/profile', true);

// style constant
const useStyles = makeStyles((theme) => ({
    followerBlock: {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
        border: theme.palette.mode === 'dark' ? 'none' : '1px solid',
        borderColor: theme.palette.grey[100],
        textAlign: 'center'
    },
    profileAvatar: {
        width: '72px',
        height: '72px',
        margin: '-50px auto 0'
    },
    btnProfile: {
        width: '100%',
        borderRadius: '4px',
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
    }
}));

//-----------------------|| USER PROFILE CARD ||-----------------------//

const UserProfileCard = ({ avatar, name, profile, role, status }) => {
    const classes = useStyles();
    let avatarProfile = avatar && avatarImage(`./${avatar}`).default;
    let imageProfile = profile && avatarImage(`./${profile}`).default;

    const btnFacebook = [classes['btnProfile'], classes['facebook']];
    const btnTwitter = [classes['btnProfile'], classes['twitter']];
    const btnLinkedin = [classes['btnProfile'], classes['linkedin']];

    return (
        <Card className={classes.followerBlock}>
            <CardMedia component="img" image={imageProfile} title="Slider5 image" sx={{ height: '125px' }} />
            <CardContent sx={{ p: 2, pb: '16px !important' }}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Avatar alt={name} className={classes.profileAvatar} src={avatarProfile} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} alignItems="center">
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="h4">{name}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2">{role}</Typography>
                            </Grid>
                            <Grid item xs={12}>
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
                                <Button variant="text" color="primary" className={btnFacebook.join(' ')}>
                                    <FacebookIcon />
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="text" color="secondary" className={btnTwitter.join(' ')}>
                                    <TwitterIcon />
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="text" color="secondary" className={btnLinkedin.join(' ')}>
                                    <LinkedInIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" color="primary" className={classes.btnProfile} startIcon={<ChatBubbleTwoToneIcon />}>
                            Message
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

UserProfileCard.propTypes = {
    avatar: PropTypes.string,
    name: PropTypes.string,
    profile: PropTypes.string,
    role: PropTypes.string,
    status: PropTypes.string
};

export default UserProfileCard;
