import React from 'react';

// material-ui
import { Grid, ToggleButton, ToggleButtonGroup } from '@material-ui/core';

// assets
import FormatBoldIcon from '@material-ui/icons/FormatBoldTwoTone';
import FormatItalicIcon from '@material-ui/icons/FormatItalicTwoTone';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlinedTwoTone';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFillTwoTone';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDownTwoTone';

//============================|| UI TOGGLE BUTTON - MULTIPLE ||============================//

export default function ToggleButtonsMultiple() {
    const [formats, setFormats] = React.useState(() => ['bold', 'italic']);
    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
    };

    return (
        <Grid container justifyContent="center">
            <ToggleButtonGroup value={formats} onChange={handleFormat} aria-label="text formatting" color="secondary">
                <ToggleButton value="bold" aria-label="bold">
                    <FormatBoldIcon />
                </ToggleButton>
                <ToggleButton value="italic" aria-label="italic">
                    <FormatItalicIcon />
                </ToggleButton>
                <ToggleButton value="underlined" aria-label="underlined">
                    <FormatUnderlinedIcon />
                </ToggleButton>
                <ToggleButton value="color" aria-label="color" disabled>
                    <FormatColorFillIcon />
                    <ArrowDropDownIcon />
                </ToggleButton>
            </ToggleButtonGroup>
        </Grid>
    );
}
