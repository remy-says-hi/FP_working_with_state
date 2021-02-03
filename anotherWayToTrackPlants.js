const storeState = (initialState = {}) => {
  let currentState = initialState;
  return (stateChangeFunction = state => state, plantName) => {
    const newState = stateChangeFunction(currentState, plantName);
    currentState = {...newState};
    return newState;
  }
}

const addPlantToState = (defaultPlantValueObj) => {
  return (plantName) => {
    return (state) => ({
      ...state,
      [plantName] : defaultPlantValueObj
    })
  }
}

const changePlantState = (prop) => {
  return (value) => {
    return (state, plantName) => ({
      ...state,
      [plantName] : { ...state[plantName], [prop]: (state[plantName][prop] || 0) + value }
    })
  }
}

// userInput
const plantName = "Norman";

const updateStateObj = storeState();
const defaultValues = { soil: 0, water: 0, light: 0, plantType: "fern" }

const newPlant = addPlantToState(defaultValues)(plantName);
const newPlant2 = addPlantToState(defaultValues)("Alice");
const newState = updateStateObj(newPlant);
console.log("state obj", newState);
const newState2 = updateStateObj(newPlant2);
console.log("state obj", newState2);
const blueFood = changePlantState("soil")(5);
const newState3 = updateStateObj(blueFood, "Norman");
console.log("state obj", newState3);
const newState4 = updateStateObj(blueFood, "Norman");
console.log("state obj", newState4);

