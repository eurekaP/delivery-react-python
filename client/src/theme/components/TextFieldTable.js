import Typography from '@mui/material/Typography'
import { capitalize } from '../../lib/common'
import escapeHtml from 'escape-html'

const TextFieldTable_size2avatar_size = {
    large: 'medium',
    medium: 'small',
}

const TextFieldTable = (props) => {
    var Component = props.children
    var value = props.value || (
        props.getValue
            ? ( props.getValue( props) || '')
            : props.text
    )

    if (!Component) {
        const ComponentComp = props.component
        if (ComponentComp)
            Component = [ <ComponentComp {...props} /> ]
        else {
            if (props.searchedText && value) {
                value = value +''
                const searchedText = escapeHtml( props.searchedText)
                value = value.replace( RegExp( searchedText, 'gi'), (match, key) => {
                    return '<span class="highlighted">'+ match +'</span>'
                })
                value = <div dangerouslySetInnerHTML={{ __html: value }}></div>
            }

            Component = [ <Typography> { value } </Typography> ]
        }
    }
    const StartAdornmentComp = props.startAdornment
    const StartAdornment = []
    if (StartAdornmentComp && !(props.hasAvatar && props.size === 'small')) {

        var startAdornmentSize = props.size
        if (props.hasAvatar)
            startAdornmentSize = TextFieldTable_size2avatar_size[ props.size]

        StartAdornment.push(
            <StartAdornmentComp {...props} size={startAdornmentSize}
                className=" startAdornment "
            />
        )
    }
    const EndAdornmentComp = props.endAdornment
    const EndAdornment = []
    if (EndAdornmentComp)
        EndAdornment.push(
            props.endAdornmentIsElement
            ? EndAdornmentComp
            : <EndAdornmentComp {...props} className=" endAdornment " />
        )
    var className = props.className +' TextFieldTable size'+ capitalize( props.size)
    if (props.disablePadding)
        className += ' disablePadding'
    return (
        <div {...props} className={className}>
            {StartAdornment}
            {Component}
            {EndAdornment}
        </div>
    )
}

TextFieldTable.defaultProps = {
    size: 'large',
    getValue: ({ record, source }) => record[ source]
}

export default TextFieldTable

// vim:ts=4:sw=4:expandtab
