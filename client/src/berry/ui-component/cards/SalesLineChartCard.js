import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/styles';
import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';

// third party
import Chart from 'react-apexcharts';

const useStyles = makeStyles((theme) => ({
    content: {
        padding: 0,
        paddingBottom: '0 !important'
    }
}));

//============================|| SALES LINE CARD ||============================//

const SalesLineChartCard = ({ bgColor, chartData, footerData, icon, title, percentage }) => {
    const classes = useStyles();
    const theme = useTheme();

    let footerHtml;
    if (footerData) {
        footerHtml = footerData.map((item, index) => {
            return (
                <Grid item key={index}>
                    <Box mt={3} mb={3} p={1}>
                        <Grid container direction="column" spacing={1} alignItems="center">
                            <Typography variant="h3" sx={{ mb: 1 }}>
                                {item.value}
                            </Typography>
                            <Typography variant="body1">{item.label}</Typography>
                        </Grid>
                    </Box>
                </Grid>
            );
        });
    }

    return (
        <Card>
            <CardContent className={classes.content}>
                <Box color="#fff" bgcolor={bgColor ? bgColor : theme.palette.primary.dark} p={3}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item container justifyContent="space-between" alignItems="center">
                            {title && (
                                <Grid item>
                                    <Typography variant="subtitle1" color="inherit">
                                        {title}
                                    </Typography>
                                </Grid>
                            )}
                            <Grid item>
                                <Grid container alignItems="center">
                                    {icon && (
                                        <Box component="span" mr={2}>
                                            {icon}
                                        </Box>
                                    )}
                                    {percentage && (
                                        <Typography variant="subtitle1" color="inherit">
                                            {percentage}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                        {chartData && (
                            <Grid item>
                                <Chart {...chartData} />
                            </Grid>
                        )}
                    </Grid>
                </Box>
                {footerData && (
                    <Grid container justifyContent="space-around" alignItems="center">
                        {footerHtml}
                    </Grid>
                )}
            </CardContent>
        </Card>
    );
};

SalesLineChartCard.propTypes = {
    title: PropTypes.string,
    chartData: PropTypes.object,
    footerData: PropTypes.array,
    dropData: PropTypes.object,
    listData: PropTypes.object,
    bgColor: PropTypes.string,
    icon: PropTypes.element,
    percentage: PropTypes.string
};

export default SalesLineChartCard;
