# ExecutiveFollowUp

Improve your grades by keeping a tighter control over what is due, how much time is required and what your grades are each week.

*  Live App:  https://nameless-inlet-97185.herokuapp.com/

     +  demo user: sarah@gmail.com / password: sarah9515


#### Table of Contents

 -  [Background](#Background)
 -  [Screenshots](#screenshots)
 -  [Functions and Features](#functions-and-features)
 -  [Future Functions and Features](#functions-and-features)
 -  [Technologies Used](#technologies-used)
       -  [Tech Stack Overview](#tech-stack-overview)
       -  [Tech Stack Details](#tech-stack-details)
       -  [Code Base Overview](#code-base-overview)
       -  [Code Base Details](#code-base-details)
       
 
 
 
 
## Background
 -  [Home](#ExecutiveFollowUp)

My son has ADD.  He has been a pretty good student but, as the schoolwork becomes less controlled by the teacher, executive functioning skills become critical.  A student with ADD has challenges is this area (as most of us do!).  After trying a number of different methods of assistance, I settled on meeting with him once a week, reviewing each class to see which ones he liked/disliked and were more or less difficult for him.  Also, I asked on a weekly basis what his current grade was in the class.  Finally, we planned the next week.  What was due?  When?  I borrowed from the Alcohol Anonymous, Weight Watchers and Catholic Mass schedule method of improvement:  Meet each week, reflect on last week and plan for the next.  Above all, keep the goal and your progress right in front of you.  If you do this, you will likely see success.

The student sets up his/her profile which includes the current TERM, the student's courses and the weeks of the term.  Each week the student records a brief reflection on their courses as well as their grades.  He/She, then proceeds to record the deliverables for the next week and includes such details as the due date, how much of his/her time will be required and how important the assignment is to the final grade.  At a glance, the student can see deliverables due for the day and the week when he/she logs in.  The student can add, update and delete terms, weeks, courses, gradesiThis app is a allows a user to log the items in their personal closet, compare it to an ideal closet as specified by Real Simple and make changes based on the analysis.  All persistent data are stored in MongoDB.






## Functions and Features
 -  [Home](#ExecutiveFollowUp)


1.  Student may add, update and delete profile items school term, personal courses and weeks of the term.
2.  At the end of a week, a student (user) may add or update details of the current week such as the difficulty of a course or if the student likes/dislikes it.
3.  Student may also add or update grades for each course at the end of the current week.
4.  Student plans the next week by adding, updating or deleting deliverables for a course as well as details about the deliverable.
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
     <td><img src="/screenshots/d_login.png" width="250px" /></td>
     <td><img src="/screenshots/d_reg.png" width="250px" /></td> 
     <td><img src="/screenshots/d_dashboard.png" width="250px" /></td> 
  </tr>
     <tr>
     <th><label>Dropdown Profile Menu</label></th>
     <th><label>Courses</label></th> 
     <th><label>Deliverables</label></th> 
  </tr>
  <tr>
     <td><img src="/screenshots/d_select_term.png" width="250px" /></td>
     <td><img src="/screenshots/m_courses.png" width="250px" /></td> 
     <td><img src="/screenshots/m_deliverables.png" width="250px" /></td> 
  </tr>
     <tr>
     <th><label>View Weeks</label></th>
     <th><label>Update Week</label></th> 
     <th><label>??</label></th> 
  </tr>
  <tr>
     <td><img src="/screenshots/d_view_weeks.png" width="250px" /></td>
     <td><img src="/screenshots/d_update_week.png" width="250px" /></td> 
     <td><img src="/screenshots/d_dashboard.png" width="250px" /></td> 
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
     <th><label>Dropdown Profile Menu</label></th>
  </tr>
  <tr>
     <td><img src="/screenshots/d_dashboard.png" width="375px" /></td>
     <td><img src="/screenshots/d_dropdown.png" width="375px" /></td>
  </tr>
  <tr>
     <th><label>Courses</label></th> 
     <th><label>Deliverables</label></th> 
  </tr>
  <tr>
     <td><img src="/screenshots/d_courses.png" width="375px" /></td> 
     <td><img src="/screenshots/d_deliverables.png" width="375px" /></td> 
  </tr>
  <tr>
     <th><label>View Weeks</label></th>
     <th><label>Update Week</label></th> 
  </tr>
  <tr>
     <td><img src="/screenshots/d_view_weeks.png" width="375px" /></td>
     <td><img src="/screenshots/d_update_week.png" width="375px" /></td>  
  </tr>
  
</table>
     







## Technologies Used
 -  [Home](#ExecutiveFollowUp)
 




  ###  Tech Stack Overview
  -  [Home](#ExecutiveFollowUp)
  
The backend for this app uses NodeJS with express. Authentication is handled using JWTs with passport. BcryptJS is used to hash passwords. The database is a mongo database. It's hosted on mLab. The client uses HTML, CSS, Javascript and JQuery. The server and client are both hosted on Heroku.


  
 ###  Tech Stack: Details
 -  [Home](#ExecutiveFollowUp)
 
 
 
#####  Front-End Technologies
-  [Home](#ExecutiveFollowUp)



   1.  HTML: a standard markup language for the creation of web pages
   2.  CSS: used to describe the presentation of HTML pages
   3.  JavaScript: an interpreted language that can create and dynamically change web pages
   
       +  jQuery: a JS library developed simplify HTML DOM tree traversal and manipulation, event handling, CSS animation, and Ajax
  
  
  
#####  Server Technologies
-  [Home](#ExecutiveFollowUp)



   1.  Node.js:  enables use of Javascript on the server side
   
      *  bcryptjs: 2.4.3:  a password hashing function
      
      *  dotenv: 6.2.0: loads environment variable form an .env file
      
      *  jsonwebtoken: 8.4.0:  securely transmis information between server and front-end in json format
      
      *  morgan: 1.9.1:  a request logger middleware
      
      *  passport: 0.4.0:  an authentication middleware
      
          +  passport-http: 0.3.0:  allows the authentication of HTTP requests
          +  passport-jwt: 4.0.0:  allows authentication of endpoints using a JSON web token.  Intended to be used to secure RESTful endpoints without sessions.
          +  passport-local: 1.0.0:  allows authentication using a username and password
   2.  Express:  the webserver - a framework that allows development of node-based web apps
   3.  MongoDB:  the database
   
   
       +  mongoose: 5.4.1:  manages the relationships between data, provides schema validation and translation between objects in code and representation of those objects in MongoDB.
       
   
   
   
   
#####  Testing Technologies
-  [Home](#ExecutiveFollowUp)


   1. mocha: 5.2.0:  javascript testing framework that runs on Node.js and in the browser.
   2. chai: 4.2.0:  an assertion library for node.js and can be used with a variety of javascript testing frameworks
   3. chai-http: 4.2.1: provides an interface for live integration testing.
   4. faker: 4.1.0: generates fake data in a variety of formats for use with testing
  
   
   
   
#####  Development/Deployment

-  [Home](#ExecutiveFollowUp)

   1.  Git & GitHub:  a development platform that allows storage and revision management
   2.  Heroku:  a cloud platform for deploying apps  
   3.  Travis CI: a host for continuous testing
   







###  Code Base Overview
  -  [Home](#ExecutiveFollowUp)
  
  
  
ExecutiveFollowUp app is a single page application (SPA) which includes as its primary static html file, index.html.  The file is dynamically changed throughout the user session by a number of .js files located under the /public folder as describe below.  The index.page.js is responsible for initiating the app and calls to other .js files as described below.   The primary CRUD operations occur on four different 'closets' as well as 'users' through a series of routers and data models under the /app folder.  Authentication and of users takes place through the use of JSON Web Tokens (JWT), obtained on login as well as a requirement to refresh.  Security of the password is maintained through the use of a hashing algorithm and encryption with bcrypt.





###  Code Base Details
 -  [Home](#ExecutiveFollowUp)




#####  Front End 
-  [Home](#ExecutiveFollowUp)



1.  All front-end files are located in the /public folder.
2.  The front end is controlled by the index.page.js.  The function that initiates the application is located here as well as all the event listeners for the app.  
3.  All other functions are located under the /public/utilities folder and are divided among the following files:

    a.  cache.module.js:  all functions dealing with authentication of the user reside here.
    
    b.  http.module.js:  all functions related to accessing the database are located here.
    
    c.  render.module.js:  all functions related to bringing the UI to screen are located here.
    
    d.  etc.module.js:  Several functions are located here that are integral to the program but do not fall under the other major categories are located here.
    
    e.  store.module.js:  A STORE object is located here that maintains a variety of information that is passed to different functions resides here.
    
    f.  The primary .html file is index.html
    
4.  There are 3 CSS files, all located in the /public/css folder.
  
  
  
  
#####  Back End
-  [Home](#ExecutiveFollowUp)


 
 1.  All front-end files are located in the /app folder
 2.  The model and router files for each closet item and user are located in their own folder /app/donationitem, /app/giveawayitem, /app/myitem, /app/idealitem and /app/user.
 3.  The model and strategies file for local authentication and obtaining a JWT are located in the /app/auth folder.
 4.  The model and router files 
    




