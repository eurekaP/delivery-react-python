import React from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, Grid, Link, Typography } from '@material-ui/core';

// project imports
import { gridSpacing } from '../../../store/constant';

// assets
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

import logoDark from './../../../assets/images/logo-white.svg';

// style constant
const useStyles = makeStyles((theme) => ({
    footer: {
        padding: '35px 0',
        color: '#fff',
        background: theme.palette.secondary.main,
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        }
    },
    footerLink: {
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        textDecoration: 'none !important',
        opacity: '0.8',
        '& svg': {
            fontsize: '18px',
            marginRight: '8px'
        },
        '&:hover': {
            opacity: '1'
        }
    },
    footerSub: {
        padding: '20px 0',
        color: '#fff',
        background: theme.palette.secondary.dark,
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        }
    }
}));
//==============================|| LANDING - FOOTER PAGE ||==============================//

const FooterPage = () => {
    const theme = useTheme();
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.footer}>
                <Container>
                    <Grid container alignItems="center" spacing={gridSpacing}>
                        <Grid item xs={12} sm={4}>
                            <img src={logoDark} alt="Berry" width="100" />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Grid
                                container
                                alignItems="center"
                                spacing={2}
                                sx={{ justifyContent: 'flex-end', [theme.breakpoints.down('sm')]: { justifyContent: 'center' } }}
                            >
                                <Grid item>
                                    <Link href="https://blog.berrydashboard.io/" target="_blank" className={classes.footerLink}>
                                        <InstagramIcon />
                                        Blog
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="https://www.facebook.com/codedthemes" target="_blank" className={classes.footerLink}>
                                        <FacebookIcon />
                                        Facebook
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="https://twitter.com/codedthemes" target="_blank" className={classes.footerLink}>
                                        <TwitterIcon />
                                        Twitter
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <div className={classes.footerSub}>
                <Container>
                    <Typography variant="subtitle2" component="div" color="inherit">
                        &#169; CodedThemes
                    </Typography>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default FooterPage;
