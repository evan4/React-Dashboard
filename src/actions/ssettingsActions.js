import {  DISABLE_BALANCE_ON_ADD, 
    DISABLE_BALANCE_ON_EDIT, 
    ALLOW_REGISTRATION } from './types';

export default setDisableBalanceOnAdd = () => {
    return {
        type: DISABLE_BALANCE_ON_ADD
    }
}
export default setDisableBalanceOnEdit = () => {
    return {
        type: DISABLE_BALANCE_ON_EDIT
    }
}
export default setAllowRegistration = () => {
    return {
        type: ALLOW_REGISTRATION
    }
}