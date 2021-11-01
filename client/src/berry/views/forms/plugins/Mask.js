import React from 'react';

// material-ui
import { Grid, TextField } from '@material-ui/core';

// third-party
import MaskedInput from 'react-text-mask';

// project imports
import SubCard from './../../../ui-component/cards/SubCard';
import MainCard from '../../../ui-component/cards/MainCard';
import SecondaryAction from '../../../ui-component/cards/CardSecondaryAction';
import { gridSpacing } from './../../../store/constant';

// assets
import LinkIcon from '@material-ui/icons/Link';

// mask expression
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

    return <MaskedInput {...props} ref={setRef} />;
});

//-----------------------|| PLUGIN - MASK INPUT ||-----------------------//

const MaskPage = () => {
    return (
        <MainCard
            title="Mask"
            secondary={<SecondaryAction icon={<LinkIcon fontSize="small" />} link="https://www.npmjs.com/package/react-text-mask" />}
        >
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={6}>
                    <SubCard title="Date">
                        <Grid container alignItems="center" spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Insert Date 1"
                                    placeholder="01/11/1111"
                                    inputProps={{
                                        mask: [/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
                                        placeholderChar: '\u2000',
                                        showMask: false
                                    }}
                                    InputProps={{
                                        defaultValue: '',
                                        inputComponent: TextMaskCExpDate
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Insert Date 2"
                                    inputProps={{
                                        mask: [/[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
                                        placeholderChar: '\u2000',
                                        showMask: false
                                    }}
                                    InputProps={{
                                        defaultValue: '',
                                        inputComponent: TextMaskCExpDate
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <SubCard title="Time">
                        <Grid container alignItems="center" spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Hour"
                                    inputProps={{
                                        mask: [/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/],
                                        placeholderChar: '\u2000',
                                        showMask: false
                                    }}
                                    InputProps={{
                                        defaultValue: '',
                                        inputComponent: TextMaskCExpDate
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Date & Hour"
                                    inputProps={{
                                        mask: [
                                            /[0-9]/,
                                            /[0-9]/,
                                            '/',
                                            /[0-9]/,
                                            /[0-9]/,
                                            '/',
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            ':',
                                            /[0-9]/,
                                            /[0-9]/,
                                            ':',
                                            /[0-9]/,
                                            /[0-9]/
                                        ],
                                        placeholderChar: '\u2000',
                                        showMask: false
                                    }}
                                    InputProps={{
                                        defaultValue: '',
                                        inputComponent: TextMaskCExpDate
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <SubCard title="Phone no.">
                        <Grid container alignItems="center" spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Mobile No."
                                    inputProps={{
                                        mask: [
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            '-',
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            '-',
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/
                                        ],
                                        placeholderChar: '\u2000',
                                        showMask: false
                                    }}
                                    InputProps={{
                                        defaultValue: '',
                                        inputComponent: TextMaskCExpDate
                                    }}
                                />{' '}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Telephone"
                                    inputProps={{
                                        mask: [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
                                        placeholderChar: '\u2000',
                                        showMask: false
                                    }}
                                    InputProps={{
                                        defaultValue: '',
                                        inputComponent: TextMaskCExpDate
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Tel. with Code Area"
                                    inputProps={{
                                        mask: [
                                            '(',
                                            /[0-9]/,
                                            /[0-9]/,
                                            ')',
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            '-',
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/
                                        ],
                                        placeholderChar: '\u2000',
                                        showMask: false
                                    }}
                                    InputProps={{
                                        defaultValue: '',
                                        inputComponent: TextMaskCExpDate
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="US Telephone"
                                    inputProps={{
                                        mask: [
                                            '(',
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            ')',
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            '-',
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/
                                        ],
                                        placeholderChar: '\u2000',
                                        showMask: false
                                    }}
                                    InputProps={{
                                        defaultValue: '',
                                        inputComponent: TextMaskCExpDate
                                    }}
                                />
                            </Grid>{' '}
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <SubCard title="Network">
                        <Grid container alignItems="center" spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="IP Address"
                                    inputProps={{
                                        mask: [
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            '.',
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            '.',
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            '.',
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/
                                        ],
                                        placeholderChar: '\u2000',
                                        showMask: false
                                    }}
                                    InputProps={{
                                        defaultValue: '',
                                        inputComponent: TextMaskCExpDate
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="IPV4"
                                    inputProps={{
                                        mask: [
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            '.',
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            '.',
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            '.',
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/
                                        ],
                                        placeholderChar: '\u2000',
                                        showMask: false
                                    }}
                                    InputProps={{
                                        defaultValue: '',
                                        inputComponent: TextMaskCExpDate
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="IPV6"
                                    inputProps={{
                                        mask: [
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            ':',
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            ':',
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            ':',
                                            /[0-9]/,
                                            ':',
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            ':',
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            ':',
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            ':',
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/,
                                            /[0-9]/
                                        ],
                                        placeholderChar: '\u2000',
                                        showMask: false
                                    }}
                                    InputProps={{
                                        defaultValue: '',
                                        inputComponent: TextMaskCExpDate
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default MaskPage;
