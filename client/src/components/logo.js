import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { ButtonBase } from '@material-ui/core'

import logoDark from '../assets/images/logo-dark.svg'
import logo from '../assets/images/logo.svg'
import config from '../config'


export const Logo = ({ alt = "Fleetpal", width = 140, ...rest }) => {
    const theme = useTheme()

    return (
        <img src={theme.palette.mode === 'dark' ? logoDark : logo} alt={alt} width={width} {...rest} />
    )
}

export const LogoSection = () => {
    return (
    <ButtonBase disableRipple component={Link} to={config.urls.root}>
        <Logo />
    </ButtonBase>
    )
}

// vim:ts=4:sw=4:expandtab
