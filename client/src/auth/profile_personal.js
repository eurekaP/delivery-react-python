import {
    makeStyles
} from '@mui/styles'
import { ReactComponent as DeleteIcon } from '../assets/images/delete.svg'

import { inject, observer } from 'mobx-react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { validators, InputGroup, SinglePasswordInput, PasswordInputGroup } from '../lib/fields'
import { Form } from '../lib/forms'
import { SectionWithTitle, WarningMessage } from '../theme/components/content'
import { Button } from '../theme/components'

const useStyles = makeStyles(theme => ({
    deleteButton: {
        backgroundColor: theme.palette.red[500],
        color: theme.palette.white,
        fontWeight: 500,
        lineHeight: "1.71",
        "&:hover": {
            backgroundColor: theme.palette.red[900],
        }
    },
    messageContent: {
        marginTop: theme.spacing(5)
    }
}))


const ProfilePersonalAccount = inject('ui')( observer( ({ ui }) => {
    const classes = useStyles()

    const notImplemented = () => {
        ui.setToast('This function is not yet implemented. Coming soon!', 'error')
    }

    return (
        <>
            <SectionWithTitle title="Account">
                <WarningMessage
                    textWidth="344px"
                    text="Once deleted, all personal data will be deleted.
                        All Company data will not be impacted or changed.
                        This action is permanent and once deleted, your account will be permanently ereased!">
                            <div className={classes.messageContent}>
                                <Button
                                    startIcon={<DeleteIcon />}
                                    onClick={notImplemented}
                                    variant='contained'
                                    color="error"

                                >
                                    Delete Account
                                </Button>
                            </div>
                </WarningMessage>
            </SectionWithTitle>

            <SectionWithTitle title="Change Password">
                <PersonalForm />
            </SectionWithTitle>
        </>
    )
}))

const PersonalForm = inject('auth', 'ui')( observer( ({ auth, ui }) => {

    // var currentPasswordValidator = validators.password
    // if (auth.user.has_usable_password) {
    //     currentPasswordValidator = currentPasswordValidator.required('Your current password is required')
    // }

    const f = useFormik({
        initialValues: {
            current_password: '', password: '', password2: '',
        },
        validationSchema: yup.object().shape({
            // current_password: currentPasswordValidator,
            password: validators.password.required('New password must not be blank'),
            password2: validators.password2.required('Please re-enter your new password'),
        }),
        onSubmit: async (values, { setErrors, resetForm, setSubmitting }) => {
            try {
                await auth.changePassword(values.password)
                ui.setToast('Your password was changed successfully', 'success')
                resetForm()
            } catch (err) {
                setErrors( err)
            } finally {
                setSubmitting(false)
            }
        },
    })

    return (
        <Form formik={f}>
            <PasswordInputGroup>
                <InputGroup width="344px">
                    <SinglePasswordInput name='password' label='New Password' formik={f} size='small' />
                </InputGroup>
                <InputGroup width="344px" marginBottom="30px">
                    <SinglePasswordInput name='password2' label='Repeat Password' formik={f} size='small' />
                </InputGroup>
        </PasswordInputGroup>
        <Button
            size='medium'
            type='submit'
            variant='contained'
            color='primary'
            disableElevation
        >
            Change password
        </Button>
    </Form>
    )
}))


/*
    <Grid item xs={12} md={6} lg={4} >
        <SubCard title='Social Identities'>
            { auth.user.has_usable_password && auth.googleAccount && (<GoogleDisconnectButton />) }
            { auth.user.has_usable_password && !auth.googleAccount && (<GoogleConnectButton />) }
            { !auth.user.has_usable_password && auth.googleAccount && (<div>You must set a password before you can disconnect your Google account. </div>) }
        </SubCard>
    </Grid>
    */

/*
const GoogleDisconnectButton = inject('auth', 'ui')( ({auth, ui}) => {
    const classes = googleStyles()
    const [error, setError] = useState('')
    const account = auth.googleAccount
    const onClick = () => {
        auth.disconnectGoogleAccount()
            .then( () => ui.setToast('Your Google account was successfully disconnected', 'success'))
            .catch( error => setError( error.non_field_errors) )
    }
    return (
    <>
        <AnimateButton>
            <Button
                disableElevation
                fullWidth={true}
                className={classes.redButton}
                onClick={onClick}
                size='large'
                variant='contained'
            >
                <img src={Google} alt='google' width='20px'
                    className={classes.loginIcon} />
                <b> Disconnect  {account.details.email} </b>
            </Button>
        </AnimateButton>

        {error && (
            <Box mt={3}>
                <FormHelperText error>{error}</FormHelperText>
            </Box>
        )}
    </>
    )
})


const GoogleConnectButton = inject('auth', 'ui')( ({auth, ui}) => {
    const [error, setError] = useState('')
    const onSuccess = response => {
        auth.connectGoogleAccount( response)
            .then( () => ui.setToast('Your Google account was successfully connected', 'success'))
            .catch( error => setError( error.non_field_errors) )
    }
    const onFailure = response => {
        //setError('Failed to authenticate with Google')
    }
    return (
    <>
        <GoogleButton buttonText='Connect your Google Account'
            onSuccess={onSuccess}
            onFailure={onFailure}
        />
        {error && (
            <Box mt={3}>
                <FormHelperText error>{error}</FormHelperText>
            </Box>
        )}
    </>
    )
})
*/

export default ProfilePersonalAccount

// vim:ts=4:sw=4:expandtab
