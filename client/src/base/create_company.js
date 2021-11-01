import React, { useState } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { inject } from 'mobx-react'
import { Grid } from '@material-ui/core'

import { FullScreenDialog } from '../lib/others'
import CompanyForm from './company_form'
import config from '../config'


const CreateCompany = inject('auth')( ({ auth }) => {
    const [open, setOpen] = useState(true)
    //const [tab, setTab] = React.useState(0)

    const location = useLocation()
    const previousLocation = (location.state && location.state.previousLocation)
    if (!open) {
        return <Redirect to={{
            pathname: (previousLocation ? previousLocation.pathname : config.urls.root),
        }} />
    }
    const createCompany = (data) => {
        auth.setCurrentCompanyId( data.id)
        setOpen(false)
    }
    return (
    <FullScreenDialog open={open} title="Create Company" onClose={ () => setOpen(false) }>
        <Grid container direction="column" spacing={2}>
            <Grid item xs={12} m={/*doesnt work*/2} style = {{ margin: '16px' }} >
                <CompanyForm card withLogo onSubmit={createCompany} />
            </Grid>
        </Grid>
    </FullScreenDialog>
    )
})

export default CreateCompany
