import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/core/SpeedDial';
import SpeedDialIcon from '@material-ui/core/SpeedDialIcon';
import SpeedDialAction from '@material-ui/core/SpeedDialAction';
import Typography from '@material-ui/core/Typography';

// assets
import FileCopyIcon from '@material-ui/icons/FileCopyTwoTone';
import SaveIcon from '@material-ui/icons/SaveTwoTone';
import PrintIcon from '@material-ui/icons/PrintTwoTone';
import ShareIcon from '@material-ui/icons/ShareTwoTone';
import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone';

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

//=============================|| UI SPEEDDIAL - PERSISTENT ICON ||=============================//

export default function SpeedDialTooltipOpen() {
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
            <Backdrop open={open} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                className={classes.speedDial}
                hidden={hidden}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={<Typography variant="subtitle1">{action.name}</Typography>}
                        tooltipOpen
                        onClick={handleClose}
                    />
                ))}
            </SpeedDial>
        </div>
    );
}
