import React from 'react'
import { makeStyles } from '@mui/styles'
import TextField from './TextField'
import IconButton from '@mui/material/IconButton'
import { DatePicker as MuiDatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

const useStyles = makeStyles((theme) => ({
    paper: {
        '& > * > *': {
            width: "unset !important",
        }
    }
}))


const DatePicker = ( props) => {
    const classes = useStyles()

    const [value, setValue] = React.useState( props.value || new Date())

    const onChange = (newValue) => {
        setValue( newValue)
        props.onChange?.( newValue)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MuiDatePicker
                displayStaticWrapperAs="desktop"
                views={[ props.view]}
                onChange={onChange}
                {...props}
                PaperProps={{className: classes.paper}}
                PopperProps= {{
                    modifiers:[{
                        name: 'offset',
                        options: {
                            offset: [0, 20]
                        },
                    }]
                }}
                value={value}
                renderInput={ ({ inputRef, inputProps, InputProps, ...rest }) => {
                    const endAdornment = InputProps && InputProps.endAdornment
                    var trailingIcon = null
                    if (endAdornment)
                        trailingIcon = <IconButton> <ArrowDropDownIcon {...endAdornment.props.children.props}/> </IconButton>

                    return (
                        <TextField fullWidth={props.fullWidth} inputRef={inputRef} {...inputProps} trailingIcon={trailingIcon}
                        trailingIconProps={{disablePointerEvents: false}}
                        />
                    )
                }}
            />
        </LocalizationProvider>
    )
}

export default DatePicker

