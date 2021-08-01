import React from 'react';
import { navigate } from '@reach/router';
import NutritionDetail from '../components/NutritionDetail';

const NutritionDetails = props => {
    const {user_id} = props;
    
    return (
        
        <div>
            <NutritionDetail/>
        </div>
    )
}

export default NutritionDetails;