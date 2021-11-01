import * as React from 'react';

// material-ui
import { Grid, Box } from '@material-ui/core';

// project imports
import Item from './GridItem';

//===============================|| GRID - COLUMN ||===============================//

export default function ColumnsGrid() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16}>
                <Grid item xs={8}>
                    <Item>xs=8</Item>
                </Grid>
                <Grid item xs={8}>
                    <Item>xs=8</Item>
                </Grid>
            </Grid>
        </Box>
    );
}
