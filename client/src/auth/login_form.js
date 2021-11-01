import React, { useState } from 'react'
import { inject } from 'mobx-react'

import { makeStyles } from '@mui/styles'
import {
    Box, Divider, FormHelperText,
    Grid, Typography, //Stack material5
    DialogContentText,
} from '@material-ui/core'

import { Button } from '../theme/components'

import * as yup from 'yup'
import { useFormik } from 'formik'
import { EmailInput, InputGroup, PasswordInput, validators } from '../lib/fields'
import { TypographyLink } from '../lib/others'
import { DialogForm, FormWithSubmitButton } from '../lib/forms'

import { Stack } from '../lib/others'
import GoogleButton from './google_button'
import config from '../config'

import { Checkbox } from '../theme/components'

export const useStyles = makeStyles( (theme) => ({
    signDivider: {
        flexGrow: 1
    },
    signText: {
        margin: 0,
        cursor: 'unset',
        padding: '0px 22px',
        color: theme.palette.secondary.dark + ' !important',
        letterSpacing: "0.15px",
        fontSize: "16px",
        fontWeight: "normal",
        lineHeight: "1.5"
    },
}))


const LoginForm = inject('auth')( (props) => {
    const { auth } = props
    const [rememberMe, setRememberMe] = useState(true)
    const [non_field_errors, setNonFieldErrors] = useState([])

    const f = useFormik({
        initialValues: { email: '', password: ''},
        validationSchema: yup.object().shape({
            email: validators.email.required('Enter Email Address'),
            password: validators.password.required('Password is required'),
        }),
        onSubmit: async (values, { setErrors, setSubmitting }) => {
            try {
                await auth.login(values.email, values.password, rememberMe)
            } catch (err) {
                if ( err.non_field_errors)
                    setNonFieldErrors( err.non_field_errors)
                setErrors( err)
            } finally {
                setSubmitting(false)
            }
        },
    })
    return (
    <>
        <FormWithSubmitButton formik={f} submitButtonText='Sign in' non_field_errors={non_field_errors}>
            <Grid container direction="column" justifyContent="center" spacing={0}>
                <Grid item xs={12}>
                    <InputGroup>
                        <EmailInput required name='email' formik={f}
                        />
                    </InputGroup>
                </Grid>
                <Grid item xs={12}>
                    <InputGroup marginBottom="38px">
                        <PasswordInput required name='password' formik={f}
                        />
                    </InputGroup>
                </Grid>
                <Grid item xs={12} pb={10}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0} marginBottom="14px">
                           <Checkbox
                                checked={rememberMe}
                                onChange={(event) => setRememberMe(event.target.checked)}
                                name="rememberMe"
                                color="primary"
                                label="Remember me"
                            />
                        <TypographyLink to={config.urls.passwordReset}>
                            Forgot Password
                        </TypographyLink>
                    </Stack>
                </Grid>
            </Grid>
        </FormWithSubmitButton>
    </>
    )
})

export const LinkOrGoogleButton = ({ link = {}, divider, googleButton }) => {

    return (
        <Grid container direction="column" justifyContent="center" spacing={0}>
            <Grid item container direction="column" alignItems="flex-end" xs={12}>
                <LinkWithSubText {...link} marginTop={ link.marginTop || "23px" } />
            </Grid>
            {
                googleButton &&
                (
                    <>
                        <Grid item xs={12}>
                            <DividerWithText {...divider} />
                        </Grid>
                        <Grid item xs={12}>
                            <GoogleLoginButton {...googleButton}/>
                        </Grid>
                    </>
                )
            }

        </Grid>
    )
}

export const LinkWithSubText = ({ subText, text, to, marginTop = 0, marginBottom = 0 }) => {

    return (
        <Box marginTop={marginTop} marginBottom={marginBottom}>
            <Typography display="inline">{ subText }</Typography>
            <TypographyLink to={ to }> { text } </TypographyLink>
        </Box>
    )
}

export const DividerWithText = ({ text = "OR", marginBottom = "27px", marginTop = 11 }) => {
    const classes = useStyles()

    return (
        <Box alignItems="center" display="flex" marginBottom={marginBottom} marginTop={marginTop} >
            <Divider className={classes.signDivider} orientation="horizontal" />
                <Button
                    className={classes.signText}
                    disableRipple
                    disabled
                >
                    { text }
                </Button>
            <Divider className={classes.signDivider} orientation="horizontal" />
        </Box>
    )
}


export const GoogleLoginButton = inject('auth', 'ui')( ({auth, ui, buttonText, signUp}) => {
    const [authError, setAuthError] = useState('')
    const [googleTokens, setGoogleTokens] = useState(null)

    const googleLogin = data => {
        auth.loginWithGoogle( data)
            .then( (resp) => {
                setGoogleTokens( null)
                setAuthError('')
                if (!signUp && resp.created) {
                    ui.setToast('Welcome to Fleetpal! You have successfully signed up.', 'success')
                }
            })
            .catch( error => {
                if (error.non_field_errors) {
                    if (error.non_field_errors[0].message === 'password_required') {
                        setGoogleTokens( data)
                    } else {
                        setAuthError( error.non_field_errors[0].message)
                    }
                }
            })
    }
    const onFailure = response => {
        //ui.setToast('Failed to authenticate with Google. ' + (response.details || ''), 'error')
        console.warn('Failed to authenticate with Google.', response.details)
    }

    const dialogClose = () => setGoogleTokens(null)
    const f = useFormik({
        initialValues: { password: ''},
        validationSchema: yup.object().shape({
            password: validators.password.required('Password is required'),
        }),
        onSubmit: async (values, { setErrors, setSubmitting }) => {
            try {
                await googleLogin({ ...googleTokens, ...values})
                dialogClose()
            } catch (err) {
                setErrors( err)
            } finally {
                setSubmitting(false)
            }
        },
    })

    return (
    <>
        <GoogleButton buttonText={buttonText}
            onSuccess={googleLogin}
            onFailure={onFailure}
        />
        {authError && (
            <Box mt={3}>
                <FormHelperText error>{authError}</FormHelperText>
            </Box>
        )}
        {googleTokens && (
            <DialogForm open
                title="Please confirm it's you!"
                onClose={dialogClose}
                formik={f}
                actions={{
                    save: { label: 'Confirm', main: true, handler: f.handleSubmit},
                    cancel: { label: 'Cancel', handler: dialogClose},
                }}
                >
                <DialogContentText>
                    <Typography variant="body2">
                        You or someone else has already signed up with this email address, but the email address has not been verified.
                        In order to connect this Google identity to the existing Fleetpal account, it is required to enter the correct password
                        or go through the password recovery procedure to regain access to Fleetpal.
                    </Typography>
                </DialogContentText>
                <PasswordInput required name='password' formik={f} />
            </DialogForm>
        )}
    </>
    )
})


export default LoginForm
