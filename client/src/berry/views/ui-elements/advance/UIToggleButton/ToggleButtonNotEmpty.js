import React from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, ToggleButton, ToggleButtonGroup } from '@material-ui/core';

// assets
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeftTwoTone';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenterTwoTone';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRightTwoTone';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustifyTwoTone';
import LaptopIcon from '@material-ui/icons/LaptopTwoTone';
import TvIcon from '@material-ui/icons/TvTwoTone';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroidTwoTone';

// style constant
const useStyles = makeStyles((theme) => ({
    toggleContainer: {
        margin: theme.spacing(2, 0)
    }
}));

//============================|| UI TOGGLE BUTTON - NO EMPTY ||============================//

export default function ToggleButtonNotEmpty() {
    const classes = useStyles();
    const theme = useTheme();

    const [formats, setFormats] = React.useState(() => ['phone']);
    const handleFormat = (event, newFormats) => {
        if (newFormats.length) {
            setFormats(newFormats);
        }
    };

    const [alignment, setAlignment] = React.useState('left');
    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    return (
        <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item xs={12}>
                <div className={classes.toggleContainer}>
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                        sx={{ color: 'success.dark', bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'primary.light' }}
                    >
                        <ToggleButton value="left" aria-label="left aligned">
                            <FormatAlignLeftIcon />
                        </ToggleButton>
                        <ToggleButton value="center" aria-label="centered">
                            <FormatAlignCenterIcon />
                        </ToggleButton>
                        <ToggleButton value="right" aria-label="right aligned">
                            <FormatAlignRightIcon />
                        </ToggleButton>
                        <ToggleButton value="justify" aria-label="justified" disabled>
                            <FormatAlignJustifyIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </Grid>
            <Grid item xs={12}>
                <div className={classes.toggleContainer}>
                    <ToggleButtonGroup
                        value={formats}
                        onChange={handleFormat}
                        aria-label="device"
                        sx={{ color: 'warning.dark', bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'primary.light' }}
                    >
                        <ToggleButton value="laptop" aria-label="laptop">
                            <LaptopIcon />
                        </ToggleButton>
                        <ToggleButton value="tv" aria-label="tv">
                            <TvIcon />
                        </ToggleButton>
                        <ToggleButton value="phone" aria-label="phone">
                            <PhoneAndroidIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </Grid>
        </Grid>
    );
}
