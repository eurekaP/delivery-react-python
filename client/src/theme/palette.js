export const themePalette = (theme) => ({
    default: {
        light: theme.colors.defaultLight,
        main: theme.colors.defaultMain,
        dark: theme.colors.defaultDark
    },
    common: {
        black: theme.colors.grey700
    },
    white: theme.colors.white,
    primary: {
        light: theme.colors.primaryLight,
        main: theme.colors.primaryMain,
        dark: theme.colors.primaryDark,
        contrastText: theme.colors.primaryContrastText
    },
    secondary: {
        light: theme.colors.secondaryLight,
        main: theme.colors.secondaryMain,
        dark: theme.colors.secondaryDark,
        contrastText: theme.colors.secondaryContrastText
    },
    error: {
        light: theme.colors.errorLight,
        main: theme.colors.errorMain,
        dark: theme.colors.errorDark,
        contrastText: theme.colors.errorContrastText
    },
    success: {
        light: theme.colors.successLight,
        main: theme.colors.successMain,
        dark: theme.colors.successDark,
        contrastText: theme.colors.successContrastText
    },
    info: {
        light: theme.colors.infoLight,
        main: theme.colors.infoMain,
        dark: theme.colors.infoDark,
        contrastText: theme.colors.infoContrastText
    },
    gray: theme.colors.gray,
    grey: {
        50: theme.colors.grey50,
        100: theme.colors.grey100,
        200: theme.colors.grey200,
        300: theme.colors.grey300,
        400: theme.colors.grey400,
        500: theme.colors.grey500,
        600: theme.colors.grey600,
        700: theme.colors.grey700,
        800: theme.colors.grey800,
        900: theme.colors.grey900,
    },
    blue: {
        50: theme.colors.blue50,
        100: theme.colors.blue100,
        200: theme.colors.blue200,
        300: theme.colors.blue300,
        400: theme.colors.blue400,
        500: theme.colors.blue500,
        600: theme.colors.blue600,
        700: theme.colors.blue700,
        800: theme.colors.blue800,
        900: theme.colors.blue900,
    },
    red: {
        50: theme.colors.red50,
        100: theme.colors.red100,
        200: theme.colors.red200,
        300: theme.colors.red300,
        400: theme.colors.red400,
        500: theme.colors.red500,
        600: theme.colors.red600,
        700: theme.colors.red700,
        800: theme.colors.red800,
        900: theme.colors.red900,
    },
    lightGreen: {
        50: theme.colors.lightGreen50,
        100: theme.colors.lightGreen100,
        200: theme.colors.lightGreen200,
        300: theme.colors.lightGreen300,
        400: theme.colors.lightGreen400,
        500: theme.colors.lightGreen500,
        600: theme.colors.lightGreen600,
        700: theme.colors.lightGreen700,
        800: theme.colors.lightGreen800,
        900: theme.colors.lightGreen900,
    },
    deepRed: {
        50: theme.colors.deepRed50,
        100: theme.colors.deepRed100,
        200: theme.colors.deepRed200,
        300: theme.colors.deepRed300,
        400: theme.colors.deepRed400,
        500: theme.colors.deepRed500,
        600: theme.colors.deepRed600,
        700: theme.colors.deepRed700,
        800: theme.colors.deepRed800,
        900: theme.colors.deepRed900,
        "A50": theme.colors.deepRedA50,
        "A100": theme.colors.deepRedA100,
        "A400": theme.colors.deepRedA400,
        "A700": theme.colors.deepRedA700,
    },
    orange: {
        50: theme.colors.orange50,
        100: theme.colors.orange100,
        200: theme.colors.orange200,
        300: theme.colors.orange300,
        400: theme.colors.orange400,
        500: theme.colors.orange500,
        600: theme.colors.orange600,
        700: theme.colors.orange700,
        800: theme.colors.orange800,
        900: theme.colors.orange900,
    },
    action: {
        hoverOpacity: 0.1,
        selectedOpacity: 0.3,
        disabledBackground: theme.colors.actionButtonDisabled,
        disabled: theme.colors.textDisabled,
        disabledOpacity: 0.4
    },
    sold: { main: theme.colors.soldMain },
    lost: { main: theme.colors.lostMain },
    empty: { main: theme.colors.emptyMain },
    warning: { main: theme.colors.warningMain },
    text: {
        main: theme.colors.textMain,
        secondary: theme.colors.textSecondary,
        disabled: theme.colors.textDisabled
    },
    table: {
        headerMain: theme.colors.tableHeaderMain,
        hoverRow: theme.colors.grey50,
        sortIcon: theme.colors.grey500,
        activeRow: theme.colors.blue50,
    },
    other: {
        tooltip: theme.colors.otherTooltip
    }
        //lost: '#f23fa0',
       // empty: 'rgba(75, 98, 144, 0.3)',
    //}
})
/*
    return {
        mode: theme.customization.navType,
        common: {
            black: theme.colors.darkPaper
        },
        primary: {
            light: theme.customization.navType === 'dark' ? theme.colors.darkPrimaryLight : theme.colors.primaryLight,
            main: theme.customization.navType === 'dark' ? theme.colors.darkPrimaryMain : theme.colors.primaryMain,
            dark: theme.customization.navType === 'dark' ? theme.colors.darkPrimaryDark : theme.colors.primaryDark,
            200: theme.customization.navType === 'dark' ? theme.colors.darkPrimary200 : theme.colors.primary200,
            800: theme.customization.navType === 'dark' ? theme.colors.darkPrimary800 : theme.colors.primary800
        },
        secondary: {
            light: theme.customization.navType === 'dark' ? theme.colors.darkSecondaryLight : theme.colors.secondaryLight,
            main: theme.customization.navType === 'dark' ? theme.colors.darkSecondaryMain : theme.colors.secondaryMain,
            dark: theme.customization.navType === 'dark' ? theme.colors.darkSecondaryDark : theme.colors.secondaryDark,
            200: theme.customization.navType === 'dark' ? theme.colors.darkSecondary200 : theme.colors.secondary200,
            800: theme.customization.navType === 'dark' ? theme.colors.darkSecondary800 : theme.colors.secondary800
        },
        error: {
            light: theme.colors.errorLight,
            main: theme.colors.errorMain,
            dark: theme.colors.errorDark
        },
        orange: {
            light: theme.colors.orangeLight,
            main: theme.colors.orangeMain,
            dark: theme.colors.orangeDark
        },
        warning: {
            light: theme.colors.warningLight,
            main: theme.colors.warningMain,
            dark: theme.colors.warningDark
        },
        success: {
            light: theme.colors.successLight,
            200: theme.colors.success200,
            main: theme.colors.successMain,
            dark: theme.colors.successDark
        },
        grey: {
            50: theme.colors.grey50,
            100: theme.colors.grey100,
            500: theme.darkTextSecondary,
            600: theme.heading,
            700: theme.darkTextPrimary,
            900: theme.textDark
        },
        dark: {
            light: theme.colors.darkTextPrimary,
            main: theme.colors.darkLevel1,
            dark: theme.colors.darkLevel2,
            800: theme.colors.darkBackground,
            900: theme.colors.darkPaper
        },
        text: {
            primary: theme.darkTextPrimary,
            secondary: theme.darkTextSecondary,
            dark: theme.textDark,
            hint: theme.colors.grey100
        },
        background: {
            paper: theme.paper,
            default: theme.backgroundDefault
        }
    }
}
*/
