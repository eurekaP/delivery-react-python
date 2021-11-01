import PropTypes from 'prop-types';
import React from 'react';

// third-party
import Carousel from 'react-images';

//-----------------------|| POPUP IMAGES BOX / LIGHT BOX ||-----------------------//

const LightBox = ({ currentImage, photos }) => {
    return (
        <React.Fragment>
            <Carousel
                currentIndex={currentImage}
                views={photos.map((x) => ({
                    ...x,
                    srcset: x.srcSet,
                    caption: x.title
                }))}
            />
        </React.Fragment>
    );
};

LightBox.propTypes = {
    currentImage: PropTypes.string,
    photos: PropTypes.array
};

export default LightBox;
