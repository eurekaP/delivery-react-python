import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

// project imports
import MainCard from './MainCard';

// style constant
const useStyles = makeStyles((theme) => ({
    secondary: {
        marginTop: '.5rem'
    },
    footer: {
        textAlign: 'center',
        padding: theme.spacing(1.2),
        paddingLeft: '20px',
        paddingRight: '20px',
        color: theme.palette.common.white
    }
}));

//==============================|| REPORT CARD ||==============================//

const ReportCard = ({ primary, secondary, iconPrimary, color }) => {
    const classes = useStyles();

    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

    return (
        <MainCard>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h3">{primary}</Typography>
                    <Typography variant="body1" className={classes.secondary}>
                        {secondary}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h2" style={{ color: color }}>
                        {primaryIcon}
                    </Typography>
                </Grid>
            </Grid>
        </MainCard>
    );
};

ReportCard.propTypes = {
    primary: PropTypes.string,
    secondary: PropTypes.string,
    iconPrimary: PropTypes.object,
    color: PropTypes.string
};

export default ReportCard;
