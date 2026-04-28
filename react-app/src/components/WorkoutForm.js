import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [suggestions, setSuggestions] = useState([]);


  const handleSearch = async (searchTerm) => {
    if (searchTerm.length < 3) {
      setSuggestions([]); // Clear suggestions if input is too short
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/workouts/exercises?name=${searchTerm}`);
      const json = await response.json();

      if (response.ok) {
        setSuggestions(json);
      }
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = {title, load, reps}

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/workouts`, {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json();

    if (!response.ok){
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if(response.ok){
      setTitle('')
      setReps('')
      setLoad('')
      setError(null);
      setEmptyFields([]);
      setSuggestions([]);
      dispatch({type: 'CREATE_WORKOUT' , payload: json });

    }
  }

  return (
  <form className="create" onSubmit={handleSubmit}>
    <h3> Add a New Workout</h3>
    <label>Exercise Title:</label>
    <input
      list="exercise-options"
      type="text"
      onChange={(e) => {
        setTitle(e.target.value);
        handleSearch(e.target.value);
      }}
      value={title}
    />
    <datalist id="exercise-options">
      {suggestions.map((exercise) => (
        <option key={exercise.name} value={exercise.name} />
      ))}
    </datalist>

    <label>Load (in lbs):</label>
    <input
    type="number"
    onChange={(e) => setLoad(e.target.value)}
    value={load}
    className={emptyFields.includes('load') ? 'error' : ''}
    />

    <label>Exercise Reps</label>
    <input
    type="number"
    onChange={(e) => setReps(e.target.value)}
    value={reps}
    className={emptyFields.includes('reps') ? 'error' : ''}
    />

    <button> Add Workout</button>
    {error && <div className="error">{error}</div>}
  </form>
  )
}

export default WorkoutForm;