import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

// project imports
import useAuth from '../../hooks/useAuth';
import config from '../../config';

//-----------------------|| GUEST GUARD ||-----------------------//

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */
const GuestGuard = ({ children }) => {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Redirect to={config.defaultPath} />;
    }

    return children;
};

GuestGuard.propTypes = {
    children: PropTypes.node
};

export default GuestGuard;
