import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Button, CardActions, CardContent, CardMedia, Divider, Grid, Typography } from '@material-ui/core';

// project imports
import MainCard from './../../../ui-component/cards/MainCard';
import { gridSpacing } from './../../../store/constant';

// assets
import Dashboard1 from './../../../assets/images/widget/dashborad-1.jpg';
import Dashboard2 from './../../../assets/images/widget/dashborad-3.jpg';

// style constant
const useStyles = makeStyles((theme) => ({
    mediaPost: {
        width: '90px',
        height: '80px',
        borderRadius: '12px'
    }
}));

//===========================|| DATA WIDGET - LATEST POSTS CARD ||===========================//

const LatestPosts = ({ title }) => {
    const classes = useStyles();

    return (
        <MainCard title={title} content={false}>
            <CardContent>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <CardMedia component="img" image={Dashboard1} title="image" className={classes.mediaPost} />
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography align="left" component="div" variant="subtitle1">
                                            Up unpacked friendly
                                        </Typography>
                                        <Typography align="left" component="div" variant="caption">
                                            Video | 14 minutes ago
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <CardMedia
                                    component="iframe"
                                    src="https://www.youtube.com/embed/668nUCeBHyY"
                                    title="image"
                                    className={classes.mediaPost}
                                />
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography align="left" component="div" variant="subtitle1">
                                            Up unpacked friendly
                                        </Typography>
                                        <Typography align="left" component="div" variant="caption">
                                            Video | 14 minutes ago
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <CardMedia component="img" image={Dashboard2} title="image" className={classes.mediaPost} />
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography align="left" component="div" variant="subtitle1">
                                            Up unpacked friendly
                                        </Typography>
                                        <Typography align="left" component="div" variant="caption">
                                            Video | 14 minutes ago
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="text" size="small" color="primary">
                    View Friend List
                </Button>
            </CardActions>
        </MainCard>
    );
};

LatestPosts.propTypes = {
    title: PropTypes.string
};

export default LatestPosts;
