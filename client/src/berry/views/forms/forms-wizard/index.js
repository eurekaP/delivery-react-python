import React from 'react';

// material-ui
import { Grid } from '@material-ui/core';

// project imports
import BasicWizard from './BasicWizard';
import ValidationWizard from './ValidationWizard';
import { gridSpacing } from '../../../store/constant';

//-----------------------|| FORMS WIZARD ||-----------------------//

const FormsWizard = () => {
    return (
        <Grid container spacing={gridSpacing} justifyContent="center">
            <Grid item xs={12} md={9} lg={7}>
                <BasicWizard />
            </Grid>
            <Grid item xs={12} md={9} lg={7}>
                <ValidationWizard />
            </Grid>
        </Grid>
    );
};

export default FormsWizard;
