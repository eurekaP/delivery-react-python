import { MenuItem } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { Checkbox } from '.'
import { forwardRef } from 'react'

// props:
// size: 'normal' | 'small'  - size of options
// multiple: false   - false: checkboxes / true: icon at end
export const MenuItemWithSelectStatuses = forwardRef(({multiple, children, selected, leadingIcon, ...rest}, ref) => {
    let content, Icon = leadingIcon
    const childrenContent = <span className='children-content'>{children}</span>
    const startIcon = Icon ? <Icon className='start-icon' /> : ''
    if (multiple) content = <><Checkbox checked={selected} controllerProps={{removeOffset: true}} />{childrenContent}</>
    else content = <>{startIcon}{childrenContent}{selected && <CheckIcon className='selected-adornment'/>}</>
    return (
        <MenuItem {...rest} selected={selected} ref={ref}>
            <div className='menu-item-content'>
                { content }
            </div>
        </MenuItem>
    )
})

MenuItemWithSelectStatuses.defaultProps = {
    multiple: false,
    size: 'medium'     // same as menuitem size
}

export default MenuItem
