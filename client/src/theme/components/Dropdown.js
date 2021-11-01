import {
    Autocomplete as MuiAutocomplete
} from '@mui/material'
import { Fragment, useCallback, useMemo } from 'react'
import { TextField, MenuItemWithSelectStatuses, ResizablePaper, Popper, BootstrapTooltip } from '.'
import { InputWrapper, sanitizeInputWrapperProps, setInputIconProps } from "./fields"

// TODO: decorate adornments when multiple select
// changing multiple true/false in runtine crashes
// demo for option:
// options = [
//     {
//         label: 'test1',
//         value: 1,
//         leadingIcon: AddIcon,
//         disabled: false,
//         content: (props, option) => Component...   // custom layout, disables leading icon + label
//     }
// ]

export const DROPDOWN_EMPTY_VALUE = ''

const Dropdown = (props) => {

    const {
        wrapperProps,
        restProps
    } = sanitizeInputWrapperProps(props)

    const { optionsTooltip, popperOffset, itemsMultiple, readOnly, options, value, onBlur, onScrollBottom, disableClearable, onChange, onClear, blurOnSelect, multiple, label, variant, error, fullWidth, InputProps, allowFilter, helperText, textFieldProps, getOptionLabel, disableCloseOnSelect, optionsSize, ...rest} = setInputIconProps(restProps)

    const val = useMemo(() => {  // TODO: find better solution. 
        let newValue
        if (value) {
            if (multiple) {
                newValue = options.filter((option) => (Array.isArray(value) ? value : [value]).some(v => v === option.value))
            } else {
                newValue = options.find((option) => option.value === value)
            }
        }
        return newValue || (multiple ? [] : null)
    }, [value, options, multiple])

    const areItemsMultiple = itemsMultiple ?? multiple

    const PaperComponent = useCallback((props) => {
        return <ResizablePaper onScrollBottom={onScrollBottom} {...props} size={optionsSize} count={options.length} />
    }, [onScrollBottom, options.length, optionsSize])

    const PopperComponent = useCallback((props) => {
        return <Popper {...props} offset={popperOffset || (({ placement }) => placement === 'top' ? [0, 8] : [])} />
    }, [popperOffset])

    const OptionComponent = useCallback((props, option) => {
        const Option = <MenuItemWithSelectStatuses size={optionsSize} selected={props['aria-selected']} {...props} multiple={areItemsMultiple} {...option} >{option.content?.(props, option) || option.label || DROPDOWN_EMPTY_VALUE}</MenuItemWithSelectStatuses>
        const Tooltip = optionsTooltip ? <BootstrapTooltip title={option.label} placement='left' bgcolor='secondary' children={Option} offset={8} /> : <Fragment children={Option}/>
        return Tooltip
    }, [areItemsMultiple])

    const optionLabel = useCallback((option) => {    // displays the shown value in textfield. This is required if the options has null
        const text = option ? 
            (typeof option === 'object' ? (option.label || option.value || DROPDOWN_EMPTY_VALUE) : option)
        : ''
        return getOptionLabel?.(option) || text
    }, [getOptionLabel])

    return (
        <InputWrapper {...wrapperProps}>
            <MuiAutocomplete
                disableClearable={readOnly || (disableClearable ?? (multiple ? false : true))}
                options={options}
                //blurOnSelect={blurOnSelect ?? (multiple ? false : true)}
                allowFilter={allowFilter}
                variant={variant}
                hasStartIcon={!!InputProps.startAdornment}
                renderInput={({InputLabelProps, ...params}) => {
                    // console.log("renderInput: ", InputLabelProps, params)
                    const TextFieldInputProps = {
                        ...params.InputProps, 
                        // ...InputProps, 
                        startAdornment: <>
                            {InputProps.startAdornment}
                            {params.InputProps.startAdornment?.length ? params.InputProps.startAdornment : ''}
                            </>,
                        
                    }
                    return <TextField
                                helperText={helperText} 
                                required={rest.required} 
                                InputLabelProps={{...InputLabelProps, className: params.InputProps.startAdornment?.length && 'force-shrink has-value'}}
                                {...textFieldProps}
                                {...params} 
                                {...(!allowFilter && {inputProps:{...params.inputProps, readOnly: true}})}
                                {...wrapperProps}
                                {...(params.InputProps.startAdornment && !allowFilter && { hideInput: true })}
                                InputProps={TextFieldInputProps} 
                                error={error} 
                                label={label} 
                                variant={variant} 
                                size={rest.size} 
                                fullWidth={fullWidth}
                                name={rest.name}
                                onBlur={onBlur}
                            />
                }}
                renderOption={OptionComponent}
                PopperComponent={PopperComponent}
                PaperComponent={PaperComponent}
                getOptionLabel={optionLabel}
                onChange={(_, option, type) => {
                    const value = option ? ((Array.isArray(option) ? option.map(o => o.value) : (option.value || DROPDOWN_EMPTY_VALUE))) : DROPDOWN_EMPTY_VALUE
                    onChange?.(rest.name, value, type)
                    if (type === 'clear') {
                        onClear?.(rest.name, value, type)  
                    }
                }}

                {...rest}
                {...(InputProps.endAdornment && { popupIcon: InputProps.endAdornment, disablePopupIconRotate: true })}
                disableCloseOnSelect={disableCloseOnSelect || multiple}
                multiple={multiple}
                value={val}
                error={error}
                {...(readOnly && { open: false })}
            />
        </InputWrapper>
    )
}

Dropdown.defaultProps = {
    options: [],
    allowFilter: false,
    optionsSize: 'medium',
    shrinkable: false,
    variant: 'outlined'
}

export default Dropdown




// isOptionEqualToValue={(options, value, ...restTest) => {
//     console.log('isOptionEqualToValue ', options, value, options.value == value, restTest)
//     return options.value == value
// } }