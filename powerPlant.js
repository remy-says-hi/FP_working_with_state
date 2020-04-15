// This function stores our state in an object called currentState. 
// This function also updates the state of our object. It updates state in the inner funciton by calling the stateChangeFunction that we pass into storeState's inner function. The stateChangeFunction refers to the many funcitons we create using the changeState function below to update specific properties in our state object. 
// NOTE: we are passing in a parameter to storeState that sets the initial state, or initial values of the function.
const storeState = (initialState) => {
  let currentState = initialState;
  return (stateChangeFunction) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}

// This is a function factory. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.
const changeState = (prop) => {
  return (value) => {
    return (state) => { ({
      ...state,
      [prop] : (state[prop] || 0) + value
    }) 
  }
}

///////////////////////////////////////////
// Creating plants ///////////////////////
/////////////////////////////////////////

// This allows us to create new plants
const initialValues = {soil: 0, water: 0, light: 0};
const fern = storeState(initialValues);
const sunFlower = storeState(initialValues);

// We create two functions using our function factory. We could easily create many more.
const feed = changeState("soil");
const blueFood = feed(5);
const newFernState = fern(blueFood);
// newFernState = {soil: 5, light: 0, water: 0}


/////////////////////////////////////////
// Storing and tracking  Game State ////
///////////////////////////////////////

// function that stores our game state
const initialGameValues = { numberOfPlantsAlive: 0, numberOfPlantsDead: 0, playerName: "" };
const gameMaster = storeState(initialGameValues);

//using changeState as our function factory for the game data
const updatePlayerName = changeState("playerName");
const addNewPlayerToName = newPlayer("Sandy");
const updatedGameObj = gameMaster(addNewPlayerToName);
// updatedGameObj = { numberOfPlantsAlive: 0, numberOfPlantsDead: 0, playerName: "Sandy" };

const addNewPlant = changeState("numberOfPlantsAlive")(1);
const updatedGameObj = gameMaster(addNewPlant);
// updatedGameObj = { numberOfPlantsAlive: 1, numberOfPlantsDead: 0, playerName: "Sandy" };


/////////////////////////////////////////
// Storing and tracking Weather State //
///////////////////////////////////////

// function that stores our plant environment state
const initialWeatherValues = {wind: 2, sunCover: 8, rain: 0, storm: false, overcast: false, cloudCover: 2};
const weatherChanger = storeState(initialWeatherValues);

// using changeState as our function factory for the plant environemnt data
const hereComesTheStorm = changeState("storm")(true);
const theStormIsHere = weatherChanger(hereComesTheStorm);
// theStormIsHere = {wind: 2, sunCover: 8, rain: 0, storm: true, overcast: false, cloudCover: 2};

/////////////////////////////////////////
// Weather events affecting plants /////
///////////////////////////////////////

// If we want the storm to affect a plant's state, we need to create a changeState method that does that
const theStormHurtsMe = feed(-10);
const fernAffectedByTheStorm = fern(theStormHurtsMe);
// fernAffectedByTheStorm = {soil: -5, light: 0, water: 0}