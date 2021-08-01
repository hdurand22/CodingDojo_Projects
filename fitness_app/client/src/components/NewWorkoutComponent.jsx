import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewWorkoutComponent = () => {
    // Take user input from form- exercises, sets, reps, weight
    // Validate all fields (all fields required)
    // On form submission, store workout in DB

    const [form, setForm] = useState("");
    const [workout, setWorkout] = useState([]); // Array for holding exercises that are part of the workout
    const [exercise, setExercise] = useState({});


    const handleSubmit = e => {
        e.preventDefault();
    }

    const handleChange = e => {
        setExercise({
            ...exercise,
            [e.target.name]: e.target.value
        });
    };

    const addExercise = () => {
        console.log('exercise: ', exercise);
        workout.push(exercise);
        setForm([
            ...workout,
            exercise
        ]);
        console.log('form: ', form);
        setExercise({
            exercise: "",
            sets: "",
            reps: "",
            startingWeight: ""
        });
        console.log('exercise after click: ', exercise);
    }

    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <table>
                    <thead>
                        <tr>
                            <td>Exercise</td>
                            <td>Sets</td>
                            <td>Reps</td>
                            <td>Starting Weight (lbs.)</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (workout) ?
                                workout.map((exercise, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{exercise.exercise}</td>
                                            <td>{exercise.sets}</td>
                                            <td>{exercise.reps}</td>
                                            <td>{exercise.startingWeight}</td>
                                        </tr>
                                    )
                                })
                                :
                                null
                        }
                        <tr>
                            <td>
                                <label htmlFor='exercise' />
                                <input type="text" name="exercise" onChange={handleChange} value={exercise.exercise} />
                            </td>
                            <td>
                                <label htmlFor='sets' />
                                <input type="text" name="sets" onChange={handleChange} value={exercise.sets}/>
                            </td>
                            <td>
                                <label htmlFor='reps' />
                                <input type="text" name="reps" onChange={handleChange} value={exercise.reps}/>
                            </td>
                            <td>
                                <label htmlFor='startingWeight' />
                                <input type="text" name="startingWeight" onChange={handleChange} value={exercise.startingWeight}/>
                            </td>
                            <td><button onClick={addExercise}>Add Exercise</button></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Create Workout</button>
            </form>
        </div>
    )
};

export default NewWorkoutComponent;