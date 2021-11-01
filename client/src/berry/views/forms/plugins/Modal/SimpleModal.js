import React from 'react';

//material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Button, CardContent, CardActions, Divider, Grid, IconButton, Modal, Typography } from '@material-ui/core';

// project imports
import MainCard from '../../../../ui-component/cards/MainCard';

// assets
import CloseIcon from '@material-ui/icons/Close';

// generate random
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

// modal position
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

// style constant
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 450,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        [theme.breakpoints.down('sm')]: {
            width: 280
        }
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

// modal content
const Body = React.forwardRef(({ modalStyle, classes, handleClose }, ref) => {
    return (
        <div ref={ref} tabIndex={-1}>
            <MainCard
                style={modalStyle}
                className={classes.paper}
                title="Title"
                content={false}
                secondary={
                    <IconButton onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
                <CardContent>
                    <Typography variant="body1">
                        Laboris non ad et aute sint aliquip mollit voluptate velit dolore magna fugiat ex.
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Commodo amet veniam nostrud mollit quis sint qui nulla elit esse excepteur ullamco esse magna. Nisi duis aute est in
                        mollit irure enim tempor in.
                    </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                    <SimpleModal />
                </CardActions>
            </MainCard>
        </div>
    );
});

//-----------------------|| SIMPLE MODAL ||-----------------------//

export default function SimpleModal() {
    const classes = useStyles();

    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid container justifyContent="flex-end">
            <Button variant="contained" color="primary" type="button" onClick={handleOpen}>
                Open Modal
            </Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <Body classes={classes} modalStyle={modalStyle} handleClose={handleClose} />
            </Modal>
        </Grid>
    );
}
