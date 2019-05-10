import {
    FETCH_ADDTERM_SUCCESS,
    FETCH_ADDTERM_ERROR,
    FETCH_ADDWEEK_SUCCESS,
    FETCH_ADDWEEK_ERROR,
    FETCH_ADDCOURSE_SUCCESS,
    FETCH_ADDCOURSE_ERROR,
    FETCH_ADDDELIVERABLE_SUCCESS,
    FETCH_ADDDELIVERABLE_ERROR,
    FETCH_ADDGRADE_SUCCESS,
    FETCH_ADDGRADE_ERROR,
    FETCH_GETTERMS_SUCCESS,
    FETCH_GETTERMS_ERROR,
    FETCH_GETWEEKS_SUCCESS,
    FETCH_GETWEEKS_ERROR,
    FETCH_GETWEEKBYCURRENTWEEKNUM_SUCCESS,
    FETCH_GETWEEKBYCURRENTWEEKNUM_ERROR,
    FETCH_GETCOURSES_SUCCESS,
    FETCH_GETCOURSES_ERROR,
    FETCH_GETGRADES_SUCCESS,
    FETCH_GETGRADES_ERROR,
    FETCH_FINDGIVENGRADE_SUCCESS,
    FETCH_FINDGIVENGRADE_ERROR,
    FETCH_GETDELIVERABLES_SUCCESS,
    FETCH_GETDELIVERABLES_ERROR,
    FETCH_FINDGIVENDELIVERABLES_SUCCESS,
    FETCH_FINDGIVENDELIVERABLES_ERROR,
    FETCH_GETSUGGESTIONS_SUCCESS,
    FETCH_GETSUGGESTIONS_ERROR,
    FETCH_UPDATEWEEK_SUCCESS,
    FETCH_UPDATEWEEK_ERROR
} from '../actions/protected-data';

const initialState = {
    selectedTerm:'Spring, 2019',
    selectedWeek: 2,
    terms: [{
        termDesc:''
    }],
    weeks: [{
        user: '',
        term:'',
        weekNum: 0,
        likedLeast: '',
        likedMost: '',
        mostDifficult: '',
        leastDifficult: ''
    }],
    courses:[{
        user: '',
        term: '',
        courseName:''
    }],
    grades: [{
        user: '',
        weekNum: '',
        courseDesc: '',
        gradeNum: 0
    }],
    deliverables:[{
        user:'',
        term: '',
        week:'',
        course: '',
        dueDate: '',
        deliverableName: '',
        pressure: '',
        desc: '',
        prephrs: 0
    }],
    items:[],
    suggestions: [{
        category:'',
        desc: '',
        credit: ''
    }],
    loading: false,
    error: null
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case FETCH_ADDTERM_SUCCESS:
            return {
                ...state,
                terms: [...state.terms, action.term],
                error: null
            };  
        case FETCH_ADDTERM_ERROR:
            return {
                error: action.error
            };  
        case FETCH_ADDWEEK_SUCCESS:
            return {
                ...state,
                weeks: [...state.weeks, action.week],
                error: null
            };
        case FETCH_ADDWEEK_ERROR:
            return  {
                ...state,
                error: action.error
            };
        case FETCH_ADDCOURSE_SUCCESS:
            return  {
                ...state,
                courses: [...state.courses, action.course],
                error: null
            };
        case FETCH_ADDCOURSE_ERROR:
            return {
                ...state,
                error: action.error
        };
        case FETCH_ADDGRADE_SUCCESS:
            return {
                ...state,
                grades: [...state.grades, action.grade],
                error: null
            } ;
        case FETCH_ADDGRADE_ERROR:
            return  {
                ...state,
                error: action.error
            };
        case FETCH_ADDDELIVERABLE_SUCCESS:
            return {
                ...state,
                deliverables: [...state.deliverables, action.deliverable],
                error: null
            };
        case FETCH_ADDDELIVERABLE_ERROR:
            return {
                ...state,
                error: action.error
            };
        case FETCH_GETTERMS_SUCCESS:
            return {
                ...state,
                terms: action.payload.terms,
                loading: false,
                error: null
            };
        case FETCH_GETTERMS_ERROR:
           // console.log(action);
            return {
                ...state,
                loading: false,
                error: action.error,
                items: []
        };
        case FETCH_GETCOURSES_SUCCESS:
            //console.log('reducer: GETCOURSES_SUCCESS action.payload.courses is', action.payload.courses);
            return {
                ...state,
                courses: action.payload.courses,
                loading: false,
                error: null
            };
        case FETCH_GETCOURSES_ERROR:
            //(action)
            return {
                ...state,
                loading: false,
                error: action.error,
                items:[]
            };
        case FETCH_GETGRADES_SUCCESS:
        //console.log('reducer: GETGRADES_SUCCESS action.payload.grades is', action.payload.grades);
            return {
                ...state,
                grades: action.payload.grades,
                loading: false,
                error: null
            };
        case FETCH_GETGRADES_ERROR:
            //(action)
            return {
                ...state,
                loading: false,
                error: action.error,
                items:[]
            };
        case FETCH_FINDGIVENGRADE_SUCCESS:
        console.log('reducer: FETCH_FINDGIVENGRADE_SUCCESS action.payload.grades is', action.payload.grades);
            return {
                ...state,
                grades: action.payload.grades,
                loading: false,
                error: null
            };
        case FETCH_FINDGIVENGRADE_ERROR:
            //(action)
            return {
                ...state,
                loading: false,
                error: action.error,
                items:[]
            };
        case FETCH_GETWEEKS_SUCCESS:
            //log(' the is the action.payload', action.payload.weeks);
            return {
                ...state,
                weeks: action.payload.weeks,
                loading: false,
                error: null
            };
        case FETCH_GETWEEKS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
                items: []
            };
        case FETCH_GETWEEKBYCURRENTWEEKNUM_SUCCESS:
            return {
                ...state,
                weeks: action.payload.weeks,
                loading: false,
                error: null
            };
        case FETCH_GETWEEKBYCURRENTWEEKNUM_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
                items: []
            };
        case FETCH_GETDELIVERABLES_SUCCESS:
        //console.log('reducer: GETCOURSES_SUCCESS action.payload.courses is', action.payload.deliverables);

            return {
                ...state,
                deliverables: action.payload.deliverables,
                loading: false,
                error: null
            };
        case FETCH_GETDELIVERABLES_ERROR:
        //console.log('reducer: GETCOURSES_ERROR action.payload.courses is', action.error);
            return {
                ...state,
                loading: false,
                error: action.error,
                items: []
            };
        case FETCH_FINDGIVENDELIVERABLES_SUCCESS:
        console.log('reducer: FETCH_FINDGIVENDELIVERABLES_SUCCESS action.payload.courses is', action.payload.deliverables);

            return {
                ...state,
                deliverables: action.payload.deliverables,
                loading: false,
                error: null
            };
        case FETCH_FINDGIVENDELIVERABLES_ERROR:
        console.log('reducer: FETCH_FINDGIVENDELIVERABLES_ERROR action.payload.courses is', action.error);
            return {
                ...state,
                loading: false,
                error: action.error,
                items: []
            };
        case FETCH_GETSUGGESTIONS_SUCCESS:
            return {
                ...state,
                suggestions: action.payload.suggestions,
                loading: false,
                error: null
            };
        case FETCH_GETSUGGESTIONS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
                items: []
            };
        case FETCH_UPDATEWEEK_SUCCESS:
        return {
            ...state,
            suggestions: action.payload.weeks,
            loading: false,
            error: null
        };
        case FETCH_UPDATEWEEK_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
                items: []
            };
    }
    return state;
}

