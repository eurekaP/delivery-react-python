import React from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, useMediaQuery } from '@material-ui/core';

// project imports
import MailDrawer from './MailDrawer';
import MailDetails from './MailDetails';
import MailList from './MailList';
import axios from './../../../utils/axios';
import { SET_MENU } from './../../../store/actions';
import { appDrawerWidth as drawerWidth, gridSpacing } from './../../../store/constant';

// drawer content element
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: 'calc(100% - 320px)',
    flexGrow: 1,
    paddingLeft: open ? theme.spacing(3) : 0,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    [theme.breakpoints.down('lg')]: {
        paddingLeft: 0,
        marginLeft: 0
    },
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    })
}));

//-----------------------|| MAIL MAIN PAGE ||-----------------------//

const MailPage = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('lg'));

    const [emailDetails, setEmailDetailsValue] = React.useState(false);
    const [selectedMail, setSelectedMail] = React.useState(null);
    const handleUserChange = async (event, data) => {
        if (data) {
            await axios.post('/api/mails/setRead', { id: data.id });
            await getData();
        }
        setSelectedMail(data);
        setEmailDetailsValue((prev) => !prev);
    };

    const [openMailSidebar, setOpenMailSidebar] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpenMailSidebar((prevState) => !prevState);
    };

    React.useEffect(() => {
        if (matchDownSM) {
            setOpenMailSidebar(false);
        } else {
            setOpenMailSidebar(true);
        }
    }, [matchDownSM]);

    const [data, setData] = React.useState([]);
    const [unreadCounts, setUnreadCounts] = React.useState({});
    const getData = async () => {
        const response = await axios.get('/api/mails/list');
        setData(response.data.mails);
        setUnreadCounts(response.data.unreadCount);
    };

    React.useEffect(() => {
        // hide left drawer when email app opens
        dispatch({ type: SET_MENU, opened: false });
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [filter, setFilter] = React.useState('all');
    const handleFilter = async (string) => {
        setEmailDetailsValue(false);
        setFilter(string);
        const response = await axios.post('/api/mails/filter', {
            filter: string
        });
        setData(response.data);
    };

    const handleImportantChange = async (event, data) => {
        if (data) {
            await axios.post('/api/mails/setImportant', { id: data.id });
            handleFilter(filter);
        }
    };

    const handleStarredChange = async (event, data) => {
        if (data) {
            await axios.post('/api/mails/setStarred', { id: data.id });
            handleFilter(filter);
        }
    };

    // search email using name
    const [search, setSearch] = React.useState('');
    const handleSearch = (event) => {
        const newString = event.target.value;
        setSearch(newString);

        if (newString) {
            const newRows = data.filter((row) => {
                let matches = true;

                const properties = ['name'];
                let containsQuery = false;

                properties.forEach((property) => {
                    if (row.profile[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
                        containsQuery = true;
                    }
                });

                if (!containsQuery) {
                    matches = false;
                }
                return matches;
            });
            setData(newRows);
        } else {
            handleFilter(filter);
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <MailDrawer
                openMailSidebar={openMailSidebar}
                handleDrawerOpen={handleDrawerOpen}
                filter={filter}
                handleFilter={handleFilter}
                unreadCounts={unreadCounts}
            />
            <Main open={openMailSidebar}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        {/* mail details & list */}
                        {emailDetails ? (
                            <MailDetails
                                data={selectedMail}
                                handleUserDetails={handleUserChange}
                                handleImportantChange={handleImportantChange}
                                handleStarredChange={handleStarredChange}
                            />
                        ) : (
                            <MailList
                                handleUserDetails={handleUserChange}
                                handleDrawerOpen={handleDrawerOpen}
                                handleImportantChange={handleImportantChange}
                                handleStarredChange={handleStarredChange}
                                data={data}
                                search={search}
                                handleSearch={handleSearch}
                            />
                        )}
                    </Grid>
                </Grid>
            </Main>
        </Box>
    );
};

export default MailPage;
