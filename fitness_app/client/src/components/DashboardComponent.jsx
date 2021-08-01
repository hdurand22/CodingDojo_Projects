import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { navigate } from '@reach/router';

const DashboardComponent = props => {
    
    const cookies = new Cookies();
    const user_id = cookies.get('userID');
    // console.log(cookies.get('userID'));



    const date = new Date(); // Initialize date object
    const today = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`; // Get current date and format it

    // Get user by id with useEffect
    
    return (
        <div>
            <div>
                <h3>Today's Workout Summary ({today}): </h3>
                <ol>
                    <li>Exercise</li>
                    <li>Exercise</li>
                    <li>Exercise</li>
                </ol>
            </div>
            <div>
                <h3>Today's nutrition goals:</h3>
            </div>
            <div>
                <button onClick={() => navigate(`/${user_id}/new_workout`)}>CREATE WORKOUT</button>
            </div>
        </div>
    )
};

export default DashboardComponent;