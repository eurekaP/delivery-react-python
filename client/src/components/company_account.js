import {
    makeStyles
} from '@material-ui/core'
import { ReactComponent as DeleteIcon } from '../assets/images/delete.svg'

import { inject, observer } from 'mobx-react'
import { SectionWithTitle, WarningMessage } from '../theme/components/content'

import { Button } from '../theme/components'


const useStyles = makeStyles(theme => ({
    button: {
        marginLeft: theme.spacing(5) + " !important"
    },
    messageContent: {
        marginTop: "30px"
    }
}))


const CompanyAccount = inject('ui')( observer( ({ ui }) => {
    const classes = useStyles()

    const notImplemented = () => {
        ui.setToast('This function is not yet implemented. Coming soon!', 'error')
    }

    return (
            <SectionWithTitle title="Company Info">
                <WarningMessage
                textWidth="436px"
                text="To close your company, first, please either transfer the ownership to another member of the team or de-activate the company.">
                    <div className={classes.messageContent}>
                        <Button
                            startIcon={<DeleteIcon />}
                            onClick={notImplemented}
                            variant='outlined'
                            color="error"
                        >
                            De-Activate the Company
                        </Button>
                        <Button variant="contained" color="primary" className={classes.button} onClick={notImplemented}>
                            Transfer Ownership
                        </Button>
                    </div>
                </WarningMessage>
            </SectionWithTitle>
    )
}))

export default CompanyAccount
