import * as React from 'react';

// material-ui
import { InputAdornment, TextField } from '@material-ui/core';
import { LocalizationProvider, MobileDateTimePicker } from '@material-ui/lab';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';

// assets
import DateRangeIcon from '@material-ui/icons/DateRange';

//-----------------------|| CUSTOM DATETIME ||-----------------------//

const CustomDateTime = () => {
    const [value, setValue] = React.useState(new Date('2019-01-01T18:54'));

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDateTimePicker
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                label="Basic Datetime Picker"
                onError={console.log}
                minDate={new Date('2018-01-01T00:00')}
                inputFormat="yyyy/MM/dd hh:mm a"
                mask="___/__/__ __:__ _M"
                renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <DateRangeIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                )}
            />
        </LocalizationProvider>
    );
};

export default CustomDateTime;
