import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

// third-party
import Carousel from 'react-material-ui-carousel';

// style constant
const useStyles = makeStyles((theme) => ({
    indicator: {
        color: theme.palette.secondary.light,
        '&:hover': {
            color: theme.palette.secondary.main
        }
    },
    activeIndicator: {
        color: theme.palette.secondary.main
    }
}));

//-----------------------|| CAROUSEL ITEMS ||-----------------------//

const Item = ({ item }) => {
    return (
        <Grid container direction="column" alignItems="center" spacing={3} textAlign="center">
            <Grid item {...{}/* md={4} material4 */} width={425}>
                <Typography variant="h1">{item.title}</Typography>
            </Grid>
            <Grid item {...{}/* md={2} material4*/} width={200}>
                <Typography variant="subtitle2">{item.description}</Typography>
            </Grid>
        </Grid>
    );
};

Item.propTypes = {
    item: PropTypes.object.isRequired
};

//-----------------------|| CAROUSEL ||-----------------------//

const BCarousel = ({ items }) => {
    const classes = useStyles();

    return (
        <Carousel
            animation="slide"
            navButtonsAlwaysInvisible
            autoPlay={false}
            indicatorIconButtonProps={{
                className: classes.indicator
            }}
            activeIndicatorIconButtonProps={{
                className: classes.activeIndicator
            }}
            indicatorContainerProps={{
                style: {
                    marginTop: '32px'
                }
            }}
        >
            {items.map((item, i) => (
                <Item key={i} item={item} />
            ))}
        </Carousel>
    );
};

BCarousel.propTypes = {
    items: PropTypes.array.isRequired
};

export default BCarousel;
