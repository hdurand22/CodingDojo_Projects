import React from 'react';
import {Link} from '@reach/router';
import DashboardComponent from '../components/DashboardComponent';

const Dashboard = props => {
    
    
    
    // const {user_id} = props;
    
    return (
        
        <div>
            <header>WELCOME</header>
            <Link to="/:user_id/:workout_id/details"><h3>WORKOUTS</h3></Link>
            <Link to="/:user_id/nutrition"><h3>NUTRITION</h3></Link>
            <DashboardComponent/>
        </div>
    )
}

export default Dashboard;