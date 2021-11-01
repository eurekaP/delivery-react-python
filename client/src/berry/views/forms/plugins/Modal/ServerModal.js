import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Button, CardContent, CardActions, Divider, Grid, IconButton, Modal, Typography } from '@material-ui/core';

// project imports
import MainCard from '../../../../ui-component/cards/MainCard';

// assets
import CloseIcon from '@material-ui/icons/Close';

// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '16px',
        height: 500,
        flexGrow: 1,
        minWidth: 300,
        zIndex: -1,
        transform: 'translateZ(0)',
        // The position fixed scoping doesn't work in IE 11.
        // Disable this demo to preserve the others.
        '@media all and (-ms-high-contrast: none)': {
            display: 'none'
        }
    },
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        width: 450,
        zIndex: 1
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

//-----------------------|| SERVER MODAL ||-----------------------//

export default function ServerModal() {
    const classes = useStyles();
    const rootRef = React.useRef(null);

    return (
        <div className={classes.root} ref={rootRef}>
            <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                open
                aria-labelledby="server-modal-title"
                aria-describedby="server-modal-description"
                className={classes.modal}
                container={() => rootRef.current}
            >
                <MainCard
                    className={classes.paper}
                    title="Server Side Modal"
                    content={false}
                    secondary={
                        <IconButton>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    <CardContent>
                        <Typography variant="body1">
                            Laboris non ad et aute sint aliquip mollit voluptate velit dolore magna fugiat ex.
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            Commodo amet veniam nostrud mollit quis sint qui nulla elit esse excepteur ullamco esse magna. Nisi duis aute
                            est in mollit irure enim tempor in.
                        </Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <Grid container justifyContent="flex-end">
                            <Button variant="contained" color="primary" type="button">
                                Open Modal
                            </Button>
                        </Grid>
                    </CardActions>
                </MainCard>
            </Modal>
        </div>
    );
}
