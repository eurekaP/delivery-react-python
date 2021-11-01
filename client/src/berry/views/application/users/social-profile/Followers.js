import React from 'react';

// material-ui
import { Grid, InputAdornment, OutlinedInput, Typography } from '@material-ui/core';

// project imports
import FollowerCard from './../../../../ui-component/cards/FollowerCard';
import MainCard from './../../../../ui-component/cards/MainCard';
import axios from './../../../../utils/axios';
import { gridSpacing } from './../../../../store/constant';

// assets
import { IconSearch } from '@tabler/icons';

//-----------------------|| SOCIAL PROFILE - FOLLOWERS ||-----------------------//

const Followers = () => {
    const [followers, setFollowers] = React.useState([]);
    const getFollowers = async () => {
        const response = await axios.get('/api/followers/list');
        setFollowers(response.data.followers);
    };

    React.useEffect(() => {
        getFollowers();
    }, []);

    const [search, setSearch] = React.useState('');
    const handleSearch = async (event) => {
        const newString = event.target.value;
        setSearch(newString);

        if (newString) {
            await axios
                .post('/api/followers/filter', {
                    key: newString
                })
                .then((response) => {
                    setFollowers(response.data.results);
                });
        } else {
            getFollowers();
        }
    };

    let followersResult = '';
    if (followers) {
        followersResult = followers.map((follower, index) => {
            return (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <FollowerCard {...follower} />
                </Grid>
            );
        });
    }

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">Followers</Typography>
                    </Grid>
                    <Grid item>
                        <OutlinedInput
                            size="small"
                            id="input-search-user-profile"
                            placeholder="Search Followers"
                            value={search}
                            onChange={handleSearch}
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconSearch stroke={1.5} size="1rem" />
                                </InputAdornment>
                            }
                        />
                    </Grid>
                </Grid>
            }
        >
            <Grid container direction="row" spacing={gridSpacing}>
                {followersResult}
            </Grid>
        </MainCard>
    );
};

export default Followers;
