import React from 'react';
import { navigate, Link } from '@reach/router';
import NewWorkoutComponent from '../components/NewWorkoutComponent';

const NewWorkout = props => {
    const {user_id} = props;
    
    return (
        
        <div>
            <Link to={`/dashboard/${user_id}`}>Home</Link>
            <NewWorkoutComponent/>
        </div>
    )
}

export default NewWorkout;