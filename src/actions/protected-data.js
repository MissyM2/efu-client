import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

/////////////////////////////////
//
//  FETCHES FOR ADDING (POSTING)  
//
/////////////////////////////////

// fetch for adding terms
export const FETCH_ADDSCHOOLTERM_SUCCESS = 'FETCH_ADDSCHOOLTERM_SUCCESS';
export const fetchAddSchooltermSuccess = termcourse => ({
    type: FETCH_ADDSCHOOLTERM_SUCCESS,
    termcourse
});

export const FETCH_ADDSCHOOLTERM_ERROR = 'FETCH_ADDSCHOOLTERM_ERROR';
export const fetchAddSchooltermError = error => ({
    type: FETCH_ADDSCHOOLTERM_ERROR,
    error
});

export const fetchAddSchoolterm = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/schoolterm`, {
        method: 'POST',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({schoolterm}) => dispatch(fetchAddSchooltermSuccess(schoolterm)))
        .catch(err => {
            dispatch(fetchAddSchooltermError(err));
        });
};

// fetch for adding courses
export const FETCH_ADDTERMCOURSE_SUCCESS = 'FETCH_ADDTERMCOURSE_SUCCESS';
export const fetchAddTermcourseSuccess = termcourse => ({
    type: FETCH_ADDTERMCOURSE_SUCCESS,
    termcourse
});

export const FETCH_ADDTERMCOURSE_ERROR = 'FETCH_ADDTERMCOURSE_ERROR';
export const fetchAddTermcourseError = error => ({
    type: FETCH_ADDTERMCOURSE_ERROR,
    error
});

export const fetchAddTermcourse = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/termcourse`, {
        method: 'POST',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({termcourse}) => dispatch(fetchAddTermcourseSuccess(termcourse)))
        .catch(err => {
            dispatch(fetchAddTermcourseError(err));
        });
};

// fetch for adding weeks
export const FETCH_ADDWEEK_SUCCESS = 'FETCH_ADDWEEK_SUCCESS';
export const fetchAddWeekSuccess = week => ({
    type: FETCH_ADDWEEK_SUCCESS,
    week
});

export const FETCH_ADDWEEK_ERROR = 'FETCH_ADDWEEK_ERROR';
export const fetchAddWeekError = error => ({
    type: FETCH_ADDWEEK_ERROR,
    error
});

export const fetchAddWeekData = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/week`, {
        method: 'POST',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({week}) => dispatch(fetchAddWeekSuccess(week)))
        .catch(err => {
            dispatch(fetchAddWeekError(err));
        });
};

// fetch for adding grades
export const FETCH_ADDGRADE_SUCCESS = 'FETCH_ADDGRADE_SUCCESS';
export const fetchAddGradeSuccess = (grade) => ({
    type: FETCH_ADDGRADE_SUCCESS,
    grade
});

export const FETCH_ADDGRADE_ERROR = 'FETCH_ADDGRADE_ERROR';
export const fetchAddGradeError = error => ({
    type: FETCH_ADDGRADE_ERROR,
    error
});

export const fetchAddGradeData = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/grade`, {
        method: 'POST',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({grade}) => dispatch(fetchAddGradeSuccess(grade)))
        .catch(err => {
            dispatch(fetchAddGradeError(err));
        });
};

// fetch for adding deliverables
export const FETCH_ADDDELIVERABLE_SUCCESS = 'FETCH_ADDDELIVERABLE_SUCCESS';
export const fetchAddDeliverableSuccess = (deliverable) => ({
    type: FETCH_ADDDELIVERABLE_SUCCESS,
    deliverable
});

export const FETCH_ADDDELIVERABLE_ERROR = 'FETCH_ADDDELIVERABLE_ERROR';
export const fetchAddDeliverableError = error => ({
    type: FETCH_ADDDELIVERABLE_ERROR,
    error
});

export const fetchAddDeliverableData = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/deliverable`, {
        method: 'POST',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        //.then(console.log(deliverable))
        //.then(({deliverable}) => console.log(deliverable))
        .catch(err => {
            dispatch(fetchAddDeliverableError(err));
        });
};




/////////////////////////////////
//
//  FETCHES FOR GETTING DATA 
//
/////////////////////////////////

// fetch for getting terms
export const FETCH_GETTERMS_SUCCESS = 'FETCH_GETTERMS_SUCCESS';
export const fetchGetTermsSuccess = terms => {;
    return {
        type: FETCH_GETTERMS_SUCCESS,
        payload: {terms}
    }
};

export const FETCH_GETTERMS_ERROR = 'FETCH_GETTERMS_ERROR';
export const fetchGetTermsError = error => ({
    type: FETCH_GETTERMS_ERROR,
    error
});

export const fetchGetTerms = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/terms`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(terms => dispatch(fetchGetTermsSuccess(terms)))
        .catch(err => {
            dispatch(fetchGetTermsError(err));
        });
};

// fetch for getting all weeks
export const FETCH_GETWEEKS_SUCCESS = 'FETCH_GETWEEKS_SUCCESS';
export const fetchGetWeeksSuccess = weeks => {
    return {
        type: FETCH_GETWEEKS_SUCCESS,
        payload: {weeks}
    } 
};

export const FETCH_GETWEEKS_ERROR = 'FETCH_GETWEEKS_ERROR';
export const fetchGetWeeksError = error => ({
    type: FETCH_GETWEEKS_ERROR,
    error
});

export const fetchGetWeeks = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/weeks`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(weeks => dispatch(fetchGetWeeksSuccess(weeks)))
        .catch(err => {
            dispatch(fetchGetWeeksError(err));
        });
};

// fetch for getting all courses
export const FETCH_GETCOURSES_SUCCESS = 'FETCH_GETCOURSES_SUCCESS';
export const fetchGetCoursesSuccess = courses => ({
    type: FETCH_GETCOURSES_SUCCESS,
    payload: {courses}
});

export const FETCH_GETCOURSES_ERROR = 'FETCH_GETCOURSES_ERROR';
export const fetchGetCoursesError = error => ({
    type: FETCH_GETCOURSES_ERROR,
    error
});

export const fetchGetCourses = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/courses`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((courses) => {
            console.log('courses haS SUCCEEDED: ', courses)
            return dispatch(fetchGetCoursesSuccess(courses))
        })
        .catch(err => {
            dispatch(fetchGetCoursesError(err));
        });
};


// fetch for getting deliverables 
export const FETCH_GETDELIVERABLES_SUCCESS = 'FETCH_GETDELIVERABLES_SUCCESS';
export const fetchGetDeliverablesSuccess = deliverables => {
    return {
        type: FETCH_GETDELIVERABLES_SUCCESS,
        payload: {deliverables}
    }
};

export const FETCH_GETDELIVERABLES_ERROR = 'FETCH_GETDELIVERABLES_ERROR';
export const fetchGetDeliverablesError = error => ({
    type: FETCH_GETDELIVERABLES_ERROR,
    error
});

export const fetchGetDeliverables = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/deliverables`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => {
            return res.json();
        })
        .then(deliverables => dispatch(fetchGetDeliverablesSuccess(deliverables)))
        .catch(err => {
            console.log(err);
            dispatch(fetchGetDeliverablesError(err));
        });
};




