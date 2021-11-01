import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Button, Container, Grid, Link, Typography } from '@material-ui/core';

// third party
import { motion } from 'framer-motion';

// project imports
// project imports
import Avatar from './../../../ui-component/extended/Avatar';
import AnimateButton from './../../../ui-component/extended/AnimateButton';
import { gridSpacing } from './../../../store/constant';

// assets
import dashboard from './../../../assets/images/landing/dashboard.png';
import widget1 from './../../../assets/images/landing/widget-1.png';
import widget2 from './../../../assets/images/landing/widget-2.png';

// style constant
const useStyles = makeStyles((theme) => ({
    technoImg: {
        width: '50px',
        height: '50px',
        padding: '5px',
        background: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.primary.light
    },
    headerMain: {
        maxWidth: '100%',
        borderRadius: '20px',
        transform: 'scale(1.6)',
        transformOrigin: '0 50%'
    },
    headerImg: {
        maxWidth: '100%',
        filter: 'drop-shadow(0px 0px 50px rgb(33 150 243 / 30%))'
    },
    btnLight: {
        background: '#E3F2FD',
        color: theme.palette.primary.main,
        borderColor: '#E3F2FD',
        boxShadow: 'none',
        '&:hover ': {
            background: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            color: '#fff'
        }
    }
}));

//==============================|| LANDING - HEADER PAGE ||==============================//

const HeaderPage = () => {
    const theme = useTheme();
    const classes = useStyles();

    return (
        <Container>
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                spacing={gridSpacing}
                sx={{ mt: '150px', mb: '80px', [theme.breakpoints.down('sm')]: { mt: { xs: '116px', sm: '32px' }, mb: '20px' } }}
            >
                <Grid item xs={12} md={5}>
                    <Grid
                        container
                        spacing={gridSpacing}
                        sx={{ pr: '80px', [theme.breakpoints.down('md')]: { pr: '0px', textAlign: 'center' } }}
                    >
                        <Grid item xs={12}>
                            <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 30
                                }}
                            >
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontSize: { xs: '36px', sm: '48px', md: '64px' },
                                        fontWeight: '900',
                                        lineHeight: { xs: '42px', sm: '56px', md: '80px' }
                                    }}
                                >
                                    Build Your Next Project With
                                    <Box component="span" sx={{ ml: 2, color: theme.palette.primary.main }}>
                                        Berry
                                    </Box>
                                </Typography>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12}>
                            <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 30,
                                    delay: 0.2
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    component="div"
                                    color="inherit"
                                    sx={{
                                        fontSize: { xs: '1rem', md: '1.125rem' },
                                        fontWeight: '400',
                                        lineHeight: { xs: '24px', md: '32px' }
                                    }}
                                >
                                    Berry is React based admin template which helps you to build faster and beautiful web applications.
                                </Typography>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} sx={{ my: 3.25 }}>
                            <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 30,
                                    delay: 0.4
                                }}
                            >
                                <Grid container spacing={2} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                    <Grid item>
                                        <AnimateButton>
                                            <Button
                                                component={RouterLink}
                                                to="/dashboard/default"
                                                target="_blank"
                                                size="large"
                                                variant="contained"
                                                color="secondary"
                                            >
                                                Live Preview
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            component={Link}
                                            href="https://material-ui.com/store/items/berry-react-material-admin/"
                                            target="_blank"
                                            size="large"
                                            variant="text"
                                            color="primary"
                                        >
                                            Purchase Now
                                        </Button>
                                    </Grid>
                                </Grid>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12}>
                            <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 30,
                                    delay: 0.6
                                }}
                            >
                                <Grid
                                    container
                                    alignItems="center"
                                    spacing={2}
                                    sx={{ [theme.breakpoints.down('md')]: { display: 'inline-flex', width: 'auto' } }}
                                >
                                    <Grid item>
                                        <Avatar alt="MUI Logo" size="xl" color="primary" className={classes.technoImg} variant="rounded">
                                            <svg
                                                width="500"
                                                height="500"
                                                viewBox="0 0 500 500"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g clip-path="url(#clip0)">
                                                    <path
                                                        d="M100 260.9V131L212.5 195.95V239.25L137.5 195.95V282.55L100 260.9Z"
                                                        fill={theme.palette.primary[800]}
                                                    />
                                                    <path
                                                        d="M212.5 195.95L325 131V260.9L250 304.2L212.5 282.55L287.5 239.25V195.95L212.5 239.25V195.95Z"
                                                        fill={theme.palette.primary.main}
                                                    />
                                                    <path
                                                        d="M212.5 282.55V325.85L287.5 369.15V325.85L212.5 282.55Z"
                                                        fill={theme.palette.primary[800]}
                                                    />
                                                    <path
                                                        d="M287.5 369.15L400 304.2V217.6L362.5 239.25V282.55L287.5 325.85V369.15ZM362.5 195.95V152.65L400 131V174.3L362.5 195.95Z"
                                                        fill={theme.palette.primary.main}
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0">
                                                        <rect width="300" height="238.3" fill="white" transform="translate(100 131)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </Avatar>
                                    </Grid>
                                    <Grid item xs zeroMinWidth>
                                        <Typography
                                            variant="h4"
                                            component="div"
                                            color="inherit"
                                            sx={{ fontWeight: '400', lineHeight: '24px' }}
                                        >
                                            <b>Built with Material-UI &#169;</b> - The most popular React Component Library.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={7} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Box sx={{ position: 'relative', mt: '70px' }}>
                        <img src={dashboard} alt="Berry" className={classes.headerMain} />
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '-110px',
                                right: '-170px',
                                width: '290px',
                                animation: '10s slideY linear infinite'
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 30,
                                    delay: 0.2
                                }}
                            >
                                <img src={widget1} alt="Berry" className={classes.headerImg} />
                            </motion.div>
                        </Box>
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: '-90px',
                                left: '300px',
                                width: '280px',
                                animation: '10s slideY linear infinite',
                                animationDelay: '2s'
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 30,
                                    delay: 0.4
                                }}
                            >
                                <img src={widget2} alt="Berry" className={classes.headerImg} />
                            </motion.div>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HeaderPage;
