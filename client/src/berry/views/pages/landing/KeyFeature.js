import React from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Button, Container, Grid, Link, Typography } from '@material-ui/core';

// project imports
import FadeInWhenVisible from './Animation';
import SubCard from '../../../ui-component/cards/SubCard';
import AnimateButton from './../../../ui-component/extended/AnimateButton';
import { gridSpacing } from '../../../store/constant';

// assets
import FolderTwoToneIcon from '@material-ui/icons/FolderTwoTone';
import CodeTwoToneIcon from '@material-ui/icons/CodeTwoTone';
import EmojiEmotionsTwoToneIcon from '@material-ui/icons/EmojiEmotionsTwoTone';
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';
import AttachmentTwoToneIcon from '@material-ui/icons/AttachmentTwoTone';
import CallSplitTwoToneIcon from '@material-ui/icons/CallSplitTwoTone';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import DesignServicesIcon from '@material-ui/icons/DesignServices';

// style constant
const useStyles = makeStyles((theme) => ({
    iconAvatar: {
        ...theme.typography.commonAvatar,
        cursor: 'initial',
        width: '72px',
        height: '72px'
    }
}));
//============================|| LANDING - KEY FEATURE PAGE ||============================//

const KeyFeaturePage = () => {
    const theme = useTheme();
    const classes = useStyles();

    return (
        <Container>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} lg={5} md={10}>
                    <Grid container spacing={2} sx={{ mb: '16px' }}>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Typography variant="h5" color="primary">
                                        Key Features
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h2" component="div">
                                Know more about Berry
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2">
                                If you're in need of a web app that is both user-friendly and scalable, this is the template for you.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={gridSpacing}>
                        <Grid item lg={3} md={4} xs={12} sm={6}>
                            <FadeInWhenVisible>
                                <SubCard>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                variant="rounded"
                                                className={classes.iconAvatar}
                                                sx={{
                                                    background:
                                                        theme.palette.mode === 'dark'
                                                            ? theme.palette.dark[800]
                                                            : theme.palette.primary.light,
                                                    color: theme.palette.primary.main
                                                }}
                                            >
                                                <FolderTwoToneIcon />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography variant="h5">Easy Folder Structure</Typography>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item lg={3} md={4} xs={12} sm={6}>
                            <FadeInWhenVisible>
                                <SubCard>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                variant="rounded"
                                                className={classes.iconAvatar}
                                                sx={{
                                                    background:
                                                        theme.palette.mode === 'dark'
                                                            ? theme.palette.dark[900]
                                                            : theme.palette.secondary.light,
                                                    color: theme.palette.secondary.main
                                                }}
                                            >
                                                <CodeTwoToneIcon />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography variant="h5">Organized Code Structure</Typography>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item lg={3} md={4} xs={12} sm={6}>
                            <FadeInWhenVisible>
                                <SubCard>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                variant="rounded"
                                                className={classes.iconAvatar}
                                                sx={{
                                                    background:
                                                        theme.palette.mode === 'dark'
                                                            ? theme.palette.dark[800]
                                                            : theme.palette.primary.light,
                                                    color: theme.palette.primary.main
                                                }}
                                            >
                                                <EmojiEmotionsTwoToneIcon />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography variant="h5">The Hassle-free Setup Process</Typography>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item lg={3} md={4} xs={12} sm={6}>
                            <FadeInWhenVisible>
                                <SubCard>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                variant="rounded"
                                                className={classes.iconAvatar}
                                                sx={{
                                                    background:
                                                        theme.palette.mode === 'dark'
                                                            ? theme.palette.dark[900]
                                                            : theme.palette.secondary.light,
                                                    color: theme.palette.secondary.main
                                                }}
                                            >
                                                <LockOpenTwoToneIcon />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography variant="h5">3 Auth Methods</Typography>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item lg={3} md={4} xs={12} sm={6}>
                            <FadeInWhenVisible>
                                <SubCard>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                variant="rounded"
                                                className={classes.iconAvatar}
                                                sx={{
                                                    background:
                                                        theme.palette.mode === 'dark'
                                                            ? theme.palette.dark[900]
                                                            : theme.palette.secondary.light,
                                                    color: theme.palette.secondary.main
                                                }}
                                            >
                                                <AttachmentTwoToneIcon />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography variant="h5">React Hooks</Typography>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item lg={3} md={4} xs={12} sm={6}>
                            <FadeInWhenVisible>
                                <SubCard>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                variant="rounded"
                                                className={classes.iconAvatar}
                                                sx={{
                                                    background:
                                                        theme.palette.mode === 'dark'
                                                            ? theme.palette.dark[800]
                                                            : theme.palette.primary.light,
                                                    color: theme.palette.primary.main
                                                }}
                                            >
                                                <CallSplitTwoToneIcon />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography variant="h5">Code Splitting</Typography>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item lg={3} md={4} xs={12} sm={6}>
                            <FadeInWhenVisible>
                                <SubCard>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                variant="rounded"
                                                className={classes.iconAvatar}
                                                sx={{
                                                    background:
                                                        theme.palette.mode === 'dark'
                                                            ? theme.palette.dark[900]
                                                            : theme.palette.secondary.light,
                                                    color: theme.palette.secondary.main
                                                }}
                                            >
                                                <TextFieldsIcon />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography variant="h5">Google Fonts</Typography>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item lg={3} md={4} xs={12} sm={6}>
                            <FadeInWhenVisible>
                                <SubCard>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item>
                                            <Avatar
                                                variant="rounded"
                                                className={classes.iconAvatar}
                                                sx={{
                                                    background:
                                                        theme.palette.mode === 'dark'
                                                            ? theme.palette.dark[800]
                                                            : theme.palette.primary.light,
                                                    color: theme.palette.primary.main
                                                }}
                                            >
                                                <DesignServicesIcon />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography variant="h5">Figma Design Files</Typography>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </FadeInWhenVisible>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ mt: 3 }}>
                    <Grid container justifyContent="center" spacing={gridSpacing}>
                        <Grid item>
                            <AnimateButton>
                                <Button
                                    component={Link}
                                    href="https://material-ui.com/store/items/berry-react-material-admin/"
                                    target="_blank"
                                    variant="contained"
                                    color="primary"
                                >
                                    Get Berry
                                </Button>
                            </AnimateButton>
                        </Grid>
                        <Grid item>
                            <Button component={Link} href="https://blog.berrydashboard.io" target="_blank" variant="text" color="primary">
                                Know More
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default KeyFeaturePage;
