import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Avatar,
    Box,
    ButtonBase,
    Checkbox,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Toolbar,
    Typography,
    useMediaQuery
} from '@material-ui/core';
import { visuallyHidden } from '@material-ui/utils';

// third-party
import { format } from 'date-fns';
import clsx from 'clsx';

// project imports
import MailEmpty from './MailEmpty';
import MailListHeader from './MailListHeader';
import Chip from './../../../ui-component/extended/Chip';
import MainCard from './../../../ui-component/cards/MainCard';

// assets
import AttachmentTwoToneIcon from '@material-ui/icons/AttachmentTwoTone';
import StarBorderTwoToneIcon from '@material-ui/icons/StarBorderTwoTone';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';
import LabelTwoToneIcon from '@material-ui/icons/LabelTwoTone';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import ArchiveTwoToneIcon from '@material-ui/icons/ArchiveTwoTone';
import MailTwoToneIcon from '@material-ui/icons/MailTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone';

const avatarImage = require.context('./../../../assets/images/profile', true);

// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 320
    },
    sortSpan: visuallyHidden
}));

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1)
    },
    highlight: {
        color: theme.palette.secondary.main
    },
    title: {
        flex: '1 1 100%'
    }
}));

//-----------------------|| TABLE HEADER ||-----------------------//

function EnhancedTableHead({ selected }) {
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="none" colSpan={5}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    selected: PropTypes.array
};

//-----------------------|| TABLE HEADER TOOLBAR ||-----------------------//

const EnhancedTableToolbar = ({ numSelected }) => {
    const classes = useToolbarStyles();

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0
            })}
        >
            {numSelected > 0 && (
                <Typography className={classes.title} color="inherit" variant="h4" component="div">
                    {numSelected} Mail Selected
                </Typography>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

//-----------------------|| CUSTOMER LIST ||-----------------------//

const MailList = ({ data, search, handleSearch, handleDrawerOpen, handleUserDetails, handleStarredChange, handleImportantChange }) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const [denseTable, setDenseTable] = React.useState(false);
    const handleDenseTable = () => {
        setDenseTable(!denseTable);
    };

    return (
        <React.Fragment>
            <Grid container spacing={matchDownSM ? 3 : 1}>
                <Grid item xs={12}>
                    <MailListHeader
                        search={search}
                        handleSearch={handleSearch}
                        length={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        handleDrawerOpen={handleDrawerOpen}
                        handleDenseTable={handleDenseTable}
                    />
                </Grid>
                <Grid item xs={12}>
                    {data.length ? (
                        <MainCard content={false} sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50' }}>
                            {/* table */}
                            <TableContainer>
                                <Table
                                    size={denseTable ? 'small' : ''}
                                    aria-labelledby="tableTitle"
                                    sx={{ minWidth: 320, '& td': { whiteSpace: 'nowrap', p: denseTable ? '4px 6px' : '10px 6px' } }}
                                >
                                    {selected.length > 0 && <EnhancedTableHead selected={selected} />}
                                    <TableBody>
                                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                            const isItemSelected = isSelected(row.profile.name);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    sx={{
                                                        bgcolor: !row.isRead
                                                            ? theme.palette.mode === 'dark'
                                                                ? 'dark.main'
                                                                : 'grey.100'
                                                            : '',
                                                        '& td:last-child>div': {
                                                            position: 'absolute',
                                                            top: '50%',
                                                            right: '5px',
                                                            transform: 'translateY(-50%)',
                                                            display: 'none',
                                                            background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : '#fff',
                                                            boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
                                                            borderRadius: '12px',
                                                            padding: '8px 14px',
                                                            '& button + button': {
                                                                marginLeft: '5px'
                                                            }
                                                        },
                                                        '&:hover': {
                                                            '& td:last-child>div': {
                                                                display: 'block'
                                                            }
                                                        }
                                                    }}
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={index}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={isItemSelected}
                                                            color="primary"
                                                            onChange={(event) => handleClick(event, row.profile.name)}
                                                            inputProps={{
                                                                'aria-labelledby': labelId
                                                            }}
                                                        />
                                                        <Checkbox
                                                            icon={<StarBorderTwoToneIcon />}
                                                            checkedIcon={<StarTwoToneIcon />}
                                                            sx={{ '&.Mui-checked': { color: theme.palette.warning.dark } }}
                                                            checked={row.starred}
                                                            onChange={(event) => handleStarredChange(event, row)}
                                                            size="small"
                                                        />
                                                        <Checkbox
                                                            icon={<LabelOutlinedIcon />}
                                                            checkedIcon={<LabelTwoToneIcon />}
                                                            sx={{ '&.Mui-checked': { color: theme.palette.secondary.main } }}
                                                            checked={row.important}
                                                            onChange={(event) => handleImportantChange(event, row)}
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        id={labelId}
                                                        sx={{ cursor: 'pointer' }}
                                                        onClick={(e) => handleUserDetails(e, row)}
                                                    >
                                                        <Grid container spacing={2} alignItems="center" sx={{ flexWrap: 'nowrap' }}>
                                                            <Grid item>
                                                                <Avatar
                                                                    sx={{
                                                                        width: denseTable ? '30px' : '40px',
                                                                        height: denseTable ? '30px' : '40px'
                                                                    }}
                                                                    alt={row.profile.name}
                                                                    src={
                                                                        row.profile &&
                                                                        row.profile.avatar &&
                                                                        avatarImage(`./${row.profile.avatar}`).default
                                                                    }
                                                                />
                                                            </Grid>
                                                            <Grid item xs zeroMinWidth>
                                                                <ButtonBase disableRipple>
                                                                    <Typography
                                                                        align="left"
                                                                        variant={row.isRead ? 'body2' : 'subtitle1'}
                                                                        component="div"
                                                                    >
                                                                        {row.profile.name}
                                                                    </Typography>
                                                                </ButtonBase>
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                    <TableCell sx={{ cursor: 'pointer' }} onClick={(e) => handleUserDetails(e, row)}>
                                                        <Box
                                                            component="span"
                                                            sx={{
                                                                display: 'flex',
                                                                width: {
                                                                    xs: '220px',
                                                                    md: '350px',
                                                                    lg: '600px',
                                                                    xl: '700px'
                                                                }
                                                            }}
                                                        >
                                                            <Typography
                                                                variant={row.isRead ? 'body2' : 'subtitle1'}
                                                                sx={{
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    whiteSpace: 'nowrap',
                                                                    display: 'block'
                                                                }}
                                                            >
                                                                {row.subject} - {row.message}
                                                            </Typography>
                                                            <div className={classes.content}>
                                                                {row.promotions && (
                                                                    <Chip
                                                                        label="Promotions"
                                                                        size="small"
                                                                        sx={{
                                                                            color: theme.palette.primary.main,
                                                                            bgcolor: theme.palette.primary.light
                                                                        }}
                                                                    />
                                                                )}
                                                                {row.forums && (
                                                                    <Chip
                                                                        label="Forums"
                                                                        size="small"
                                                                        sx={{
                                                                            ml: row.promotions ? 1 : 0,
                                                                            mr: row.attach ? 1 : 0,
                                                                            color: theme.palette.warning.dark,
                                                                            bgcolor: theme.palette.warning.light
                                                                        }}
                                                                    />
                                                                )}
                                                            </div>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.attach && (
                                                            <IconButton>
                                                                <AttachmentTwoToneIcon fontSize="small" />
                                                            </IconButton>
                                                        )}
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ position: 'relative' }}>
                                                        {format(new Date(row.time), 'd MMM yy HH:mm a')}
                                                        <div>
                                                            <IconButton size="small">
                                                                <ArchiveTwoToneIcon fontSize="small" />
                                                            </IconButton>
                                                            <IconButton size="small">
                                                                <MailTwoToneIcon fontSize="small" />
                                                            </IconButton>
                                                            <IconButton size="small">
                                                                <DeleteTwoToneIcon fontSize="small" />
                                                            </IconButton>
                                                            <IconButton size="small">
                                                                <VisibilityOffTwoToneIcon fontSize="small" />
                                                            </IconButton>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        {emptyRows > 0 && (
                                            <TableRow
                                                style={{
                                                    height: 53 * emptyRows
                                                }}
                                            >
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </MainCard>
                    ) : (
                        <MailEmpty />
                    )}
                </Grid>
                <Grid item xs={12} sx={{ pt: '0 !important', display: { xs: 'block', sm: 'none' } }}>
                    {/* table pagination */}
                    <TablePagination
                        rowsPerPageOptions={[]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

MailList.propTypes = {
    data: PropTypes.array,
    handleDrawerOpen: PropTypes.func,
    handleUserDetails: PropTypes.func,
    handleStarredChange: PropTypes.func,
    handleImportantChange: PropTypes.func,
    handleSearch: PropTypes.func,
    search: PropTypes.string
};

export default MailList;
