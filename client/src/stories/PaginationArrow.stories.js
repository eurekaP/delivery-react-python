import { config2template_args, select } from './common'
import { PaginationArrow } from '../ra-ui/list/PaginationComponents'

const config = {
    title: 'PaginationArrow',
    component: PaginationArrow,
    argTypes: {
        disabled: select([false, true]),
        isPrev: select([false, true])
    }
}
export default config

export const Template = (args) => {
    return <PaginationArrow {...args} />
}
Template.args = config2template_args( config)

