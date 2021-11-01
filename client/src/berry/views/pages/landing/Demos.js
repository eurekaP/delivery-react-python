import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonBase, Container, Grid, Typography } from '@material-ui/core';

// project imports
import FadeInWhenVisible from './Animation';
import AnimateButton from './../../../ui-component/extended/AnimateButton';
import { gridSpacing } from './../../../store/constant';

// assets
import imgDemo1 from './../../../assets/images/landing/img-demo-1.jpg';
import imgDemo2 from './../../../assets/images/landing/img-demo-2.jpg';
import imgDemo3 from './../../../assets/images/landing/img-demo-3.jpg';

// style constant
const useStyles = makeStyles((theme) => ({
    demoImage: {
        width: '100%',
        borderRadius: '12px'
    }
}));

//==============================|| LANDING - DEMOS PAGE ||==============================//

const DemosPage = () => {
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
                                        Demos
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h2" component="div">
                                Pre-build Dashboard &#38; Apps
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2">
                                Berry has customized pages with Material-UI components, Apps, Forms and lots more to explore.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={gridSpacing} sx={{ textAlign: 'center' }}>
                        <Grid item md={4} sm={6}>
                            <FadeInWhenVisible>
                                <ButtonBase component={RouterLink} to="/dashboard/default" target="_blank">
                                    <img src={imgDemo1} alt="Berry Dashboard" className={classes.demoImage} />
                                </ButtonBase>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item md={4} sm={6}>
                            <FadeInWhenVisible>
                                <ButtonBase component={RouterLink} to="/user/social-profile/posts" target="_blank">
                                    <img src={imgDemo2} alt="Berry Social App" className={classes.demoImage} />
                                </ButtonBase>
                            </FadeInWhenVisible>
                        </Grid>
                        <Grid item md={4} sm={6}>
                            <FadeInWhenVisible>
                                <ButtonBase component={RouterLink} to="/app/mail" target="_blank">
                                    <img src={imgDemo3} alt="Berry Mail App" className={classes.demoImage} />
                                </ButtonBase>
                            </FadeInWhenVisible>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center', mt: 3 }}>
                    <AnimateButton>
                        <Button
                            component={RouterLink}
                            to="/components/autocomplete"
                            target="_blank"
                            variant="outlined"
                            size="large"
                            color="primary"
                        >
                            Explore Components
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>
        </Container>
    );
};

export default DemosPage;
