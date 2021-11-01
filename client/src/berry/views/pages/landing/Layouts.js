import React from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Container, Grid, Typography } from '@material-ui/core';

// project imports
import Slider from './Slider';
import { gridSpacing } from '../../../store/constant';

// assets
import imgLayout1 from './../../../assets/images/landing/demo-dark.png';
import imgLayout2 from './../../../assets/images/landing/demo-rtl.png';
import imgLayout3 from './../../../assets/images/landing/demo-multi.png';
import imgLayoutGrid1 from './../../../assets/images/landing/img-lay-grid1.png';

// style constant
const useStyles = makeStyles((theme) => ({
    layoutImage: {
        width: '100%',
        position: 'relative',
        margin: '-70px 0px',
        [theme.breakpoints.down('md')]: {
            margin: '-30px 0px'
        }
    },
    layoutGridImg: {
        width: '100%'
    },
    layoutImgAnimate: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        animation: '5s wings ease-in-out infinite'
    },
    layoutGrid: {
        [theme.breakpoints.down(960)]: {
            width: '768px'
        }
    },
    layoutContent: {
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            background: theme.palette.mode === 'dark' ? theme.palette.dark.dark : '#FFFFFF',
            border: '6px solid' + theme.palette.secondary.main,
            width: '25px',
            height: '25px',
            borderRadius: '50%',
            top: '13px',
            left: '-20px'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : '#9E9E9E',
            width: '1px',
            height: '390px',
            top: '13px',
            left: '-8px'
        },
        [theme.breakpoints.down(1250)]: {
            '&:before': {
                height: '290px'
            }
        },
        [theme.breakpoints.down('md')]: {
            '&:after': {
                left: '-12px'
            },
            '&:before': {
                left: '0px',
                height: '290px'
            }
        }
    },
    layoutContentRight: {
        position: 'relative',
        paddingRight: '25px',
        '&:after': {
            content: '""',
            position: 'absolute',
            background: theme.palette.mode === 'dark' ? theme.palette.dark.dark : '#FFFFFF',
            border: '6px solid' + theme.palette.secondary.main,
            width: '25px',
            height: '25px',
            borderRadius: '50%',
            top: '13px',
            right: '-12px'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : '#9E9E9E',
            width: '1px',
            height: '300px',
            top: '13px',
            right: '-1px'
        },
        [theme.breakpoints.down(1300)]: {
            '&:before': {
                height: '400%'
            }
        },
        [theme.breakpoints.down('md')]: {
            '&:after': {
                right: '-4px'
            },
            '&:before': {
                right: '7px'
            }
        },
        [theme.breakpoints.down('sm')]: {
            '&:after': {
                right: 'auto',
                left: '-12px'
            },
            '&:before': {
                right: 'auto',
                left: '0px',
                height: '160px'
            }
        }
    }
}));

//=============================|| LANDING - LAYOUTS PAGE ||=============================//

const LayoutsPage = () => {
    const theme = useTheme();
    const classes = useStyles();

    return (
        <Container>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sx={{ display: { xs: 'flex', sm: 'none' } }}>
                    <Slider />
                </Grid>
                <Box sx={{ display: { xs: 'none', sm: 'block' }, m: '0 auto' }}>
                    <Grid item xs={12} className={classes.layoutGrid}>
                        <Grid container alignItems="center" spacing={gridSpacing}>
                            <Grid item sm={6}>
                                <Box className={classes.layoutImage}>
                                    <img src={imgLayoutGrid1} alt="Berry" className={classes.layoutGridImg} />
                                    <img src={imgLayout1} alt="Berry" className={classes.layoutImgAnimate} />
                                </Box>
                            </Grid>
                            <Grid item sm={6}>
                                <Grid container spacing={2} className={classes.layoutContent} sx={{ maxWidth: '400px' }}>
                                    <Grid item sm={12}>
                                        <Typography variant="h4" component="div">
                                            Dark Layout
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={12}>
                                        <Typography variant="body2">
                                            Modern, sleek and elegant dark color scheme that looks great in a dark variant.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.layoutGrid}>
                        <Grid container alignItems="center" spacing={gridSpacing}>
                            <Grid item sm={6}>
                                <Grid
                                    container
                                    spacing={2}
                                    className={classes.layoutContentRight}
                                    sx={{ maxWidth: '400px', textAlign: 'right', ml: 'auto' }}
                                >
                                    <Grid item sm={12}>
                                        <Typography variant="h4" component="div">
                                            RTL
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={12}>
                                        <Typography variant="body2">Fully Support Right-to-left (RTL) design variant.</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sm={6}>
                                <Box className={classes.layoutImage}>
                                    <img src={imgLayoutGrid1} alt="Berry" className={classes.layoutGridImg} />
                                    <img
                                        src={imgLayout2}
                                        alt="Berry"
                                        className={classes.layoutImgAnimate}
                                        style={{ animationDelay: '1.5s' }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.layoutGrid}>
                        <Grid container alignItems="center" spacing={gridSpacing}>
                            <Grid item sm={6}>
                                <Box className={classes.layoutImage}>
                                    <img src={imgLayoutGrid1} alt="Berry" className={classes.layoutGridImg} />
                                    <img
                                        src={imgLayout3}
                                        alt="Berry"
                                        className={classes.layoutImgAnimate}
                                        style={{ animationDelay: '3s' }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item sm={6}>
                                <Grid
                                    container
                                    spacing={2}
                                    className={classes.layoutContent}
                                    sx={{
                                        maxWidth: '400px',
                                        '&:before': {
                                            background: theme.palette.mode === 'dark' ? theme.palette.dark[900] : '#fff !important'
                                        }
                                    }}
                                >
                                    <Grid item sm={12}>
                                        <Typography variant="h4" component="div">
                                            Multi-language Support
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={12}>
                                        <Typography variant="body2">Support Multi-language. Added 4 pre-filled language.</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Container>
    );
};

export default LayoutsPage;
