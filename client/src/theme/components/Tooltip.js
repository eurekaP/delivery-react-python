import { styled, alpha } from '@mui/material/styles';
import {
    Tooltip as MuiTooltip, tooltipClasses
} from '@mui/material';

const Tooltip = styled(({ className, ...props }) => (
    <MuiTooltip {...props} arrow classes={{ popper: className }} />
  ))(({ offset, ...rest }) => {

    const style = {}
    if (offset) {
        const cssOffset = offset + 'px !important'

        const generateSideOffset = (side, property) => {
            return {
                ['&[data-popper-placement*="' + side + '"]']: {
                    '& .MuiTooltip-tooltip': {
                        [property]: cssOffset
                    }
                },
            }
        }
        Object.assign(style, {
            ...generateSideOffset("top", "marginBottom"),
            ...generateSideOffset("right", "marginLeft"),
            ...generateSideOffset("bottom", "marginTop"),
            ...generateSideOffset("left", "marginRight")
        })
    }

    return style
});

export const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme, color, opacity }) => {
    const widgetColor = alpha(color || theme.palette.other.tooltip, opacity)
    return ({
        [`& .${tooltipClasses.arrow}`]: {
            color: widgetColor,
        },
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: widgetColor,
        },
    })
});

BootstrapTooltip.defaultProps = {
    opacity: 0.95
}

export default Tooltip