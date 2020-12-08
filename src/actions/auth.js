import { firebase } from '../firebase/firebase';

// export const startLogin = (provider) => {
//     return (dispatch) => {
//         switch (provider) {
//             case 'google':
//                 return firebase.auth().signInWithPopup(googleAuthProvider);
//             case 'facebook':
//                 return firebase.auth().signInWithPopup(facebookAuthProvider);
//             case 'github':
//                 return firebase.auth().signInWithPopup(githubAuthProvider);
//         }
//     }
// }

export const login = (uid) => ({
    type: 'LOGIN',
    uid
})

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut()
    }
}

export const logout = () => ({
    type: 'LOGOUT'
})