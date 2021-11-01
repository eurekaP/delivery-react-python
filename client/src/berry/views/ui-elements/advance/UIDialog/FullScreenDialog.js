import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Dialog, Divider, IconButton, ListItemText, ListItem, List, Slide, Toolbar, Typography } from '@material-ui/core';

// assets
import CloseIcon from '@material-ui/icons/Close';

// style constant
const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    }
}));

// slide animation
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

//===============================|| UI DIALOG - FULL SCREEN ||===============================//

export default function FullScreenDialog() {
    const classes = useStyles();

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
                Open full-screen dialog
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h3" color="inherit" className={classes.title}>
                            Sound
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            SAVE
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem button>
                        <ListItemText
                            primary={<Typography variant="subtitle1">Phone Ringtone</Typography>}
                            secondary={<Typography variant="caption">Titania</Typography>}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText
                            primary={<Typography variant="subtitle1">Default Notification Ringtone</Typography>}
                            secondary={<Typography variant="caption">Tethys</Typography>}
                        />
                    </ListItem>
                    <ListItem button>
                        <ListItemText
                            primary={<Typography variant="subtitle1">Phone Ringtone</Typography>}
                            secondary={<Typography variant="caption">Titania</Typography>}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText
                            primary={<Typography variant="subtitle1">Default Notification Ringtone</Typography>}
                            secondary={<Typography variant="caption">Tethys</Typography>}
                        />
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}
