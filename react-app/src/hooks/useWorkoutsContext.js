import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);

  if(!context) {
    throw Error("useWorkouts must be used within WorkoutsContextProvider");
  }

  return context;
}
