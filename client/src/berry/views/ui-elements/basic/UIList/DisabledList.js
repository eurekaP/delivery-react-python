import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';

// assets
import PieChartOutlineOutlinedIcon from '@material-ui/icons/PieChartOutlineOutlined';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    }
}));

//================================|| UI LIST - DISABLED ||================================//

export default function DisabledList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                    <ListItemIcon>
                        <PieChartOutlineOutlinedIcon sx={{ fontSize: '1.3rem' }} />
                    </ListItemIcon>
                    <ListItemText primary="Chart" />
                </ListItem>
                <ListItem button disabled>
                    <ListItemIcon>
                        <MapOutlinedIcon sx={{ fontSize: '1.3rem' }} />
                    </ListItemIcon>
                    <ListItemText primary="Disabled Menu" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <LockOutlinedIcon sx={{ fontSize: '1.3rem' }} />
                    </ListItemIcon>
                    <ListItemText primary="Page LayoutsAuth Pages" />
                </ListItem>
            </List>
        </div>
    );
}
