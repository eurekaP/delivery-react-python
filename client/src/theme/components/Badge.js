import { badge_status_interface } from './interfaces'
import { makeStyles } from '@mui/styles'
import { alpha } from '@mui/material/styles'
import { Typography } from '@mui/material';


export const badge_statuses = {
    new: 'success',
    active: 'primary',
    'out-of-service': 'error',
    sold: 'sold',
    lost: 'lost',
    stolen: 'warning',
    junked: 'secondary',
    empty: 'empty',
}
const size2px = {
    small:  8,
    medium: 12,
    }
const useStyles = (color, size) => makeStyles(theme => ({
    color: {
        backgroundColor: theme.palette[ color].main,
        borderRadius: '50%',
    },
    badge: {
        height: size2px[ size]+'px',
        width: size2px[ size]+'px',
        '&:focus': {
            boxShadow: '0 0 0 2px '+ alpha( theme.palette[ color].main, 0.3),
            outline: 'none',
            },
        },
    badgeText: {
        padding: '5px 10px 5px 10px',
        borderRadius: '12px',
        color: theme.palette.white,
        width: 'fit-content',
        },
    }))


const Badge = (props) => {
    const props2 = badge_status_interface( props, 'Badge', badge_statuses)
    const classes = useStyles( props2.color, props.size)()
    return (
        <div className={ props2.className +' '+ classes.badge +' '+ classes.color } />
    )
}

const BadgeText = (props) => {
    const props2 = badge_status_interface( props, 'Badge', badge_statuses)
    const classes = useStyles( props2.color)()
    return <Typography variant='caption'
            className={ props2.className +' '+ classes.badgeText +' '+ classes.color }
        >
        {props.content || props.children}
        </Typography>
    }

export { Badge, BadgeText }
