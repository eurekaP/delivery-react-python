import { InputAdornment, Box } from "@mui/material"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles(theme => {
    return ({
        inputWrapper: (props) => {
            return {
                display: 'inline-block',
                position: 'relative',
                width: (props.fullWidth || props.helperTextOverflow) ? '100%': 'auto',
                '& .MuiFormControl-root': {
                    position: 'static'
                },
                ...(
                    !props.helperTextFree && {
                        '& .MuiFormHelperText-root': {
                        position: 'absolute',
                        left: '0',
                        top: '100%'
                    }}
                )
            }
        }
    })
})

// props:
// helperTextOverflow - allows the helper text to be bigger than the input
// helperTextFree - disables the absolute effect from helper text
export const InputWrapper = (props) => {
    const classes = useStyles(props)

    return (
        <Box className={`${classes.inputWrapper} ${props.className || ''}`} {...props} />
    )
}

export const sanitizeInputWrapperProps = ({ helperTextOverflow, helperTextFree, ...restProps}) => {

    const wrapperProps = {
        helperTextFree,
        fullWidth: restProps.fullWidth,
        helperTextOverflow,
    }
    return {
        wrapperProps,
        restProps
    }
}

export const setInputIconProps = ({ leadingIcon, leadingIconProps = {}, trailingIcon, trailingIconProps = {}, InputProps = {} , ...rest}) => {

    const iconProps = {}
    let className = rest.className || ''

    if (leadingIcon) {
        iconProps.startAdornment = (
            <InputAdornment className={`leading-icon ${leadingIconProps.className || ''}`} {...leadingIconProps} position={leadingIconProps.position || 'start'} disablePointerEvents={leadingIconProps.disablePointerEvents ?? true}>
              { leadingIcon }
            </InputAdornment>
        )
        className += ' has-start-adornment'
    }

    if (trailingIcon) {
        iconProps.endAdornment = (
            <InputAdornment className={`trailing-icon ${trailingIconProps.className || ''}`} {...trailingIconProps} position={trailingIconProps.position || 'end'} disablePointerEvents={trailingIconProps.disablePointerEvents ?? true}>
              { trailingIcon }
            </InputAdornment>
        )
    }

    return {
        ...rest,
        className,
        InputProps: {
            ...InputProps,
            ...iconProps
        }
    }
}