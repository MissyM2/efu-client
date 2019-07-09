import React from 'react';

import NavBar from "./navbar";
import RightSideDrawer from './right-side-drawer';
import Backdrop from './backdrop';

import './css/weeks.css';


export default class Weeks extends React.Component {
        constructor(props) {
                super(props);
                this.state = {
                        myweeks: [],
                        mygrades: [],
                        termSelected:'',
                }
        }

        componentDidMount() {
                this.props.setPageFlags("Weeks");
        }
           
        render() {
                let backdrop;
                if(this.props.rightSideDrawerOpen) {
                        backdrop = <Backdrop click={this.props.backdropclickhandler} />
                }
               
                const weeks = this.props.thistermweeks.map((week, index) => {
                        return (
                                <div className="unit-container-blue hundredpercent-width tenpx-bottom-margin" key={index + 100}>
                                        <h3>Week Number {week.weekNum}</h3>
                                        <h4>Attitudes</h4>
                                        
                                        <ul key={index} className="weeks-row">
                                                <li className="week-row">
                                                        <div className="week-item">
                                                                <div className="small-titles dark-label week-label likedLeast">liked Least</div>
                                                                {(week.likedLeast === '' || week.likedLeast === 'no selection') ? (
                                                                        <div className="small-titles light-label item-body red-background">Not updated.</div>
                                                                ) : (
                                                                        <div className="small-titles light-label item-body">{week.likedLeast}</div>
                                                                )}
                                                        </div>
                                                        <div className="week-item">
                                                                <div className="small-titles dark-label week-label likedMost">Liked Most</div>
                                                                {(week.likedMost === '' || week.likedMost === 'no selection') ? (
                                                                        <div className="small-titles light-label item-body red-background">Not updated.</div>
                                                                ) : (
                                                                        <div className="small-titles light-label item-body">{week.likedMost}</div>
                                                                )}
                                                        </div>
                                                </li>
                                                <li className="week-row">
                                                        <div className="week-item">
                                                                <div className="small-titles dark-label week-label mostDifficult">Most Difficult</div>
                                                                {(week.mostDifficult === '' || week.mostDifficult === 'no selection') ? (
                                                                        <div className="small-titles light-label item-body red-background">Not updated.</div>
                                                                ) : (
                                                                        <div className="small-titles light-label item-body">{week.mostDifficult}</div>
                                                                )}
                                                        </div>
                                                        <div className="week-item">
                                                                <div className="small-titles dark-label week-label leastDifficult">Least Difficult</div>
                                                                {(week.leastDifficult === '' || week.leastDifficult === 'no selection') ? (
                                                                        <div className="small-titles light-label item-body red-background">Not updated.</div>
                                                                ) : (
                                                                        <div className="small-titles light-label item-body">{week.leastDifficult}</div>
                                                                )}
                                                        </div>
                                                </li>
                                        </ul>
                                        <h4>Courses and Grades</h4>
                                        <div className="weeks-row">

                                                {this.props.thistermgrades.filter(grade => grade.week === week.weekNum )
                                                .map((grade, index) => {
                                                                return (
                                                                        <div key={index + 1} className="grade-container-green fivepx-margin">
                                                                                <div className="small-titles dark-label week-label course-title">{grade.course}</div>
                                                                                <div className="small-titles light-label item-body course-grade">{grade.gradeNum}</div>
                                                                        </div>
                                                                );
                                                })
                                        }
                                        </div>
                                        
                                </div>
                        );

                });
                return (
                          <div className="content-container">
                                <NavBar {...this.props}/>
                                <div className="">
                                        <RightSideDrawer
                                                {...this.props}
                                                user={this.props.currentusername}
                                                rightdrawertoggleclickhandler={this.props.rightdrawertoggleclickhandler}
                                                rightSideDrawerOpen={this.props.rightSideDrawerOpen}
                                                submitlogout={this.props.submitlogout}
                                        />
                                </div>
                                {backdrop}
                                <div>
                                        {(this.props.thistermweeks.length === 0) ? (
                                                <div className="modal">
                                                        <header className="modal__header"> No Profile</header>
                                                        <section className="modal__content">
                                                                <h2>{this.props.currentterm}</h2>
                                                                <div className="message">
                                                                <div className="message-subtext">Your <em className="key-emphasis">Profile</em>, has not been set up.</div>
                                                                <div className="message-subtext"><i className="fas fa-asterisk"></i>  Choose another term</div>
                                                                <div className="message-subtext"><i className="fas fa-asterisk"></i>  Select <em className="key-emphasis">Profile</em>, then add your first class.</div>
                                                                </div>
                                                        
                                                        </section>
                                                </div>
                                        ) : (
                                        <div className="content-sub-container">
                                                <header className="page-header">
                                                        <h2>Your Weeks</h2>
                                                        <h3>Term:  {this.props.currentterm}</h3>
                                                </header>
                                                
                                                <div className="section-container">
                                                        <div className="list-vertical this-week-weeks">
                                                                {weeks}
                                                        </div> 
                                                </div>
                                        </div>
                                        
                                        )    
                                        }
                                
                                </div>

                          </div>
                                
                                        
                );
        }
}
