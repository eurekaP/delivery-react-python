import { Box } from "@mui/material"

export const Row = (props) => {
    return (
        <Box {...props} />
    )
}

Row.defaultProps = {
    display: 'flex',
    flexDirection: 'row',
    gap: '24px'
}


export const Col = (props) => {
    return (
        <Box {...props} />
    )
}

Col.defaultProps = {
    marginBottom: 10,
    width: '100%',
    flexShrink: 0
}