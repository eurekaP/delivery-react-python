import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';

// project imports
import Avatar from './../../../../ui-component/extended/Avatar';

// assets
import ImageIcon from '@material-ui/icons/ImageTwoTone';
import WorkIcon from '@material-ui/icons/WorkOffTwoTone';

// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    }
}));

//================================|| UI LIST - FOLDER ||================================//

export default function FolderList() {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar size="xs" color="primary" outline>
                        <ImageIcon sx={{ fontSize: '1.1rem' }} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar size="xs" color="secondary" outline>
                        <WorkIcon sx={{ fontSize: '1.1rem' }} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Work" secondary="Jan 7, 2014" />
            </ListItem>
        </List>
    );
}
