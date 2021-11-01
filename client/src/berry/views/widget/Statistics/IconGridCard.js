import React from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';

// project imports
import MainCard from '../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../store/constant';

// assets
import LocalMallTwoToneIcon from '@material-ui/icons/LocalMallTwoTone';
import FilterVintageTwoToneIcon from '@material-ui/icons/FilterVintageTwoTone';
import RouterTwoToneIcon from '@material-ui/icons/RouterTwoTone';
import ShareTwoToneIcon from '@material-ui/icons/ShareTwoTone';

// style constant
const useStyles = makeStyles((theme) => ({
    flatCardBody: {
        '& >div': {
            padding: '0px !important'
        },
        '& svg': {
            width: '45px',
            height: '45px',
            color: theme.palette.secondary.main,
            borderRadius: '14px',
            padding: '10px',
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary.light
        }
    },
    flatCardBlock: {
        padding: '20px',
        borderLeft: '1px solid ',
        borderBottom: '1px solid ',
        borderLeftColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200],
        borderBottomColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200]
    }
}));

//===========================|| WIDGET STATISTICS - ICON GRID CARD ||===========================//

const IconGridCard = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Grid container alignItems="center" spacing={gridSpacing}>
            <Grid item xs={12} sm={6} lg={12}>
                <MainCard className={classes.flatCardBody}>
                    <Grid container alignItems="center" spacing={0}>
                        <Grid item xs={12} sm={6} className={classes.flatCardBlock}>
                            <Grid container alignItems="center" spacing={1} justify={matchDownXs ? 'space-between' : 'center'}>
                                <Grid item>
                                    <ShareTwoToneIcon />
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h5" align="center">
                                        1000
                                    </Typography>
                                    <Typography variant="subtitle2" align="center">
                                        SHARES
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.flatCardBlock}>
                            <Grid container alignItems="center" spacing={1} justify={matchDownXs ? 'space-between' : 'center'}>
                                <Grid item>
                                    <RouterTwoToneIcon />
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h5" align="center">
                                        600
                                    </Typography>
                                    <Typography variant="subtitle2" align="center">
                                        NETWORK
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" spacing={0}>
                        <Grid item xs={12} sm={6} className={classes.flatCardBlock}>
                            <Grid container alignItems="center" spacing={1} justify={matchDownXs ? 'space-between' : 'center'}>
                                <Grid item>
                                    <FilterVintageTwoToneIcon />
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h5" align="center">
                                        3550
                                    </Typography>
                                    <Typography variant="subtitle2" align="center">
                                        RETURNS
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.flatCardBlock}>
                            <Grid container alignItems="center" spacing={1} justify={matchDownXs ? 'space-between' : 'center'}>
                                <Grid item>
                                    <LocalMallTwoToneIcon />
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h5" align="center">
                                        100%
                                    </Typography>
                                    <Typography variant="subtitle2" align="center">
                                        ORDER
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default IconGridCard;
