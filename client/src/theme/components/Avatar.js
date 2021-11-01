import AvatarM from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

function string2typography( s) {
    return <Typography> {s} </Typography>
}
function stringAvatar( name) {
    var words = []
    if (name.indexOf(' ') !== -1) {
        words = name.split(' ')
    }
    var children = ''
    var w1 ='', w2=''
    if (words.length === 0) {
        if (name) {
            w1 = name[0]
        }
    } else if (words.length === 1) {
        [w1] = words
    } else if (words.length >= 2) {
        [w1, w2] = words
    }
    children = [
        string2typography( w1 ? w1[0].toUpperCase() : ''),
        string2typography( w2 ? w2[0].toUpperCase() : ''),
    ]

    return {
        children,
        //sx: { bgcolor: stringToColor(name) },
    }
}
/*
function stringToColor( string) {
    let hash = 0
    let i

    // eslint-disable no-bitwise
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff
        color += `00${value.toString(16)}`.substr(-2)
    }
    // eslint-enable no-bitwise

    return color
}
*/

const Avatar = (props) => {
    const children = props.fromText ? stringAvatar( props.fromText).children : props.children
    var className = props.className
    if (props.noHover) className += ' noHover'
    return <AvatarM {...props} className={className}> {children} </AvatarM>
}

export default Avatar
