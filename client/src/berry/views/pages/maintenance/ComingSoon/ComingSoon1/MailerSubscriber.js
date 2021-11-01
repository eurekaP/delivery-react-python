import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput } from '@material-ui/core';

// third party
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import clsx from 'clsx';
import * as Yup from 'yup';
import axios from 'axios';

// project imports
import AnimateButton from './../../../../../ui-component/extended/AnimateButton';
import useScriptRef from './../../../../../hooks/useScriptRef';
import { SNACKBAR_OPEN } from './../../../../../store/actions';
import { gridSpacing } from './../../../../../store/constant';

// style constant
const useStyles = makeStyles((theme) => ({
    root: {}
}));

//===========================|| MAILER SUBSCRIBER ||===========================//

const MailerSubscriber = ({ className, ...others }) => {
    const scriptedRef = useScriptRef();
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <Formik
            initialValues={{
                email: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    const options = {
                        headers: {
                            'content-type': 'application/json'
                        }
                    };
                    await axios.post('https://yourapicall', { email: values.email }, options);
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: 'Success! Please check inbox and confirm.',
                        variant: 'alert',
                        alertSeverity: 'success'
                    });

                    if (scriptedRef.current) {
                        setStatus({ success: true });
                        setSubmitting(false);
                    }
                } catch (err) {
                    if (scriptedRef.current) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} className={clsx(classes.root, className)} {...others}>
                    <Grid container alignItems="center" spacing={gridSpacing}>
                        <Grid item xs zeroMinWidth>
                            <FormControl fullWidth error={Boolean(touched.email && errors.email)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-email-forgot">Email Address</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-email-forgot"
                                    type="email"
                                    defaultValue={values.email}
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Email Address"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    color="primary"
                                    sx={{ p: '12px 22px' }}
                                >
                                    Subscribe
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                    {touched.email && errors.email && (
                        <Box mt={1}>
                            <FormHelperText error id="standard-weight-helper-text-email-forgot">
                                {' '}
                                {errors.email}{' '}
                            </FormHelperText>
                        </Box>
                    )}
                    {errors.submit && (
                        <Box mt={3}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                </form>
            )}
        </Formik>
    );
};

export default MailerSubscriber;
