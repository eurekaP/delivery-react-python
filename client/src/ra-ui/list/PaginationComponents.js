import { useState, useEffect } from 'react'
import { makeStyles } from "@mui/styles"
import { alpha } from '@mui/material/styles'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { ButtonBase as MuiButtonBase, Typography } from '@mui/material'

const classnames = (...args) => args.join(' ')

const useStyles = makeStyles((theme) => ({
    root: {
        '&.MuiButtonBase-root': {
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            ...theme.typography.body2,
            color: theme.palette.text.main,
            '&:hover': {
                backgroundColor: theme.palette.table.hoverRow
            },
        }
    },
    circle: {
        '&.Mui-disabled .MuiTypography-root': {
            color: alpha( theme.palette.grey[500], 0.4)
        },
        '& .MuiTypography-root': {
            ...theme.typography.body2,
            color: theme.palette.grey[500],
        },
    },
    arrow: {
        '& .MuiSvgIcon-root': {
            color: theme.palette.grey[500],
        },
        '&.Mui-disabled .MuiSvgIcon-root': {
            color: alpha( theme.palette.grey[500], 0.4)
        },
    },
    current: {
        '&.MuiButtonBase-root': {
            border: "1px solid "+ theme.palette.grey[100],
            backgroundColor: theme.palette.table.hoverRow,
        }
    },
    centerNumberInput: {
        width: '40px',
        height: '40px',
        borderRadius: theme.shape.borderRadius,
        textAlign: 'center',
        ...theme.typography.subtitle1,
        color: theme.palette.primary.main,
        outline: 'none',
        border: '1px solid '+ theme.palette.primary.main,
    },
}))

export const PaginationCircle = (props) => {
    const classes = useStyles()

    return (
        <MuiButtonBase className={classnames( classes.root, classes.circle, props.isCurrent ? classes.current : '') } onClick={props.onClick} disabled={props.disabled}>
            <Typography>{props.value}</Typography>
        </MuiButtonBase>
    )
}


export const PaginationArrow = (props) => {
    const classes = useStyles()
    return (
        <MuiButtonBase className={classnames( classes.root, classes.arrow)} onClick={props.onClick} disabled={props.disabled}>
            { props.isPrev ? <ChevronLeft/> : <ChevronRight/> }
        </MuiButtonBase>
    )
}


export const CenterNumberInput = (props) => {
    const classes = useStyles()
    const [value, setValue] = useState( props.value)

    /* eslint-disable */
    useEffect(() => {
        setValue( props.value)
    }, [props.page])

    const goToValuePage = () => {
        var nextPage = parseInt( value)
        if (value < 1 || value > props.max) {
            nextPage = props.page
            setValue( nextPage)
            }
        props.goPage( nextPage)
    }
    const onFocus = (e) => {
        goToValuePage()
        e.target.select()
    }
    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur()
            goToValuePage()
        }
    }
    const onChange = (e) => {
        setValue( e.target.value)
    }
    return (
        <input
            className={classes.centerNumberInput}
            {...{}/*TODO
            min={1}
            max={props.max} */
            }
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={goToValuePage}
            defaultValue={props.value}
        />
    )
}

// vim:ts=4:sw=4:expandtab
