import React from 'react'
import { TextField as MuiTextField } from "@mui/material"

import { InputWrapper, sanitizeInputWrapperProps, setInputIconProps } from "./fields"

// force shrink: add className 'force-shrink' to label

const TextField = (props) => {
    const {
        wrapperProps,
        restProps
    } = sanitizeInputWrapperProps(props)

    const propsWithIcons = setInputIconProps(restProps)

    return (
        <InputWrapper {...wrapperProps}>
            <MuiTextField {...propsWithIcons} />
        </InputWrapper>
    )
}

TextField.defaultProps = {
    InputLabelProps: {},
}

export default TextField
