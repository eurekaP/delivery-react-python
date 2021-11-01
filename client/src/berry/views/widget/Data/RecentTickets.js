import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    CardActions,
    CardContent,
    Chip,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';

// project imports
import MainCard from './../../../ui-component/cards/MainCard';

// style constant
const useStyles = makeStyles((theme) => ({
    projectTableCard: {
        padding: '0px'
    }
}));

// table data
function createData(badgeText, badgeType, subject, dept, date) {
    return { badgeText, badgeType, subject, dept, date };
}

const rows = [
    createData('Open', 'default', 'Website down for one week', 'Support', 'Today 2:00'),
    createData('Progress', 'primary', 'Loosing control on server', 'Support', 'Yesterday'),
    createData('Closed', 'secondary', 'Authorizations keys', 'Support', '27, Aug'),
    createData('Open', 'default', 'Restoring default settings', 'Support', 'Today 9:00'),
    createData('Progress', 'primary', 'Loosing control on server', 'Support', 'Yesterday'),
    createData('Closed', 'secondary', 'Authorizations keys', 'Support', '27, Aug'),
    createData('Open', 'default', 'Restoring default settings', 'Support', 'Today 9:00'),
    createData('Closed', 'secondary', 'Authorizations keys', 'Support', '27, Aug')
];

//==========================|| DATA WIDGET - RECENT TICKETS CARD ||==========================//

const RecentTickets = ({ title }) => {
    const classes = useStyles();

    return (
        <MainCard title={title} content={false}>
            <CardContent className={classes.projectTableCard}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 3 }}>Subject</TableCell>
                                <TableCell>Department</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell align="right" sx={{ pr: 3 }}>
                                    Status
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow hover key={index}>
                                    <TableCell sx={{ pl: 3 }}>{row.subject}</TableCell>
                                    <TableCell>{row.dept}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell align="right" sx={{ pr: 3 }}>
                                        <Chip variant="outlined" color={row.badgeType} label={row.badgeText} size="small" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="text" size="small" color="primary">
                    View all Projects
                </Button>
            </CardActions>
        </MainCard>
    );
};

RecentTickets.propTypes = {
    title: PropTypes.string
};

export default RecentTickets;
