import React from 'react';
import { navigate } from '@reach/router';
import WorkoutDetail from '../components/WorkoutDetail';

const WorkoutDetails = props => {
    const {user_id} = props;
    
    return (
        
        <div>
            <WorkoutDetail/>
        </div>
    )
}

export default WorkoutDetails;