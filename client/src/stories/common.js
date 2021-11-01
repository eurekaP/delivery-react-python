export const config2template_args = (config) => {
    return Object.entries( config.argTypes).reduce( function( r, value) {
        const [ k, v] = value
        r[ k] = v.options[0]
        return r
    }, {} )
}

export const select = (options) => ({
    options,
    control: {
        type: "select"
    }
})

