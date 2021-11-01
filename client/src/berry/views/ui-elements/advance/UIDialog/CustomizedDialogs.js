import React from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog, IconButton, Stack, Typography } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

// assets
import CloseIcon from '@material-ui/icons/Close';

// style constant
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2.5)
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(2),
        top: theme.spacing(2),
        color: theme.palette.grey[500]
    }
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(3)
    }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2)
    }
}))(MuiDialogActions);

//=============================|| DIALOG TITLE ||=============================//

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h4">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

//===============================|| UI DIALOG - CUSTOMIZED ||===============================//

export default function CustomizedDialogs() {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open dialog
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} sx={{ '& .MuiDialog-paper': { pr: 0 } }}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Modal Title
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={2}>
                        <Typography variant="body2">
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                            Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                        </Typography>
                        <Typography variant="body2">
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet
                            rutrum faucibus dolor auctor.
                        </Typography>
                        <Typography variant="body2">
                            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur
                            et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                        </Typography>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus variant="contained" size="small" onClick={handleClose} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
