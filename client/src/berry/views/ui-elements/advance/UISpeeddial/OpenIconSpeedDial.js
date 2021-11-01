import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Button, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/core';

// assets
import FileCopyIcon from '@material-ui/icons/FileCopyTwoTone';
import SaveIcon from '@material-ui/icons/SaveTwoTone';
import PrintIcon from '@material-ui/icons/PrintTwoTone';
import ShareIcon from '@material-ui/icons/ShareTwoTone';
import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone';
import EditIcon from '@material-ui/icons/EditTwoTone';

// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        height: 380,
        transform: 'translateZ(0px)',
        flexGrow: 1
    },
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    }
}));

// fab action options
const actions = [
    { icon: <FileCopyIcon sx={{ color: 'grey.700' }} />, name: 'Copy' },
    { icon: <SaveIcon sx={{ color: 'grey.700' }} />, name: 'Save' },
    { icon: <PrintIcon sx={{ color: 'grey.700' }} />, name: 'Print' },
    { icon: <ShareIcon sx={{ color: 'grey.700' }} />, name: 'Share' },
    { icon: <FavoriteIcon sx={{ color: 'grey.700' }} />, name: 'Like' }
];

//=============================|| UI SPEEDDIAL - CUSTOM CLOSE ICON ||=============================//

export default function OpenIconSpeedDial() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [hidden, setHidden] = React.useState(false);
    const handleVisibility = () => {
        setHidden((prevHidden) => !prevHidden);
    };

    return (
        <div className={classes.root}>
            <Button onClick={handleVisibility}>Toggle Speed Dial</Button>
            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                className={classes.speedDial}
                hidden={hidden}
                icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={handleClose} />
                ))}
            </SpeedDial>
        </div>
    );
}
