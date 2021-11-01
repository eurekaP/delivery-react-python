import { config2template_args, select } from './common'
import { PaginationCircle } from '../ra-ui/list/PaginationComponents'

const config = {
    title: 'PaginationCircle',
    component: PaginationCircle,
    argTypes: {
        value: select(['1', '20', '200']),
        disabled: select([false, true]),
        isCurrent: select([false, true])
    }
}
export default config

export const Template = (args) => {
    return <PaginationCircle {...args} />
}
Template.args = config2template_args( config)

