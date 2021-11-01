import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, CardContent, Grid, Typography, useMediaQuery } from '@material-ui/core';

// style constant
const useStyles = makeStyles((theme) => ({
    sideIconCard: {
        position: 'relative'
    },
    sideCardContent: {
        padding: '0',
        paddingBottom: '0 !important'
    },
    sideIcon: {
        padding: '15px 0',
        textAlign: 'center',
        color: '#fff',
        '& > svg': {
            width: '32px',
            height: '32px'
        }
    },
    premium: {
        marginLeft: '15px'
    },
    primaryText: {
        marginLeft: '15px'
    }
}));

//=============================|| SIDE ICON CARD ||=============================//

const SideIconCard = ({ iconPrimary, primary, secondary, secondarySub, color, bgcolor }) => {
    const classes = useStyles();

    const theme = useTheme();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('xs'));

    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary ? <IconPrimary /> : null;

    return (
        <Card className={classes.sideIconCard} sx={{ bgcolor: bgcolor ? bgcolor : '' }}>
            <CardContent className={classes.sideCardContent}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item xs={4} style={{ background: color }} className={classes.sideIcon}>
                        <Typography variant="h5" className={classes.sideIcon} align="center">
                            {primaryIcon}
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="space-between"
                            spacing={1}
                            alignItems={matchDownXs ? 'center' : 'flex-start'}
                        >
                            <Grid item sm={12}>
                                <Typography variant="h3" className={classes.premium} sx={{ color: bgcolor ? '#fff' : '' }}>
                                    {primary}
                                </Typography>
                            </Grid>
                            <Grid item sm={12}>
                                <Typography
                                    variant="body2"
                                    align="left"
                                    className={classes.primaryText}
                                    sx={{ color: bgcolor ? '#fff' : 'grey.700' }}
                                >
                                    {secondary} <span style={{ color: color }}>{secondarySub}</span>{' '}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

SideIconCard.propTypes = {
    iconPrimary: PropTypes.object,
    primary: PropTypes.string,
    secondary: PropTypes.string,
    secondarySub: PropTypes.string,
    color: PropTypes.string,
    bgcolor: PropTypes.string
};

export default SideIconCard;
