import {
    ListButton, TopToolbar,
    SaveButton, DeleteButton, useWarnWhenUnsavedChanges,
    } from 'react-admin'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import { Box, Toolbar, Typography, Grid, useMediaQuery, } from '@material-ui/core'
import { NonFieldErrors } from './forms'


export const TabPanel = ({ children, value, index, ...other }) => (
    <div role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && <Box p={0}>{children}</Box>}
    </div>
)


export const FormBody = ({ children, title, noSave, noDelete, make_other_buttons, submitError, record, ...props }) => {
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'))
    useWarnWhenUnsavedChanges(true)
    const other_buttons = (make_other_buttons && make_other_buttons( props)) || []
    return (
    <form>
        <Box p='1em'>
            <Typography variant='h3'> { title } </Typography>
            <Box m={2} />
            {submitError && <NonFieldErrors errors={submitError} />}
            <Grid container spacing={matchDownSM ? 1 : 2}>
                { children }
            </Grid>
        </Box>

        <Toolbar>
            <Box display='flex' justifyContent='space-between' width='100%'>
                { !noSave && <SaveButton
                    disabled={props.pristine}
                    saving={props.saving}
                    handleSubmitWithRedirect={props.handleSubmitWithRedirect}
                /> }
                { other_buttons }
                { !noDelete && <DeleteButton
                    undoable={false}
                    record={record}
                    basePath={props.basePath}
                /> }
            </Box>
        </Toolbar>
    </form>
    )
}


export const DetailActions = ({ basePath }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label='Back' icon={<ChevronLeft />}/>
    </TopToolbar>
)

// vim:ts=4:sw=4:expandtab
