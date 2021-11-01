import { useCallback, useState } from 'react'
import {
    Create, SimpleForm, SimpleList, //List, Datagrid,
    Edit, Show,
    //EditButton, ShowButton, ReferenceField,
    TextField,
    TextInput, SelectInput, ReferenceInput, ImageInput, ImageField,
    FormWithRedirect, useMutation,
} from 'react-admin'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import {
    Box
} from '@mui/material'

import { FORM_ERROR } from 'final-form'

import { Typography, Grid, useMediaQuery } from '@material-ui/core'

import { states } from '../lib/consts'
import { InputGroup, InputM, SearchFilterInput } from '../lib/fields'
import { FormBody, DetailActions } from '../lib/admin-components'

import { Button, TextFieldTable, Badge, ImageUpload, Row, Col, DatePicker } from '../theme/components'
//import DeleteButton from "../ra-ui/button/DeleteButton"
import { List, Datagrid } from "../ra-ui/list"
import { SectionWithTitle } from '../theme/components/content'
import { Stack } from '../lib/others'

const useStyles = makeStyles( () => ({
    ra_list: {
        overflow: 'auto',
    },
    'MuiTableCell-root': {
        padding: 0,
    },
}))

const CustomActionButton = ({ record, children, ...props }) => {
    const onClick = (event, index) => {
        props.onClick( record.id, event, index )
    }
    return <Button color="primary" onClick={ onClick }>{ children }</Button>
}

// filterToQuery={(filterText => ({text: filterText}))}
const VmrsEquipmentCategoryInput = (props) => (
    <ReferenceInput className="reference-input-min-width-equipment-category" disabled={props.disabled}
        label='Equipment Category' source='vmrs_equipment_category' reference='vmrs/ck2' >
        <InputM className="reference-input-min-width"
            select translator = {{ key: 'id', value: 'id', label: 'meaning' }}
            {...props}
        />
    </ReferenceInput>
)

const VmrsManucaturerInput = (props) => (
    <ReferenceInput className="reference-input-min-width-manufacturer" disabled={props.disabled}
        label='Manufacturer/Make' source='vmrs_manufacturer' reference='vmrs/ck34'
        perPage={200}
        >
        <InputM className="reference-input-min-width"
            select translator = {{ key: 'id', value: 'id', label: 'meaning' }}
            {...props}
        />
    </ReferenceInput>
)

const select_status_choices = [
    { id: 'IN_SERVICE',     name: 'Active'     },
    { id: 'OUT_OF_SERVICE', name: 'Out of service' },
]
const first_match = ( id, choices ) => {
    for ( const v of choices ) {
        if (v.id === id)
            return v.name
        }
    }

const BadgeTruckStatus = ({ record, source, className }) => {
    const status = record[ source] === 'IN_SERVICE' ? 'active' : 'out-of-service'
    return <Badge size='medium' status={status} className={className}/>
}

export const TruckList = (props) => {
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'))
    //const history = useHistory()
    //const assign_driver = (id, event, index) => {
    //    history.push( props.basePath +'/'+ id +'/assign_driver/')
    //}
    const classes = useStyles()
    const component = matchDownSM ? (
        <SimpleList
            primaryText={ record => record.unit_number}
            secondaryText={ record => record.name}
            tertiaryText={ record => record.status}
            linkType ={ record => record.canEdit ? "edit" : "show"}
            />
        ) : (
        <Datagrid className='editable-table' size='large'>
            {/*<ImageField source='photo' className='image-field-4-list' />*/}

            <TextFieldTable source='unit_number'    label='Number'/>
            <TextFieldTable source='name'           label='Unit Name'/>
            {/*<TextFieldTable source='registration_state' label='License'/>*/}
            <TextFieldTable source='registration_plate' label='License Plate' />
            <TextFieldTable source='vin'            label='VIN'/>
            <TextFieldTable source='model'/>
            <TextFieldTable source='model_year'     label='Model Year'/>
            <TextFieldTable source='color'          label='Color'/>
            <TextFieldTable source='status'
                startAdornment={BadgeTruckStatus}
                choices={ select_status_choices }
                getValue={ ({ record, source }) => {
                    if (record && source)
                        return first_match( record[ source], select_status_choices )
                }}
            />
            {/*
            <ReferenceField source='vmrs_equipment_category' reference='vmrs/ck2'>
                <TextFieldTable name='meaning' source='meaning'
                    getValue={ (props) => (props.record[ props.source]) }
                />
            </ReferenceField>

            <ReferenceField source='vmrs_manufacturer' reference='vmrs/ck34'>
                <TextFieldTable name='meaning' source='meaning'
                    getValue={ (props) => (props.record[ props.source]) }
                />
            </ReferenceField>
            <EditButton/>
            <ShowButton/>
            <CustomActionButton onClick={ assign_driver }> Assign Driver </CustomActionButton>
            <DeleteButton/>
            */}
        </Datagrid>
    )
    return <List {...props} classes={{ content: classes.ra_list }}
        filters={[
            <SearchFilterInput />,
            <InputM label='Name' source='name' />,
            <VmrsEquipmentCategoryInput />,
            <VmrsManucaturerInput />,
            <InputM label='Model Year' source='model_year' />,
            <InputM label='Model' source='model' />,
        ]}
        perPage={2}

        {...{} /*
        sort={{ field: 'unit_number', order: 'ASC' }}
        pagination={<Pagination/>}
        */ }
        bulkActionButtons={true}
    >
        { component }
    </List>
}


const _truck_inputs = [
    <InputM source='unit_number'/>,
    <InputM source='name'/>,
    <InputM source='vin' />,
    <InputM source='registration_plate'/>,
    <InputM source='status'
        choices={[
            { id: 'IN_SERVICE', name: 'In service' },
            { id: 'OUT_OF_SERVICE', name: 'Out of service' },
        ]}
        select translator={{ key: 'id', value: 'id', label: 'name' }}
    />,
] //ReferenceInput only one Children ?problem?


export const TruckCreate1 = (props) => (
    <Create {...props} actions={ <DetailActions />}>
        <SimpleForm>
            {_truck_inputs}
            <InputM select source='registration_state' allowEmpty choices={states} />
            <VmrsEquipmentCategoryInput />
            <ReferenceInput
                label='Company' source='company' reference='my_fleets'>
                <InputM
                    select translator = {{ key: 'id', value: 'id', label: 'name' }}
                />
            </ReferenceInput>
        </SimpleForm>
    </Create>
)
//<SelectInput optionText='meaning' optionValue='id' />
//<SelectInput optionText='name' optionValue='id' />


export const TruckEdit2 = (props) => (
    <Edit {...props} undoable = {false}>
        <SimpleForm redirect='list'>
            <TextInput disabled label='Id' source='id' />
            <TextInput source='unit_number'/>
            <TextInput source='name'/>
            <TextInput source='vin' />
            <TextInput source='registration_plate'/>
            <TextInput source='registration_state'/>
            <SelectInput source='status' choices={ select_status_choices } />
            <ReferenceInput label='Equipment category' source='vmrs_equipment_category' reference='vmrs/ck2'>
              <SelectInput optionText='meaning' optionValue='id' />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
)


export const TruckEdit1 = (props) => (
    <Edit {...props} undoable = {false} actions={ <DetailActions />}>
        <SimpleForm redirect='list'>
            <TextField label='Id' source='id' />
            <TextField source='unit_number'/>
            <TextField source='name'/>
            <TextField source='vin' />
            <TextField source='registration_plate'/>
            <TextField source='registration_state'/>

            <TextField source='registration_plate'/>
            <TextField source='registration_state'/>
            {/*
            <InputM source='status'
                choices={[
                    { id: 'IN_SERVICE', name: 'In service' },
                    { id: 'OUT_OF_SERVICE', name: 'Out of service' },
                ]}
                select translator={{ key: 'id', value: 'id', label: 'name' }}
                />
            <ReferenceInput
                label='Equipment category' source='vmrs_equipment_category' reference='vmrs/ck2'>
                <InputM
                    select translator = {{ key: 'id', value: 'id', label: 'meaning' }}
                />
            </ReferenceInput>
            */}
        </SimpleForm>
    </Edit>
)

const TruckForm = (props) => {
    return (
        <div style={{padding: '24px'}}>
            <SectionWithTitle title="Basic Details">
                <Box marginBottom="32px" width="364px">
                    <ImageUpload title="Unit Photo"  />
                </Box>
                <Row>
                    <Col width="192px">
                        <DatePicker view="year" source='date' size='small' label='Year'/>
                    </Col>
                </Row>
                <Row>
                    <Col width="192px">
                        <InputM source='unit_number' label='Unit Number' required size='small' />
                    </Col>
                    <Col width="288px">
                        <InputM label='Unit Name' source='name' size='small' />
                    </Col>
                </Row>
                <Row>
                    <Col width="264px">
                        <InputM source='vin' size='small' label='VIN'/>
                    </Col>
                </Row>
                <Row marginBottom='24px'>
                    <Col width="168px">
                        <InputM source='registration_plate' size='small' label='License Plate'/>
                    </Col>
                    <Col width="200px">
                        <InputM source='status' size='small'
                            required
                            choices={[
                                { id: 'IN_SERVICE', name: 'In service' },
                                { id: 'OUT_OF_SERVICE', name: 'Out of service' },
                            ]}
                            select translator={{ key: 'id', value: 'id', label: 'name' }}
                        />
                    </Col>
                </Row>
                
            </SectionWithTitle>
            <SectionWithTitle title="Specifications">

                <Row>
                    <Col width="264px">
                        <VmrsEquipmentCategoryInput size='small' />
                    </Col>
                </Row>
                <Row>
                    <Col width="264px">
                        <VmrsManucaturerInput size='small' />
                    </Col>
                    <Col width='216px'>
                        <InputM source='model' size='small' select/>
                    </Col>
                    <Col width='168px'>
                        <InputM source='model_year' size='small'/>
                        {/* <DatePicker name='model_year' size='small' view={'year'} /> */}
                    </Col>
                </Row>

                <Row marginBottom='24px'>
                    <Col width='232px'>
                        <InputM source='color' label='Color' size='small'/>
                    </Col>
                    <Col width='168px'>
                        <InputM source='tire_size' label='Tire Size' size='small'/>
                    </Col>
                </Row>

            </SectionWithTitle>
            <SectionWithTitle title="Engine" titleVariant='subtitle1'>
                <Row marginBottom='24px'>
                    <Col width="264px">
                    <ReferenceInput
                        label='Manufacturer/Make'
                        source='engine_vmrs_manufacturer'
                        reference='vmrs/ck34' perPage={200}>
                        <InputM
                            select translator = {{ key: 'id', value: 'id', label: 'meaning' }}
                            size='small'
                        />
                    </ReferenceInput>
                    </Col>
                    <Col width='216px'>
                        <InputM source='engine_model' size='small' label='Model'/>
                    </Col>
                    <Col width='96px'>
                        <InputM source='engine_hp' size='small' label='HP'/>
                    </Col>
                </Row>
            </SectionWithTitle>
            <SectionWithTitle title="Transmission" titleVariant='subtitle1'>
                <Row>
                    <Col width="264px">
                    <ReferenceInput
                        label='Manufacturer/Make' source='transmission_vmrs_manufacturer' reference='vmrs/ck34' perPage={200}>
                        <InputM
                            select translator = {{ key: 'id', value: 'id', label: 'meaning' }}
                            size='small'
                        />
                    </ReferenceInput>
                    </Col>
                    <Col width='216px'>
                        <InputM source='transmission_model' size='small' label='Model'/>
                    </Col>
                    <Col width='96px'>
                        <InputM source='transmission_gears' size='small' label='Gears'/>
                    </Col>
                </Row>
            </SectionWithTitle>
        </div>
    )
}

// const TruckForm = ({ title, disabled, ...props}) => (
//     <FormBody title={title} {...props}>
//         <Grid item xs={12}>
//             <Typography variant='h4'> Identification </Typography>
//         </Grid>

//         <Grid item xs={9}>
//             <ImageInput source='photo' label='Photo' accept='image/*' disabled={disabled} >
//                 <ImageFieldShowInitial source='src' title='title' />
//             </ImageInput>
//         </Grid>
//         <Grid item xs={3}> <InputM source='driver_strname' label='Driver' disabled/> </Grid>

//         <Grid item xs={12} md={6}> <InputM source='unit_number' disabled={disabled}/> </Grid>
//         <Grid item xs={12} md={6}> <InputM source='name' disabled={disabled}/> </Grid>

//         <Grid item xs={12} md={6}> <InputM source='vin' disabled={disabled}/> </Grid>
//         <Grid item xs={12} md={6}> <InputM source='registration_plate' disabled={disabled}/> </Grid>

//         <Grid item xs={12} md={6}>
//             <InputM select source='registration_state' allowEmpty choices={states} disabled={disabled} />
//         </Grid>

//         <Grid item xs={12} md={6}>
//             <InputM source='status' disabled={disabled}
//                 choices={[
//                     { id: 'IN_SERVICE', name: 'In service' },
//                     { id: 'OUT_OF_SERVICE', name: 'Out of service' },
//                 ]}
//                 select translator={{ key: 'id', value: 'id', label: 'name' }}
//                 />
//         </Grid>

//         <Grid item xs={12}>
//             <Typography variant='h4'> Specification </Typography>
//         </Grid>
//         <Grid item xs={12} md={12}>
//             <VmrsEquipmentCategoryInput disabled />
//         </Grid>
//         <Grid item xs={12} md={6}>
//             <VmrsManucaturerInput disabled />
//         </Grid>
//         <Grid item xs={6} md={3}> <InputM source='model'      disabled={disabled}/> </Grid>
//         <Grid item xs={6} md={3}> <InputM source='model_year' disabled={disabled}/> </Grid>


//         <Grid item xs={12} md={1}>
//             <Typography variant='subtitle1'> Engine </Typography>
//         </Grid>
//         <Grid item xs={12} md={5}>
//             <ReferenceInput disabled={disabled}
//                 label='Engine manufacturer'
//                 source='engine_vmrs_manufacturer'
//                 reference='vmrs/ck34' perPage={200}>
//                 <InputM
//                     select translator = {{ key: 'id', value: 'id', label: 'meaning' }}
//                 />
//             </ReferenceInput>
//         </Grid>
//         <Grid item xs={6} md={3}> <InputM source='engine_model' disabled={disabled}/> </Grid>
//         <Grid item xs={6} md={3}> <InputM source='engine_hp'    disabled={disabled}/> </Grid>


//         <Grid item xs={12} md={1}>
//             <Typography variant='subtitle1'> Transmission </Typography>
//         </Grid>
//         <Grid item xs={12} md={5}>
//             <ReferenceInput disabled={disabled}
//                 label='Transmission manufacturer' source='transmission_vmrs_manufacturer' reference='vmrs/ck34' perPage={200}>
//                 <InputM
//                     select translator = {{ key: 'id', value: 'id', label: 'meaning' }}
//                 />
//             </ReferenceInput>
//         </Grid>
//         <Grid item xs={6} md={3}> <InputM source='transmission_model' disabled={disabled}/> </Grid>
//         <Grid item xs={6} md={3}> <InputM source='transmission_gears' disabled={disabled}/> </Grid>
//     </FormBody>
// )

const rtype2cfg = {
    CREATE: {
        component: Create,
        title: 'Create New Truck',
        },
    EDIT: {
        component: Edit,
        title: 'Edit Truck',
        },
    SHOW: {
        component: Show,
        title: 'Show Truck',
        disabled: true,
        },
    }
export const TruckEdit = ({ type, ...props}) => {
    type = type || 'EDIT'
    const title = rtype2cfg[ type].title
    const Editor = rtype2cfg[ type].component
    const disabled = rtype2cfg[ type].disabled
    //if not undoable no POST api call
    const history = useHistory()
    const assign_driver = (id, event, index) => {
        history.push( props.basePath +'/'+ id +'/assign_driver/')
    }
    function make_other_buttons( props) {
        return [ CustomActionButton({ ...props,
            onClick: assign_driver,
            children: 'Assign Driver',
            })
        ]
    }

    const [submitError, setSubmitError] = useState([])
    const [mutate] = useMutation()
    /* eslint-disable */
    const save = useCallback(
        async (values) => {
            try {
                await mutate({
                    type: type.toLowerCase(),
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
    <Editor
        undoable={false}
        actions={ <DetailActions basePath={props.basePath} />}
        {...props}
        >
        <FormWithRedirect
            render={ formProps => <TruckForm title={title} disabled={disabled} {...formProps}
                submitError={submitError}
                make_other_buttons = {make_other_buttons}
        /> }
            save={save}
            {...props}
    />
    </Editor>
    )
}

export const TruckAssignDriver = (props) => {
    const resource = 'my_fleets' + props.match.url.slice( 0, -1)
    const basePath = props.location.pathname.split('/').slice(0,3).join('/')
    return (
    <Create
        basePath = {basePath}
        resource = {resource}
        {...props} actions={ <DetailActions basePath={basePath} />}>
        <SimpleForm>
            <ReferenceInput source='drivers' reference = "members"
                filter={{ role: 'MEMBER', /*invitation_status: 'NONE'*/ }}
            >
                <InputM
                    select translator = {{ key: 'id', value: 'id', label: 'email' }} //strname
                />
            </ReferenceInput>
        </SimpleForm>
    </Create>
    )
}


export const TruckCreate = (props) => (<TruckEdit type='CREATE' {...props} />)
export const TruckShow   = (props) => (<TruckEdit type='SHOW'   {...props} />)


const ImageFieldShowInitial = ({ record, ...props }) => {
    const recordFile = record.rawFile ? record : { src: record }
    return <ImageField {...props} record = { recordFile }/>
}


// vim:ts=4:sw=4:expandtab
