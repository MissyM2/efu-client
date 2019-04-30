import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

/////////////////////////////////
//
//  FETCHES FOR ADDING (POSTING)  
//
/////////////////////////////////

// fetch for adding terms
export const FETCH_ADDTERM_SUCCESS = 'FETCH_ADDTERM_SUCCESS';
export const fetchAddTermSuccess = term => ({
    type: FETCH_ADDTERM_SUCCESS,
    term
});

export const FETCH_ADDTERM_ERROR = 'FETCH_ADDTERM_ERROR';
export const fetchAddTermError = error => ({
    type: FETCH_ADDTERM_ERROR,
    error
});

export const fetchAddTerm = value => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/terms`, {
        method: 'POST',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({termDesc:value})
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(term => dispatch(fetchAddTermSuccess(term)))
        .catch(err => {
            dispatch(fetchAddTermError(err));
        });
};

// fetch for adding courses
export const FETCH_ADDCOURSE_SUCCESS = 'FETCH_ADDCOURSE_SUCCESS';
export const fetchAddCourseSuccess = course => ({
    type: FETCH_ADDCOURSE_SUCCESS,
    course
});

export const FETCH_ADDCOURSE_ERROR = 'FETCH_ADDCOURSE_ERROR';
export const fetchAddCourseError = error => ({
    type: FETCH_ADDCOURSE_ERROR,
    error
});

export const fetchAddCourse = newCourse => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    console.log('inside fetch', newCourse);
    return fetch(`${API_BASE_URL}/courses`, {
        method: 'POST',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(newCourse)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(newCourse => dispatch(fetchAddCourseSuccess(newCourse)))
        .catch(err => {
            dispatch(fetchAddCourseError(err));
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

export const fetchAddWeek = newWeek => (dispatch, getState) => {
    console.log('inside fetch', newWeek);
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/weeks`, {
        method: 'POST',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(newWeek)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((newWeek) => dispatch(fetchAddWeekSuccess(newWeek)))
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
    console.log('got to fetchGetWeeks');
    return fetch(`${API_BASE_URL}/weeks`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(weeks => {
            console.log('weeks are ', weeks);
            dispatch(fetchGetWeeksSuccess(weeks))
        })
        .catch(err => {
            dispatch(fetchGetWeeksError(err));
        });
};

// fetch for getting week by current week num
export const FETCH_GETWEEKBYCURRENTWEEKNUM_SUCCESS = 'FETCH_GETWEEKBYCURRENTWEEKNUM_SUCCESS';
export const fetchGetWeekByCurrentWeekNumSuccess = week => {
    return {
        type: FETCH_GETWEEKBYCURRENTWEEKNUM_SUCCESS,
        payload: {week}
    } 
};

export const FETCH_GETWEEKBYCURRENTWEEKNUM_ERROR = 'FETCH_GETWEEKBYCURRENTWEEKNUM_ERROR';
export const fetchGetWeekByCurrentWeekNumError = error => ({
    type: FETCH_GETWEEKBYCURRENTWEEKNUM_ERROR,
    error
});

export const fetchGetWeekByCurrentWeekNum = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/weeks`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(week => dispatch(fetchGetWeekByCurrentWeekNumSuccess(week)))
        .catch(err => {
            dispatch(fetchGetWeekByCurrentWeekNumError(err));
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
        .then(deliverables => {
            console.log('deliverables are ', deliverables);
            dispatch(fetchGetDeliverablesSuccess(deliverables))
        })
        .catch(err => {
            console.log(err);
            dispatch(fetchGetDeliverablesError(err));
        });
};

// fetch for getting suggestions
export const FETCH_GETSUGGESTIONS_SUCCESS = 'FETCH_GETSUGGESTIONS_SUCCESS';
export const fetchGetSuggestionsSuccess = suggestions => {;
    return {
        type: FETCH_GETSUGGESTIONS_SUCCESS,
        payload: {suggestions}
    }
};

export const FETCH_GETSUGGESTIONS_ERROR = 'FETCH_GETSUGGESTIONS_ERROR';
export const fetchGetSuggestionsError = error => ({
    type: FETCH_GETSUGGESTIONS_ERROR,
    error
});

export const fetchGetSuggestions = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/suggestions`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(suggestions => {
            //console.log('suggestions haS SUCCEEDED: ', suggestions)
            dispatch(fetchGetSuggestionsSuccess(suggestions))
        })
        .catch(err => {
            dispatch(fetchGetTermsError(err));
        });
};

/////////////////////////////////
//
//  FETCHES FOR UPDATING (PUT)  
//
/////////////////////////////////

// fetch for updating week data
export const FETCH_UPDATEWEEK_SUCCESS = 'FETCH_UPDATEWEEK_SUCCESS';
export const fetchUpdateWeekSuccess = weekNum => ({
    type: FETCH_UPDATEWEEK_SUCCESS,
    weekNum
});

export const FETCH_UPDATEWEEK_ERROR = 'FETCH_UPDATEWEEK_ERROR';
export const fetchUpdateWeekError = error => ({
    type: FETCH_UPDATEWEEK_ERROR,
    error
});

export const fetchUpdateWeek = value => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/weeks`, {
        method: 'PUT',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({weekNum:value})
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(weekNum => dispatch(fetchUpdateWeekSuccess(weekNum)))
        .catch(err => {
            dispatch(fetchUpdateWeekError(err));
        });
};




