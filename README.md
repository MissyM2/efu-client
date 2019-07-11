# ExecutiveFollowUp

Improve your grades by keeping a tighter control over what is due, how much time is required and what your grades are each week.

*  Live App:  https://nameless-inlet-97185.herokuapp.com/
*  Github - Client:  https://github.com/MissyM2/efu-client
*  Github - API:  https://github.com/MissyM2/efu-app

     +  demo user: sarah@gmail.com / password: sarah9515


#### Table of Contents

 -  [Background](#Background)
 -  [Description](#Description)
 -  [Functions and Features](#functions-and-features)
 -  [Screenshots](#screenshots)
 -  [Future Functions and Features](#functions-and-features)
 -  [Technologies Used](#technologies-used)
       -  [Front-End Technologies](#front-end-technologies)
       -  [Server Technologies](#server-technologies)
       -  [Development-Deployment](#development-deployment)
 
 
 
 
## Background
 -  [Home](#ExecutiveFollowUp)

My son has ADD.  He has been a pretty good student but, as the schoolwork has become less structured and less controlled by the teacher, he has had difficulty keeping track of all his responsibilities.  By the end of middle school, good executive functioning skills become critical.  A student with ADD has challenges is this area (as most of us do!). 

After trying a number of different methods to help him, I settled on meeting with him once a week myself to give him some of the "scaffolding" that was not there in high school.  I borrowed from the Alcohol Anonymous, Weight Watchers and Catholic Mass schedule method of improvement:  Meet each week, reflect on last week and plan for the next.  Above all, keep the goal and your progress right in front of you.  If you do this, you will likely see success.

executiveFollowUp is my attempt to create an automated tool that will yield more success by tracking data from the past week and keeping "what's due" always in front of the student.

## Description
 -  [Home](#ExecutiveFollowUp)

This app is a tool to be used by students in upper middle school through college to monitor academic performance.  It will be most helpful if a student is working with a mentor once a week to gather data on each of the student's courses and coursework. 

The student will start by setting up his/her profile which includes the current TERM, the student's courses and the weeks of the term.  He/she, then proceeds to record the deliverables for each course and includes such details as the due date, how much of his/her time will be required and how important the assignment is to the final grade.

Each week the student records a brief reflection on their courses as well as their grades. 

At a glance, the student can see deliverables due for the day and the week when he/she logs in on either phone or desktop. The student will be more mindful of their grades since they are recording them weekly and know which way they are trending.  The student can make decisions accordingly.

Specifically, the student can add, update and delete terms, weeks, courses, grades






## Functions and Features
 -  [Home](#ExecutiveFollowUp)


1.  Student may add, update and delete profile items courses and deliverables.
2.  At the end of a week, a student (user) may add or update details of the current week such as the difficulty of a course or if the student likes/dislikes it.
3.  Student may also add or update grades for each course at the end of the current week.
5.  Student can view deliverables due TODAY a well as for a given week.  This includes number of hours of preparation required that day or week.




## Future Functions and Features
 -  [Home](#ExecutiveFollowUp)

1.  Ability for the student to create a plan of action to complete the deliverables for the next week.  This would be created using some of the data in the db as reference, including number of prep hours required and the impact of the assignment on the final grade.
2.  Print Plan of Action and Deliverables for day and week.





## Screenshots
 -  [Home](#ExecutiveFollowUp)


 Mobile Screenshots  

<table style="width:100%">
  <tr>
     <th><label>Login Page</label></th>
     <th><label>Registration Page</label></th> 
     <th><label>Dashboard</label></th> 
  </tr>
  <tr>
     <td><img src="/screenshots/m_login.png" width="250px" /></td>
     <td><img src="/screenshots/m_reg.png" width="250px" /></td> 
     <td><img src="/screenshots/m_dashboard.png" width="250px" /></td> 
  </tr>
     <tr>
     <th><label>Dropdown Profile Menu</label></th>
     <th><label>Courses</label></th> 
     <th><label>Deliverables</label></th> 
  </tr>
  <tr>
     <td><img src="/screenshots/m_profile_menu.png" width="250px" /></td>
     <td><img src="/screenshots/m_courses.png" width="250px" /></td> 
     <td><img src="/screenshots/m_deliverables.png" width="250px" /></td> 
  </tr>
  <tr>
     <th><label>Add Deliverable</label></th> 
     <th><label>View Weeks</label></th>
     <th><label>Update Week</label></th> 
  </tr>
  <tr>
     <td><img src="/screenshots/m_add_del.png" width="250px" /></td>
     <td><img src="/screenshots/m_view_weeks.png" width="250px" /></td>
     <td><img src="/screenshots/m_update_week.png" width="250px" /></td>  
  </tr>
  
</table>


Desktop Screenshots

<table style="width:100%">
  <tr>
     <th><label>Login Page</label></th>
     <th><label>Registration Page</label></th>
  </tr>
  <tr>
     <td><img src="/screenshots/d_login.png" width="250px" /></td>
     <td><img src="/screenshots/d_reg.png" width="375px" /></td>
  </tr>
  <tr>
     <th><label>Dashboard</label></th> 
     <th><label>Courses</label></th>
  </tr>
  <tr>
     <td><img src="/screenshots/d_dashboard.png" width="375px" /></td>
     <td><img src="/screenshots/d_courses.png" width="375px" /></td>
     <td><img src="/screenshots/d_select_term.png" width="375px" /></td> 
  </tr>
  <tr>
     <th><label>Deliverables</label></th> 
     <th><label>Add Deliverable</label></th> 
  </tr>
  <tr>
     <td><img src="/screenshots/d_deliverables.png" width="375px" /></td> 
     <td><img src="/screenshots/d_courses.png" width="375px" /></td>
  </tr>
  <tr>
     <th><label>View Weeks</label></th>
     <th><label>Update Week</label></th> 
  </tr>
  <tr>
     <td><img src="/screenshots/d_view_weeks.png" width="375px" /></td>
     <td><img src="/screenshots/d_update_current_week.png" width="375px" /></td>  
  </tr>
  
</table>
     







## Technologies Used
 -  [Home](#ExecutiveFollowUp)
 

 
 
#####  Front-End Technologies
-  [Home](#ExecutiveFollowUp)



   1.  HTML: a standard markup language for the creation of web pages
   2.  CSS: used to describe the presentation of HTML pages
   3.  JavaScript: an interpreted language that can create and dynamically change web pages
   4.  React: a JavaScript library for building user interfaces (included is the use of React Router)
  
  
#####  Server Technologies
-  [Home](#ExecutiveFollowUp)



   1.  Node.js:  enables use of Javascript on the server side
   2.  Express:  the webserver - a framework that allows development of node-based web apps
   3.  MongoDB:  the database
   
   
   
   
#####  Development-Deployment

-  [Home](#ExecutiveFollowUp)

   1.  Git & GitHub:  a development platform that allows storage and revision management
   2.  Heroku:  a cloud platform for deploying apps  
   





