import { NavDrawerItem} from '../theme/components';
import { select, config2template_args } from "./common"
import { MemoryRouter } from 'react-router-dom'
import { ReactComponent as IssueIcon } from "../assets/images/issue.svg"

const config = {
  title: 'NavDrawerItem',
  component: NavDrawerItem,
  argTypes: {
    notificationsOn: select([ true, false]),
    disabled: select([false, true]),
    type: select(['default', 'extended']),
    active: select(['false', 'true'])
  },
  decorators: [(Story) => (<MemoryRouter initialEntries={['/','/issues']}><Story/></MemoryRouter>)]
};

export default config

export const Template = ({ notificationsOn, icon, type, active, ...args}) => {
    return <NavDrawerItem {...args}
        to='/issues'
        activeClassName={ active ? 'MuiNavDrawerActive' : ''}
        primary='Issues'
        type={type}
        icon={IssueIcon}
        chip={notificationsOn ? { label: "02" }: null} />
    }
Template.args = {
    ...config2template_args(config),
};
