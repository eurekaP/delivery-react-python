import { Button as MuiButton } from "../../theme/components"
import {sanitizeButtonRestProps} from "ra-ui-materialui/esm/button/Button"

const Button = props => {
    const restProps = sanitizeButtonRestProps(props);

    return <MuiButton {...restProps} />
};

export default Button;
