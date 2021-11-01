import React, { useState } from 'react'
import { useMutation } from 'react-admin'
import { TextFieldTable } from '../theme/components'


export const EditableTextField = ({ record, source, ...props }) => {
    const [ value, setValue ] = useState( record[ source])
    /* eslint-disable */
    const [ editObj, { loading }] = useMutation({
        type: 'update',
        resource: 'trucks',
        payload: {
            id: record.id,
            data: {
                [ source ]: value,
            },
        },
    })
    const onChange = (e) => {
        setValue( e.target.value)
        }

    const [ write, setWrite ] = useState( false)
    const onBlurWrite = () => {
        setWrite( false)
        editObj()
        }
    const onEnterPress = (e) => {
        if (e.key === 'Enter')
            onBlurWrite()
        }
    const writeProps = {
        ...props,
        value: props.value,
        onBlur: onBlurWrite,
        onChange: onChange,
        onKeyPress: onEnterPress,
        defaultValue: record[ source ],
        autoFocus: true,
        }

    const onClickRead = () => { setWrite( true)  }

    const readProps = {
        ...props,
        onClick: onClickRead
    }

    if (write)
        return <TextFieldTable {...writeProps}
            component='input'
            className='editable-text-write'
            />
    else
        return <TextFieldTable {...readProps }
            className='editable-text-read'
            />
}
