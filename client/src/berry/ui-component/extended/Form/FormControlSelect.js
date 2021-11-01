import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { Divider, FormControl, InputAdornment, MenuItem, TextField } from '@material-ui/core';

//-----------------------|| FORM CONTROL SELECT ||-----------------------//

const FormControlSelect = ({ captionLabel, currencies, formState, iconPrimary, iconSecondary, selected, textPrimary, textSecondary }) => {
    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary ? <IconPrimary fontSize="small" sx={{ color: 'grey.700' }} /> : null;

    const IconSecondary = iconSecondary;
    const secondaryIcon = iconSecondary ? <IconSecondary fontSize="small" sx={{ color: 'grey.700' }} /> : null;

    const errorState = formState === 'error' ? true : false;
    const val = selected ? selected : '';

    const [currency, setCurrency] = React.useState(val);
    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    return (
        <FormControl fullWidth variant="outlined" error={errorState}>
            <TextField
                id="outlined-select-currency"
                select
                fullWidth
                label={captionLabel}
                value={currency}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                    startAdornment: (
                        <React.Fragment>
                            {primaryIcon && <InputAdornment position="start">{primaryIcon}</InputAdornment>}
                            {textPrimary && (
                                <React.Fragment>
                                    <InputAdornment position="start">{textPrimary}</InputAdornment>
                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    ),
                    endAdornment: (
                        <React.Fragment>
                            {secondaryIcon && <InputAdornment position="end">{secondaryIcon}</InputAdornment>}
                            {textSecondary && (
                                <React.Fragment>
                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                    <InputAdornment position="end">{textSecondary}</InputAdornment>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    )
                }}
            >
                {currencies.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </FormControl>
    );
};

FormControlSelect.propTypes = {
    captionLabel: PropTypes.string,
    currencies: PropTypes.array,
    formState: PropTypes.string,
    iconPrimary: PropTypes.object,
    iconSecondary: PropTypes.object,
    selected: PropTypes.string,
    textPrimary: PropTypes.string,
    textSecondary: PropTypes.string
};

export default FormControlSelect;
