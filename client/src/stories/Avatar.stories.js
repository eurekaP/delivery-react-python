import { config2template_args, select } from './common'
import { Avatar } from '../theme/components'
import { ReactComponent as CameraIcon } from "../assets/images/camera.svg"

const config = {
    title: 'Avatar',
    component: Avatar,
    argTypes: {
        size: select(['medium', 'small', 'extraLarge']),
        type: select([ '', 'text', 'icon'])
    }
}
export default config

export const Template = (args) => {
    const props = {}
    if (args.type === 'text')
        props.fromText = 'Best Test'
    if (args.type === 'icon')
        props.children = <CameraIcon viewBox="0 0 24 24"/>
    return <Avatar {...args} {...props} />
}
Template.args = config2template_args( config)

