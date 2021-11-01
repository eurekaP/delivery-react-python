import { CheckboxWithHelperText } from '../theme/components';
import { select, config2template_args } from "./common"

const config = {
  title: 'Checkbox',
  component: CheckboxWithHelperText,
  argTypes: {
    checked: select([true, false]),
    color: select(["default", "primary", "secondary" ]),
    size: select(["medium", "small"]),
    labelOn: select([true, false]),
    disabled: select([false, true]),
    indeterminate: select([false, true]),
    fullWidth: select([false, true]),
    error: select([false, true])
  }
};

export default config

export const Template = ({labelOn, ...args}) => <CheckboxWithHelperText {...args} label={labelOn ? args.label : ""} />;
Template.args = {
    ...config2template_args(config),
    label: "Label",
    helperText: ''
};
