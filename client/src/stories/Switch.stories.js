import { Switch } from '../theme/components';
import { select, config2template_args } from "./common"

const config = {
  title: 'Switch',
  component: Switch,
  argTypes: {
    checked: select([true, false]),
    color: select(["primary", "secondary", "error"]),
    labelOn: select([true, false]),
    disabled: select([false, true])
  }
};

export default config

export const Template = ({labelOn, ...args}) => <Switch {...args} label={labelOn ? args.label : ""} />;
Template.args = {
    ...config2template_args(config),
    label: "Label",
};
