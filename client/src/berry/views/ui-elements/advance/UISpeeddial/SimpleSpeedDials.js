import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Box, FormControlLabel, FormLabel, Radio, RadioGroup, SpeedDial, SpeedDialAction, Switch } from '@material-ui/core';

// assets
import SpeedDialIcon from '@material-ui/core/SpeedDialIcon';
import FileCopyIcon from '@material-ui/icons/FileCopyTwoTone';
import PrintIcon from '@material-ui/icons/PrintTwoTone';
import ShareIcon from '@material-ui/icons/ShareTwoTone';
import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone';

// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        transform: 'translateZ(0px)',
        flexGrow: 1
    },
    exampleWrapper: {
        position: 'relative',
        marginTop: theme.spacing(3),
        height: 300
    },
    radioGroup: {
        margin: theme.spacing(1, 0)
    },
    speedDial: {
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2)
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(2)
        }
    }
}));

// fab action options
const actions = [
    { icon: <FileCopyIcon sx={{ color: 'grey.700' }} />, name: 'Save' },
    { icon: <PrintIcon sx={{ color: 'grey.700' }} />, name: 'Print' },
    { icon: <ShareIcon sx={{ color: 'grey.700' }} />, name: 'Share' },
    { icon: <FavoriteIcon sx={{ color: 'grey.700' }} />, name: 'Like' }
];

//=============================|| UI SPEEDDIAL - SIMPLE ||=============================//

export default function SimpleSpeedDials() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const [direction, setDirection] = React.useState('up');
    const handleDirectionChange = (event) => {
        setDirection(event.target.value);
    };

    const [hidden, setHidden] = React.useState(false);
    const handleHiddenChange = (event) => {
        setHidden(event.target.checked);
    };

    return (
        <div className={classes.root}>
            <FormControlLabel control={<Switch checked={hidden} onChange={handleHiddenChange} color="primary" />} label="Hidden" />
            <FormLabel className={classes.radioGroup} component="legend">
                Direction
            </FormLabel>
            <RadioGroup aria-label="direction" name="direction" value={direction} onChange={handleDirectionChange} row>
                <FormControlLabel value="up" control={<Radio />} label="Up" />
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <FormControlLabel value="right" control={<Radio />} label="Right" />
                </Box>
                <FormControlLabel value="down" control={<Radio />} label="Down" />
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <FormControlLabel value="left" control={<Radio />} label="Left" />
                </Box>
            </RadioGroup>
            <div className={classes.exampleWrapper}>
                <SpeedDial
                    ariaLabel="SpeedDial example"
                    className={classes.speedDial}
                    hidden={hidden}
                    icon={<SpeedDialIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                    direction={direction}
                >
                    {actions.map((action) => (
                        <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={handleClose} />
                    ))}
                </SpeedDial>
            </div>
        </div>
    );
}
