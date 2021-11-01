import React, { useState, useCallback } from 'react'
import { inject } from 'mobx-react'
import { //List,
    Create, Show, FormWithRedirect, FormDataConsumer, SearchInput,
    //TextInput,
    //TextField,
    //ShowButton,
    useMutation
} from 'react-admin'
import { List, Datagrid } from '../ra-ui/list'

import { Grid, InputAdornment } from '@material-ui/core'
import { makeStyles } from '@mui/styles'

import { FORM_ERROR } from 'final-form'

import { states } from '../lib/consts'
import { InputM } from '../lib/fields'
import { make_avatarProps } from '../lib/header'
import { FormBody, DetailActions } from '../lib/admin-components'
import { Avatar, TextFieldTable } from '../theme/components'
import { Badge } from '../theme/components'

import AuthPage from './../auth/auth_page'
import InvitationAcceptForm from './invitation_form'


const MemberForm = ({ title, disabled, roleInput, ...props }) => {
    const inputProps = { disabled: disabled }
    return (
    <FormBody title={title} {...props}>
        <FormDataConsumer>
            { ({ formData, ...rest  }) => ( disabled && formData.invitation_status
            && (<Grid item xs={12} md={12}>
                <InputM source='invitation_status' disabled  />
            </Grid>) )
            }
        </FormDataConsumer>

        <Grid item xs={12} md={6}>
            <InputM source='email' {...inputProps} />
        </Grid>
        { roleInput || (
        <Grid item xs={12} md={6}>
            <InputM source='role' {...inputProps}
                choices={[
                    { id: 'MEMBER', name: 'Member' },
                    { id: 'OWNER',  name: 'Owner'  },
                ]}
                select translator={{ key: 'id', value: 'id', label: 'name' }}
                />
        </Grid>
        )}

        <Grid item xs={12} md={6}> <InputM source='first_name' {...inputProps} /> </Grid>
        <Grid item xs={12} md={6}> <InputM source='last_name' {...inputProps} /> </Grid>

        <Grid item xs={12} md={6}> <InputM source='address' {...inputProps} /> </Grid>
        <Grid item xs={12} md={6}> <InputM source='city' {...inputProps} /> </Grid>

        <Grid item xs={12} md={6}>
            <InputM select source='state' allowEmpty choices={states} {...inputProps} />
        </Grid>

        <Grid item xs={12} md={6}>
            <InputM source='zip_code' {...inputProps} />
        </Grid>
        <Grid item xs={12} md={6}>
            <InputM source='phone' {...inputProps} />
        </Grid>
    </FormBody>
    )
}


export const MemberInvite = (props) => {
    const [submitError, setSubmitError] = useState([])

    const [mutate] = useMutation();
    /* eslint-disable */
    const save = useCallback(
        async (values) => {
            try {
                await mutate({
                    type: 'create',
                    resource: props.resource,
                    payload: { data: values },
                }, { returnPromise: true })
            } catch (error) {
                if (error && error.non_field_errors) {
                    setSubmitError( error.non_field_errors)
                    return { [FORM_ERROR]: error.non_field_errors} //XXX: proper way to return submitError, but react-admin form does not receive it as prop to pass it down to final-form
                    }
                return error
            }
        },
        [mutate],
    )

    return (
    <Create
        undoable={false}
        actions={ <DetailActions basePath={props.basePath} />}
        {...props}
        >
        <FormWithRedirect
            render= { formProps => <MemberForm title='Invite a new member' {...formProps} submitError={submitError} /> }
            save={save}
            {...props}
        />
    </Create>
)}


export const MemberShow = (props) => (
    <Show
        actions={ <DetailActions basePath={props.basePath} />}
        {...props}
     >
        <FormWithRedirect
            render= { formProps => <MemberForm title='View member' disabled {...formProps} noSave /> }
            {...props}
        />
    </Show>
)


/*
const filters = [
    <SearchInput source='text' alwaysOn />,
    <TextInput label='Email'   source='email' />,
]
*/


const useStyles = makeStyles(() => ({
    table: { //hack
        '& th:not(:first-child)': {
        width: '20%',
        }
    },
}))

const UserAvatar4EditableTextField = ({ record, size }) => {
    const [avatarProps, ignore ] = make_avatarProps({ ...record, userFullName: record.name })
    const onClick = ( e) => {
        //TODO
        e.stopPropagation()
        e.preventDefault()
        }
    return (
        <InputAdornment position='start' onClick={onClick}>
            <Avatar {...avatarProps} size={size} noHover/>
        </InputAdornment>
    )
}

const BadgeInvStatus = ({ record, className }) => {
    const status = record.is_invitation ? 'active' : 'new'
    return <Badge size='medium' status={status} className={className}/>
}

const table_size = 'large'
export const MemberList = (props) => {
    const classes = useStyles()
    return (
    <List {...props} bulkActionButtons={true} hasShow
        filters={[
            <SearchInput source='text' alwaysOn />,
            <InputM label='First name' source='first_name' />,
            <InputM label='Last name'  source='last_name'  />,
            <InputM label='Email' source='email' />,
        ]}
    >
        <Datagrid className={'editable-table '+ classes.table} size={table_size} >{/*rowClick="show"*/}
            <TextFieldTable source='name'
                startAdornment={UserAvatar4EditableTextField}
                hasAvatar
                size={table_size}
                />
            <TextFieldTable source='is_invitation' label='Invitation Status'
                startAdornment={BadgeInvStatus}
                getValue={ ({ record }) => record.is_invitation ? 'Invitation Sent' : 'Accepted'}
                size={table_size}
                />
            <TextFieldTable source='email' label='Email Address' size={table_size} />
            <TextFieldTable source='phone' label='Phone Number'  size={table_size} />
            <TextFieldTable source='address'                     size={table_size} />
            { /*
            <TextField source='zip_code' />
            <TextField source='role' />
            <TextField source='state' />
            <TextField source='truck' />
            <ShowButton />
            */}
        </Datagrid>
     </List>
    )
}
if (0){
const table_sizeM = 'medium'
/*export*/ const MemberListMedium = (props) => {
    const classes = useStyles()
    return (
    <List {...props} bulkActionButtons={true} hasShow
        filters={[
            <SearchInput source='text' alwaysOn />,
            <InputM label='First name' source='first_name' />,
            <InputM label='Last name'  source='last_name'  />,
            <InputM label='Email' source='email' />,
        ]}
    >
        <Datagrid className={'editable-table '+ classes.table} size={table_sizeM} >{/*rowClick="show"*/}
            <TextFieldTable source='name'
                startAdornment={UserAvatar4EditableTextField}
                hasAvatar
                size={table_sizeM}
                />
            <TextFieldTable source='is_invitation' label='Invitation Status'
                startAdornment={BadgeInvStatus}
                getValue={ ({ record }) => record.is_invitation ? 'Invitation Sent' : 'Accepted'}
                size={table_sizeM}
                />
            <TextFieldTable source='email' label='Email Address' size={table_sizeM} />
            <TextFieldTable source='phone' label='Phone Number'  size={table_sizeM} />
            <TextFieldTable source='address'                     size={table_sizeM} />
            { /*
            <TextField source='zip_code' />
            <TextField source='role' />
            <TextField source='state' />
            <TextField source='truck' />
            <ShowButton />
            */}
        </Datagrid>
     </List>
    )
}
const table_sizeS = 'small'
/* eslint-disable */
/*export*/ const MemberListSmall = (props) => {
    const classes = useStyles()
    return (
    <List {...props} bulkActionButtons={true} hasShow
        filters={[
            <SearchInput source='text' alwaysOn />,
            <InputM label='First name' source='first_name' />,
            <InputM label='Last name'  source='last_name'  />,
            <InputM label='Email' source='email' />,
        ]}
    >
        <Datagrid className={'editable-table '+ classes.table} size={table_sizeS} >{/*rowClick="show"*/}
            <TextFieldTable source='name'
                startAdornment={UserAvatar4EditableTextField}
                hasAvatar
                size={table_sizeS}
                />
            <TextFieldTable source='is_invitation' label='Invitation Status'
                startAdornment={BadgeInvStatus}
                getValue={ ({ record }) => record.is_invitation ? 'Invitation Sent' : 'Accepted'}
                size={table_sizeS}
                />
            <TextFieldTable source='email' label='Email Address' size={table_sizeS} />
            <TextFieldTable source='phone' label='Phone Number'  size={table_sizeS} />
            <TextFieldTable source='address'                     size={table_sizeS} />
            { /*
            <TextField source='zip_code' />
            <TextField source='role' />
            <TextField source='state' />
            <TextField source='truck' />
            <ShowButton />
            */}
        </Datagrid>
     </List>
    )
}}

/* eslint-disable */
export const InviteAccept = inject('auth')( ({ auth }) => {
    return  (
    <AuthPage
        title="Join Fleetpal"
        subTitle="Please, fill out the information below."
        form={<InvitationAcceptForm />}
//        linkProps={linkProps}
        divider={{ marginTop: 6 }}
        >
    </AuthPage>
    )
/*    const [error, setError] = useState(null)
    const [acceptPending, setAcceptPending] = useState( true)
    let { token } = useParams()
    useEffect( () => (
        auth.acceptInvite( token)
            .catch( setError)
            .finally( () => setAcceptPending(false) )
        ), [auth, token, setAcceptPending]
    )
    if (acceptPending) {
        return (
        <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress size={100} variant='indeterminate' disableShrink={true} />
        </Box>
        )
    }
    if (!error) {
        return <Redirect to={config.urls.root} />
    }
    return <h1>Invitation is no longer valid. Please contact your company administrator.</h1>
*/
})


// vim:ts=4:sw=4:expandtab
