import * as React from 'react';

// material-ui
import { Grid, Box } from '@material-ui/core';

// project imports
import Item from './GridItem';

//===============================|| GRID - AUTO ||===============================//

export default function AutoGrid() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Item>xs</Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>xs=6</Item>
                </Grid>
                <Grid item xs>
                    <Item>xs</Item>
                </Grid>
            </Grid>
        </Box>
    );
}
