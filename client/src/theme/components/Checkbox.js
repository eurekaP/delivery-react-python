import {
    Checkbox as MuiCheckbox,
    FormControlLabel,
    FormHelperText
} from "@mui/material"
import { InputWrapper, sanitizeInputWrapperProps } from "./fields"


const Checkbox = ({controllerProps, label = "", ...props}) => {
    return (
        <FormControlLabel
          control={ <MuiCheckbox {...props} /> }
          label={label}
          {...controllerProps}
        />
    )
}

export const CheckboxWithHelperText = ({error, helperText, ...props}) => {

  const {
    wrapperProps,
    restProps: { fullWidth, ...rest }
  } = sanitizeInputWrapperProps(props)
  
    return (
      <InputWrapper {...wrapperProps}>
        <Checkbox {...rest} />
        {
          helperText && 
            <FormHelperText error={error} style={{marginTop: "-10px"}} >
              { helperText }
            </FormHelperText>
        }
        </InputWrapper>
    )
}

export const CheckboxWithError = (props) => {
  return (
    <CheckboxWithHelperText {...props} error />
  )

}


export default Checkbox
