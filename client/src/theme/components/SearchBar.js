import { useRef, useState } from 'react'
import TextField from './TextField'
import { makeStyles } from '@mui/styles'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import { ReactComponent as IconSearch } from '../../assets/images/search.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '192px',
        '& .MuiOutlinedInput-root': {
            backgroundColor: theme.palette.white,
            '&.MuiInputBase-sizeSmall': {
                paddingLeft: '12px !important'
            },
            '&:not(.MuiInputBase-sizeSmall)': {
                paddingLeft: '12px !important',
                paddingTop: '12px !important',
                paddingBottom: '12px !important',
            },
            '& .MuiIconButton-root': {
                padding: '0px'
            },
            '& .MuiIconButton-root:hover': {
                backgroundColor: 'transparent'
            }
        },
        '& input': {
            "&::placeholder": {
                color: theme.palette.text.secondary + " !important",
                opacity: "1 !important",
            }
        },
    }
}))

const SearchBar = ( props) => {
    const classes = useStyles()

    const [shouldClearValue, setShouldClearValue] = useState( !!props.value)
    const searchRef = useRef(null)

    const currentTrailingIcon = shouldClearValue ? <ClearIcon/> : <IconSearch/>

    const onChange = (e) => {
        setShouldClearValue( e.target.value && e.target.value.length)
        props.onChange?.(e)
    }

    const leadingIcon = <IconButton><IconSearch/></IconButton>
    const trailingIcon = <IconButton
        disableRipple
        onClick={shouldClearValue ? () => {
                setShouldClearValue( false)
                props.onClear()
                } : null}
            >
            {currentTrailingIcon}
        </IconButton>

    return (
        <TextField
            inputProps={{placeholder: props.placeholder || 'Search'}}
            inputRef={searchRef}
            {...props}
            leadingIcon={props.leadingIcon && leadingIcon }
            trailingIcon={props.trailingIcon && trailingIcon }
            className={`${classes.root} ${props.className}`}
            trailingIconProps={{disablePointerEvents: false}}

            value={props.value}
            onChange={onChange}
        />
    )
}

export default SearchBar

