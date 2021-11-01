import { useState } from 'react';
import {
    Paper,
    ClickAwayListener,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import AddIcon from '@mui/icons-material/Add';
import {
    Dropdown,
    Button,
    Popper
} from '.'

const useStyles = makeStyles(() => ({
    textField: {
        '&, & *, & .MuiInputBase-root': {
            height: '0 !important',
            maxHeight: '0 !important',
            padding: '0 !important',
            overflow: 'hidden !important',
        },
    },
    paper: {
        height: 0
    },

}))


const Filter = ({ placement, buttonProps, onChange, closeOnSelect, dropdownMinWidth, buttonText, ...rest }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles({height: anchorEl?.offsetHeight})

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const onSelectChange = (options, type) => {
        closeOnSelect && handleClose()
        onChange?.(options, type)
    }

    const open = Boolean(anchorEl);

    return (
        <>
            <Button type="button" onClick={handleClick} {...buttonProps} color="secondary" >
                {buttonText}
            </Button>
            <Popper open={open} anchorEl={anchorEl} placement={placement}>
                <Paper className={classes.paper}>
                    <ClickAwayListener onClickAway={handleClose} touchEvent="onTouchStart" mouseEvent={'onMouseDown'}>
                        <div style={{width: dropdownMinWidth}}>
                            <Dropdown optionsTooltip fullWidth popperOffset={({ placement }) => [0, ((placement === 'top' && anchorEl?.offsetHeight) || 0) + 8]} {...rest} filterOptions={options => options} open onChange={onSelectChange} textFieldProps={{className: classes.textField}} />
                        </div>
                    </ClickAwayListener>
                </Paper>
            </Popper>
       </>
    )
}

// ((placement === 'top' && anchorEl?.offsetHeight) || 0)
// offset={({ placement }) => [0, (placement === 'top' && anchorEl.offsetHeight && -anchorEl.offsetHeight) || 0]}

Filter.defaultProps = {
    closeOnSelect: true,
    buttonProps: {
        endIcon: <AddIcon />
    },
    placement: 'bottom-start',
    multiple: true,
    itemsMultiple: false,
    dropdownMinWidth: '224px',
    buttonText: 'ADD FILTER'
}

export default Filter
