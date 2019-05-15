import React from 'react';
import NavBar from './navbar';



export default class Profile extends React.Component {
    constructor(props){
        super(props);

    }
    
    componentDidMount() {
        const { receivedTerms}  = this.props.location.state;
    }
 /*  

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
     */

    render() {
        console.log(this.props.location);
        return (
        
            <main>
                <NavBar />
                <div className="container">
                        <h2>My Profile</h2>
                        <div className="terms">
                            <p>Your Terms</p>
                            <ul className="list-horizontal term-list">
                                {this.props.location.state.terms
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
                            </ul> 
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
    
                        <div className="courses">
                            <p>Your Courses for this Term</p>
                                <ul className="list-horizontal course-list">
                                {this.props.location.state.currentcourses
                                    .map((course, index) => {
                                        return (
                                            <li key={index}>
                                                <div className="item courseName">{course.courseName}</div>
                                            </li>
                                        );
                                    })
                                }
                            </ul> 
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
    
                        <div className="weeks">
                            <p>Your Weeks for this Term</p>
                            <ul className="week-list-labels">
                                <li className="list-horizontal">
                                    <div className="item weeknum">Week Number</div>
                                    <div className="item termDesc">Term</div>
                                    <div className="item likedLeast">Liked Least</div>
                                    <div className="item likedMost">Liked Most</div>
                                    <div className="item mostDifficdivt">Most Difficult</div>
                                    <div className="item leastDifficult">Least Difficult</div>
                                </li>
                            </ul>
                            <ul className="list-vertical week-list">
                                {this.props.location.state.currentweeks
                                    .map((week, index) => {
                                        return (
                                            <li className="list-horizontal" key={index}>
                                                <div className="item weeknum">{week.weekNum}</div>
                                                <div className="item termDesc">{week.termDesc}</div>
                                                <div className="item likedLeast">{week.likedLeast}</div>
                                                <div className="item likedMost">{week.likedMost}</div>
                                                <div className="item mostDifficult">{week.mostDifficult}</div>
                                                <div className="item leastDifficult">{week.leastDifficult}</div>
                                            </li>
                                            );
                                    })
                                }
                            </ul>
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