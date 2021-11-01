import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { makeStyles, useTheme } from '@material-ui/styles';
import {
    Button,
    Card,
    CardContent,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    TextField,
    Typography
} from '@material-ui/core';

// third party
import MaskedInput from 'react-text-mask';

// project imports
import AnimateButton from './../../../ui-component/extended/AnimateButton';
import { gridSpacing } from '../../../store/constant';

// assets
import mailImg from './../../../assets/images/landing/img-contact-mail.svg';

// style constant
const useStyles = makeStyles((theme) => ({
    mailImg: {
        marginBottom: '-5px',
        position: 'absolute',
        bottom: '-90px',
        right: '0',
        width: '400px',
        maxWidth: '100%',
        animation: '5s wings ease-in-out infinite',
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    }
}));

//===========================|| TEXT MASK - EXP DATE ||===========================//

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

// select options
const currencies = [
    {
        value: '1',
        label: 'Below $1000'
    },
    {
        value: '2',
        label: '$1000 - $5000'
    },
    {
        value: '3',
        label: 'Not specified'
    }
];

const sizes = [
    {
        value: '1',
        label: '1 - 5'
    },
    {
        value: '2',
        label: '5 - 10'
    },
    {
        value: '3',
        label: '10+'
    }
];

//===========================|| CONTACT CARD - FORMS ||===========================//

const ContactCard = () => {
    const theme = useTheme();
    const classes = useStyles();

    const [budget, setBudget] = React.useState(1);
    const handleChange = (event) => {
        setBudget(event.target.value);
    };

    const [size, setSize] = React.useState(1);
    const handleChange1 = (event) => {
        setSize(event.target.value);
    };

    return (
        <Container>
            <Grid container justifyContent="center" spacing={gridSpacing}>
                <Grid item sm={10} md={7} sx={{ mt: '100px', mb: '50px', [theme.breakpoints.down('sm')]: { mt: '116px', mb: '20px' } }}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h1"
                                color="white"
                                component="div"
                                sx={{
                                    fontSize: '56px',
                                    fontWeight: '900',
                                    lineHeight: '60px',
                                    [theme.breakpoints.down('sm')]: { fontSize: '29px', lineHeight: '36px' }
                                }}
                            >
                                Talk to our account expert
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                variant="h4"
                                component="div"
                                sx={{ fontWeight: '400', lineHeight: '32px', [theme.breakpoints.up('md')]: { m: '0 100px' } }}
                                color="white"
                            >
                                The starting point for your next project based on easy-to-customize Material-UI © helps you build apps
                                faster and better.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ position: 'relative' }}>
                    <img src={mailImg} alt="Berry" className={classes.mailImg} />
                </Grid>
                <Grid item xs={10} sx={{ mb: '-300px' }}>
                    <Card sx={{ mb: '50px' }} elevation={4}>
                        <CardContent sx={{ p: 4 }}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Name</InputLabel>
                                        <OutlinedInput type="text" label="Name" />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Company Name</InputLabel>
                                        <OutlinedInput type="text" label="Company Name" />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Email Address</InputLabel>
                                        <OutlinedInput type="text" label="Email Address" />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <TextField
                                            fullWidth
                                            label="Phone Number"
                                            inputProps={{
                                                mask: [
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
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant="outlined" sx={{ textAlign: 'left' }}>
                                        <TextField
                                            id="outlined-select-Size"
                                            select
                                            fullWidth
                                            label="Company Size"
                                            value={size}
                                            onChange={handleChange1}
                                            variant="outlined"
                                        >
                                            {sizes.map((option, index) => (
                                                <MenuItem key={index} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant="outlined" sx={{ textAlign: 'left' }}>
                                        <TextField
                                            id="outlined-select-budget"
                                            select
                                            fullWidth
                                            label="Project Budget"
                                            value={budget}
                                            onChange={handleChange}
                                            variant="outlined"
                                        >
                                            {currencies.map((option, index) => (
                                                <MenuItem key={index} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="outlined">
                                        <TextField
                                            id="outlined-multiline-static1"
                                            placeholder="Message"
                                            multiline
                                            fullWidth
                                            rows={4}
                                            defaultValue=""
                                            variant="outlined"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item sm zeroMinWidth>
                                            <Typography align="left" variant="body2">
                                                By submitting this, you agree to the
                                                <Typography variant="subtitle1" component={Link} to="#" color="primary" sx={{ mx: 0.5 }}>
                                                    Privacy Policy
                                                </Typography>
                                                and
                                                <Typography variant="subtitle1" component={Link} to="#" color="primary" sx={{ ml: 0.5 }}>
                                                    Cookie Policy
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <AnimateButton>
                                                <Button variant="contained" color="secondary">
                                                    Get Started
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ContactCard;
