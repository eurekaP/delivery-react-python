import {
    Switch as MuiSwitch,
    FormControlLabel
} from "@mui/material"


const Switch = ({controllerProps, label = "", ...rest}) => {

    return (
        <FormControlLabel
        control={
          <MuiSwitch
            {...rest}
          />
        }
        label={label}
        {...controllerProps}
      />
    )
}

export default Switch
