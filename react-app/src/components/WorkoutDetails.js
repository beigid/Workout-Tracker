import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

// date-fns
import {formatDistanceToNow} from "date-fns";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const [setError] = useState(null);

  const deleteWorkout = async () => {
    const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json();

    if (!response.ok){
      setError(json.error);
    }
    if(response.ok){
      dispatch({type: "DELETE_WORKOUT", payload: json});
    }
  }


  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps (kg): </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true} )}</p>
      <span className="material-symbols-outlined" onClick={deleteWorkout}>delete</span>
    </div>
  )
}

export default WorkoutDetails;