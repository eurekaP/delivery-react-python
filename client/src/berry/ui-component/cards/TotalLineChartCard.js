import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@material-ui/styles';
import { Box, Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';

// third party
import Chart from 'react-apexcharts';

// style constant
const useStyles = makeStyles((theme) => ({
    content: {
        padding: 0,
        paddingBottom: '0 !important'
    }
}));

//============================|| TOTAL LINE CHART CARD ||============================//

const TotalLineChartCard = ({ bgColor, chartData, title, percentage, value }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Card>
            <CardContent className={classes.content}>
                <Box color="#fff" bgcolor={bgColor ? bgColor : theme.palette.primary.dark}>
                    <Box p={2.5}>
                        <Grid container direction="column">
                            <Grid item container justifyContent="space-between" alignItems="center">
                                {value && (
                                    <Grid item>
                                        <Typography variant="h3" color="inherit">
                                            {value}
                                        </Typography>
                                    </Grid>
                                )}
                                {percentage && (
                                    <Grid item>
                                        <Typography variant="body2" color="inherit">
                                            {percentage}
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                            {title && (
                                <Grid item>
                                    <Typography variant="body2" color="inherit">
                                        {' '}
                                        {title}{' '}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                    {chartData && <Chart {...chartData} />}
                </Box>
            </CardContent>
        </Card>
    );
};

TotalLineChartCard.propTypes = {
    bgColor: PropTypes.string,
    chartData: PropTypes.object,
    title: PropTypes.string,
    percentage: PropTypes.string,
    value: PropTypes.number
};

export default TotalLineChartCard;
