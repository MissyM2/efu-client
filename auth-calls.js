import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from '../utils';


class AuthCalls {
    constructor() {

    }
    register(name, email, password) {
            fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(res => normalizeResponseErrors(res))
            .then(res => res.json())
            .catch(err => {
                const {reason, message, location} = err;
                if (reason === 'ValidationError') {
                    // Convert ValidationErrors into SubmissionErrors for Redux Form
                    return Promise.reject(
                        new SubmissionError({
                            [location]: message
                        })
                    );
                }
            });
    };

    login(email, password) {
        fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            // Reject any requests which don't return a 200 status, creating
            // errors which follow a consistent format
            .then(res => normalizeResponseErrors(res))
            .then(res => {
                return res.json()
            })
            .then(({authToken}) => {
                AuthCalls.storeAuthInfo(authToken);
                props.history.replace("/dashboard");
            })
            .catch(err => {
                const {code} = err;
                const message =
                    code === 401
                        ? 'Incorrect username or password'
                        : 'Unable to login, please try again';
            });

    };

    logOut() {
            localStorage.removeItem('authToken');
    }

    loadAuthToken() => {
        return localStorage.getItem('authToken');
    };

    saveAuthToken(authToken) => {
        try {
            localStorage.setItem('authToken', authToken);
        } catch (e) {}
    };

    authToken = loadAuthToken();
    if (authToken) {
        const token = authToken;
        store.dispatch(setAuthToken(token));
        store.dispatch(refreshAuthToken());
    }

    storeAuthInfo = (authToken, dispatch) => {
        const decodedToken = jwtDecode(authToken);
        dispatch(setAuthToken(authToken));
        dispatch(authSuccess(decodedToken.user));
        saveAuthToken(authToken);
    };

    refreshAuthToken = () => (dispatch, getState) => {
        dispatch(authRequest());
        const authToken = getState().auth.authToken;
        return fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                // Provide our existing token as credentials to get a new one
                Authorization: `Bearer ${authToken}`
            }
        })
            .then(res => normalizeResponseErrors(res))
            .then(res => res.json())
            .then(({authToken}) => storeAuthInfo(authToken, dispatch))
            .catch(err => {
                // We couldn't get a refresh token because our current credentials
                // are invalid or expired, or something else went wrong, so clear
                // them and sign us out
                dispatch(authError(err));
                dispatch(clearAuth());
                clearAuthToken(authToken);
            });
    };

    getCurrentUsername() {
        return this.auth.currentUser && this.auth.currentUser.displayName;
    };
