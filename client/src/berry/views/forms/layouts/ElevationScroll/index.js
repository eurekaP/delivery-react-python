import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useMediaQuery, useScrollTrigger, useTheme } from '@material-ui/core';

//-----------------------|| elevation scroll ||-----------------------//
function ElevationScroll({ children, window }) {
    
    const theme = useTheme();
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const matchDown = useMediaQuery(theme.breakpoints.down('md'));

    const fullStickyLeft = leftDrawerOpened ? '281px' : '42px';

    const responsiveTop = matchDown ? '80px' : '83px';
    const responsiveRight = matchDown ? '38px' : '41px';
    const responsiveLeft = matchDown ? '38px' : fullStickyLeft;


    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 180,
        target: window ? window() : undefined
    });

    return React.cloneElement(children, {
        style: {
            backgroundColor: theme.palette.background.default,
            zIndex: 1099,
            borderTop: trigger ? '1px solid' : 'none',
            borderBottom: trigger ? '1px solid' : 'none',
            borderColor: trigger ? theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.grey[200] : '',
            position: trigger ? 'fixed' : 'relative',

            top: trigger ? responsiveTop : 'auto',
            right: trigger ? responsiveRight : 'auto',
            left: trigger ? responsiveLeft : 'auto'
        }
    });
}
ElevationScroll.propTypes = {
    children: PropTypes.node,
    window: PropTypes.object
};
export default ElevationScroll;
