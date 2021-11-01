import React from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, ButtonBase, Card, CardContent, CardMedia, Dialog, DialogContent, Grid, Link, Slide, Typography } from '@material-ui/core';

// project imports
import Slider from './Slider';
import MailerSubscriber from './MailerSubscriber';
import { gridSpacing } from './../../../../../store/constant';

// assets
import { IconBrandDribbble } from '@tabler/icons';

import FiberManualRecordTwoToneIcon from '@material-ui/icons/FiberManualRecordTwoTone';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import BookIcon from '@material-ui/icons/Book';

import logo from './../../../../../assets/images/logo.svg';
import logoDark from './../../../../../assets/images/logo-dark.svg';
import companyLogo from './../../../../../assets/images/maintenance/img-ct-logo.png';
import imageBackground from './../../../../../assets/images/maintenance/img-soon-bg.svg';
import imageGrid from './../../../../../assets/images/maintenance/img-soon-bg-grid.svg';
import imageSoon2 from './../../../../../assets/images/maintenance/img-soon-2.svg';
import imageSoon3 from './../../../../../assets/images/maintenance/img-soon-3.svg';
import imageSoon4 from './../../../../../assets/images/maintenance/img-soon-4.svg';
import imageSoon5 from './../../../../../assets/images/maintenance/img-soon-5.svg';
import imageSoon6 from './../../../../../assets/images/maintenance/img-soon-6.svg';
import imageSoon7 from './../../../../../assets/images/maintenance/img-soon-7.svg';
import imageSoon8 from './../../../../../assets/images/maintenance/img-soon-8.svg';

// style constant
const useStyles = makeStyles((theme) => ({
    errorImg: {
        maxWidth: '720px',
        margin: '0 auto',
        position: 'relative',
        [theme.breakpoints.down('lg')]: {
            marginTop: '30px'
        },
        [theme.breakpoints.down('1400')]: {
            maxWidth: '450px'
        },
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    errorContent: {
        maxWidth: '550px',
        margin: '0 0 0 auto',
        [theme.breakpoints.down('md')]: {
            margin: '0 auto'
        },
        [theme.breakpoints.up('1400')]: {
            maxWidth: '600px'
        }
    },
    rightContent: {
        padding: '80px',
        margin: '0 auto',
        [theme.breakpoints.down('lg')]: {
            padding: '24px'
        }
    },
    comingSoonBlock: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        [theme.breakpoints.down('md')]: {
            display: 'block'
        },
        [theme.breakpoints.up('1200')]: {
            overflow: 'hidden',
            maxHeight: '100vh'
        },
        [theme.breakpoints.up('1400')]: {
            alignItems: 'center'
        }
    },
    slider: {
        width: 'calc(100% - 20px)',
        marginTop: '20px',
        boxShadow: '0px 45px 45px rgba(30, 136, 229, 0.2)',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer'
    },
    sliderBackground: {
        borderRadius: '8px',
        width: 'calc(100% - 40px)',
        marginLeft: '40px',
        height: 'calc(100% - 40px)',
        position: 'absolute',
        left: 0,
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light
    },
    imgBackground: {
        position: 'relative',
        zIndex: 1
    },
    imgGrid: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 3
    },
    imgWidget: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        animation: '5s wings ease-in-out infinite',
        zIndex: 5,
        '&:nth-child(3)': {
            animationDelay: '2s'
        },
        '&:nth-child(4)': {
            animationDelay: '1s'
        },
        '&:nth-child(5)': {
            animationDelay: '3s'
        },
        '&:nth-child(9)': {
            animationDelay: '5s'
        },
        '&:nth-child(10)': {
            animationDelay: '6s'
        },
        '&:nth-child(7)': {
            animation: '3s blink ease-in-out infinite',
            animationDelay: '1s'
        },
        '&:nth-child(6)': {
            animation: '3s blink ease-in-out infinite',
            animationDelay: '2s'
        }
    },
    topCircle: {
        position: 'absolute',
        bottom: '-40px',
        left: '50px',
        width: '400px',
        transform: 'rotate(145deg)'
    }
}));

// slide animation
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

//===========================|| COMING SOON 1 ||===========================//

const ComingSoon1 = () => {
    const theme = useTheme();
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };

    return (
        <Card className={classes.comingSoonBlock}>
            <CardContent sx={{ p: 0 }}>
                <CardContent sx={{ position: 'relative' }}>
                    <CardMedia component="img" image={imageBackground} title="Slider5 image" className={classes.topCircle} />
                    {theme.palette.mode === 'light' && <img src={logo} alt="Berry" width="100" />}
                    {theme.palette.mode === 'dark' && <img src={logoDark} alt="Berry" width="100" />}
                </CardContent>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <div className={classes.errorImg}>
                            <CardMedia component="img" image={imageBackground} title="Slider5 image" className={classes.imgBackground} />
                            <CardMedia component="img" image={imageGrid} title="Slider5 image" className={classes.imgGrid} />
                            <CardMedia component="img" image={imageSoon2} title="Slider5 image" className={classes.imgWidget} />
                            <CardMedia component="img" image={imageSoon3} title="Slider5 image" className={classes.imgWidget} />
                            <CardMedia component="img" image={imageSoon4} title="Slider5 image" className={classes.imgWidget} />
                            <CardMedia component="img" image={imageSoon5} title="Slider5 image" className={classes.imgWidget} />
                            <CardMedia component="img" image={imageSoon6} title="Slider5 image" className={classes.imgWidget} />
                            <CardMedia component="img" image={imageSoon7} title="Slider5 image" className={classes.imgWidget} />
                            <CardMedia component="img" image={imageSoon8} title="Slider5 image" className={classes.imgWidget} />
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
            <CardContent className={classes.rightContent}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <div className={classes.errorContent}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Typography variant="h2" component="div" color="primary">
                                        Coming Soon
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="h1" component="div">
                                                Berry - The React Admin Template
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography sx={{ fontSize: '18px' }}>
                                                Presenting Material-UI based React Dashboard Template to build performance centric websites
                                                and applications.
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item>
                                            <Typography
                                                variant="h5"
                                                component="div"
                                                color="secondary"
                                                sx={{ display: 'flex', alignItems: 'center' }}
                                            >
                                                <FiberManualRecordTwoToneIcon sx={{ mr: '5px', fontSize: '1rem' }} />
                                                Flexible & Fast
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                variant="h5"
                                                component="div"
                                                color="secondary"
                                                sx={{ display: 'flex', alignItems: 'center' }}
                                            >
                                                <FiberManualRecordTwoToneIcon sx={{ mr: '5px', fontSize: '1rem' }} />
                                                Material UI
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                variant="h5"
                                                component="div"
                                                color="secondary"
                                                sx={{ display: 'flex', alignItems: 'center' }}
                                            >
                                                <FiberManualRecordTwoToneIcon sx={{ mr: '5px', fontSize: '1rem' }} />
                                                Javascript / Typescript
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <MailerSubscriber />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                                        <Grid item xs={12} sm={6} sx={{ position: 'relative' }}>
                                            <div className={classes.sliderBackground}></div>
                                            <div className={classes.slider} onClick={handleClickOpen}>
                                                <Slider />
                                            </div>
                                            <Dialog
                                                open={open}
                                                TransitionComponent={Transition}
                                                keepMounted
                                                onClose={handleCloseDialog}
                                                sx={{
                                                    '&>div:nth-child(3)': {
                                                        '&>div': {
                                                            [theme.breakpoints.up('1200')]: {
                                                                maxWidth: '60vw'
                                                            },
                                                            '&>div': {
                                                                p: 0
                                                            }
                                                        }
                                                    }
                                                }}
                                            >
                                                <DialogContent>
                                                    <Slider />
                                                </DialogContent>
                                            </Dialog>
                                        </Grid>
                                        <Grid item xs={12} sm={6} sx={{ position: 'relative' }}>
                                            <Grid container justifyContent="space-between" spacing={gridSpacing}>
                                                <Grid item xs={12}>
                                                    <Grid container justifyContent="flex-end" spacing={1}>
                                                        <Grid item>
                                                            <ButtonBase
                                                                component={Link}
                                                                href="https://blog.berrydashboard.io/"
                                                                target="_blank"
                                                            >
                                                                <Avatar
                                                                    sx={{
                                                                        ...theme.typography.commonAvatar,
                                                                        ...theme.typography.mediumAvatar,
                                                                        bgcolor:
                                                                            theme.palette.mode === 'dark'
                                                                                ? theme.palette.dark.main
                                                                                : theme.palette.secondary.light,
                                                                        color:
                                                                            theme.palette.mode === 'dark'
                                                                                ? theme.palette.secondary.main
                                                                                : theme.palette.secondary.dark
                                                                    }}
                                                                >
                                                                    <BookIcon />
                                                                </Avatar>
                                                            </ButtonBase>
                                                        </Grid>
                                                        <Grid item>
                                                            <ButtonBase
                                                                component={Link}
                                                                href="https://www.facebook.com/codedthemes"
                                                                target="_blank"
                                                            >
                                                                <Avatar
                                                                    sx={{
                                                                        ...theme.typography.commonAvatar,
                                                                        ...theme.typography.mediumAvatar,
                                                                        bgcolor:
                                                                            theme.palette.mode === 'dark'
                                                                                ? theme.palette.dark.main
                                                                                : theme.palette.primary.light,
                                                                        color:
                                                                            theme.palette.mode === 'dark'
                                                                                ? theme.palette.primary.main
                                                                                : theme.palette.primary.dark
                                                                    }}
                                                                >
                                                                    <FacebookIcon />
                                                                </Avatar>
                                                            </ButtonBase>
                                                        </Grid>
                                                        <Grid item>
                                                            <ButtonBase
                                                                component={Link}
                                                                href="https://twitter.com/codedthemes"
                                                                target="_blank"
                                                            >
                                                                <Avatar
                                                                    sx={{
                                                                        ...theme.typography.commonAvatar,
                                                                        ...theme.typography.mediumAvatar,
                                                                        bgcolor:
                                                                            theme.palette.mode === 'dark'
                                                                                ? theme.palette.dark.main
                                                                                : theme.palette.warning.light,
                                                                        color:
                                                                            theme.palette.mode === 'dark'
                                                                                ? theme.palette.warning.dark
                                                                                : theme.palette.warning.dark
                                                                    }}
                                                                >
                                                                    <TwitterIcon />
                                                                </Avatar>
                                                            </ButtonBase>
                                                        </Grid>
                                                        <Grid item>
                                                            <ButtonBase
                                                                component={Link}
                                                                href="https://github.com/codedthemes"
                                                                target="_blank"
                                                            >
                                                                <Avatar
                                                                    sx={{
                                                                        ...theme.typography.commonAvatar,
                                                                        ...theme.typography.mediumAvatar,
                                                                        bgcolor:
                                                                            theme.palette.mode === 'dark'
                                                                                ? theme.palette.dark.main
                                                                                : theme.palette.grey[200],
                                                                        color:
                                                                            theme.palette.mode === 'dark'
                                                                                ? theme.palette.dark.light
                                                                                : theme.palette.grey[800]
                                                                    }}
                                                                >
                                                                    <GitHubIcon />
                                                                </Avatar>
                                                            </ButtonBase>
                                                        </Grid>
                                                        <Grid item>
                                                            <ButtonBase
                                                                component={Link}
                                                                href="https://dribbble.com/codedthemes"
                                                                target="_blank"
                                                            >
                                                                <Avatar
                                                                    sx={{
                                                                        ...theme.typography.commonAvatar,
                                                                        ...theme.typography.mediumAvatar,
                                                                        bgcolor:
                                                                            theme.palette.mode === 'dark'
                                                                                ? theme.palette.dark.main
                                                                                : theme.palette.grey[100],
                                                                        color:
                                                                            theme.palette.mode === 'dark'
                                                                                ? theme.palette.grey[600]
                                                                                : theme.palette.grey[500]
                                                                    }}
                                                                >
                                                                    <IconBrandDribbble />
                                                                </Avatar>
                                                            </ButtonBase>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container alignItems="center" justifyContent="flex-end" spacing={1}>
                                                        <Grid item>
                                                            <Typography variant="body1" align="right" component="div">
                                                                Project By
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <img src={companyLogo} alt="Berry" width="128" />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ComingSoon1;
