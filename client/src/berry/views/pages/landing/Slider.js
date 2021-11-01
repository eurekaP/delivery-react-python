import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';

// third party
import Carousel from 'react-material-ui-carousel';

// assets
import imgLayout1 from './../../../assets/images/landing/demo-dark.png';
import imgLayout2 from './../../../assets/images/landing/demo-rtl.png';
import imgLayout3 from './../../../assets/images/landing/demo-multi.png';
import imgLayoutGrid1 from './../../../assets/images/landing/img-lay-grid1.png';

// style constant
const useStyles = makeStyles((theme) => ({
    layoutImage: {
        width: '100%',
        position: 'relative'
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
    }
}));

//=============================|| SLIDER ITEMS ||=============================//

const Item = ({ item }) => {
    const classes = useStyles();
    return (
        <Grid container alignItems="center" justifyContent="center" spacing={3} textAlign="center">
            <Grid item xs={11}>
                <Box className={classes.layoutImage}>
                    <img src={item.bg} alt="Berry" className={classes.layoutGridImg} />
                    <img src={item.image} alt="Berry" className={classes.layoutImgAnimate} />
                </Box>
            </Grid>
            <Grid item xs={10}>
                <Grid container direction="column" alignItems="center" spacing={3} textAlign="center">
                    <Grid item sm={12}>
                        <Typography variant="h4" component="div">
                            {item.title}
                        </Typography>
                    </Grid>
                    <Grid item sm={12}>
                        <Typography variant="body2">{item.content}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

Item.propTypes = {
    item: PropTypes.object.isRequired
};

//==============================|| LANDING - SLIDER PAGE ||==============================//

const SliderPage = () => {
    const items = [
        {
            bg: imgLayoutGrid1,
            image: imgLayout1,
            title: 'Dark Layout',
            content: 'Modern, sleek and elegant dark color scheme that looks great in a dark variant.'
        },
        {
            bg: imgLayoutGrid1,
            image: imgLayout2,
            title: 'RTL',
            content: 'Fully Support Right-to-left (RTL) design variant.'
        },
        {
            bg: imgLayoutGrid1,
            image: imgLayout3,
            title: 'Multi-language Support',
            content: 'Support Multi-language. Added 4 pre-filled language.'
        }
    ];

    return (
        <Carousel animation="slide" indicators={true}>
            {items.map((item, index) => (
                <Item key={index} item={item} />
            ))}
        </Carousel>
    );
};

export default SliderPage;
