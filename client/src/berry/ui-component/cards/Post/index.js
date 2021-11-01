import PropTypes from 'prop-types';
import * as React from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Button,
    ButtonBase,
    CardMedia,
    Collapse,
    FormHelperText,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    TextField,
    Typography,
    useMediaQuery
} from '@material-ui/core';

// third-party
import * as yup from 'yup';
import uniqueId from 'lodash/uniqueId';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

// project imports
import Comment from './Comment';
import MainCard from './../MainCard';
import AnimateButton from './../../../ui-component/extended/AnimateButton';
import ImageList from './../../../ui-component/extended/ImageList';
import Avatar from './../../../ui-component/extended/Avatar';

// assets
import ShareTwoToneIcon from '@material-ui/icons/ShareTwoTone';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import ChatTwoToneIcon from '@material-ui/icons/ChatTwoTone';
import ContentCopyTwoToneIcon from '@material-ui/icons/ContentCopyTwoTone';
import MoreVertTwoToneIcon from '@material-ui/icons/MoreVertTwoTone';
import ThumbUpAltTwoToneIcon from '@material-ui/icons/ThumbUpAltTwoTone';
import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';

const avatarImage = require.context('../../../assets/images/profile', true);

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
    menuItem: {
        marginRight: '14px',
        fontSize: '1.25rem'
    },
    videoMedia: {
        height: '330px',
        [theme.breakpoints.down('lg')]: {
            height: '220px'
        }
    },
    btnSecondary: {
        background: theme.palette.secondary.main,
        '&:hover,&:focus,&:active': {
            background: theme.palette.secondary.dark
        }
    },
    message: {
        '& > p': {
            ...theme.typography.body1,
            marginBottom: 0
        }
    }
}));

const validationSchema = yup.object().shape({
    name: yup.string().required('Comment Field is Required')
});

//-----------------------|| COMMENT TEXTFIELD ||-----------------------//

const FormInput = ({ bug, label, name, required, ...others }) => {
    const { control } = useFormContext();

    let isError = false;
    let errorMessage = '';
    if (bug && bug.hasOwnProperty(name)) {
        isError = true;
        errorMessage = bug[name].message;
    }

    return (
        <React.Fragment>
            <Controller
                as={TextField}
                name={name}
                control={control}
                defaultValue=""
                label={label}
                fullWidth={true}
                InputLabelProps={{
                    className: required ? 'required-label' : '',
                    required: required || false
                }}
                error={isError}
                {...others}
            />
            {errorMessage && (
                <Grid item xs={12}>
                    <FormHelperText error>{errorMessage}</FormHelperText>
                </Grid>
            )}
        </React.Fragment>
    );
};

FormInput.propTypes = {
    bug: PropTypes.object,
    label: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool
};

//-----------------------|| SOCIAL PROFILE - POST ||-----------------------//

const Post = ({ commentAdd, handleCommentLikes, handlePostLikes, handleReplayLikes, post, replyAdd }) => {
    const classes = useStyles();
    const theme = useTheme();
    const { id, data, profile } = post;

    const customization = useSelector((state) => state.customization);
    const matchesXS = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorSharedEl, setAnchorSharedEl] = React.useState(null);
    const handleSharedClick = (event) => {
        setAnchorSharedEl(event.currentTarget);
    };

    const handleSharedClose = () => {
        setAnchorSharedEl(null);
    };

    const [openComment, setOpenComment] = React.useState(data.comments && data.comments.length > 0 ? false : true);
    const handleChangeComment = () => {
        setOpenComment((prev) => !prev);
    };

    let commentsResult = '';
    if (data && data.comments) {
        commentsResult = data.comments.map((comment, index) => {
            return (
                <Comment
                    postId={id}
                    comment={comment}
                    key={comment.id}
                    user={profile}
                    replyAdd={replyAdd}
                    handleCommentLikes={handleCommentLikes}
                    handleReplayLikes={handleReplayLikes}
                />
            );
        });
    }

    const methods = useForm({
        resolver: yupResolver(validationSchema)
    });

    const { handleSubmit, errors, reset } = methods;
    const onSubmit = async (comment) => {
        handleChangeComment();
        const commentId = uniqueId('#COMMENT_');
        const comment_ = {
            id: commentId,
            profile: profile,
            data: {
                comment: comment.name,
                likes: {
                    like: false,
                    value: 0
                },
                replies: []
            }
        };
        commentAdd(id, comment_);
        reset({ name: '' });
    };

    return (
        <MainCard>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Grid container wrap="nowrap" alignItems="center" spacing={1}>
                        <Grid item>
                            <Avatar alt="User 1" src={profile.avatar && avatarImage(`./${profile.avatar}`).default} />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <Typography align="left" variant="h5" component="div">
                                        {profile.name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography align="left" variant="caption">
                                        <FiberManualRecordIcon sx={{ width: '10px', height: '10px', opacity: 0.5, m: '0 5px' }} />{' '}
                                        {profile.time}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className={classes.textActive}>
                            <ButtonBase sx={{ borderRadius: '12px' }} onClick={handleClick}>
                                <Avatar variant="rounded" className={classes.avatarRight} aria-controls="menu-post" aria-haspopup="true">
                                    <MoreVertTwoToneIcon fontSize="inherit" />
                                </Avatar>
                            </ButtonBase>
                            <Menu
                                id="menu-post"
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

                {/* post - content */}
                <Grid item xs={12}>
                    <ReactMarkdown remarkPlugins={[gfm]} children={data.content} className={classes.message} />
                </Grid>

                {/* post - photo grid */}
                {data && data.images && data.images.length > 0 && (
                    <Grid item xs={12}>
                        <ImageList itemData={data.images} />
                    </Grid>
                )}

                {/* post - video */}
                {data.video && (
                    <Grid item xs={12} sx={{ '&.MuiGrid-root': { pt: 2 } }}>
                        <CardMedia
                            sx={{ borderRadius: customization.borderRadius + 'px' }}
                            className={classes.videoMedia}
                            component="iframe"
                            src={'https://www.youtube.com/embed/' + data.video}
                        />
                    </Grid>
                )}

                {/* post - comment, likes and replay history */}
                <Grid item xs={12}>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={2}
                        sx={{ mt: 0, color: theme.palette.mode === 'dark' ? 'grey.700' : 'grey.800' }}
                    >
                        <Grid item>
                            <Stack direction="row" spacing={2}>
                                <Button
                                    variant="text"
                                    onClick={() => handlePostLikes(id)}
                                    color="inherit"
                                    size="small"
                                    startIcon={
                                        <ThumbUpAltTwoToneIcon color={data && data.likes && data.likes.like ? 'primary' : 'inherit'} />
                                    }
                                >
                                    {data && data.likes && data.likes.value ? data.likes.value : 0}
                                    <Typography variant="span" sx={{ ml: 0.5, display: { xs: 'none', sm: 'block' } }}>
                                        likes
                                    </Typography>
                                </Button>
                                <Button
                                    onClick={handleChangeComment}
                                    size="small"
                                    variant="text"
                                    color="inherit"
                                    startIcon={<ChatBubbleTwoToneIcon className={classes.textSecondary} />}
                                >
                                    {data.comments ? data.comments.length : 0} comments
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleSharedClick}>
                                <ShareTwoToneIcon sx={{ width: '1rem', height: '1rem' }} />
                            </IconButton>
                            <Menu
                                id="menu-post"
                                anchorEl={anchorSharedEl}
                                keepMounted
                                open={Boolean(anchorSharedEl)}
                                onClose={handleSharedClose}
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
                                <MenuItem onClick={handleSharedClose}>
                                    <ShareTwoToneIcon fontSize="inherit" className={classes.menuItem} /> Share Now
                                </MenuItem>
                                <MenuItem onClick={handleSharedClose}>
                                    <PeopleAltTwoToneIcon fontSize="inherit" className={classes.menuItem} /> Share to Friends
                                </MenuItem>
                                <MenuItem onClick={handleSharedClose}>
                                    <ChatTwoToneIcon fontSize="inherit" className={classes.menuItem} /> Send in Messanger
                                </MenuItem>
                                <MenuItem onClick={handleSharedClose}>
                                    <ContentCopyTwoToneIcon fontSize="inherit" className={classes.menuItem} /> Copy Link
                                </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Grid>

                {/* add new comment */}
                <Collapse in={openComment} sx={{ width: '100%' }}>
                    <Grid item xs={12} sx={{ pt: 2 }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2} alignItems="flex-start">
                                <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    <Avatar
                                        sx={{ mt: 0.75 }}
                                        alt="User 1"
                                        src={profile.avatar && avatarImage(`./${profile.avatar}`).default}
                                        size="xs"
                                    />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <FormProvider fullWidth {...methods}>
                                        <FormInput
                                            fullWidth
                                            name="name"
                                            label="Write a comment..."
                                            size={matchesXS ? 'small' : 'medium'}
                                            bug={errors}
                                        />
                                    </FormProvider>
                                </Grid>
                                <Grid item>
                                    <AnimateButton>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            className={classes.btnSecondary}
                                            size={matchesXS ? 'small' : 'large'}
                                            color="primary"
                                            sx={{ mt: 0.5 }}
                                        >
                                            Comment
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Collapse>
                {commentsResult}
            </Grid>
        </MainCard>
    );
};

Post.propTypes = {
    commentAdd: PropTypes.func,
    handleCommentLikes: PropTypes.func,
    handlePostLikes: PropTypes.func,
    handleReplayLikes: PropTypes.func,
    post: PropTypes.object,
    replyAdd: PropTypes.func
};

export default Post;
