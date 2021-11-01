import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/styles'
import { Card, CardContent, Grid, AppBar, Dialog, IconButton, Slide, Toolbar, Typography } from '@material-ui/core'

import CloseIcon from '@material-ui/icons/Close'
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone'

import { Button } from '../theme/components'

import { Box } from '@mui/material'


export const Blank = () => {
    return <Card/>
}


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export const FullScreenDialog = ({ open, onClose, title, buttonText, onOk, children }) => {
    const classes = useStyles()
    return (
    <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
                <Typography variant="h3" color="inherit" className={classes.title}>
                    {title}
                </Typography>
                { buttonText && onOk && (
                <Button autoFocus color="inherit" onClick={ onOk }>
                    {buttonText}
                </Button>
                )}
            </Toolbar>
        </AppBar>

        {children}

    </Dialog>
    )
}


const useStyles4Error = makeStyles((theme) => ({
    errorContent: {
        maxWidth: '350px',
        margin: '0 auto',
        textAlign: 'center'
    },
    errorBlock: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
}))

export const Error404 = ({ homeUrl }) => {
    const classes = useStyles4Error()

    return (
        <Card className={classes.errorBlock}>
            <CardContent>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        <div className={classes.errorContent}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="h1" component="div">
                                        Something is wrong
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                        The page you are looking was moved, removed, renamed, or might never exist!{' '}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" size="large" color="primary" component={Link} to={homeUrl}>
                                        <HomeTwoToneIcon sx={{ fontSize: '1.3rem', mr: 0.75 }} /> Home
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}


export const TypographyLink = ({ to, children, ...props }) => {
    return (
    <Typography
        component={Link}
        to={to}
        variant="subtitle1"
        sx={{ textDecoration: 'none' }}
        {...props}
    >
        {children}
    </Typography>
    )
}


export const Stack = (props) => {
    return <Box {...props}/>
}

Stack.defaultProps = {
    display: 'flex',
    flexDirection: 'row'
}