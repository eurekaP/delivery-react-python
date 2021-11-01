import React from 'react'
import {
    ListItemButton as MuiListItemButton,
    ListItemText as MuiListItemText,
    ListItemIcon as MuiListItemIcon,
    Typography,
    Chip as MuiChip } from '@mui/material'
import { NavLink as RouterLink,} from 'react-router-dom'

const NavDrawerItem = ({icon, url, primary, chip, typographyVariant, type, activeClassName, ...rest}) => {
    const Icon = icon
    /* eslint-disable */
    const renderLink = React.useMemo(
        () =>
          React.forwardRef(function Link(itemProps, ref) {
            return <RouterLink to={url} activeClassName={activeClassName || "MuiNavDrawerActive"} ref={ref} {...itemProps} role={undefined} />
          }),
        [url],
    )
    return (
        <MuiListItemButton component={renderLink} {...rest} type={type} key={rest.id}>
            {icon ? <MuiListItemIcon><Icon/></MuiListItemIcon> : null}
            <MuiListItemText disableTypography={true}>
                <Typography variant={typographyVariant || 'body1'}>{primary}</Typography>
            </MuiListItemText>
            {chip && (
                <MuiChip {...chip}/>
            )}
        </MuiListItemButton>
    )
}

export default NavDrawerItem

