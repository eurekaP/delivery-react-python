import { Button } from '../theme/components'
import { makeStyles } from '@mui/styles'
import GoogleLogin from 'react-google-login'
import Google from '../assets/images/social-google.svg'
import config from '../config'
import { Typography } from '@mui/material'

export const useStyles = makeStyles( (theme) => {
    return ({
    redButton: {
        backgroundColor: theme.palette.grey[50] + " !important",
        border: '1px solid',
        borderColor: theme.palette.grey[100],
        height: "56px",
        textTransform: "none !important",
        "&:hover": {
            border: "0",
            backgroundColor: theme.palette.grey[50]
        }
    },
    loginIcon: {
        marginRight: '10px',
    },
})})



const GoogleButton = ({ buttonText, onSuccess, onFailure}) => {
    const classes = useStyles()
    return (
    <>
        <GoogleLogin
            clientId={config.GOOGLE_CLIENT_ID}
            buttonText={buttonText}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy='single_host_origin'
            isSignedIn={false}
            render={ renderProps => (
                <Button
                    disableElevation
                    fullWidth={true}
                    className={classes.redButton}
                    disabled={renderProps.disabled}
                    onClick={renderProps.onClick}
                    size="large"
                    variant="contained"
                >
                    <img src={Google} alt="google" width="24px"
                        className={classes.loginIcon} />
                    <Typography component="span" textTransform="none" >
                        {buttonText}
                    </Typography>
                </Button>
            )}
        />
    </>
    )
}

export default GoogleButton

// vim:ts=4:sw=4:expandtab
