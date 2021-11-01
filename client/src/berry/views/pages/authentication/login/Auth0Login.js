import React, { useState } from 'react';

// material-ui
import { Button, FormHelperText, Grid } from '@material-ui/core';

// project imports
import AnimateButton from './../../../../ui-component/extended/AnimateButton';
import useAuth from '../../../../hooks/useAuth';
import useScriptRef from '../../../../hooks/useScriptRef';

// assets
import LockIcon from '@material-ui/icons/Lock';

//==============================|| AUTH0 LOGIN ||==============================//

const Auth0Login = ({ ...others }) => {
    const { popupLogin } = useAuth();
    const [error, setError] = useState(null);
    const scriptedRef = useScriptRef();

    const loginHandler = async () => {
        try {
            await popupLogin();
        } catch (err) {
            if (scriptedRef.current) {
                setError(err.message);
            }
        }
    };

    return (
        <div {...others}>
            <Grid container justify="center" alignItems="center" spacing={2}>
                {error && (
                    <Grid item xs={12}>
                        <FormHelperText error>{error}</FormHelperText>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <AnimateButton>
                        <Button onClick={loginHandler} variant="contained" fullWidth color="secondary">
                            <LockIcon fontSize="small" sx={{ mr: 1, fontSize: '1rem' }} /> Log in with Auth0
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>
        </div>
    );
};

export default Auth0Login;
