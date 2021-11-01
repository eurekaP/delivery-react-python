import React from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import { Button, FormControl, FormHelperText, Grid, InputLabel, Select, Stack, MenuItem } from '@material-ui/core';

// project imports
import MainCard from './../../../ui-component/cards/MainCard';
import AnimateButton from './../../../ui-component/extended/AnimateButton';
import { SNACKBAR_OPEN } from './../../../store/actions';
import { gridSpacing } from './../../../store/constant';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    age: yup.number('Enter your age').required('Age selection is required.')
});

//-----------------------|| FORM VALIDATION - LOGIN FORMIK  ||-----------------------//

const SelectForms = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            age: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Select - Submit Success',
                variant: 'alert',
                alertSeverity: 'success'
            });
        }
    });

    return (
        <MainCard title="Select">
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="age-select">Age</InputLabel>
                            <Select
                                labelId="age-select"
                                id="age"
                                name="age"
                                defaultValue={formik.values.age}
                                onChange={formik.handleChange}
                                label="Age"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            {formik.errors.age && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {' '}
                                    {formik.errors.age}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>
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

export default SelectForms;
