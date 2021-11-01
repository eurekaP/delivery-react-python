import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { Divider, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import MUIFormControl from '@material-ui/core/FormControl';

//-----------------------|| FORM CONTROL ||-----------------------//

const FormControl = ({ captionLabel, formState, iconPrimary, iconSecondary, placeholder, textPrimary, textSecondary }) => {
    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary ? <IconPrimary fontSize="small" sx={{ color: 'grey.700' }} /> : null;

    const IconSecondary = iconSecondary;
    const secondaryIcon = iconSecondary ? <IconSecondary fontSize="small" sx={{ color: 'grey.700' }} /> : null;

    const errorState = formState === 'error' ? true : false;

    return (
        <MUIFormControl fullWidth variant="outlined" error={errorState}>
            <InputLabel>{captionLabel}</InputLabel>
            <OutlinedInput
                placeholder={placeholder}
                type="text"
                label={captionLabel}
                startAdornment={
                    <React.Fragment>
                        {primaryIcon && <InputAdornment position="start">{primaryIcon}</InputAdornment>}
                        {textPrimary && (
                            <React.Fragment>
                                <InputAdornment position="start">{textPrimary}</InputAdornment>
                                <Divider sx={{ height: 28, m: 0.5, mr: 1.5 }} orientation="vertical" />
                            </React.Fragment>
                        )}
                    </React.Fragment>
                }
                endAdornment={
                    <React.Fragment>
                        {secondaryIcon && <InputAdornment position="end">{secondaryIcon}</InputAdornment>}
                        {textSecondary && (
                            <React.Fragment>
                                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                <InputAdornment position="end">{textSecondary}</InputAdornment>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                }
            />
        </MUIFormControl>
    );
};

FormControl.propTypes = {
    captionLabel: PropTypes.string,
    formState: PropTypes.string,
    iconPrimary: PropTypes.object,
    iconSecondary: PropTypes.object,
    placeholder: PropTypes.string,
    textPrimary: PropTypes.string,
    textSecondary: PropTypes.string
};

export default FormControl;
