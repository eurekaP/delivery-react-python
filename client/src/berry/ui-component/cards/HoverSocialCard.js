import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    socialHoverCard: {
        position: 'relative',
        color: '#fff',
        '&:hover svg': {
            opacity: '1',
            transform: 'scale(1.1)'
        }
    },
    socialHoverIcon: {
        position: 'absolute',
        right: '15px',
        top: '25px',
        color: '#fff',
        '&> svg': {
            width: '40px',
            height: '40px',
            opacity: '0.4',
            transition: 'all .3s ease-in-out'
        }
    }
}));

//===========================|| HOVER SOCIAL CARD ||===========================//

const HoverSocialCard = ({ primary, secondary, iconPrimary, color }) => {
    const classes = useStyles();

    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

    return (
        <Card style={{ background: color }} className={classes.socialHoverCard}>
            <CardContent>
                <Typography variant="body2" className={classes.socialHoverIcon}>
                    {primaryIcon}
                </Typography>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Typography variant="h3" color="inherit">
                            {secondary}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" color="inherit">
                            {primary}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

HoverSocialCard.propTypes = {
    primary: PropTypes.string,
    secondary: PropTypes.string,
    iconPrimary: PropTypes.object,
    color: PropTypes.string
};

export default HoverSocialCard;
