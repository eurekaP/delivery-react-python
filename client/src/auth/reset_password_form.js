import React, {useState} from 'react'

import { makeStyles } from '@mui/styles'
import { Redirect, useParams } from 'react-router-dom'

import { inject } from 'mobx-react'

import * as yup from 'yup'
import { useFormik } from 'formik'

import { Grid, Typography, Box } from '@material-ui/core'
import { EmailInput, InputGroup, SinglePasswordInput, validators, PasswordInputGroup } from '../lib/fields'
import { FormWithSubmitButton } from '../lib/forms'
import { Stack } from "../lib/others"
import config from '../config'

import { ReactComponent as LoopIcon } from '../assets/images/loop.svg'
import DoneIcon from '@material-ui/icons/Done'

import { Button } from '../theme/components'

const useStyles = makeStyles(theme => ({
    submitButton: {
        "&.Mui-disabled": {
            backgroundColor: theme.palette.grey[50],
        }
    },
    errorText: {
      color: theme.palette.red[500],
    },
    infoText: {
        color: theme.palette.grey[700],
        fontSize: "14x",
        letterSpacing: "0.15px",
    },
    doneIcon: {
        width: "40px",
        height: "40px",
        color: theme.palette.lightGreen[500],
        marginRight: theme.spacing(2),
        marginLeft: "-6px"
    },
    highlightedText: {
        color: theme.palette.blue[500]
    }
}))


export const ResetPasswordForm = inject('auth')( ({ auth }) => {
    const [done, setDone] = useState(false)
    const [non_field_errors, setNonFieldErrors] = useState([])

    const f = useFormik({
        initialValues: { email: ''},
        validateOnMount: true,
        validationSchema: yup.object().shape({
            email: validators.email.max(255).required('Email is required'),
        }),
        onSubmit: async (values, { setErrors, setSubmitting }) => {
            try {
                await auth.resetPassword( values.email)
                setDone(true)
            } catch (err) {
                if (err['email'] && err['email'].code === 'does_not_exist') {
                    setNonFieldErrors([ <ResetPasswordErrorMessage key='form_err_msg' email={values.email}/> ])
                }
                setErrors( err)
            } finally {
                setSubmitting(false)
            }
        },
    })

    const disableSubmit = () => ( f.isSubmitting || !f.isValid )
    const classes = useStyles()

    if (done) {
        return <Redirect to={{pathname: config.urls.passwordResetDone, state: {email: f.values.email}}} />
    }
    return (
    <>
        <FormWithSubmitButton formik={f} non_field_errors={non_field_errors} submitButtonText='Reset Password' disableSubmit={disableSubmit} submitButtonClass={classes.submitButton}>
            <Grid container direction="column" justifyContent="center" spacing={0}>
                <Grid item xs={12}>
                    <InputGroup marginBottom="30px">
                        <EmailInput name='email' formik={f}  />
                    </InputGroup>
                </Grid>
            </Grid>
        </FormWithSubmitButton>
    </>
    )
})

const ResetPasswordErrorMessage = ({email}) => {
  const classes = useStyles()

  return (<>
        <Typography variant="body2" className={classes.infoText}>
            The email <font className={classes.errorText}>{email}</font> is not associated with
            an account.
        </Typography>
        <br/>
        <Typography variant="body2" className={classes.infoText}>
            Please verify/re-enter the email address.
        </Typography>
    </>
  )
}


export const ResetPasswordCompleteForm = inject('auth')( ({ auth }) => {
    const { uid, token } = useParams()

    const [done, setDone] = useState(false)
    const f = useFormik({
        initialValues: { password: '', password2: ''},
        validationSchema: yup.object().shape({
            password: validators.password.required('Password is required'),
            password2: validators.password2,
        }),
        onSubmit: async (values, { setErrors, setSubmitting }) => {
            try {
                await auth.resetPasswordConfirm( values.password, uid, token)
                setDone(true)
            } catch (err) {
                setErrors( err)
            } finally {
                setSubmitting(false)
            }
        },
    })
    if (done) {
        return <Redirect to={{
            pathname: config.urls.root,
            state: { message: 'Your password has been changed successfully!'}
        }} />
    }
    return (
    <FormWithSubmitButton formik={f} submitButtonText='Reset Password'>
        <PasswordInputGroup>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <InputGroup>
                        <SinglePasswordInput name='password' label='New Password' formik={f} newPassword />
                    </InputGroup>
                </Grid>
                <Grid item xs={12}>
                    <InputGroup marginBottom="30px">
                        <SinglePasswordInput name='password2' label='Confirm New Password' formik={f} />
                    </InputGroup>
                </Grid>
            </Grid>
        </PasswordInputGroup>
    </FormWithSubmitButton>
    )
})

export const ResetPasswordDoneContent = inject('auth')(({ auth, email }) => {
    const classes = useStyles()
    const [loading, setLoading] = useState(false)

    const send = async () => {
        setLoading(true)
        await auth.resetPassword(email)
        setLoading(false)
    }

    return (
        <div>
            <Stack alignItems="center" marginBottom="25px" marginTop="4px">
                <DoneIcon className={classes.doneIcon} />
                <Typography variant="body1">
                    An email with Reset link has been sent to
                    <span className={classes.highlightedText}> { email }</span>
                </Typography>
            </Stack>

            <Typography variant="body2">
                In case you have not recieved an email in less then 1 min, please check your spam folder or re-send a new link.
            </Typography>

            <Box marginTop="30px">
                <Button size="large" color="primary" variant="contained" fullWidth startIcon={<LoopIcon />} disabled={loading} onClick={send} >
                    re-Send Password Reset Link
                </Button>
            </Box>

        </div>
    )
})


// vim:ts=4:sw=4:expandtab
