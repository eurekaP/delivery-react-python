import { Box } from '@material-ui/core'

import { inject, observer } from 'mobx-react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import {
    EmailInput,
    Input, InputGroup, validators
} from '../lib/fields'

import ImageUpload from '../theme/components/ImageUpload'
import DatePicker from '../theme/components/DatePicker'
import { SectionWithTitle } from '../theme/components/content'


const ProfileInfo = inject('auth', 'ui')(observer( ({ auth, ui }) => {

    const f = useFormik({
        initialValues: {
            name: auth.user.name,
            email: auth.user.email,
            phone: auth.user.phone,
        },
        validationSchema: yup.object().shape({
            name: validators.name,
            email: validators.email,
            phone: validators.phone,
        }),
        onSubmit: async (values, { setErrors, setSubmitting }) => {
            try {
                await auth.updateUser( values)
                ui.setToast('Your profile was successfully updated', 'success')
            } catch (err) {
                setErrors( err)
            } finally {
                setSubmitting(false)
            }
        }
    })

    const onDropAccepted = (files, config) => {
        auth.setAvatar(files[0], config)
    }

    const onImageRemove = () => {
        auth.setAvatar(null)
    }

    const onBlur = async (event) => {
        const {name} = event.target
        const value = f.values[name]
        if(f.errors[name]) return

        try{
            await auth.updateUser({
                [name]: value
            })

            ui.setToast('Your profile was successfully updated', 'success')

        } catch (err) {
            f.setErrors({[name]: err[name].map(msg => msg.message)})
        }
    }

    return (
        <SectionWithTitle title="Profile Info">
            <Box marginBottom="17px" width="364px" marginLeft="-10px" marginTop="-9px">
                <ImageUpload title="Profile Picture" onDropAccepted={onDropAccepted} image={auth.user.avatar} onImageRemove={onImageRemove} />
            </Box>

                <DatePicker />

            <Box>
                <InputGroup width="344px">
                    <EmailInput name="email" formik={f} label="Email" disabled size='small' />
                </InputGroup>

                <InputGroup width="344px">
                    <Input name="name" label="Full Name" type="text" formik={f} onBlur={onBlur} size='small' />
                </InputGroup>

                <InputGroup>
                    <Input name="phone" label="Phone Number" type="tel" formik={f} onBlur={onBlur} style={{width: "135px"}} size='small'/>
                </InputGroup>
            </Box>
        </SectionWithTitle>
    )
}))

export default ProfileInfo

// vim:ts=4:sw=4:expandtab
