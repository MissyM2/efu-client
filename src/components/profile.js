import React from 'react';
import NavBar from './navbar';



export default class Profile extends React.Component {
    constructor(props){
        super(props);

    }
    
    componentDidMount() {
        const { receivedData}  = this.props.location.state;
    }
   

   submitAddTermForm(e) {
       e.preventDefault();
        let termDesc = e.currentTarget.newterm;
        this.props.submitAddTerm()
    }

    submitAddCourseForm(e) {
        e.preventDefault();
         let courseName = e.currentTarget.newcourse;
         this.props.submitAddCourse();
     }

    submitAddWeekForm(e) {
        e.preventDefault();
         let weekNum = e.currentTarget.newweek;
         this.props.submitAddCourse();
     }

    render() {
        console.log('terms ', this.props.location.state.terms);
        console.log('terms ', this.props.location.state.currentcourses);
        console.log('terms ', this.props.location.state.currentweeks);
        return (
        
            <main>
                <NavBar />
                <div className="container">
                        <h2>My Profile</h2>
                        <div className="terms">
                            <p>Your Terms</p>
                            {/*<ul className="term-list">
                                {this.receivedterms
                                    .map((term, index) => {
                                        return (
                                            <li key={index}>
                                                <div 
                                                    className={this.props.currentterm === term.termDesc ? 'item termDesc highlight': 'item termDesc'}
                                                    // need to set the current term to the term.desc of the item clicked
                                                    //onClick={setcurrentterm = term.termDesc}
                                                    >
                                                    {term.termDesc}
                                                </div>
                                            </li>
                                        );
                                    })
                                }
                            </ul> */}
                            <hr />
                            <form onSubmit={this.submitAddTermForm}>
                                <div>
                                    <input 
                                        placeholder="term"
                                        type="text"
                                        name="newterm"
                                        className="validate"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="button is-primary"
                                >
                                    Add Term
                                </button>
                            </form>
                        </div>
    
                        <div class="courses">
                            <p>Your Courses for this Term</p>
                           {/*} <ul className="course-list">
                                {this.props.currentcourses
                                    .filter((course) => {
                                        return course.term === this.props.currentterm;
                                    })
                                    .map((course, index) => {
                                        return (
                                            <li key={index}>
                                                <div className="item courseName">{course.courseName}</div>
                                            </li>
                                        );
                                    })
                                }
                            </ul> */}
                            <hr />
                            <form onSubmit={this.addCourse}>
                                <div>
                                    <input 
                                        type="text"
                                        name="newcourse"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="button is-primary"
                                >
                                    Add Course
                                </button>
                            </form>
                        </div>
    
                        <div class="weeks">
                            <p>Your Weeks for this Term</p>
                            <ul className="week-list-labels">
                                <li>
                                    <div className="item weeknum">Week Number</div>
                                    <div className="item termDesc">Term</div>
                                    <div className="item likedLeast">Liked Least</div>
                                    <div className="item likedMost">Liked Most</div>
                                    <div className="item mostDifficdivt">Most Difficult</div>
                                    <div className="item leastDifficult">Least Difficult</div>
                                </li>
                            </ul>
                         {/*}   <ul className="week-list">
                                {this.props.currentweeks
                                    .filter((week) => {
                                        return week.term === this.props.currentterm;
                                    })
                                    .map((week, index) => {
                                        return (
                                            <li key={index}>
                                                <div className="week-data-item weeknum">{week.weekNum}</div>
                                                <div className="week-data-item termDesc">{week.termDesc}</div>
                                                <div className="week-data-item likedLeast">{week.likedLeast}</div>
                                                <div className="week-data-item likedMost">{week.likedMost}</div>
                                                <div className="week-data-item mostDifficult">{week.mostDifficult}</div>
                                                <div className="week-data-item leastDifficult">{week.leastDifficult}</div>
                                            </li>
                                            );
                                    })
                                }
                            </ul> */}
                            <hr />
                            <form onSubmit={this.addWeek}>
                                <div>
                                    <input 
                                        type="text"
                                        name="newweek"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="button is-primary"
                                >
                                    Add Week
                                </button>
                            </form>
                        </div>
                </div>
            </main>
        );

    }
  
    

    
}