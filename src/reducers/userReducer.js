// for logout nav bar

export const initialState = null;

export const reducer = (state, action) => {
    if (action.type === "LOGGED_IN") {
        return action.payload;
    }
    return state;
}

// for cart and admin nav bar

export const initialRoleValue = 2;

export const userReducer = (roleState, action) => {
    if (action.value === 0 || action.value === 1 || action.value === 2) {
        return action.value;
    }
    return roleState
}


// to have the username globally

export const initialUsername = '';

export const useNameReducer = (usernameState, action) => {
    if (action.name === "PERSON") {
        return action.nameValue
    }
    return usernameState
}
