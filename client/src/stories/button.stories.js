import { Button } from '../theme/components';
import AddIcon from '@mui/icons-material/Add';

const select = (options) => ({
  options,
  control: {
    type: "select"
  }
})

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    size: select(["large", "medium", "small"]),
    variant: select(["contained", "outlined", "text"]),
    color: select(["primary", "secondary", "error"]),
    disabled: select([false, true]),
    startIcon: select([false, true]),
    endIcon: select([false, true])
  }
};

export const Template = (args) => <Button {...args} startIcon={args.startIcon ? <AddIcon /> : ""} endIcon={args.endIcon ? <AddIcon /> : ""}> { args.children || args.size || "Button" } </Button>;
Template.args = {
  size: "medium",
  variant: "contained",
  color: "primary",
  disabled: false,
  startIcon: false,
  endIcon: false,
  children: "",
};
