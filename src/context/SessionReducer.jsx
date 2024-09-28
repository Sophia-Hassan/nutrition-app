//here I created sessionreducer, takes the current state, and the action as props, the state will change based on the action

const SessionReducer = (state, action) => {
    switch (action.type) { //here I created a switch statement to change the state based on action types
      case "SIGNEDIN": { //the case where the action type is SIGNEDIN
        return {
         sessionUser: action.payload, //session user is set to action payload i.e the data contained in payload
        };
      }
      case "SIGNEDOUT": {
        return {
          sessionUser: null,
        };
      }
      default:
        return state;
    }
  };
  
  export default SessionReducer;