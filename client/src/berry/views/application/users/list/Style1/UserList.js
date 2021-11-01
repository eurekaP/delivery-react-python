import React from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Chip, Grid, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@material-ui/core';

// project imports
import Avatar from './../../../../../ui-component/extended/Avatar';
import axios from './../../../../../utils/axios';

// assets
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';
import BlockTwoToneIcon from '@material-ui/icons/BlockTwoTone';

const avatarImage = require.context('./../../../../../assets/images/profile', true);

// style constant
const useStyles = makeStyles((theme) => ({
    successBadge: {
        color: theme.palette.success.dark,
        width: '14px',
        height: '14px'
    },
    active: {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light + 60,
        color: theme.palette.success.dark
    },
    reject: {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.orange.light + 80,
        color: theme.palette.orange.dark
    },
    pending: {
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
        color: theme.palette.warning.dark
    }
}));

//-----------------------|| USER LIST 1 ||-----------------------//

const UserList = () => {
    const theme = useTheme();
    const classes = useStyles();

    const [data, setData] = React.useState([]);

    const getData = async () => {
        const response = await axios.get('/api/user-list/list');
        setData(response.data.users);
    };

    React.useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ pl: 3 }}>#</TableCell>
                        <TableCell>User Profile</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Friends</TableCell>
                        <TableCell>Followers</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center" sx={{ pr: 3 }}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                        data.map((row, index) => (
                            <TableRow hover key={index}>
                                <TableCell sx={{ pl: 3 }}>{row.id}</TableCell>
                                <TableCell>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Avatar alt="User 1" src={avatarImage(`./${row.avatar}`).default} />
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography align="left" variant="subtitle1" component="div">
                                                {row.name}{' '}
                                                {row.status === 'Active' ? <CheckCircleIcon className={classes.successBadge} /> : ''}
                                            </Typography>
                                            <Typography align="left" variant="subtitle2" noWrap>
                                                {row.email}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell>{row.location}</TableCell>
                                <TableCell>{row.friends}</TableCell>
                                <TableCell>{row.followers}</TableCell>
                                <TableCell>
                                    {row.status === 'Active' && <Chip label="Active" size="small" className={classes.active} />}
                                    {row.status === 'Rejected' && <Chip label="Rejected" size="small" className={classes.reject} />}
                                    {row.status === 'Pending' && <Chip label="Pending" size="small" className={classes.pending} />}
                                </TableCell>
                                <TableCell align="center" sx={{ pr: 3 }}>
                                    <Stack direction="row" justifyContent="center" alignItems="center">
                                        <Tooltip placement="top" title="Message">
                                            <IconButton variant="outlined" color="primary" aria-label="delete">
                                                <ChatBubbleTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip placement="top" title="Block">
                                            <IconButton
                                                variant="outlined"
                                                color="primary"
                                                sx={{
                                                    color: theme.palette.orange.dark,
                                                    borderColor: theme.palette.orange.main,
                                                    '&:hover ': { background: theme.palette.orange.light }
                                                }}
                                            >
                                                <BlockTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UserList;
