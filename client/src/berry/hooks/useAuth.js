import { useContext } from 'react';

// auth provider
import FirebaseContext from '../contexts/FirebaseContext';
// import Auth0Context from '../contexts/Auth0Context';
// import JWTContext from '../contexts/JWTContext';

//-----------------------|| AUTH HOOKS ||-----------------------//

const useAuth = () => useContext(FirebaseContext);

export default useAuth;
