//import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/styles'
import { Box, Grid, Typography,
    //useMediaQuery,
    makeStyles, Card, CardContent
} from '@material-ui/core'

import { Logo } from '../components/logo'
import backrgoundImage from "../assets/images/auth_bg.svg"
import { LinkOrGoogleButton } from './login_form'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        width: '432px',
        maxWidth: "100%",
    },
    card: {
        boxShadow: "0 7px 8px 0 rgba(35, 52, 97, 0.2), 0 5px 22px 0 rgba(35, 52, 97, 0.12), 0 12px 17px 0 rgba(35, 52, 97, 0.14)",
        marginBottom: "70px",
        '& > *': {
            flexGrow: 1,
            flexBasis: '50%'
        },
    },
    content: {
        padding: "51px 40px 40px !important",
    },
    logo: {
        marginBottom: "45px",
        marginTop: "103px",
        display: "inline-block"
    },
    backgroundImage: {
        position: "absolute",
        height: "calc(100% + 170px)",
        top: "-85px",
        left: "calc(50% - 216px)"
    },
    title: {
        marginBottom: "21px",
        height: '32px'
    },
    subTitle: {
        color: theme.palette.grey[700],
        fontSize: "14px",
        lineHeight: "1.43",
        letterSpacing: "0.15px",
        paddingLeft: "1px"
    }
}))

const AuthCardWrapper = ({ children }) => {
    const classes = useStyles()

    return (
        <div className={classes.wrapper}>
            <a href="https://fleetpalconnect.com/" target="_blank" rel="noreferrer" className={classes.logo}>
                <Logo width={162} />
            </a>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    {children}
                </CardContent>
            </Card>
        </div>
    )
}


const AuthPage = ({ form, link, divider, title, googleButton, subTitle, subtitleMargin }) => {
    // const theme = useTheme()
    // const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'))
    const classes = useStyles()

    return (
            <AuthWrapper>
                <img src={backrgoundImage} className={classes.backgroundImage} alt="background" />
                <Grid container justifyContent="space-between" alignItems="flex-start" style={{ minHeight: '100vh', position: "relative" }}>
                    <Grid item container justifyContent="flex-start" direction="column" alignItems="center">
                        <AuthCardWrapper>
                            <Grid container spacing={0} justifyContent="center">
                                {
                                    title &&
                                    (
                                        <Grid item xs={12}>
                                            <Box height="32px" marginBottom={subTitle ? "18px" : "21px"}>
                                                <Typography variant="h6">{ title }</Typography>
                                            </Box>
                                        </Grid>
                                    )
                                }
                                {
                                    subTitle &&
                                    (
                                        <Grid item xs={12}>
                                            <Box marginBottom={subtitleMargin || "25px"}>
                                                <Typography variant="body2">{ subTitle }</Typography>
                                            </Box>
                                        </Grid>
                                    )
                                }
                                <Grid item xs={12}>
                                    {form}
                                </Grid>
                            </Grid>
                            <LinkOrGoogleButton
                                link={link}
                                googleButton={googleButton}
                                divider={divider}
                            />
                        </AuthCardWrapper>
                    </Grid>
                </Grid>
            </AuthWrapper>
    )
}


export const AuthWrapper = styled('div')( () => {
    return {
        minHeight: '100vh',
        position: "relative",
        overflow: "hidden"
    }
})


export default AuthPage

// vim:ts=4:sw=4:expandtab
