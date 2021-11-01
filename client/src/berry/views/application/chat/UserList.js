import * as PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { Chip, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';

// project imports
import UserAvatar from './UserAvatar';
import axios from '../../../utils/axios';

//-----------------------|| CHAT USER LIST ||-----------------------//

const UserList = ({ setUser }) => {
    const [data, setData] = React.useState([]);

    const getData = async () => {
        const response = await axios.get('/api/chat/users');
        setData(response.data.users);
    };

    React.useEffect(() => {
        getData();
    }, []);

    return (
        <List component="nav">
            {data.map((user) => {
                return (
                    <React.Fragment key={user.id}>
                        <ListItem
                            button
                            onClick={() => {
                                setUser(user);
                            }}
                        >
                            <ListItemAvatar>
                                <UserAvatar user={user} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Grid container alignItems="center" spacing={1} component="span">
                                        <Grid item xs zeroMinWidth component="span">
                                            <Typography
                                                variant="h5"
                                                color="inherit"
                                                component="span"
                                                sx={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    display: 'block'
                                                }}
                                            >
                                                {user.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item component="span">
                                            <Typography component="span" variant="subtitle2">
                                                {user.lastMessage}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                }
                                secondary={
                                    <Grid container alignItems="center" spacing={1} component="span">
                                        <Grid item xs zeroMinWidth component="span">
                                            <Typography
                                                variant="caption"
                                                component="span"
                                                sx={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    display: 'block'
                                                }}
                                            >
                                                {user.status}
                                            </Typography>
                                        </Grid>
                                        <Grid item component="span">
                                            {user.unReadChatCount !== 0 && (
                                                <Chip
                                                    label={user.unReadChatCount}
                                                    component="span"
                                                    color="secondary"
                                                    sx={{
                                                        width: '20px',
                                                        height: '20px',
                                                        '& .MuiChip-label': {
                                                            px: '4px'
                                                        }
                                                    }}
                                                />
                                            )}
                                        </Grid>
                                    </Grid>
                                }
                            />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                );
            })}
        </List>
    );
};

UserList.propTypes = {
    setUser: PropTypes.func
};

export default UserList;
