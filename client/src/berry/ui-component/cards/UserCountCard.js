import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

// style constant
const useStyles = makeStyles((theme) => ({
    revenueCard: {
        position: 'relative',
        color: '#fff'
    },
    revenueIcon: {
        position: 'absolute',
        left: '-17px',
        bottom: '-27px',
        color: '#fff',
        transform: 'rotate(25deg)',
        '&> svg': {
            width: '100px',
            height: '100px',
            opacity: '0.35'
        }
    }
}));

//=============================|| USER NUM CARD ||=============================//

const UserCountCard = ({ primary, secondary, iconPrimary, color }) => {
    const classes = useStyles();

    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

    return (
        <Card style={{ background: color }} className={classes.revenueCard}>
            <CardContent>
                <Typography variant="subtitle2" className={classes.revenueIcon}>
                    {primaryIcon}
                </Typography>
                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
                    <Grid item sm={12}>
                        <Typography variant="h3" align="center" color="inherit">
                            {secondary}
                        </Typography>
                    </Grid>
                    <Grid item sm={12}>
                        <Typography variant="body1" align="center" color="inherit">
                            {primary}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

UserCountCard.propTypes = {
    primary: PropTypes.string,
    secondary: PropTypes.string,
    iconPrimary: PropTypes.object,
    color: PropTypes.string
};

export default UserCountCard;
