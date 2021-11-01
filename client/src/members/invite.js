import { Box, CircularProgress, Typography } from "@material-ui/core"
import { makeStyles, } from "@mui/styles"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from "react";
import { useMutation } from "ra-core";
import { useFormik } from "formik";
import {
  EmailInput,
  validators
} from '../lib/fields'
import * as yup from 'yup'
import DoneIcon from '@material-ui/icons/Done';
import { Stack } from "../lib/others";

import { Button } from '../theme/components'

const useStyles = makeStyles(theme => ({
    content: {
        width: "432px",
        maxWidth: "100%",
        padding: "41px 40px 44px 40px"
    },
    title: {
        padding: 0,
    },
    body: {
        padding: 0,
    },
    text: {
      marginBottom: "25px",
      marginTop: "16px"
    },
    footer: {
        padding: "29px 0 0"
    },
    footerCompleted: {
      padding: "59px 7px 0 0"
    },
    primaryButton: {
        marginLeft: theme.spacing(5) + " !important",
    },
    loadingIcon: {
      color: theme.palette.grey[200]
    },
    iconContainer: {
      width: "68px",
      height: "68px",
      borderRadius: "4px",
      backgroundColor: theme.palette.lightGreen[50],
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    successIcon: {
      color: theme.palette.lightGreen[500],
      width: "32px",
      height: "32px"
    },
    infoText: {
      color: theme.palette.grey[700]
    },
    primaryText: {
      color: theme.palette.blue[500],
      display: "block"
    }
}))

const MemberInviteDialog = ({ open, handleClose }) => {
    const classes = useStyles()
    const [completed, setCompleted] = useState(false)

    const [mutate] = useMutation();

    const f = useFormik({
        initialValues: {
          email: "",
        },
        validationSchema: yup.object().shape({
            email: validators.email,
        }),
        onSubmit: async (values, { setErrors, setSubmitting }) => {
            try {
              await mutate({
                type: 'create',
                resource: "members",
                payload: { data: {...values, role: "MEMBER"} },
              }, { returnPromise: true })
              setCompleted(true)
            } catch (err) {
                setErrors({
                    email: [
                        ...(err.email || []).map(msg => msg.message),
                        ...(err.non_field_errors || [])?.map(msg => msg.message)
                    ]
                })
            } finally {
                setSubmitting(false)
            }
    }})

    const close = () => {
      handleClose()
      setCompleted(false)
      f.resetForm()
    }

    return (
        <Dialog open={open} onClose={close} classes={{paper: classes.content}} >
        <DialogTitle className={classes.title}>Invite New Member</DialogTitle>
        <DialogContent className={classes.body}>
        {
            completed ? (
            <>
                <SuccessMessage email={f.values.email} />
                <DialogActions className={classes.footerCompleted}>
                    <Button onClick={close} variant="text" color="primary">Close</Button>
                    <Button type="button" onClick={() => {
                        setCompleted(false)
                        f.resetForm()
                    }} className={classes.primaryButton} variant="contained" color="primary">Add New</Button>
                </DialogActions>
            </>
            ) : (
            <form onSubmit={f.handleSubmit} >
                <Typography variant="body1" className={classes.text}>
                    To invite member, please enter an email.
                </Typography>
                <EmailInput name="email" formik={f} label="Email Address" helpterTextNoWrapper disabled={f.isSubmitting} />

                <DialogActions className={classes.footer}>
                    <Button onClick={close} variant="text" color="primary">Cancel</Button>
                    <Button disabled={f.isSubmitting} type="submit" variant="contained" color="primary"
                        className={classes.primaryButton}
                        endIcon={f.isSubmitting ? <CircularProgress size={18} className={classes.loadingIcon} /> : ""}>Invite
                    </Button>
                </DialogActions>
            </form>
            )
        }
        </DialogContent>
      </Dialog>
    )
}

const SuccessMessage = ({ email }) => {
    const classes = useStyles()

    return (
    <Stack direction='row' alignItems="center" marginTop="23px">
        <div className={classes.iconContainer}>
            <DoneIcon className={classes.successIcon} width="32px" height="32px" />
        </div>
        <Box marginLeft={5}>
            <Typography variant="body1" className={classes.infoText}>
                <span className={classes.primaryText}>{email}</span>
                has been invited!
            </Typography>
        </Box>
    </Stack>
    )
}

export default MemberInviteDialog
