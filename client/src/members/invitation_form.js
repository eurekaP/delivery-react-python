import React, {useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { inject } from 'mobx-react'

import { Box,
    Grid, Typography,
} from '@material-ui/core'

import * as yup from 'yup'
import { useFormik } from 'formik'

import { Input, validators, InputGroup, PasswordInput, } from '../lib/fields'
import { FormWithSubmitButton } from '../lib/forms'

import config from '../config'
import { CheckboxWithError } from '../theme/components'

const InvitationAcceptForm = inject('auth')( ({ auth, linkProps, ...others }) => {
    // const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    let { token } = useParams()
    /* eslint-disable */
    const [non_field_errors, setNonFieldErrors] = useState([])
    const f = useFormik({
        initialValues: {
            password: '',
            password2: '',
            name: '',
            tos_accepted: false,
        },
        validationSchema: yup.object().shape({
            password: validators.password.required('Enter Password'),
            password2: validators.password2.required('Please re-enter your password'),
            name: validators.name,
            tos_accepted: validators.termsAgree
        }),
        onSubmit: async (values, { setErrors, setSubmitting }) => {
            if (!values.tos_accepted) {
                setErrors({tos_accepted: 'Please accept the terms and conditions to join!'})
                return
            }
            try {
                await auth.acceptInvite( token, values.password, values.name)
            } catch (err) {
                if ( err.non_field_errors)
                    setNonFieldErrors( err.non_field_errors)
                setErrors( err)
            } finally {
                setSubmitting(false)
            }
        }
    })

    return (
    <>
        <FormWithSubmitButton formik={f} submitButtonText='Set password'>
            <Grid container>
                <Grid item xs={12}>
                    <InputGroup>
                        <Input name="name" label="Full Name" type="text" formik={f} />
                    </InputGroup>
                </Grid>
                <Grid item xs={12}>
                    <InputGroup>
                        <PasswordInput required name='password' label='Password' formik={f}/>
                    </InputGroup>
                </Grid>
                <Grid item xs={12}>
                    <InputGroup marginBottom="22px">
                        <PasswordInput required name='password2' label='Confirm Password' formik={f} />
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

export default InvitationAcceptForm

// vim:ts=4:sw=4:expandtab
