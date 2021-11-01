import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, ButtonBase, Card, Grid, Menu, MenuItem, Stack, Typography } from '@material-ui/core';

// project imports
import Avatar from './../../../../../ui-component/extended/Avatar';

// assets
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import MoreVertTwoToneIcon from '@material-ui/icons/MoreVertTwoTone';
import ThumbUpAltTwoToneIcon from '@material-ui/icons/ThumbUpAltTwoTone';
import ReplyTwoToneIcon from '@material-ui/icons/ReplyTwoTone';

const avatarImage = require.context('./../../../../../assets/images/profile', true);

// style constant
const useStyles = makeStyles((theme) => ({
    textSecondary: {
        color: theme.palette.secondary.main
    },
    avatarRight: {
        ...theme.typography.commonAvatar,
        ...theme.typography.smallAvatar,
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
        color: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.secondary.dark,
        zIndex: 1,
        transition: 'all .2s ease-in-out',
        '&[aria-controls="menu-list-grow"],&:hover': {
            background: theme.palette.secondary.main,
            color: theme.palette.secondary.light
        }
    },
    profileComment: {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
        padding: '16px 16px 8px',
        marginTop: '10px'
    },
    commentLevel1: {
        marginLeft: '50px'
    }
}));

//-----------------------|| POST & COMMENT - REPLAY ||-----------------------//

const Reply = ({ commentId, handleReplayLikes, onReply, postId, reply }) => {
    const classes = useStyles();
    const theme = useTheme();
    const { id } = reply;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const replies = reply;

    return (
        <React.Fragment>
            {Object.keys(replies).length > 0 && (
                <Grid item xs={12}>
                    <div className={classes.commentLevel1}>
                        <Card className={classes.profileComment}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Grid container wrap="nowrap" alignItems="center" spacing={1}>
                                        <Grid item>
                                            <Avatar
                                                sx={{ width: 24, height: 24 }}
                                                size="small"
                                                alt="User 1"
                                                src={
                                                    replies.profile &&
                                                    replies.profile.avatar &&
                                                    avatarImage(`./${replies.profile.avatar}`).default
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Grid container alignItems="center" spacing={1}>
                                                <Grid item>
                                                    <Typography align="left" variant="h5" component="div">
                                                        {replies.profile.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography align="left" variant="caption">
                                                        <FiberManualRecordIcon
                                                            sx={{ width: '10px', height: '10px', opacity: 0.5, m: '0 5px' }}
                                                        />{' '}
                                                        {replies.profile.time}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item className={classes.textActive}>
                                            <ButtonBase sx={{ borderRadius: '12px' }} onClick={handleClick}>
                                                <Avatar
                                                    variant="rounded"
                                                    className={classes.avatarRight}
                                                    aria-controls="menu-comment-reply"
                                                    aria-haspopup="true"
                                                >
                                                    <MoreVertTwoToneIcon fontSize="inherit" />
                                                </Avatar>
                                            </ButtonBase>
                                            <Menu
                                                id="menu-comment-reply"
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
                                    <Typography align="left" variant="body2">
                                        {replies.data.comment}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        sx={{ color: theme.palette.mode === 'dark' ? 'grey.700' : 'grey.800' }}
                                    >
                                        <Button
                                            onClick={() => handleReplayLikes(postId, commentId, id)}
                                            variant="text"
                                            color="inherit"
                                            size="small"
                                            startIcon={
                                                <ThumbUpAltTwoToneIcon
                                                    className={replies.data.likes && replies.data.likes.like ? classes.textSecondary : null}
                                                />
                                            }
                                        >
                                            {replies.data.likes && replies.data.likes.value ? replies.data.likes.value : 0} likes
                                        </Button>
                                        <Button
                                            variant="text"
                                            onClick={onReply}
                                            size="small"
                                            color="inherit"
                                            startIcon={<ReplyTwoToneIcon color="primary" />}
                                        >
                                            reply
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Card>
                    </div>
                </Grid>
            )}
        </React.Fragment>
    );
};

Reply.propTypes = {
    commentId: PropTypes.string,
    handleReplayLikes: PropTypes.func,
    onReply: PropTypes.func,
    postId: PropTypes.string,
    reply: PropTypes.object
};

export default Reply;
