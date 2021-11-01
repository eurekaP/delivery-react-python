import React from 'react';

// material-ui
import { Grid, ToggleButton } from '@material-ui/core';

// assets
import CheckIcon from '@material-ui/icons/CheckTwoTone';

//============================|| UI TOGGLE BUTTON - STANDALONE ||============================//

export default function StandaloneToggleButton() {
    const [selected, setSelected] = React.useState(false);

    return (
        <Grid container justifyContent="center">
            <ToggleButton
                value="check"
                onChange={() => {
                    setSelected(!selected);
                }}
                sx={{ color: 'success.dark', bgcolor: 'success.light' }}
            >
                <CheckIcon />
            </ToggleButton>
        </Grid>
    );
}
