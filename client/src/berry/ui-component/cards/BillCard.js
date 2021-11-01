import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';

// assets
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';

//-----------------------|| BILL CARD ||-----------------------//

const BillCard = ({ primary, secondary, link, color, bg }) => {
    return (
        <Card sx={{ borderLeft: '10px solid', borderColor: color, background: bg }}>
            <CardContent>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Typography variant="body1" sx={{ color: 'grey.800' }}>
                            {primary}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h2" sx={{ fontWeight: 500, mb: 1.5 }}>
                            {secondary}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="string"
                            disableElevation
                            disableRipple
                            component={Link}
                            to="#"
                            sx={{
                                color: color,
                                p: 0,
                                '&:hover': { bgcolor: 'transparent' }
                            }}
                            endIcon={<ArrowRightAltRoundedIcon />}
                        >
                            {link}
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

BillCard.propTypes = {
    primary: PropTypes.string,
    secondary: PropTypes.string,
    link: PropTypes.string,
    color: PropTypes.string,
    bg: PropTypes.string
};

export default BillCard;
