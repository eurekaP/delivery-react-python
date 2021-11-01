import {
    Popper as MuiPopper
} from '@mui/material'

const Popper = ({ offset, ...props }) => {
    return (
        <MuiPopper {...props} modifiers={[
            {
                name: 'offset',
                options: {
                    offset
                }
            }
        ]} />
    )
}

Popper.defaultProps = {
    offset: []
}

export default Popper