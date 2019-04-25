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
    FETCH_GETDELIVERABLESTODAY_SUCCESS,
    FETCH_GETDELIVERABLESTODAY_ERROR
} from '../actions/protected-data';

const initialState = {
    termcourses:[],
    weeks: [],
    schoolterms: [],
    grades: [],
    deliverables:[],
    items:[],
    loading: false,
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
        console.log('reducer: GETDELIVERABLES_SUCCESS action.payload.deliverables is', action.payload.deliverables);
        return Object.assign({}, state, {
            deliverables: action.payload.deliverables,
            loading: false,
            error: null
        });
    } else if (action.type === FETCH_GETDELIVERABLES_ERROR) {
        console.log(action);
        return Object.assign({}, state, {
            loading: false,
            error: action.error,
            items: []
        });
    } else if (action.type === FETCH_GETDELIVERABLESTODAY_SUCCESS) {
        console.log('reducer: GETDELIVERABLESTODAY_SUCCESS action.payload.deliverables is', action.payload.deliverables);
        return Object.assign({}, state, {
            deliverables: action.payload.deliverables,
            loading: false,
            error: null
        });
    } else if (action.type === FETCH_GETDELIVERABLESTODAY_ERROR) {
        console.log(action);
        return Object.assign({}, state, {
            loading: false,
            error: action.error,
            items: []
        });
    }
    return state;
}

