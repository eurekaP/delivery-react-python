import React, {useEffect, useState, useRef, createContext, useContext, Fragment} from 'react'

import * as yup from 'yup'

import {
    //Autocomplete,
    Box,
    InputAdornment,
    IconButton,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
//import { strengthColor, strengthIndicator } from '../berry/utils/password-strength'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import SearchIcon from '@material-ui/icons/Search'

import { Dropdown, TextField } from '../theme/components'

import { useInput } from 'react-admin'

import { useFormik } from "formik"

import { capitalize } from './common'

const str = yup.string()
export const validators = {
    name: str.max(70, 'Please enter a shorter text! Max length is 70.'),
    email: str.email('Enter a Valid Email Address').max(254),
    zip: str.trim().matches( /^\d{5}(?:[- ]?\d{4})?$/, 'Please enter a correct ZIP Code!'),
    password: str.max(40),
    password2: str.when('password', {
        is: (val) => (val && val.length > 0 ? true : false),
        then: yup.string().oneOf([yup.ref('password')], 'Both passwords do not match!')
    }),
    phone: str.trim().max(15).matches( /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Please enter a valid phone number!'),
    website: str.matches(
        /^((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Please enter a valid url!'
    ),
    termsAgree: yup.bool().oneOf([true], "To open an account, you must agree with Terms & Conditions")
}

function name2label( name) {
    return name.split('_').map( capitalize).join(' ')
}

export const InputGroup = ({ marginBottom = 10, children, ...rest }) => {
    return (
        <Box marginBottom={marginBottom} {...rest}>
            {children}
        </Box>
    )
}


/*
const InputM = ({ source, name, label, type, choices, ...others}) => {
    const {
        input: { onChange },
        meta: { touched, error }
    } = useField( name)
    XXX DONT USE Example from react admin gives Warning/Error and slows down form A LOT
    */
export const InputM = (props) => {
    const { /*name,*/ label, type, disabled, choices, disableAutoFill, select, size,
        allowEmpty, translator, className, ...non_custom_props } = props
    var input = useInput({
        ...non_custom_props,
        ...(allowEmpty ? { parse: value => value, } : {})
    })
    const {
        input: { name, onChange, ...rest },
        meta: { touched, error, submitError },
        isRequired,
    } = input
    //console.log( 444, input, non_custom_props)

    const Widget = select ? SelectWidget : TextWidget
    return (
    <Widget
        key={name}
        name={name}
        label={label || name2label( name)}
        onChange={onChange}
        error={!!touched && (error || submitError)}
        helperText={touched && (error || submitError)}
        required={non_custom_props.required ?? isRequired}
        disableAutoFill={disableAutoFill}
        allowEmpty={allowEmpty}
        translator={translator}
        options={choices}
        {...rest}
        fullWidth
        type={type || 'text'}
        disabled={disabled}
        className={className}
        size={size}
    />
    )
}


export const DisableAutoFill = () => (
    <input type="password" name='disable-autofill'
        autoComplete='new-password' tabIndex='-1'
        style={{opacity: 0, float: 'left', border: 'none', height: '0', width: '0', padding: 0}}
    />
)


const TextWidget = ({ disableAutoFill, InputProps, InputLabelProps, ...otherProps }) => {
    const [shrinkLabel, setShrinkLabel] = useState(false)
    const handleAutoFill = (e) => {
        const animationName = e && e.nativeEvent && e.nativeEvent.animationName
        setShrinkLabel( animationName === 'mui-auto-fill')
    }
    InputProps = InputProps || {}
    if (disableAutoFill) {
        InputProps = {
            autoComplete: 'new-password',
            //form: { autocomplete: 'off' },
            ...InputProps
        }
    } else {
        InputProps['onAnimationStart'] = handleAutoFill
    }
    if (shrinkLabel) {
        InputLabelProps = { shrink: true, ...(InputLabelProps || {}) }
    }
    return (
    <>
        { disableAutoFill && (<DisableAutoFill />)}
        <TextField
            InputProps={InputProps}
            InputLabelProps={InputLabelProps}
            autoComplete={ disableAutoFill ? 'new-password' : '' }

            {...otherProps}
        />
    </>
    )
}


// const SelectWidget = ({ allowEmpty, translator, choices, ...otherProps}) => {
//     choices = choices || []
//     if (translator) {
//         choices = choices.map( (o) => ({
//             key: o[ translator.key],
//             value: o[ translator.value],
//             label: o[ translator.label],
//         }))
//     }
//     return (
//     <TextWidget select {...otherProps} >
//         { allowEmpty && <MenuItem key='__empty__' value=''>-</MenuItem> }
//         { choices.map(
//             (o) => <MenuItem key={o.key || o} value={o.value || o}> { o.label || o } </MenuItem>
//         )}
//     </TextWidget>
//     )
// }

const SelectWidget = ({ allowEmpty, translator, options, ...otherProps}) => {
    let choices = options || []
    if (translator) {
        choices = choices.map( (o) => ({
            key: o[ translator.key],
            value: o[ translator.value],
            label: o[ translator.label],
        }))
    }

    return (
        <Dropdown options={choices} {...otherProps}/>
    )
}


export const InputAutocomplete = (props) => {
    const {
        /*name,*/
        label,
        type, disabled, choices,
        disableAutoFill, select, loading, pagination,
        allowEmpty, translator,
        InputProps, className, setFilter,
        setPagination, placeholder,
        ...non_custom_props
    } = props
    const {
        /* eslint-disable */
        input: { name, onChange, value, ...rest },
        meta: { touched, error },
        isRequired,
    } = useInput({ ...non_custom_props, ...(allowEmpty ? { parse: value => value, } : {}) })
    const [items, setItems] = useState([])
    const shouldClearChoices = useRef(false)

    const choices_ids = choices.map(choice => choice.id).join(",")
    useEffect(() => {
        if (shouldClearChoices.current) {
            setItems(choices)
            shouldClearChoices.current = false
        } else {
            setItems((oldItems) => [...oldItems, ...choices])
        }
        // TODO: fix duplicates and then optimize
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [choices_ids])

    const onInputChange = (_, value) => {
        if(!value) return
        shouldClearChoices.current = true
        setFilter(value)
        pagination.page = 1
        // setPagination({page: 1})  // this makes extra 1 request
    }

    const onScroll = (event) => {
        const listboxNode = event.currentTarget
        if (listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight) {
            if(choices.length === pagination.perPage) {
                setPagination({page: pagination.page + 1})
            }
        }
    }

    const onSelect = (event, selectedItems) => {
        onChange( selectedItems.map( selected => selected.id))
    }

    return (
    <Autocomplete
        filterOptions={(options) => options}
        // getOptionSelected={option => rest.value.some(id => id === option.id)}
        // defaultValue={props.input.value}
        // value={value}
        multiple
        options={items}
        getOptionLabel={(option) => option.meaning}
        onInputChange={onInputChange}
        loading={ loading}
        onChange={onSelect}
        name={name}
        fullWidth
        freeSolo
        error={!!(touched && error)}
        helperText={touched && error}
        required={isRequired}
        //{...rest}
        ListboxProps={{ onScroll }}
        renderInput={(params) => (<TextField
            {...params}
            variant="outlined"
            label={label || name2label( name)}
            placeholder={placeholder}
        />)
        }
    />
    )
}


export const SearchFilterInput = (props) => {
    return (
    <InputM label='Search' source='text' alwaysOn
        InputProps={{ endAdornment: (
            <InputAdornment position="end">
                <SearchIcon/>
            </InputAdornment>
        )}}
        {...props}
    />
    )
}


export const Input = ({ select, name, type, formik, allowEmpty,
                        helperText, ...others }) => {
    const f = formik
    const Widget = select ? SelectWidget : TextWidget

    const selectProps = {
        onChange: (name, value) => {
            f.setFieldValue(name, value, false)
            f.setFieldTouched(name, true)
            others.onChange?.(name, value)
        },
    }

    const textProps = {
        onChange: (event) => {
            f.handleChange(event)
            others.onChange?.(event);
        },
        onBlur: (event) => {
            f.handleBlur(event); 
            others.onBlur?.(event)
        }
    }

    return (
    <Widget
        fullWidth
        type={type || 'text'}
        name={name}
        value={f.values[name]}
        error={Boolean(f.touched[name] && f.errors[name])}
        helperText={
            (f.touched[name]
              && f.errors && f.errors[name]
              && (f.errors[name].message || f.errors[name])
            ) || helperText
        }
        // {...(select && { allowEmpty })}
        {...others}
        {
            ...(select ? selectProps : textProps)
        }
    />
    )
}


export const AutocompleteInput = ({name, label, choices, formik, ...others}) => {
    const f = formik
    return (
    <Autocomplete
        disableClearable
        options={choices}
        name={name}
        value={f.values[name]}
        renderInput={
            (params) => <TextField
                label={label} {...params}
            />
        }
    />
    )
}

const PasswordContext = createContext()


export const PasswordInputGroup = ({ children }) => {
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <PasswordContext.Provider value={{
            showPassword, setShowPassword, toggleShowPassword
        }}>
            { children }
        </PasswordContext.Provider>
    )
}

export const PasswordInput = ({ group = false, ...props }) => {  // group: false - can be used alone
    const Wrapper = group ? Fragment : PasswordInputGroup
    return (
        <Wrapper>
            <SinglePasswordInput {...props} />
        </Wrapper>
    )
}

export const SinglePasswordInput = ({name, label, type, formik, newPassword, helperText, ...others}) => {
    const passwordContext = useContext(PasswordContext)
    const [isSelected, setIsSelected] = useState(false)

    const onBlur = () => {
        setIsSelected(false)
        passwordContext.setShowPassword(false)
    }

    const trailingIcon = isSelected && (
        <IconButton
            aria-label='toggle password visibility'
            onClick={passwordContext.toggleShowPassword}
            onMouseDown={ (event) => event.preventDefault() }
            edge='end'
        >
            {passwordContext.showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
    )

    return (
        <Input name={name || 'password'} label={label || 'Password'}
            type={passwordContext.showPassword ? 'text' : 'password'} formik={formik}
            onFocus={e => setIsSelected(true)}
            onBlur={onBlur}
            trailingIcon={trailingIcon}
            trailingIconProps={{
                disablePointerEvents: false
            }}
            helperText={helperText || (newPassword && "Tip!: Use at least 10 digits, letters & the symbols ! $ &")}
            {...others}
        />
    )
}

export const EmailInput = (props) => {
    return (
        <Input {...props} type='email' />
    )
}
EmailInput.defaultProps = {
    label: 'Email Address'
}

export const PhoneInput = (props) => {
    return (
        <Input {...props} type='tel' />
    )
}

export const SingleSubmitInput = ({validator, initialValue, onSubmit, component = Input, ...props}) => {
    const f = useFormik({
        initialValues: {
            [props.name]: initialValue
        },
        validationSchema: yup.object().shape({
            [props.name]: validator
        }),
        onSubmit: async (values, { setErrors, setSubmitting }) => {
            const value = values[props.name]
            if (value === initialValue) return

            try {
                await onSubmit(props.name, value)
            } catch (err) {
                setErrors(err)
            } finally {
                setSubmitting(false)
            }
        },
    })

    const onBlur = () => {
        f.submitForm()
    }

    const Component = component

    return (
        <Component {...props} onBlur={onBlur} formik={f} />
    )
}

// vim:ts=4:sw=4:expandtab
