import React from 'react';

// material-ui
import { Button, Grid, InputAdornment, Menu, MenuItem, OutlinedInput, Pagination, Typography } from '@material-ui/core';

// project imports
import UserList from './UserList';
import MainCard from '../../../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../../../store/constant';

// assets
import { IconSearch } from '@tabler/icons';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

//-----------------------|| USER LIST STYLE 2 ||-----------------------//

const ListStylePage2 = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <MainCard
            title={
                <Grid container justifyContent="space-between" alignItems="center" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">List</Typography>
                    </Grid>
                    <Grid item>
                        <OutlinedInput
                            id="input-search-list-style2"
                            placeholder="Search"
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconSearch stroke={1.5} size="1rem" />
                                </InputAdornment>
                            }
                            size="small"
                        />
                    </Grid>
                </Grid>
            }
        >
            <UserList />
            <Grid item xs={12} sx={{ mt: '14px' }}>
                <Grid container justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Pagination count={10} color="primary" />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="string"
                            size="large"
                            sx={{ color: 'grey.900' }}
                            color="secondary"
                            endIcon={<ExpandMoreRoundedIcon />}
                            onClick={handleClick}
                        >
                            10 Rows
                        </Button>
                        <Menu
                            id="menu-user-list-style2"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            variant="selectedMenu"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                        >
                            <MenuItem onClick={handleClose}> 10 Rows</MenuItem>
                            <MenuItem onClick={handleClose}> 20 Rows</MenuItem>
                            <MenuItem onClick={handleClose}> 30 Rows </MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default ListStylePage2;
