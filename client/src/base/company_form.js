import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'

import { Badge, useMediaQuery, Box, /*Stack,*/ Grid, Typography, Avatar } from '@material-ui/core'
import { Stack } from '../lib/others'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useDropzone } from 'react-dropzone'

import GroupIcon from '@material-ui/icons/Group'
//import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined'
//import PhotoCameraTwoToneIcon from '@material-ui/icons/PhotoCameraTwoTone'
import { styled, makeStyles } from '@mui/styles'

import { Input, EmailInput, PhoneInput, validators} from '../lib/fields'
import { CardForm, FormWithSubmitButton } from '../lib/forms'
import { states } from '../lib/consts'


const useStyles = makeStyles( () => ({
    companyLogo: {
        width: '100px',
        height: '100px',
        margin: '1 auto'
    },
    companyLogoSmall: {
        width: '36px',
        height: '36px',
        margin: '1 auto'
    },
}))


//TODO MAYBE Avatar Comp, but file not used
export const CompanyLogo = ({ src, small, upload }) => {
    const classes = useStyles()
    const className = small ? classes.companyLogoSmall : classes.companyLogo
    if (upload) {
        return (
        <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
                <SmallAvatar>
                <PhotoCameraOutlinedIcon fontSize='small' color='secondary' />
                </SmallAvatar>
            }
        >
        { src ? (
            <Avatar src={src} alt='logo' className={className} />
            ) : (
            <Avatar alt='logo' className={className} >
                <GroupIcon />
            </Avatar>
            )
        }
        </Badge>
        )
    }
    return (
    <>
        { src ? (
            <Avatar src={src} alt='logo' className={className} />
        ) : (
            <Avatar alt='logo' className={className} >
                <GroupIcon />
            </Avatar>
        )}
    </>
    )
}

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 25,
    height: 25,
    border: `2px solid ${theme.palette.background.paper}`,
}))

export const ChangeCompanyLogo = ({small, logo, onChange}) => {
    const {
        rejectedFiles,
        isDragAccept,
        isDragReject,
        getRootProps,
        getInputProps
    } = useDropzone({
        //accept: 'image/*',
        accept: 'image/jpeg, image/png, image/gif',
        maxFiles: 1,
        onDrop: acceptedFiles => {
            if (!acceptedFiles.length) {
                onChange && onChange(null)
            } else {
                const f = acceptedFiles[0]
                f.preview = URL.createObjectURL( f)
                onChange && onChange(f)
            }
        }
    })
    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        if (logo && logo.preview) {
            URL.revokeObjectURL( logo.preview)
        }
    }, [logo])
    return (
    <Grid item xs={12} {...getRootProps({ className: 'dropzone-upload-wrapper' })} >
        <Grid item xs={12}>
            <CompanyLogo upload small={small} src={logo ? (logo.preview || logo) : ''} />
        </Grid>
        <Box m={1} />
        <Grid item xs={12} align='center'>
            <Stack direction='row' justifyContent='center' alignItems='center'>
                <input {...getInputProps()} />
            </Stack>
            {(rejectedFiles.length || isDragReject) && (
                <Box fontSize='fontSize' sm={1} color='error'>
                    <Typography variant='subtitle2' color='error' align='center'>
                        Unsupported file type! Please upload a .png, .jpeg, or .gif!
                    </Typography>
                </Box>
            )}
            {isDragAccept && (
              <div>
                <Box fontSize='fontSize' sm={1} color='text.danger'> Drop here to set as company logo! </Box>
              </div>
            )}
        </Grid>
    </Grid>
    )
}


export const CompanyForm = inject('auth')( observer(
                        ({ auth, onSubmit, card, extraActions, company, withLogo, ...others }) => {
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'))
    const [logo, setLogo] = useState(null)
    if (!company) {
        company = {
            name: '',
            address: '',
            city: '',
            state: '',
            zip_code: '',
            contact: '',
            phone: '',
            email: '',
            website: '',
        }
    }
    const f = useFormik({
        initialValues: company,
        validationSchema: yup.object().shape({
            email: validators.email,
            name: validators.name.required(),
            address: validators.name,
            city: validators.name,
            state:  yup.string().oneOf( states, 'Invalid state code').required(),
            zip_code: validators.zip,
            contact: validators.name,
            phone: validators.phone,
            website: validators.website,
        }),
        onSubmit: async (values, { setErrors, setSubmitting }) => {
            try {
                const data = await auth.saveCompany( { id: company.id, logo: logo, ...values })
                onSubmit && onSubmit( data)
            } catch (err) {
                setErrors( err)
            } finally {
                setSubmitting(false)
            }
        }
    })

    let logoComponent = ''
    if (withLogo) {
        logoComponent = (<ChangeCompanyLogo logo={logo} onChange={setLogo} />)
    }
    if (card) {
        return (
        <CardForm formik={f}
            actions={{
                save: { label: 'Save', main: true, handler: f.handleSubmit},
                ...extraActions
            }}
            {...others}>
            <Grid container spacing={matchDownSM ? 1 : 2}>
                <CompanyFields formik={f} logoComponent={logoComponent} />
            </Grid>
        </CardForm>
        )
    }
    return (
    <FormWithSubmitButton formik={f} submitButtonText={ company ? 'Save' : 'Create company' } {...others}>
        <Grid container spacing={matchDownSM ? 1 : 2}>
            <CompanyFields formik={f} logoComponent={logoComponent} />
        </Grid>
    </FormWithSubmitButton>
    )
}))


export const CompanyFields = ({ formik, logoComponent}) => {
    const f = formik
    return (
    <>
        {logoComponent && (
        <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }} >
                <Box sx={{ justifyContent: 'center' }} >
                    {logoComponent}
                </Box>
            </Box>
        </Grid>
        )}
        <Grid item xs={12}>
            <Input required name='name' label='Company Name' formik={f} />
        </Grid>
        <Grid item xs={12}>
            <Input name='address' label='Address' formik={f} />
        </Grid>

        <Grid item xs={12} md={6} xl={4}>
            <Input name='city' label='City' formik={f} />
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
            <Input required select name='state' label='State' choices={states} formik={f} />
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
            <Input name='zip_code' label='Zip code' formik={f} />
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
            <Input name='contact' label='Contact' formik={f} />
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
            <PhoneInput name='phone' label='Phone' formik={f} />
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
            <EmailInput name='email' label='Email' formik={f} />
        </Grid>
        <Grid item xs={12} >
            <Input name='website' label='Website' formik={f} />
        </Grid>
    </>
    )
}


export default CompanyForm

// vim:ts=4:sw=4:expandtab
