import React from 'react';

// material-ui
import { Button, Collapse, FormControlLabel, Grid, Radio, RadioGroup, Stack, TextField, Typography } from '@material-ui/core';

// third-party
import MaskedInput from 'react-text-mask';

// project imports
import { gridSpacing } from '../../../../../store/constant';
import AnimateButton from './../../../../../ui-component/extended/AnimateButton';

// assets
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import CreditCardTwoToneIcon from '@material-ui/icons/CreditCardTwoTone';

// input mast
const TextMaskCExpDate = React.forwardRef(function TextMaskCustom(props, ref) {
    const setRef = React.useCallback(
        (maskedInputRef) => {
            const value = maskedInputRef ? maskedInputRef.inputElement : null;

            if (typeof ref === 'function') {
                ref(value);
            } else if (ref) {
                ref.current = value;
            }
        },
        [ref]
    );

    return <MaskedInput {...props} ref={setRef} mask={[/[0-1]/, /[0-9]/, '/', /[2-3]/, /[0-9]/]} placeholderChar={'\u2000'} showMask />;
});

//-----------------------|| PROFILE 2 - PAYMENT ||-----------------------//

const Payment = () => {
    const [cvv, setCvv] = React.useState('123');
    const handleChangeCVV = (event) => {
        setCvv(event.target.value);
    };

    const [value1, setValue1] = React.useState('visa');
    const handleChange1 = (event) => {
        setValue1(event.target.value);
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <RadioGroup aria-label="gender" name="gender1" value={value1} onChange={handleChange1}>
                    <Grid container spacing={0}>
                        <Grid item>
                            <FormControlLabel value="visa" control={<Radio />} label="Visa Credit/Debit Card" />
                        </Grid>
                        <Grid item>
                            <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                        </Grid>
                    </Grid>
                </RadioGroup>
            </Grid>
            <Collapse in={value1 === 'visa'} sx={{ width: '100%' }}>
                <Grid item xs={12} sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Name on Card" defaultValue="Selena Litten" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Card Number" defaultValue=" 30529399" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Expiry Date"
                                InputProps={{
                                    defaultValue: '12/22',
                                    inputComponent: TextMaskCExpDate
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="standard-select-ccv"
                                label="CCV Code"
                                value={cvv}
                                fullWidth
                                variant="outlined"
                                onChange={handleChangeCVV}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <LockTwoToneIcon sx={{ width: '50px', height: '50px', color: 'primary.main' }} />
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h5">Secure Checkout</Typography>
                                    <Typography variant="caption">Secure by Google.</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction="row" justifyContent="flex-start">
                                <AnimateButton>
                                    <Button variant="outlined" size="large" color="primary" startIcon={<CreditCardTwoToneIcon />}>
                                        Add New card
                                    </Button>
                                </AnimateButton>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Collapse>
            <Collapse in={value1 === 'paypal'} sx={{ width: '100%' }}>
                <Grid item xs={12} sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Paypal Mail" defaultValue="demo@company.paypal.com" />
                        </Grid>
                    </Grid>
                </Grid>
            </Collapse>
        </Grid>
    );
};

export default Payment;
