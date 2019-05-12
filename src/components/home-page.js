import React from "react";
import NavBar from "./navbar";

const HomePage = props => {
    return (
        <main>
            <NavBar className="navigation" {...props} />
            <div className="container">
                <h2>Executive Followup HomePage</h2>
                <p className="homepage">
                Welcome to Executive Followup, a site for students to keep control of their 
                course deliverables and grades
                </p>
            </div>
        </main>
    );
};

export default HomePage;