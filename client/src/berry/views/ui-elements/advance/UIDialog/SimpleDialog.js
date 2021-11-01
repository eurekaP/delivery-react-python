import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import {
    Avatar,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from '@material-ui/core';

// assets
import AddIcon from '@material-ui/icons/Add';
const avatarImage = require.context('./../../../../assets/images/profile', true);

// alert user data
const emails = [
    {
        email: 'username@company.com',
        avatar: 'user-1.png'
    },
    {
        email: 'user02@company.com',
        avatar: 'user-2.png'
    }
];

//===============================|| DIALOG ||===============================//

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                <Typography variant="h4">User Account</Typography>
            </DialogTitle>
            <Card>
                <CardContent sx={{ pt: '0px' }}>
                    <List>
                        {emails.map((item, index) => (
                            <React.Fragment key={index}>
                                <ListItem button onClick={() => handleListItemClick(item.email)}>
                                    <ListItemAvatar>
                                        <Avatar alt="User 1" src={avatarImage(`./${item.avatar}`).default} />
                                    </ListItemAvatar>
                                    <ListItemText primary={item.email} />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}

                        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        border: '2px solid',
                                        color: 'grey.500',
                                        borderColor: 'grey.500',
                                        bgcolor: 'transparent'
                                    }}
                                >
                                    <AddIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Add New Account" />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired
};

//===============================|| UI DIALOG - SIMPLE ||===============================//

export default function SimpleDialogDemo() {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[0]['email']);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Open simple dialog
            </Button>
            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
        </div>
    );
}
