import {
    Grid,
    Typography,
    Box,
    CardContent,
    CardActions,
    Divider,
    Dialog, DialogActions, DialogContent, DialogTitle,
} from '@material-ui/core'
//import { makeStyles } from '@material-ui/styles'
import SubCard from './cards'

import { Button } from '../theme/components'

//export const useStyles = makeStyles( (theme) => ({


export const NonFieldErrors = ({errors}) => {
    return (
    <>
        {(errors || []).map( (item) => (
            item.message ? <CardContent key={item.message} className='server-errors'> {item.message} </CardContent> : <CardContent className='server-errors' children={item}/>
        ))}
    </>
    )
}

export const Form = ({formik, children, ...others}) => {
    const f = formik
    return (
    <form noValidate onSubmit={f.handleSubmit} {...others}>
        {others.non_field_errors && <NonFieldErrors errors={others.non_field_errors} />}
        {children}
    </form>
    )
}


export const FormWithSubmitButton = ({formik, children, submitButtonText, disableSubmit, ...others}) => {
    const disableSubmitButton = () => ( disableSubmit ? disableSubmit() : formik.isSubmitting )
    return (
    <Form formik={formik} {...others} >

        {children}

        <Box>
            <Grid container spacing={0} justifyContent='center'>
                <Grid item xs={12} >
                    <Button
                        disableElevation
                        disabled={disableSubmitButton()}
                        fullWidth
                        size='large'
                        type='submit'
                        variant='contained'
                        color='primary'
                        className={others.submitButtonClass}
                    >
                        {submitButtonText}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </Form>
    )
}


export const CardForm = ({formik, title, children, actions, ...others}) => {
    return (
    <SubCard title={title} content={false}>
        <CardContent>
            <FormContent formik={formik} >
                {children}
            </FormContent>
        </CardContent>

        <Divider />

        <CardActions>
            <FormActions formik={formik} actions={actions} />
        </CardActions>
    </SubCard>
    )
}


export const DialogForm = ({formik, title, children, actions, open, onClose, ...others}) => {
    const close = () => (onClose && onClose())
    return (
    <Dialog open={true} onClose={close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
            <Typography variant="h4">{title}</Typography>
        </DialogTitle>
        <DialogContent>
            <FormContent formik={formik} >
                {children}
            </FormContent>
        </DialogContent>

        <DialogActions>
            <FormActions formik={formik} actions={actions} />
        </DialogActions>
    </Dialog>
    )
}


export const FormContent = ({formik, children, ...others}) => {
    return (
    <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12}>
            <Form formik={formik}>
                {children}
            </Form>
        </Grid>
    </Grid>
    )
}


export const FormActions = ({formik, actions}) => {
    return (
    <Grid container alignItems='center' justifyContent='flex-end' spacing={2}>
        { Object.entries(actions).map( ([key, action]) => (
        <Grid item key={key}>
            <Button variant={action.main ? 'contained' : 'outlined'}
                    color={action.main ? 'secondary' : 'primary'}
                    disabled={formik.isSubmitting}
                    onClick={action.handler}
                    >
                {action.label}
            </Button>
        </Grid>
        ))}
    </Grid>
    )
}


// vim:ts=4:sw=4:expandtab
