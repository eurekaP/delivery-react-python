import React from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import { Button, Grid, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, Stack } from '@material-ui/core';

// project imports
import MainCard from './../../../ui-component/cards/MainCard';
import AnimateButton from './../../../ui-component/extended/AnimateButton';
import { SNACKBAR_OPEN } from './../../../store/actions';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    color: yup.string('Select your favorite color').required('Color selection is required')
});

//-----------------------|| FORM VALIDATION - RADIO GROUP FORMIK  ||-----------------------//

const RadioGroupForms = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            color: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Radio - Submit Success',
                variant: 'alert',
                alertSeverity: 'success'
            });
        }
    });

    return (
        <MainCard title="Radio">
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-label="color"
                                defaultValue={formik.values.color}
                                onChange={formik.handleChange}
                                name="color"
                                id="color"
                            >
                                <FormControlLabel
                                    value="primary"
                                    control={
                                        <Radio
                                            sx={{
                                                color: 'primary.main',
                                                '&.Mui-checked': { color: 'primary.main' }
                                            }}
                                        />
                                    }
                                    label="Primary"
                                />
                                <FormControlLabel
                                    value="error"
                                    control={
                                        <Radio
                                            sx={{
                                                color: 'error.main',
                                                '&.Mui-checked': { color: 'error.main' }
                                            }}
                                        />
                                    }
                                    label="Error"
                                />
                                <FormControlLabel
                                    value="secondary"
                                    control={
                                        <Radio
                                            sx={{
                                                color: 'secondary.main',
                                                '&.Mui-checked': { color: 'secondary.main' }
                                            }}
                                        />
                                    }
                                    label="Secondary"
                                />
                            </RadioGroup>
                        </FormControl>
                        {formik.errors.color && (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                {' '}
                                {formik.errors.color}{' '}
                            </FormHelperText>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button color="primary" variant="contained" type="submit">
                                    Submit
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
};

export default RadioGroupForms;
