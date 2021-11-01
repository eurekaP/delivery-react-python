import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { FormControlLabel, Radio } from '@material-ui/core';

//-----------------------|| CALENDAR COLOR PALETTE ||-----------------------//

const ColorPalette = ({ color, label, value }) => {
    return (
        <FormControlLabel
            value={value}
            control={
                <Radio
                    sx={{
                        color: color,
                        '&.Mui-checked': { color: color }
                    }}
                />
            }
            label={label ? label : ''}
            sx={{ pr: label ? 1 : 0 }}
        />
    );
};

ColorPalette.propTypes = {
    color: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string
};

export default ColorPalette;
