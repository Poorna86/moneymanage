export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN': 
            return {
                uid: action.uid,
                loginEmail: action.loginEmail
            }
        case 'LOGOUT':
            return {}
        default: 
            return state    
    }
}