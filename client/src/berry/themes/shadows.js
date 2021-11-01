import { alpha } from '@material-ui/core/styles';

const createCustomShadow = (theme, color) => {
    const transparent = alpha(color, 0.24);
    return {
        z1: '0 1px 2px 0 ' + transparent,
        z8: '0 7px 14px 0 ' + transparent,
        z12: '0 0 3px 0 ' + transparent + ' 0 10px 20px 0 ' + transparent,
        z16: '0 0 3px 0 ' + transparent + ' 0 14px 28px -1px ' + transparent,
        z20: '0 0 3px 0 ' + transparent + ' 0 18px 36px -2px ' + transparent,
        z24: '0 0 6px 0 ' + transparent + ' 0 21px 44px 0 ' + transparent,
        
        primary: '0px 12px 14px 0px ' + alpha(theme.colors.primaryMain, 0.3),
        secondary: '0px 12px 14px 0px ' + alpha(theme.colors.secondaryMain, 0.3),
        orange: '0px 12px 14px 0px ' + alpha(theme.colors.orangeMain, 0.3),
        success: '0px 12px 14px 0px ' + alpha(theme.colors.successMain, 0.3),
        warning: '0px 12px 14px 0px ' + alpha(theme.colors.warningMain, 0.3),
        error: '0px 12px 14px 0px ' + alpha(theme.colors.errorMain, 0.3)
    };
};

export function customShadows(navType, theme) {
    if (navType === 'dark') {
        return createCustomShadow(theme, theme.colors.darkLevel1);
    } else {
        return createCustomShadow(theme, theme.colors.grey600);
    }
}
