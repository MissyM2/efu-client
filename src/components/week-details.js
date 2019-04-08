import React from 'react';
import './css/index.css';
import MainNav from './main-nav';
import LandingLogin from './landing-login';

export default function App(props) {
  return (
      <div>
        <MainNav />
        <main role="main">
            <header role="banner">
                <h1>Executive Followup</h1>
                <h3>Take charge of your academic life.</h3>
            </header>
            <div class="wrapper">
                <Week />
                <TermClass />
                <Deliverable />
                <ActionPlan />
                <section class="header-section">
                        <div>
                            <h3>Plan and track your academic progress with small, achievable goals and collaborating with a mentor.</h3>
                        </div>
                        <div class="skills-suggestion">Today's Reminder:  <em>Using pen and paper to write things down, 
                                instead of taking notes on a laptop, helps boost memory retention.</em></div>
                </section>
                <LandingLogin />
          </div>
        </main>
      </div>
    );
  }

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Executive Followup - Starter Wireframe</title>
  <meta name="author" content="Missy Maloney">
  <meta name="description" content="Keep track of your college school work.">
  <meta name="keywords" content="Thinkful">

  <!-- responsive viewport tag, tells small screens that it is responsive -->
  <meta name="viewport" content="width=device-width, initial-scale=1"> 
  <!-- stylesheets -->
  <link rel="stylesheet" href="css/index.css">
  <link rel="stylesheet" href="css/weekDetails.css">
  
  <!--  favicon link will go here-->
  


</head>
<body>
    <nav id="top-nav" role="navigation">
            <h3 id="nav-logo">ExecFollowup</h3>
            <h3 id="view-past-weeks">View Past Weeks</h3>
            <h3 id="update-profile">Update Profile</h3>
            <h3 id="logout">Logout</h3>
    </nav>
    <main role="main">
        <header role="banner">
            <h1>Week Details</h1>
            <div class="student-details">
                            <div class="student-detail">
                                <div class="basic-header basic-detail left stud-name-label">Student Name:</div>
                                <div class="basic-detail left stud-name">John Collegestudent</div>
                            </div>
                            <div class="student-detail" >
                                    <div class="basic-header basic-detail left stud-school-label">Institution:</div>
                                    <div class="basic-detail left stud-school">My College</div>                                   
                            </div>
                            <div class="student-detail" >
                                    <div class="basic-header basic-detail left stud-term-label">Term:</div>
                                    <div class="basic-detail left stud-term">Spring Semester, 2019</div>                                   
                            </div>
                        </div>       
        </header>
        <div class="wrapper">
                <section class="week-review">
                        <h1>Week Details</h1>
                        <div class="week-details">
                                <div class="basic-header basic-detail left week-num">Week Number 3</div>
                                <div class="basic-detail left week-ending">Week Ending 04/15/2019</div>                           
                        </div> 
                        <div class="attitude-details">
                                <div class="attitude-detail left basic-detail liked">I liked English the most.</div>
                                <div class="attitude-detail left basic-detail">I liked Biology the least</div>                                 
                        </div>
                        <div class="difficulty-details">
                                <div class="difficulty-detail left basic-detail hardest">My hardest class this week was Calc.</div>
                                <div class="difficulty-detail left basic-detail">My easiest class this week was English.</div>                                 
                        </div>         
                </section>
                <section class="class-section">
                    <h2>My Classes</h2>
                        <div class="class-wrapper">
                        <div class="class-list">
                            <div class="class-body">
                                    <div class="class-item class-info">Biology 101</div>
                                    <div class="class-item class-info grade">78.5/100</div>
                            </div>
                            <div class="class-desc-body">
                                <div class="class-item class-weekly-note" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate blandit elementum.</div>
                            </div>
                            <div class="class-deliverables">
                                    <div class="class-item deliverable exam">Exam</div>
                                    <div class="class-item deliverable date-time">Tue, April 14, 2019, 7:00 pm</div>
                                    <div class="class-item deliverable prep">Prep Time: 15</div>

                            </div> 
                            <div class="edit-class-btn edit">
                                    <button class="center-btn basic-btn" type="submit">Edit</button>
                            </div>  
                        </div>
                        <div class="class-wrapper">
                            <div class="class-list">
                                    <div class="class-body">
                                            <div class="class-item class-info">Biology 101</div>
                                            <div class="class-item class-info grade">78.5/100</div>
                                    </div>
                                    <div class="class-desc-body">
                                        <div class="class-item" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate blandit elementum.</div>
                                    </div>
                                    <div class="class-deliverables">
                                            <div class="class-item deliverable exam">Lab</div>
                                            <div class="class-item deliverable date-time">Fri, April 17, 2019, 7:00 pm</div>
                                            <div class="class-item deliverable prep">Prep Time: 1.5</div>
                                    </div>
                                    <div class="edit-class-btn edit">
                                            <button class="center-btn basic-btn" type="submit">Edit</button>
                                    </div> 
                            </div>
                            <div class="class-list">
                                    <div class="class-body">
                                            <div class="class-item class-info">Calc 101</div>
                                            <div class="class-item class-info grade">81/100</div>
                                    </div>
                                    <div class="class-desc-body">
                                        <div class="class-item">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate blandit elementum.</div>
                                    </div>
                                    <div class="class-deliverables">
                                            <div class="class-item deliverable exam">Quiz</div>
                                            <div class="class-item deliverable date-time">Wed, April 15, 2019, 7:00 pm</div>
                                            <div class="class-item deliverable prep">Prep Time: 5</div>
                                    </div>
                                    <div class="edit-class-btn edit">
                                            <button class="center-btn basic-btn" type="submit">Edit</button>
                                    </div> 
                            </div>
                            <div class="class-list">
                                    <div class="class-body">
                                            <div class="class-item class-info">English</div>
                                            <div class="class-item class-info grade">50/100</div>
                                    </div>
                                    <div class="class-desc-body">
                                        <div class="class-item">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate blandit elementum.</div>
                                    </div>
                                    <div class="class-deliverables">
                                            <div class="class-item deliverable exam">Essay</div>
                                            <div class="class-item deliverable date-time">Fri, April 14, 2019, 7:00 pm</div>
                                            <div class="class-item deliverable prep">Prep Time:: 3</div>

                                    </div>
                                    <div class="edit-class-btn edit">
                                            <button class="center-btn basic-btn" type="submit">Edit</button>
                                    </div>  
                            </div>
                            <div class="class-list">
                                    <div class="class-body">
                                            <div class="class-item class-info">World History</div>
                                            <div class="class-item class-info grade">81/100</div>
                                    </div>
                                    <div class="class-desc-body">
                                        <div class="class-item">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate blandit elementum.</div>
                                    </div>
                                    <div class="class-deliverables">
                                            <div class="class-item deliverable exam">Exam</div>
                                            <div class="class-item deliverable date-time">Tue, April 14, 2019, 7:00 pm</div>
                                            <div class="class-item deliverable prep">Prep Time:: 15</div>
                                    </div>
                                    <div class="edit-class-btn edit">
                                            <button class="center-btn basic-btn" type="submit">Edit</button>
                                    </div> 
                            </div>
                            <div class="class-list">
                                    <div class="class-body">
                                            <div class="class-item class-info">World History</div>
                                            <div class="class-item class-info grade">81/100</div>
                                    </div>
                                    <div class="class-desc-body">
                                        <div class="class-item">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate blandit elementum.</div>
                                    </div>
                                    <div class="class-deliverables">
                                            <div class="class-item deliverable exam">Exam</div>
                                            <div class="class-item deliverable date-time">Tue, April 14, 2019, 7:00 pm</div>
                                            <div class="class-item deliverable prep">Prep Time: 15</div>
                                    </div> 
                                    <div class="edit-class-btn edit">
                                            <button class="center-btn basic-btn" type="submit">Edit</button>
                                    </div>  
                            </div>
                    </div>
                </section>
        </div>
    </main>
    <footer role="content-info">Footer</footer>
</body>
</html>