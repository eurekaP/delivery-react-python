import React from 'react';

// material-ui
import { Button, Grid } from '@material-ui/core';

// third party
import { useDispatch } from 'react-redux';

// project imports
import SubCard from './../../../ui-component/cards/SubCard';
import MainCard from './../../../ui-component/cards/MainCard';
import SecondaryAction from './../../../ui-component/cards/CardSecondaryAction';
import { gridSpacing } from './../../../store/constant';
import { SNACKBAR_OPEN } from './../../../store/actions';

//==============================|| UI SNACKBAR ||==============================//

const UISnackbar = () => {
    const dispatch = useDispatch();

    return (
        <MainCard title="Snackbar" secondary={<SecondaryAction link="https://next.material-ui.com/components/snackbars/" />}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={6} md={4}>
                    <SubCard title="Basic Snackbar">
                        <Grid container spacing={3} justifyContent="center" alignItems="center">
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            message: 'This is default message',
                                            variant: 'alert',
                                            alertSeverity: 'info',
                                            close: false
                                        })
                                    }
                                >
                                    Default
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            message: 'This is Error',
                                            variant: 'alert',
                                            alertSeverity: 'error',
                                            close: false
                                        })
                                    }
                                >
                                    Error
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="success"
                                    sx={{ color: 'success.dark', borderColor: 'success.dark' }}
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            message: 'This is Success',
                                            variant: 'alert',
                                            alertSeverity: 'success',
                                            close: false
                                        })
                                    }
                                >
                                    Success
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="warning"
                                    sx={{ color: 'warning.dark', borderColor: 'warning.dark' }}
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            message: 'This is Warning',
                                            variant: 'alert',
                                            alertSeverity: 'warning',
                                            close: false
                                        })
                                    }
                                >
                                    Warning
                                </Button>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <SubCard title="With Close">
                        <Grid container spacing={3} justifyContent="center" alignItems="center">
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            message: 'This is Default',
                                            variant: 'alert',
                                            alertSeverity: 'info'
                                        })
                                    }
                                >
                                    Default
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            message: 'This is Error',
                                            variant: 'alert',
                                            alertSeverity: 'error'
                                        })
                                    }
                                >
                                    Error
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="success"
                                    sx={{ color: 'success.dark', borderColor: 'success.dark' }}
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            message: 'This is Success',
                                            variant: 'alert',
                                            alertSeverity: 'success'
                                        })
                                    }
                                >
                                    Success
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="warning"
                                    sx={{ color: 'warning.dark', borderColor: 'warning.dark' }}
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            message: 'This is Warning',
                                            variant: 'alert',
                                            alertSeverity: 'warning'
                                        })
                                    }
                                >
                                    Warning
                                </Button>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <SubCard title="With Close + Action">
                        <Grid container spacing={3} justifyContent="center" alignItems="center">
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            message: 'This is Default',
                                            variant: 'alert',
                                            alertSeverity: 'info',
                                            actionButton: true
                                        })
                                    }
                                >
                                    Default
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            message: 'This is Error',
                                            variant: 'alert',
                                            alertSeverity: 'error',
                                            actionButton: true
                                        })
                                    }
                                >
                                    Error
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="success"
                                    sx={{ color: 'success.dark', borderColor: 'success.dark' }}
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            message: 'This is Success',
                                            variant: 'alert',
                                            alertSeverity: 'success',
                                            actionButton: true
                                        })
                                    }
                                >
                                    Success
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="warning"
                                    sx={{ color: 'warning.dark', borderColor: 'warning.dark' }}
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            message: 'This is Warning',
                                            variant: 'alert',
                                            alertSeverity: 'warning',
                                            actionButton: true
                                        })
                                    }
                                >
                                    Warning
                                </Button>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12} md={6}>
                    <SubCard title="Snackbar Position">
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            anchorOrigin: { vertical: 'top', horizontal: 'left' },
                                            message: 'This is an top-left message!'
                                        })
                                    }
                                >
                                    Top-Left
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            anchorOrigin: { vertical: 'top', horizontal: 'center' },
                                            message: 'This is an top-center message!'
                                        })
                                    }
                                >
                                    Top-Center
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            anchorOrigin: { vertical: 'top', horizontal: 'right' },
                                            message: 'This is an top-right message!'
                                        })
                                    }
                                >
                                    Top-Right
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
                                            message: 'This is an bottom-right message!'
                                        })
                                    }
                                >
                                    Bottom-Right
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
                                            message: 'This is an bottom-center message!'
                                        })
                                    }
                                >
                                    Bottom-Center
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                                            message: 'This is an bottom-left message!'
                                        })
                                    }
                                >
                                    Bottom-Left
                                </Button>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <SubCard title="Snackbar Trasition">
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            message: 'This is an fade message!',
                                            transition: 'Fade'
                                        })
                                    }
                                >
                                    Default/Fade
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            message: 'This is an slide-left message!',
                                            transition: 'SlideLeft'
                                        })
                                    }
                                >
                                    Slide Left
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            message: 'This is an slide-up message!',
                                            transition: 'SlideUp'
                                        })
                                    }
                                >
                                    Slide Up
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            message: 'This is an slide-right message!',
                                            transition: 'SlideRight'
                                        })
                                    }
                                >
                                    Slide Right
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            message: 'This is an slide-down message!',
                                            transition: 'SlideDown'
                                        })
                                    }
                                >
                                    Slide Down
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            message: 'This is an grow message!',
                                            transition: 'Grow'
                                        })
                                    }
                                >
                                    Grow
                                </Button>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default UISnackbar;
