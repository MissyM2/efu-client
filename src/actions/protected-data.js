import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from '../utils';

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
    //console.log('inside fetch', newCourse);
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
    //console.log('inside fetch', newWeek);
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

export const fetchAddGrade = newGrade => (dispatch, getState) => {
    console.log('inside addGrade fetch action', newGrade)
    const authToken = getState().auth.authToken;
    console.log("above fetch ", newGrade);
    return fetch(`${API_BASE_URL}/grades`, {
        method: 'POST',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(newGrade)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((grade) => {
            console.log("was grade successful..  found a grade", grade)
            dispatch(fetchAddGradeSuccess(grade))})
        .catch(err => {
            console.log('there was an error or grade not found');
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

export const fetchAddDeliverable = newDeliverable => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/deliverables`, {
        method: 'POST',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(newDeliverable)
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

// fetch for getting grades
export const FETCH_GETGRADES_SUCCESS = 'FETCH_GETGRADES_SUCCESS';
export const fetchGetGradesSuccess = grades => {;
    return {
        type: FETCH_GETGRADES_SUCCESS,
        payload: {grades}
    }
};

export const FETCH_GETGRADES_ERROR = 'FETCH_GETGRADES_ERROR';
export const fetchGetGradesError = error => ({
    type: FETCH_GETGRADES_ERROR,
    error
});

export const fetchGetGrades = (newWeek) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/grades`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(newWeek)
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(grades => dispatch(fetchGetGradesSuccess(grades)))
        .catch(err => {
            dispatch(fetchGetGradesError(err));
        });
};

// fetch for searching for a given grade
export const FETCH_FINDGIVENGRADE_SUCCESS = 'FETCH_FINDGIVENGRADE_SUCCESS';
export const fetchFindGivenGradeSuccess = searchgrade => {;
    return {
        type: FETCH_FINDGIVENGRADE_SUCCESS,
        payload: {searchgrade}
    }
};

export const FETCH_FINDGIVENGRADE_ERROR = 'FETCH_FINDGIVENGRADE_ERROR';
export const fetchFindGivenGradeError = error => ({
    type: FETCH_FINDGIVENGRADE_ERROR,
    error
});

export const fetchFindGivenGrade = (newGrade) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/grades/search`, {
        method: 'POST',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(newGrade)
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => {
            return res.json()
        })
        .then(response => {
            if (response.exists){
                console.log('sorry, the document already exists.  response is ', response.exists);

            } else {
                dispatch(fetchAddGrade(newGrade));
                //dispatch(fetchFindGivenGradeSuccess(newGrade));
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(fetchFindGivenGradeError(err));
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
    //('got to fetchGetWeeks');
    return fetch(`${API_BASE_URL}/weeks`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(weeks => {
            //console.log('weeks are ', weeks);
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
            //('deliverables are ', deliverables);
            dispatch(fetchGetDeliverablesSuccess(deliverables))
        })
        .catch(err => {
            console.log(err);
            dispatch(fetchGetDeliverablesError(err));
        });
};

// fetch for searching for a deliverables with the proper user, term, course and week
export const FETCH_FINDGIVENDELIVERABLES_SUCCESS = 'FETCH_FINDGIVENDELIVERABLES_SUCCESS';
export const fetchFindGivenDeliverablesSuccess = deliverables => {;
    return {
        type: FETCH_FINDGIVENDELIVERABLES_SUCCESS,
        payload: {deliverables}
    }
};

export const FETCH_FINDGIVENDELIVERABLES_ERROR = 'FETCH_FINDGIVENDELIVERABLES_ERROR';
export const fetchFindGivenDeliverablesError = error => ({
    type: FETCH_FINDGIVENDELIVERABLES_ERROR,
    error
});

export const fetchFindGivenDeliverables = (searchCriteria) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/deliverables/search`, {
        method: 'POST',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(searchCriteria)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => {
            return res.json();
        })
        .then(deliverables => {
            console.log('made it to the deliverables', deliverables);
            dispatch(fetchFindGivenDeliverablesSuccess(deliverables));
        })
        .catch(err => {
            console.log(err);
            dispatch(fetchFindGivenDeliverablesError(err));
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

export const fetchUpdateWeek = updatedWeek => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/weeks`, {
        method: 'PUT',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(updatedWeek)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(weekNum => dispatch(fetchUpdateWeekSuccess(weekNum)))
        .catch(err => {
            dispatch(fetchUpdateWeekError(err));
        });
};




