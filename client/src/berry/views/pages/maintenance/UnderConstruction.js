import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';

// project imports
import config from './../../../config';
import AnimateButton from './../../../ui-component/extended/AnimateButton';
import { gridSpacing } from './../../../store/constant';

// assets
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';

import image from './../../../assets/images/maintenance/img-build.svg';
import imageBackground from './../../../assets/images/maintenance/img-bg-grid.svg';
import imageParts from './../../../assets/images/maintenance/img-bg-parts.svg';

// style constant
const useStyles = makeStyles((theme) => ({
    errorImg: {
        maxWidth: '600px',
        margin: '0 auto',
        position: 'relative'
    },
    errorContent: {
        maxWidth: '350px',
        margin: '0 auto',
        textAlign: 'center'
    },
    constructionBlock: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgBuild: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        animation: '5s bounce ease-in-out infinite'
    },
    imgParts: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        animation: '10s blink ease-in-out infinite'
    },
    imgBackground: {
        animation: '5s blink ease-in-out infinite'
    }
}));

//========================|| UNDER CONSTRUCTION PAGE ||========================//

const UnderConstruction = () => {
    const classes = useStyles();

    return (
        <Card className={classes.constructionBlock}>
            <CardContent>
                <Grid container justifyContent="center" spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <div className={classes.errorImg}>
                            <CardMedia component="img" image={imageBackground} title="Slider5 image" className={classes.imgBackground} />
                            <CardMedia component="img" image={imageParts} title="Slider5 image" className={classes.imgParts} />
                            <CardMedia component="img" image={image} title="Slider5 image" className={classes.imgBuild} />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.errorContent}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Typography variant="h1" component="div">
                                        Under Construction
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                        This site is on under construction!! Please check after some time
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <AnimateButton>
                                        <Button variant="contained" size="large" color="primary" component={Link} to={config.defaultPath}>
                                            <HomeTwoToneIcon sx={{ fontSize: '1.3rem', mr: 0.75 }} /> Home
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default UnderConstruction;
