////////////////////////////////////////////////////////////////////////
////////// The following are extended examples of how to change ////////
////////// the changeState function to update multiple properties. /////
////////// Everything is based off of the content in powerPlant.js /////
////////////////////////////////////////////////////////////////////////

//// RUN THIS FILE USING NODE ////

const storeState = (initialState) => {
  let currentState = initialState;
  return (stateChangeFunction) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}

// We use the storeState function to create a funciton called fern that 
// has access to the currentState object due to lexical scope,
// and that has the functionality to update that currentSate object
// We will use fern in all subsequent examples
const initialValues = {soil: 0, water: 0, light: 0};
const fern = storeState(initialValues);
console.log("INITIAL FERN VALUES", initialValues);


// This is the original function factory from the curriculum. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees using this function.
const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
  }
}

const feedSoil = changeState("soil");
const blueFood = feedSoil(5);
const greenFood = feedSoil(10);
const yuckyFood = feedSoil(-5);
const forgotToFeed = feedSoil(-10);

const fernFedObj = fern(blueFood);
console.log("feed blueFood: add 5 to soil", fernFedObj);

// This is a function to change values for properties that are STRINGS. It can also add properties that are strings
const changeStringState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : value
    }) 
  }
}

const addName = changeStringState("name");
const myPlantName = addName("Barney");
const myPlantObj = fern(myPlantName);
console.log("add a name to plant object", myPlantObj);

// This is a function to change two properties with two different values
const changeTwoStateProps = (prop) => {
  return (prop2) => {
    return (value) => {
      return (value2) => {
        return (state) => ({
          ...state,
          [prop] : (state[prop] || 0) + value,
          [prop2] : (state[prop2] || 0) + value2
        }) 
      }
    }
  }
}

const updateLightAndWater = changeTwoStateProps("light")("water");
const waterPlantsOnSunnyDay = updateLightAndWater(10)(15);
const fernIsHappyObj = fern(waterPlantsOnSunnyDay);
console.log("it's sunny out: add 10 to light and 15 to water", fernIsHappyObj);


// This is a function to change three properties with three different values.
// NOTE: This function is not completely curried (taking a functinon with multiple arguments and turning it into a series of nested unary functions). In functional programming the goal is to write modular, flexible and pure functions. Here, while there is some flexibility, it is not the most modular. 
// It would be best to curry this function completely before using it.
const changeThreeStateProps = (prop1, prop2, prop3) => {
  return (value, value2, value3) => {
    return (state) =>  ({
      ...state,
      [prop1] : (state[prop1] || 0) + value,
      [prop2] : (state[prop2] || 0) + value2,
      [prop3] : (state[prop3] || 0) + value3
    })
  }
}

const updateAllProps = changeThreeStateProps("soil", "water", "light");
const theStormIsHere = updateAllProps(-7, -3, -15);
const fernWasHurtByTheStorm = fern(theStormIsHere);
console.log("The storm hit: soil - 7, water -3, light -15", fernWasHurtByTheStorm);


// This is a new way of thinking about updating state. Here this function takes in an object representing the changes that you want to make to state. It returns an inner function that takes in the currentState object and itself returns the update state object. This funciton uses the spread operator and replaces existing state values with new state values. It does not perform the operation of state value + new incoming value. Be careful!
const changeAnyStatePropOrProps = (newStateObj) => {
  return (currentState) => { return ({
    ...currentState,
    ...newStateObj
  }) }
}

const newState = {soil: 3};
const tendToPlant = changeAnyStatePropOrProps(newState);
const fernTendedTo = fern(tendToPlant);
console.log("tended to plant: set soil to 3", fernTendedTo);

const updatedState = {soil: 1, water: 1, light: 1};
const forgetAboutPlant = changeAnyStatePropOrProps(updatedState);
const fernForgotten = fern(forgetAboutPlant);
console.log("forgot about fern: fern values all set to 1", fernForgotten);