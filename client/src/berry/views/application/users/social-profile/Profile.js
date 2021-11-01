import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider, Grid, IconButton, Link, TextField, Typography } from '@material-ui/core';

// project imports
import AnimateButton from './../../../../ui-component/extended/AnimateButton';
import Posts from './../../../../ui-component/cards/Post';
import MainCard from './../../../../ui-component/cards/MainCard';
import axios from './../../../../utils/axios';
import { gridSpacing } from './../../../../store/constant';

// assets
import AttachmentTwoToneIcon from '@material-ui/icons/AttachmentTwoTone';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LayersTwoToneIcon from '@material-ui/icons/LayersTwoTone';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import PublicTwoToneIcon from '@material-ui/icons/PublicTwoTone';
import RecentActorsTwoToneIcon from '@material-ui/icons/RecentActorsTwoTone';

// style constant
const useStyles = makeStyles((theme) => ({
    sideAvatarIcon2: {
        borderRadius: '8px',
        width: '48px',
        height: '48px',
        fontSize: '1.5rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.mode === 'dark' ? theme.palette.secondary.main + 20 : theme.palette.secondary.light,
        border: theme.palette.mode === 'dark' ? '1px solid' : 'none',
        borderColor: theme.palette.secondary.main,
        color: theme.palette.secondary.dark,
        '&>svg': {
            width: '24px',
            height: '24px'
        }
    },
    sideAvatarIcon1: {
        borderRadius: '8px',
        width: '48px',
        height: '48px',
        fontSize: '1.5rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.mode === 'dark' ? theme.palette.primary.main + 20 : theme.palette.primary.light,
        border: theme.palette.mode === 'dark' ? '1px solid' : 'none',
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.dark,
        '&>svg': {
            width: '24px',
            height: '24px'
        }
    },
    sidebarDivider: {
        margin: '16px 0'
    },
    textSecondary: {
        color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.secondary.main
    },
    sidebarLinks: {
        '& >div': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'block',
            width: '100%'
        },
        '& a': {
            color: theme.palette.grey[700],

            '& svg': {
                marginRight: '8px',
                verticalAlign: 'bottom'
            },
            '&:hover': {
                color: theme.palette.primary.main,
                textDecoration: 'none'
            }
        }
    },
    btnSecondary: {
        background: theme.palette.secondary.main,
        '&:hover,&:focus,&:active': {
            background: theme.palette.secondary.dark
        }
    }
}));

//-----------------------|| SOCIAL PROFILE - POST ||-----------------------//

const Profile = () => {
    const classes = useStyles();

    const [posts, setPosts] = React.useState([]);
    const getPost = async () => {
        const response = await axios.get('/api/posts/list');
        setPosts(response.data.posts);
    };

    React.useEffect(() => {
        getPost();
    }, []);

    const editPost = async (id, commentId) => {
        await axios
            .post('/api/posts/editComment', {
                key: id,
                id: commentId
            })
            .then((response) => {
                setPosts(response.data.posts);
            });
    };

    const commentAdd = async (id, comment) => {
        await axios
            .post('/api/comments/add', {
                postId: id,
                comment
            })
            .then((response) => {
                setPosts(response.data.posts);
            });
    };

    const replyAdd = async (postId, commentId, reply) => {
        await axios
            .post('/api/replies/add', {
                postId,
                commentId,
                reply
            })
            .then((response) => {
                setPosts(response.data.posts);
            });
    };

    const handlePostLikes = async (postId) => {
        await axios
            .post('/api/posts/list/like', {
                postId
            })
            .then((response) => {
                setPosts(response.data.posts);
            });
    };

    const handleCommentLikes = async (postId, commentId) => {
        await axios
            .post('/api/comments/list/like', {
                postId,
                commentId
            })
            .then((response) => {
                setPosts(response.data.posts);
            });
    };

    const handleReplayLikes = async (postId, commentId, replayId) => {
        await axios
            .post('/api/replies/list/like', {
                postId,
                commentId,
                replayId
            })
            .then((response) => {
                setPosts(response.data.posts);
            });
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={12} md={4}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <MainCard>
                            <Grid container alignItems="center" spacing={gridSpacing}>
                                <Grid item>
                                    <div className={classes.sideAvatarIcon1}>
                                        <PeopleAltTwoToneIcon />
                                    </div>
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography variant="h3" color="primary" component="div" sx={{ mb: '5px' }}>
                                        239k
                                    </Typography>
                                    <Typography variant="body2">Friends</Typography>
                                </Grid>
                                <Grid item>
                                    <IconButton>
                                        <NavigateNextRoundedIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Divider className={classes.sidebarDivider} />
                            <Grid container alignItems="center" spacing={gridSpacing}>
                                <Grid item>
                                    <div className={classes.sideAvatarIcon2}>
                                        <RecentActorsTwoToneIcon />
                                    </div>
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography variant="h3" className={classes.textSecondary} component="div" sx={{ mb: '5px' }}>
                                        234k
                                    </Typography>
                                    <Typography variant="body2">Followers</Typography>
                                </Grid>
                                <Grid item>
                                    <IconButton>
                                        <NavigateNextRoundedIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                        <MainCard>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h4">About</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                        It is a long established fact that a reader will be distracted by the readable content of a page
                                        when looking at its layout.
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider className={classes.sidebarDivider} />
                            <Grid container spacing={2} className={classes.sidebarLinks}>
                                <Grid item xs={12}>
                                    <Link href="https://codedthemes.com/" target="_blank">
                                        <PublicTwoToneIcon color="secondary" /> https://codedthemes.com/
                                    </Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link href="https://www.instagram.com/codedthemes" target="_blank">
                                        <InstagramIcon sx={{ color: 'orange.dark' }} /> https://www.instagram.com/codedthemes'
                                    </Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link href="https://www.facebook.com/codedthemes" target="_blank">
                                        <FacebookIcon color="primary" /> https://www.facebook.com/codedthemes
                                    </Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link href="https://in.linkedin.com/company/codedthemes" target="_blank">
                                        <LinkedInIcon sx={{ color: 'grey.900' }} /> https://in.linkedin.com/company/codedthemes
                                    </Link>
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <MainCard>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-textarea"
                                        placeholder="What’s on your mind, Larry?"
                                        rows={4}
                                        fullWidth
                                        multiline
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justifyContent="space-between" spacing={gridSpacing}>
                                        <Grid item>
                                            <Button variant="text" color="secondary" startIcon={<AttachmentTwoToneIcon />}>
                                                Gallery
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <AnimateButton>
                                                <Button
                                                    variant="contained"
                                                    className={classes.btnSecondary}
                                                    color="primary"
                                                    startIcon={<LayersTwoToneIcon />}
                                                >
                                                    Post
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid>
                    {posts &&
                        posts.map((post, index) => {
                            return (
                                <Grid key={post.id} item xs={12}>
                                    <Posts
                                        key={post.id}
                                        post={post}
                                        editPost={editPost}
                                        renderPost={getPost}
                                        setPosts={setPosts}
                                        commentAdd={commentAdd}
                                        replyAdd={replyAdd}
                                        handlePostLikes={handlePostLikes}
                                        handleCommentLikes={handleCommentLikes}
                                        handleReplayLikes={handleReplayLikes}
                                    />
                                </Grid>
                            );
                        })}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Profile;
