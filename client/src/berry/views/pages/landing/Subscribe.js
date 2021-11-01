import React from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core';

// project imports
import MailerSubscriber from './../maintenance/ComingSoon/ComingSoon1/MailerSubscriber';
import { gridSpacing } from '../../../store/constant';

// assets
import imgMail from './../../../assets/images/landing/img-groupmail.png';

// style constant
const useStyles = makeStyles((theme) => ({
    subscribeBlock: {
        padding: '100px 0',
        background:
            theme.direction === 'rtl'
                ? theme.palette.mode === 'dark'
                    ? 'linear-gradient(270deg, ' + theme.palette.dark.main + ' 65%, ' + theme.palette.dark.dark + ' 65%)'
                    : 'linear-gradient(270deg, ' + theme.palette.primary.light + ' 65%, #fff 65%)'
                : theme.palette.mode === 'dark'
                ? 'linear-gradient(90deg, ' + theme.palette.dark.main + ' 65%, ' + theme.palette.dark.dark + ' 65%)'
                : 'linear-gradient(90deg, ' + theme.palette.primary.light + ' 65%, #fff 65%)',

        [theme.breakpoints.down('md')]: {
            padding: '50px 0',
            background:
                theme.direction === 'rtl'
                    ? theme.palette.mode === 'dark'
                        ? 'linear-gradient(270deg, ' + theme.palette.dark.main + ' 65%, ' + theme.palette.dark.dark + ' 65%)'
                        : 'linear-gradient(270deg, ' + theme.palette.primary.light + ' 65%, #fff 65%)'
                    : theme.palette.mode === 'dark'
                    ? 'linear-gradient(90deg, ' + theme.palette.dark.main + ' 65%, ' + theme.palette.dark.dark + ' 65%)'
                    : 'linear-gradient(90deg, ' + theme.palette.primary.light + ' 65%, #fff 65%)'
        }
    },
    subscribeCard: {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.dark : '#FFFFFF',
        boxShadow: '0px 0px 50px rgba(33, 150, 243, 0.2)',
        borderRadius: '20px',
        padding: '100px 75px',
        [theme.breakpoints.down('sm')]: {
            padding: '40px 25px'
        }
    },
    imgMail: {
        width: '330px',
        animation: '5s wings ease-in-out infinite',
        maxWidth: '100%'
    }
}));

//============================|| LANDING - SUBSCRIBE PAGE ||============================//

const Subscribe = () => {
    const theme = useTheme();
    const classes = useStyles();
    return (
        <div className={classes.subscribeBlock}>
            <Container>
                <Grid container alignItems="center" spacing={gridSpacing}>
                    <Grid
                        item
                        xs={12}
                        md={5}
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            textAlign: 'right',
                            [theme.breakpoints.down('md')]: { textAlign: 'center' }
                        }}
                    >
                        <img src={imgMail} alt="Berry" className={classes.imgMail} />
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <div className={classes.subscribeCard}>
                            <Grid container spacing={gridSpacing} sx={{ mb: '16px' }}>
                                <Grid item sm={12}>
                                    <Typography variant="h1" component="div" sx={{ [theme.breakpoints.down('sm')]: { fontSize: '18px' } }}>
                                        Subscribe
                                    </Typography>
                                </Grid>
                                <Grid item sm={12}>
                                    <Typography variant="body2">
                                        Subscribe for the latest news &#38; updates of Berry admin template. We never send spam newsletters.
                                    </Typography>
                                </Grid>
                                <Grid item sm={12}>
                                    <MailerSubscriber />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Subscribe;
