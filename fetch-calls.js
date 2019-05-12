import {API_BASE_URL} from '../config';
import { normalizeResponseErrors } from '../utils';



class FetchCalls {
    constructor() {

    }

    getCurrentTerm() {
        return 'Spring, 2019';
    };

    getCurrentWeek() {
        return 2;
    };

/////////////////////////////////
//
//  FETCHES FOR ADDING (POSTING)  
//
/////////////////////////////////

    fetchAddTerm(value)  {
        // const authToken = getState().auth.authToken;
        fetch(`${API_BASE_URL}/terms`, {
            method: 'POST',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${authToken}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({termDesc:value})
            })
            .then(res => normalizeResponseErrors(res))
            .then(res => {
                return res.json()
            })
            .then(term => {
                return term;
            })   
            .catch(err => {
                return {
                    error: action.error
                };  
            });
    }

    //add course
    fetchAddCourse(newCourse) {
        // const authToken = getState().auth.authToken;
        //console.log('inside fetch', newCourse);
        fetch(`${API_BASE_URL}/courses`, {
                method: 'POST',
                headers: {
                    // Provide our auth token as credentials
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(newCourse)
            })
            .then(res => normalizeResponseErrors(res))
            .then(res => {
                return res.json();
            })
            .then(newCourse =>  {
                return  newCourse;
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({error: `${err}`});
            });
    };

    // fetch for adding weeks
    fetchAddWeek(newWeek) {
            //console.log('inside fetch', newWeek);
            // const authToken = getState().auth.authToken;
            fetch(`${API_BASE_URL}/weeks`, {
                    method: 'POST',
                    headers: {
                        // Provide our auth token as credentials
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify(newWeek)
                })
                .then(res => normalizeResponseErrors(res))
                .then(res => {
                    return res.json();
                })
                .then((newWeek) => {
                    //QUESTION:  WHAT DO I RETURN?
                    return newWeek
                })
                .catch(err => {
                    console.error(err);
                    return res.status(500).json({error: `${err}`});
                });
    };

    // fetch for adding grades
    fetchAddGrade(newGrade) {
        //console.log('inside addGrade fetch action', newGrade);
        //QUESTION
        //// const authToken = getState().auth.authToken;
        //console.log("above fetch ", newGrade);
        fetch(`${API_BASE_URL}/grades`, {
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
                return res.json();
            })
            .then(grade => {
                console.log("was grade successful..  found a grade", grade);
                return grade;
            })
            .catch(err => {
                console.log('there was an error or grade not found');
                return res.status(500).json({error: `${err}`});
                });
    }

    // fetch for adding deliverables
    fetchAddDeliverable(newDeliverable) {
        //// const authToken = getState().auth.authToken;
        fetch(`${API_BASE_URL}/deliverables`, {
                method: 'POST',
                headers: {
                    // Provide our auth token as credentials
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(newDeliverable)
            })
            .then(res => normalizeResponseErrors(res))
            .then(res => {
                return res.json()
            })
            .then(({deliverable}) => {
                console.log(deliverable)
                return deliverable
            })
            .catch(err => {
                console.error(err);
                 return res.status(500).json({error: `${err}`});
            });
    };



    /////////////////////////////////
    //
    //  FETCHES FOR GETTING DATA 
    //
    /////////////////////////////////

    // fetch for getting terms
    getTerms() {

        //QUESTION
        //// const authToken = getState().auth.authToken;
        fetch(`${API_BASE_URL}/terms`, {
                method: 'GET',
                headers: {
                    // Provide our auth token as credentials
                    Authorization: `Bearer ${authToken}`
                }
            })
            .then(res => normalizeResponseErrors(res))
            .then(res => {
                return res.json()
            })
            .then(terms => {
                return terms
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({error: `${err}`});
    
            });
    };

    // fetch for getting grades
    getGrades () {
        //QUESTION
        //// const authToken = getState().auth.authToken;
        fetch(`${API_BASE_URL}/grades`, {
                method: 'GET',
                headers: {
                    // Provide our auth token as credentials
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(newWeek)
            })
            .then(res => normalizeResponseErrors(res))
            .then(res => {
                return res.json()
            })
            .then(grades => {
                return grades;
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({error: `${err}`});
            });
    };

    // fetch for searching for a given grade

    findGivenGrade(newGrade) {
        // const authToken = getState().auth.authToken;
        fetch(`${API_BASE_URL}/grades/search`, {
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
                    console.log('what am i supposed to do here?');
                    //dispatch(fetchAddGrade(newGrade));
                    //dispatch(findGivenGradeSuccess(newGrade));
                }
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({error: `${err}`});

            });
    };


    // fetch for getting all weeks

    getWeeks(){
        // const authToken = getState().auth.authToken;
        //('got to getWeeks');
        fetch(`${API_BASE_URL}/weeks`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then(res => normalizeResponseErrors(res))
            .then(res => res.json())
            .then(weeks => {
            return weeks;
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({error: `${err}`});
            });
    };


    // fetch for getting week by current week num

    getWeekByCurrentWeekNum() {
        // const authToken = getState().auth.authToken;
        fetch(`${API_BASE_URL}/weeks`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            .then(res => normalizeResponseErrors(res))
            .then(res => {
                return res.json();
            })
            .then(week => {
                return week;
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({error: `${err}`});
            });
    }


    // fetch for getting all courses
    getCourses() {
        // const authToken = getState().auth.authToken;
        fetch(`${API_BASE_URL}/courses`, {
            method: 'GET',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${authToken}`
            }
        })
            .then(res => normalizeResponseErrors(res))
            .then(res => {
                return res.json()
            })
            .then(courses => {
                return courses;
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({error: `${err}`});

            });
    }



    // fetch for getting deliverables 
    getDeliverables() {
        // const authToken = getState().auth.authToken;
        fetch(`${API_BASE_URL}/deliverables`, {
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
                return deliverables;
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({error: `${err}`});

            });
    };

    // fetch for searching for a deliverables with the proper user, term, course and week
    findGivenDeliverables(searchCriteria) {
        // const authToken = getState().auth.authToken;
        fetch(`${API_BASE_URL}/deliverables/search`, {
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
                return deliverables;
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({error: `${err}`});

            });
    }


    // fetch for getting suggestions
    getSuggestions() {
        // const authToken = getState().auth.authToken;
        fetch(`${API_BASE_URL}/suggestions`, {
                method: 'GET',
                headers: {
                    // Provide our auth token as credentials
                    Authorization: `Bearer ${authToken}`
                }
            })
            .then(res => normalizeResponseErrors(res))
            .then(res => res.json())
            .then(suggestions => {
                return suggestions;
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({error: `${err}`});

            });
    }   


    /////////////////////////////////
    //
    //  FETCHES FOR UPDATING (PUT)  
    //
    /////////////////////////////////

    // fetch for updating week data

    updateWeek(updatedWeek) {
        // const authToken = getState().auth.authToken;
            fetch(`${API_BASE_URL}/weeks`, {
                method: 'PUT',
                headers: {
                    // Provide our auth token as credentials
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(updatedWeek)
            })
            .then(res => normalizeResponseErrors(res))
            .then(res => {
                return res.json();
            })
            .then(weekNum => {
                return weekNum;
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({error: `${err}`});
            });
    }
}
