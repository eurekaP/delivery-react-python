import React from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import { Button, Grid, Stack, TextField } from '@material-ui/core';

// project imports
import MainCard from './../../../ui-component/cards/MainCard';
import AnimateButton from './../../../ui-component/extended/AnimateButton';
import { SNACKBAR_OPEN } from './../../../store/actions';
import { gridSpacing } from './../../../store/constant';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    emailInstant: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
    passwordInstant: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required')
});

//-----------------------|| FORM VALIDATION - INSTANT FEEDBACK FORMIK  ||-----------------------//

const InstantFeedback = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            emailInstant: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'On Leave - Submit Success',
                variant: 'alert',
                alertSeverity: 'success'
            });
        }
    });

    return (
        <MainCard title="On Leave">
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="emailInstant"
                            name="emailInstant"
                            label="Email"
                            defaultValue={formik.values.emailInstant}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.emailInstant && Boolean(formik.errors.emailInstant)}
                            helperText={formik.touched.emailInstant && formik.errors.emailInstant}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="passwordInstant"
                            name="passwordInstant"
                            label="Password"
                            type="password"
                            defaultValue={formik.values.passwordInstant}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.passwordInstant && Boolean(formik.errors.passwordInstant)}
                            helperText={formik.touched.passwordInstant && formik.errors.passwordInstant}
                        />
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

export default InstantFeedback;
