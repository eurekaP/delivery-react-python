import React from 'react';

// material-ui
import { Button, Grid, Typography } from '@material-ui/core';

// project imports
import GalleryCard from './../../../../ui-component/cards/GalleryCard';
import MainCard from './../../../../ui-component/cards/MainCard';
import axios from './../../../../utils/axios';
import { gridSpacing } from './../../../../store/constant';

//-----------------------|| SOCIAL PROFILE - GALLERY ||-----------------------//

const Gallery = () => {
    const [gallery, setGallery] = React.useState([]);
    const getGallery = async () => {
        const response = await axios.get('/api/gallery/list');
        setGallery(response.data.gallery);
    };

    React.useEffect(() => {
        getGallery();
    }, []);

    let galleryResult = '';
    if (gallery) {
        galleryResult = gallery.map((item, index) => {
            return (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <GalleryCard {...item} />
                </Grid>
            );
        });
    }

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">Gallery</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="secondary">
                            Add Photos
                        </Button>
                    </Grid>
                </Grid>
            }
        >
            <Grid container direction="row" spacing={gridSpacing}>
                {galleryResult}
            </Grid>
        </MainCard>
    );
};

export default Gallery;
