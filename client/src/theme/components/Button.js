import { Button as MuiButton } from "@mui/material"

const Button = ({ children, ...rest }) => {
    return (
        <MuiButton {...rest}>
            <span className="text-node">
                { children }
            </span>
        </MuiButton>
    )
}

export default Button

