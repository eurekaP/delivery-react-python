import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import snackbarReducer from './snackbarReducer';

//-----------------------|| COMBINE REDUCER ||-----------------------//

const reducer = combineReducers({
    customization: customizationReducer,
    snackbar: snackbarReducer
});

export default reducer;
