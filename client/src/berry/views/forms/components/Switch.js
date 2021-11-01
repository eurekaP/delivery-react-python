import React from 'react';

// material-ui
import { FormControl, FormControlLabel, FormGroup, Grid, Switch } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// project imports
import SubCard from './../../../ui-component/cards/SubCard';
import MainCard from './../../../ui-component/cards/MainCard';
import SecondaryAction from './../../../ui-component/cards/CardSecondaryAction';
import { gridSpacing } from './../../../store/constant';

//-----------------------|| SWITCH PAGE ||-----------------------//

const UISwitch = () => {
    const theme = useTheme();

    return (
        <MainCard title="Switch" secondary={<SecondaryAction link="https://next.material-ui.com/components/switches/" />}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={6}>
                    <SubCard title="Basic Switch">
                        <Grid container spacing={2}>
                            <Grid item>
                                <Switch defaultChecked inputProps={{ 'aria-label': 'checked' }} />
                            </Grid>
                            <Grid item>
                                <Switch inputProps={{ 'aria-label': 'unchecked' }} />
                            </Grid>
                            <Grid item>
                                <Switch disabled defaultChecked inputProps={{ 'aria-label': 'disabled checked' }} />
                            </Grid>
                            <Grid item>
                                <Switch disabled inputProps={{ 'aria-label': 'disabled unchecked' }} />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <SubCard title="With label">
                        <Grid container spacing={2}>
                            <Grid item>
                                <FormControl>
                                    <FormGroup row>
                                        <FormControlLabel control={<Switch defaultChecked />} label="Label" />
                                        <FormControlLabel disabled control={<Switch />} label="Disabled" />
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <SubCard title="With Placement">
                        <Grid container spacing={2}>
                            <Grid item>
                                <FormControl>
                                    <FormGroup aria-label="position" row>
                                        <FormControlLabel
                                            value="top"
                                            control={<Switch color="primary" />}
                                            label="Top"
                                            labelPlacement="top"
                                        />
                                        <FormControlLabel
                                            value="start"
                                            control={<Switch color="primary" />}
                                            label="Start"
                                            labelPlacement="start"
                                        />
                                        <FormControlLabel
                                            value="bottom"
                                            control={<Switch color="primary" />}
                                            label="Bottom"
                                            labelPlacement="bottom"
                                        />
                                        <FormControlLabel
                                            value="end"
                                            control={<Switch color="primary" />}
                                            label="End"
                                            labelPlacement="end"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <SubCard title="Size">
                        <Grid container spacing={2}>
                            <Grid item>
                                <Switch defaultChecked size="small" inputProps={{ 'aria-label': 'small' }} />
                            </Grid>
                            <Grid item>
                                <Switch defaultChecked inputProps={{ 'aria-label': 'normal' }} />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12}>
                    <SubCard title="With Color">
                        <Grid container spacing={2}>
                            <Grid item>
                                <Switch defaultChecked color="primary" />
                            </Grid>
                            <Grid item>
                                <Switch
                                    defaultChecked
                                    sx={{
                                        color: theme.palette.warning.dark,
                                        '& .Mui-checked': { color: theme.palette.warning.dark },
                                        '& .Mui-checked+.MuiSwitch-track': { bgcolor: theme.palette.warning.main }
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Switch
                                    defaultChecked
                                    sx={{
                                        color: theme.palette.success.dark,
                                        '& .Mui-checked': { color: theme.palette.success.dark },
                                        '& .Mui-checked+.MuiSwitch-track': { bgcolor: theme.palette.success.light }
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Switch defaultChecked color="error" />
                            </Grid>
                            <Grid item>
                                <Switch defaultChecked color="secondary" />
                            </Grid>
                            <Grid item>
                                <Switch defaultChecked color="orange" />
                            </Grid>
                            <Grid item>
                                <Switch defaultChecked color="dark" />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default UISwitch;
