import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { CardMedia, Grid } from '@material-ui/core';

// third party
import Carousel from 'react-material-ui-carousel';

// assets
import imageSlider1 from './../../../../../assets/images/maintenance/img-slider-layout1.png';
import imageSlider2 from './../../../../../assets/images/maintenance/img-slider-layout2.png';
import imageSlider3 from './../../../../../assets/images/maintenance/img-slider-layout3.png';

//================================|| SLIDER - ITEMS ||================================//

const Item = ({ item }) => {
    return (
        <Grid container direction="column" alignItems="center" spacing={3} textAlign="center">
            <Grid item>
                <CardMedia component="img" image={item.image} title="Slider5 image" />
            </Grid>
        </Grid>
    );
};

Item.propTypes = {
    item: PropTypes.object.isRequired
};

//================================|| SLIDER ||================================//

const Slider = () => {
    const items = [
        {
            image: imageSlider1
        },
        {
            image: imageSlider2
        },
        {
            image: imageSlider3
        }
    ];
    return (
        <Carousel animation="slide" indicators={false}>
            {items.map((item, index) => (
                <Item key={index} item={item} />
            ))}
        </Carousel>
    );
};

export default Slider;
