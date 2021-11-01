import { DatePicker } from '../theme/components';

import { config2template_args, select } from './common'

const config = {
    title: 'DatePicker',
    component: DatePicker,
    argTypes: {
        view: select(["year", "month"]),
    }
}

export default config
export const Template = (args) => {
    return <DatePicker {...args}/>
}
Template.args = config2template_args( config)

