import React from 'react';

// material-ui
import { useTheme } from '@material-ui/core';
import { Grid, ToggleButton, ToggleButtonGroup } from '@material-ui/core';

// assets
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeftTwoTone';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenterTwoTone';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRightTwoTone';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustifyTwoTone';

//============================|| UI TOGGLE BUTTON - SIZE ||============================//

export default function ToggleButtonSizes() {
    const theme = useTheme();

    const [alignment, setAlignment] = React.useState('left');
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
                <ToggleButtonGroup size="small" value={alignment} exclusive onChange={handleChange}>
                    <ToggleButton value="left">
                        <FormatAlignLeftIcon fontSize="small" />
                    </ToggleButton>
                    <ToggleButton value="center">
                        <FormatAlignCenterIcon fontSize="small" />
                    </ToggleButton>
                    <ToggleButton value="right">
                        <FormatAlignRightIcon fontSize="small" />
                    </ToggleButton>
                    <ToggleButton value="justify">
                        <FormatAlignJustifyIcon fontSize="small" />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Grid item>
                <ToggleButtonGroup
                    size="medium"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    color="secondary"
                    sx={{ color: 'secondary.dark', bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'secondary.light' }}
                >
                    <ToggleButton value="left">
                        <FormatAlignLeftIcon />
                    </ToggleButton>
                    <ToggleButton value="center">
                        <FormatAlignCenterIcon />
                    </ToggleButton>
                    <ToggleButton value="right">
                        <FormatAlignRightIcon />
                    </ToggleButton>
                    <ToggleButton value="justify">
                        <FormatAlignJustifyIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Grid item>
                <ToggleButtonGroup
                    size="large"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    color="primary"
                    sx={{ color: 'primary.dark', bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'primary.light' }}
                >
                    <ToggleButton value="left">
                        <FormatAlignLeftIcon />
                    </ToggleButton>
                    <ToggleButton value="center">
                        <FormatAlignCenterIcon />
                    </ToggleButton>
                    <ToggleButton value="right">
                        <FormatAlignRightIcon />
                    </ToggleButton>
                    <ToggleButton value="justify">
                        <FormatAlignJustifyIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>
        </Grid>
    );
}
