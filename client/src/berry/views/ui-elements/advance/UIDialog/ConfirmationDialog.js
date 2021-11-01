import * as React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControlLabel,
    List,
    ListItem,
    ListItemText,
    Radio,
    RadioGroup,
    Typography
} from '@material-ui/core';

// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    paper: {
        width: '80%',
        maxHeight: 435
    }
}));

// select options
const options = [
    'None',
    'Atria',
    'Callisto',
    'Dione',
    'Ganymede',
    'Hangouts Call',
    'Luna',
    'Oberon',
    'Phobos',
    'Pyxis',
    'Sedna',
    'Titania',
    'Triton',
    'Umbriel'
];

//===============================|| SELECTION ROW ||===============================//

function ConfirmationDialogRaw(props) {
    const { onClose, value: valueProp, open, ...other } = props;
    const [value, setValue] = React.useState(valueProp);
    const radioGroupRef = React.useRef(null);

    React.useEffect(() => {
        if (!open) {
            setValue(valueProp);
        }
    }, [valueProp, open]);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onClose(value);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Dialog
            maxWidth="xs"
            TransitionProps={{ onEntering: handleEntering }}
            aria-labelledby="confirmation-dialog-title"
            open={open}
            {...other}
        >
            <DialogTitle id="confirmation-dialog-title">
                <Typography variant="h4">Phone Ringtone</Typography>
            </DialogTitle>
            <DialogContent dividers>
                <RadioGroup ref={radioGroupRef} aria-label="ringtone" name="ringtone" value={value} onChange={handleChange}>
                    {options.map((option) => (
                        <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
                    ))}
                </RadioGroup>
            </DialogContent>
            <DialogActions sx={{ pr: 2.5, pt: 2.5 }}>
                <Button autoFocus color="error" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="contained" size="small" onClick={handleOk}>
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired
};

//===============================|| UI DIALOG - CONFIRMATION ||===============================//

export default function ConfirmationDialog() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('Hangouts Call');

    const handleClickListItem = () => {
        setOpen(true);
    };

    const handleClose = (newValue) => {
        setOpen(false);

        if (newValue) {
            setValue(newValue);
        }
    };

    return (
        <div className={classes.root}>
            <List component="div" role="group">
                <ListItem button divider disabled>
                    <ListItemText primary={<Typography variant="subtitle1">Interruptions</Typography>} />
                </ListItem>
                <ListItem
                    button
                    divider
                    aria-haspopup="true"
                    aria-controls="ringtone-menu"
                    aria-label="phone ringtone"
                    onClick={handleClickListItem}
                >
                    <ListItemText
                        primary={<Typography variant="subtitle1">Phone Ringtone</Typography>}
                        secondary={<Typography variant="caption">{value}</Typography>}
                    />
                </ListItem>
                <ListItem button divider disabled>
                    <ListItemText
                        primary={<Typography variant="subtitle1">Default Notification Ringtone</Typography>}
                        secondary={<Typography variant="caption">Tethys</Typography>}
                    />
                </ListItem>
                <ConfirmationDialogRaw
                    classes={{
                        paper: classes.paper
                    }}
                    id="ringtone-menu"
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    value={value}
                />
            </List>
        </div>
    );
}
