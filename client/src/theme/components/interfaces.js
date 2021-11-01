/*
function make_enum(...args) {
    return Object.entries( args).reduce( function( r, index_value) {
        const [ index, value ] = index_value
        r[ value] = value
        return r
    }, {})
}
*/
/*
export const size_options = make_enum(
    'extraSmall',
    'small',
    'medium',
    'large',
    'extraLarge',
)
export const size_interface = (props, mui_comp_name, allowed_sizes) => {
    //assumes allowed sizes is subset of size_options
    if (!allowed_sizes.includes( props.size)) {
        //TODO generic Warning function
        console.log( 'Error: UNKNOWN SIZE: ', props.size, allowed_sizes)
        return props
    }
    const size = props.size[0].charAt(0).toUpperCase() + props.size.slice(1)
    const className = (props.className || '') +' Mui'+ mui_comp_name +'-size'+ size
    return { ...props, className }
}
*/
export const badge_status_interface = (props, mui_comp_name, allowed_statuses) => {
    if (!Object.keys( allowed_statuses).includes( props.status)) {
        console.log( 'Error: UNKNOWN STATUS: ', props.status)
        return props
    }
    const className = (props.className || '')  + 'Mui'+ mui_comp_name +'-'+ props.state
    return { ...props, className, color: allowed_statuses[ props.status]}
}

