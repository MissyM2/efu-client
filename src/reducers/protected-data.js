import {
    FETCH_ADDTERMCOURSE_SUCCESS,
    FETCH_ADDTERMCOURSE_ERROR,
    FETCH_ADDWEEK_SUCCESS,
    FETCH_ADDWEEK_ERROR,
    FETCH_GETWEEKS_SUCCESS,
    FETCH_GETWEEKS_ERROR,
    FETCH_ADDSCHOOLTERM_SUCCESS,
    FETCH_ADDSCHOOLTERM_ERROR,
    FETCH_ADDGRADE_SUCCESS,
    FETCH_ADDGRADE_ERROR,
    FETCH_ADDDELIVERABLE_SUCCESS,
    FETCH_ADDDELIVERABLE_ERROR,
    FETCH_GETDELIVERABLES_SUCCESS,
    FETCH_GETDELIVERABLES_ERROR,
    FETCH_ADDPLANOFACTION_SUCCESS,
    FETCH_ADDPLANOFACTION_ERROR
} from '../actions/protected-data';

const initialState = {
    termcourses:[],
    weeks: [],
    schoolterms: [],
    grades: [],
    deliverables:[],
    planofactions: [],
    error: null
};

export default function reducer(state=initialState, action) {
    if (action.type === FETCH_ADDTERMCOURSE_SUCCESS) {
        return Object.assign({}, state, {
            termcourses: [...state.termcourses, action.termcourse],
            error: null
        });
    } else if (action.type === FETCH_ADDTERMCOURSE_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if (action.type === FETCH_ADDWEEK_SUCCESS) {
        return Object.assign({}, state, {
            weeks: [...state.weeks, action.week],
            error: null
        });
    } else if (action.type === FETCH_ADDWEEK_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if (action.type === FETCH_ADDSCHOOLTERM_SUCCESS) {
        return Object.assign({}, state, {
            schoolterms: [...state.schoolterms, action.schoolterm],
            error: null
        });
    } else if (action.type === FETCH_ADDSCHOOLTERM_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if (action.type === FETCH_ADDGRADE_SUCCESS) {
        return Object.assign({}, state, {
            grades: [...state.grades, action.grade],
            error: null
        });
    } else if (action.type === FETCH_ADDGRADE_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if (action.type === FETCH_ADDDELIVERABLE_SUCCESS) {
        return Object.assign({}, state, {
            deliverables: [...state.deliverables, action.deliverable],
            error: null
        });
    } else if (action.type === FETCH_ADDDELIVERABLE_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if (action.type === FETCH_ADDPLANOFACTION_SUCCESS) {
        return Object.assign({}, state, {
            planofactions: [...state.planofactions, action.planofaction],
            error: null
        });
    } else if (action.type === FETCH_ADDPLANOFACTION_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if (action.type === FETCH_GETWEEKS_SUCCESS) {
        return Object.assign({}, state, {
            weeks: [...state.weeks, action.week],
            error: null
        });
    } else if (action.type === FETCH_GETWEEKS_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if (action.type === FETCH_GETDELIVERABLES_SUCCESS) {
        return Object.assign({}, state, {
            deliverables: [...state.deliverables, action.deliverable],
            error: null
        });
    } else if (action.type === FETCH_GETDELIVERABLES_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    }
    return state;
}

