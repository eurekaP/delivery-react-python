import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

// assets
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ViewCompactTwoToneIcon from '@material-ui/icons/ViewCompactTwoTone';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    nested: {
        paddingLeft: theme.spacing(4)
    }
}));

//================================|| UI LIST - NESTED ||================================//

export default function NestedList() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <ViewCompactTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                </ListItemIcon>
                <ListItemText primary="1st Level with Icon" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <FiberManualRecordIcon sx={{ fontSize: '0.5rem' }} />
                        </ListItemIcon>
                        <ListItemText primary="Nested List" />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <FiberManualRecordIcon sx={{ fontSize: '0.5rem' }} />
                        </ListItemIcon>
                        <ListItemText primary="Nested List" />
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
}
