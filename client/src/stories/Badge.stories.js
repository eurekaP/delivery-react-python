import { Badge } from '../theme/components'
import { BadgeText } from '../theme/components'
import { badge_statuses } from './../theme/components/Badge'
import { select, config2template_args } from "./common"

const config = {
    title: 'Badge',
    component: Badge,
    argTypes: {
        state: select(['default', 'selected']),
        size: select(['medium', 'small']),
        status: select( Object.keys( badge_statuses))
    }
}
export default config

export const Default= (args) => (
    <div>
        <Badge {...args}/>
        <div style={{ padding: '20px'}} />
        <BadgeText {...args} content='Test Text'/>
    </div>
    )
Default.args = {
    ...config2template_args( config)
}

