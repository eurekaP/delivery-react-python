// import { createTheme } from '@material-ui/core/styles'

// assets
import color from './css/_variables.module.scss'
// import theme1 from '../assets/scss/_theme1.module.scss'

// project imports
import { componentStyleOverrides } from './compStyleOverride'
import { themePalette } from './palette'
import { themeTypography } from './typography'
// import { customShadows } from './shadows'

import { createTheme } from '@mui/material/styles'

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

import "./css/style.scss"

export function theme() {

    const _SPACING = 4
    const _BORDER_RADIUS = 4

    const spacing = (...spaces) => (spaces || []).map(space => `${space * _SPACING}px`).join(" ")

    const themeOption = {
        colors: color,
        paper: color.darkLevel2,
        backgroundDefault: color.darkPaper,
        background: color.darkBackground,
        darkTextPrimary: color.darkTextPrimary,
        darkTextSecondary: color.darkTextSecondary,
        textDark: color.darkTextPrimary,
        menuSelected: color.darkSecondaryMain,
        menuSelectedBack: color.darkSecondaryMain + 15,
        divider: color.darkTextPrimary,
        heading: color.darkTextTitle,
        spacing,
        shape: {
            borderRadius: _BORDER_RADIUS
        },
    }

    const typography = themeTypography(themeOption)
    themeOption.typography = typography

    const palette = themePalette(themeOption)
    themeOption.palette = palette

    //material4
    var overrides = {}
    var props = {
        drawerWidth: 264
    }
    for (const [mui_class, value] of Object.entries( componentStyleOverrides( themeOption))) {
        if (value.styleOverrides)
            overrides[ mui_class] = value.styleOverrides
        if (value.defaultProps)
            props[ mui_class] = value.defaultProps
        }

    const rtheme = createTheme({
        direction: 'ltr',
        palette: palette,
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        customShadows: {},
        typography,
        overrides,
        props,
        spacing,
        shape: themeOption.shape,
        components: componentStyleOverrides(themeOption)
    })

    rtheme.spacing = spacing

    return rtheme
}

export default theme
