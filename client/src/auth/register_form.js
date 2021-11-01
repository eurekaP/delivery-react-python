import React from 'react'
import { Link } from 'react-router-dom'
import { inject } from 'mobx-react'

import { Box,
    Grid, Typography,
} from '@material-ui/core'

import * as yup from 'yup'
import { useFormik } from 'formik'

import { Input, EmailInput, validators, InputGroup, PasswordInput } from '../lib/fields'
import { FormWithSubmitButton } from '../lib/forms'

import config from '../config'
import { CheckboxWithError } from '../theme/components'

const RegisterForm = inject('auth')( ({ auth, ...others }) => {
    // const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const f = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: '',
            tos_accepted: false,
        },
        validationSchema: yup.object().shape({
            email: validators.email.required('Enter Email Address'),
            password: validators.password.required('Enter Password'),
            name: validators.name,
            tos_accepted: validators.termsAgree
        }),
        onSubmit: async (values, { setErrors, setSubmitting }) => {
            if (!values.tos_accepted) {
                setErrors({tos_accepted: 'Please accept the terms and conditions to sign up!'})
                return
            }
            try {
                await auth.register( values.email, values.password, values.name)
            } catch (err) {
                setErrors( err)
            } finally {
                setSubmitting(false)
            }
        }
    })

    return (
    <>
        <FormWithSubmitButton formik={f} submitButtonText='Sign up' {...others}>
            <Grid container>
                <Grid item xs={12}>
                    <InputGroup>
                        <Input name="name" label="Full Name" type="text" formik={f} />
                    </InputGroup>
                </Grid>
                <Grid item xs={12}>
                    <InputGroup>
                        <EmailInput required name="email" formik={f} disableAutoFill />
                    </InputGroup>
                </Grid>
                <Grid item xs={12}>
                    <InputGroup marginBottom="35px">
                        <PasswordInput required name="password" label="Password" formik={f} disableAutoFill newPassword />
                    </InputGroup>
                </Grid>
            </Grid>

            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item xs={12}>
                    <Box marginBottom={6}>
                        <CheckboxWithError
                             label={
                                <Typography variant="subtitle1">
                                    Agree with&nbsp;
                                    <Typography variant="subtitle1" component={Link} to={{ pathname: config.urls.tos}} target="_blank" >
                                        Terms &#38; Conditions.
                                    </Typography>
                                </Typography>
                            }
                            fullWidth
                            checked= {f.values.tos_accepted}
                            onChange={ f.handleChange}
                            name={"tos_accepted"}
                            helperText={f.touched.tos_accepted && f.errors.tos_accepted}
                            onBlur={f.handleBlur}
                        />
                    </Box>
                </Grid>
            </Grid>
        </FormWithSubmitButton>
    </>
    )
})

export default RegisterForm

// vim:ts=4:sw=4:expandtab
