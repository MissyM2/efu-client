import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
    type: FETCH_PROTECTED_DATA_SUCCESS,
    data
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
});

export const fetchProtectedData = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/protected`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => dispatch(fetchProtectedDataSuccess(data)))
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};


// don't know where to put this

export const ADD_SCHOOLTERM = "ADD_SCHOOLTERM";
export const addSchoolterm = schooltermName => ({
    type: ADD_SCHOOLTERM,
    schooltermName
});

export const ADD_TERMCOURSE = 'ADD_TERMCOURSE';
export const addTermcourse = (termcourseName, termcourseDesc, termcourseIndex) => ({
    type: ADD_TERMCOURSE,
    termcourseName,
    termcourseDesc,
    termcourseIndex
})

export const ADD_WEEK = "ADD_WEEK";
export const addWeek = (weekNum, weekStartDate, weekEndDate) => ({
    type: ADD_WEEK,
    weekNum,
    weekStartDate,
    weekEndDate
});
