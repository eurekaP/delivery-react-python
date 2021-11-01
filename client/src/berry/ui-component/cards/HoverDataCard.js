import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

// project imports
import MainCard from './MainCard';

// style constant
const useStyles = makeStyles((theme) => ({
    premium: {
        margin: '14px 0'
    },
    primaryIcon: {
        '& > svg': {
            width: '20px',
            height: '20px'
        }
    },
    mutedText: {
        color: theme.palette.grey[700]
    }
}));

//============================|| HOVER DATA CARD ||============================//

const HoverDataCard = ({ title, iconPrimary, primary, secondary, color }) => {
    const classes = useStyles();

    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

    return (
        <MainCard>
            <Grid container justifyContent="space-between" direction="column" alignItems="center">
                <Grid item sm={12}>
                    <Typography variant="h5" color="inherit">
                        {title}
                    </Typography>
                </Grid>
                <Grid item sm={12}>
                    <Typography variant="h3" className={classes.premium}>
                        {' '}
                        <span className={classes.primaryIcon} style={{ color: color }}>
                            {' '}
                            {primaryIcon}
                        </span>{' '}
                        {primary}
                    </Typography>
                </Grid>
                <Grid item sm={12}>
                    <Typography variant="body2" className={classes.mutedText}>
                        {secondary}
                    </Typography>
                </Grid>
            </Grid>
        </MainCard>
    );
};

HoverDataCard.propTypes = {
    title: PropTypes.string,
    iconPrimary: PropTypes.object,
    primary: PropTypes.number,
    secondary: PropTypes.string,
    color: PropTypes.string
};

export default HoverDataCard;
