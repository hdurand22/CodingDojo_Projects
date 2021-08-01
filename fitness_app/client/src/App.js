import { Router } from '@reach/router';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import NewWorkout from './views/NewWorkout';
import WorkoutDetails from './views/WorkoutDetails';
import NutritionDetails from './views/NutritionDetails';

function App() {
  return (
    <div>
      <Router>
        <Home path="/"/>
        <Dashboard path="/dashboard/:user_id"/>
        <NewWorkout path="/:user_id/new_workout"/>
        <WorkoutDetails path="/:user_id/:workout_id/details"/>
        <NutritionDetails path="/:user_id/nutrition"/>
      </Router>
    </div>
  );
}

export default App;
