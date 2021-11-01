import * as React from 'react';

// material-ui
import { Grid, Box } from '@material-ui/core';

// project imports
import Item from './GridItem';

//===============================|| GRID - MULTIPLE BREAKPOINTS ||===============================//

export default function MultipleBreakPoints() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                    <Item>xs=6 md=8</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item>xs=6 md=4</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item>xs=6 md=4</Item>
                </Grid>
                <Grid item xs={6} md={8}>
                    <Item>xs=6 md=8</Item>
                </Grid>
            </Grid>
        </Box>
    );
}
