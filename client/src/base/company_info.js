import { Box } from '@material-ui/core'

import { inject, observer } from 'mobx-react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import {
    EmailInput,
    Input, InputGroup, PhoneInput, SingleSubmitInput, validators
} from '../lib/fields'

import ImageUpload from '../theme/components/ImageUpload'
import { SectionWithTitle } from '../theme/components/content'

import { states } from '../lib/consts'
import { useMemo } from 'react'

const statesWithNull = [null, ...states]

const stateOptions = statesWithNull.map(state => ({
    label: state,
    value: state
}))

const CompanyInfo = inject('auth', 'ui')(observer( ({ auth, ui }) => {
    const company = auth.currentCompany
    /* eslint-disable */
    const isReadOnly = useMemo(() => auth.isMember, [])

    const f = useFormik({
        initialValues: company,
        validationSchema: yup.object().shape({
            email: validators.email,
            name: validators.name,
            address: validators.name,
            city: validators.name,
            state:  yup.string().nullable().oneOf( statesWithNull, 'Invalid state code'),
            zip_code: validators.zip,
            phone: validators.phone,
        }),
        onSubmit: async (values, { setErrors, setSubmitting }) => {
            // try {
            //     await auth.saveCompany( { id: company.id, logo: logo, ...values })
            //     ui.setToast('Your Company was successfully updated', 'success')
            // } catch (err) {
            //     setErrors( err)
            // } finally {
            //     setSubmitting(false)
            // }
        }
    })

    const onDropAccepted = (files, config) => save('logo', files[0], config)
    const onImageRemove = () => save('logo', "")

    const onBlur = async (event) => {
        const {name} = event.target
        const value = f.values[name]
        if (!f.errors[name] && value !== company[name]) {
            save(name, value)
        }
    }

    const selectChange = (name, value) => {
        save(name, value)
    }
    
    const save = async (name, value, extraConfig) => {
        if (isReadOnly) return
        try {
            await auth.saveCompany( { id: company.id, [name]: value }, extraConfig)
            ui.setToast('Your Company was successfully updated', 'success')
        } catch (err) {
            f.setErrors({[name]: err[name].map(msg => msg.message)})
        }
    }

    const saveSingle = async (name, value) => {
        if (isReadOnly) return
        await auth.saveCompany( { id: company.id, [name]: value })
    }

    // const inputExtraProps = isReadOnly ? { variant: 'standard' ,inputProps: { readOnly: true }, InputProps: { readOnly: true }, readOnly: true } : { variant: 'outlined' }
    const inputExtraProps = isReadOnly ? { variant: 'standard', disabled: true } : { variant: 'outlined' }
    const inputProps = { formik: f, size: 'small', ...inputExtraProps }

    const fieldProps = {
        ...inputProps,
        onBlur
    }

    const selectProps = {
        ...inputProps,
        onChange: selectChange
    }

    return (
    <>
        <SectionWithTitle title="Company Info">
            <Box marginBottom="17px" width="364px" marginLeft="-10px" marginTop="-9px">
                <ImageUpload
                    title='Profile Picture'
                    titleOnUpload='Uploading Picture'
                    titleOnDelete='Deleting Picture'
                    onDropAccepted={onDropAccepted}
                    image={auth.currentCompany.logo}
                    onImageRemove={onImageRemove}
                    readOnly={isReadOnly}
                    />
            </Box>

            <Box>
                <InputGroup width="252px">
                    <Input name="name" label="Company Name" type="text" {...fieldProps} />
                </InputGroup>

                <InputGroup>
                    <PhoneInput name="phone" label="Phone Number"
                        style={{width: "135px"}} helperTextOverflow {...fieldProps}
                    />
                </InputGroup>

                <InputGroup width="344px" marginBottom="50px">
                    <EmailInput name="email" label="Email" {...fieldProps} />
                </InputGroup>
            </Box>
        </SectionWithTitle>

        <SectionWithTitle title="Address">
            <Box>
                <InputGroup width="344px">
                    {/* usage of single submit input */}
                    <SingleSubmitInput name="address" label="Address" type="text"
                        {...inputExtraProps}
                        onSubmit={saveSingle}
                        validator={validators.name}
                        initialValue={company.address}
                        size='small'
                    />

                    {/* <Input name="address" label="Address" type="text" formik={f} onBlur={onBlur} {...inputExtraProps} /> */}
                </InputGroup>

                <div style={{ display: "flex" }}>
                    <InputGroup width="184px">
                        <Input name="city" label="City" type="text" {...fieldProps} />
                    </InputGroup>
                    <InputGroup width="206px" marginLeft={6}>
                        <Input select name='state' label='State' disableClearable={false} onChange={selectChange} options={stateOptions} {...selectProps} />
                    </InputGroup>
                    <InputGroup width="160px" marginLeft={6}>
                        <Input name='zip_code' label='Zip Code' {...fieldProps} />
                    </InputGroup>
                </div>
            </Box>
        </SectionWithTitle>
    </>
    )
}))

export default CompanyInfo

// vim:ts=4:sw=4:expandtab
