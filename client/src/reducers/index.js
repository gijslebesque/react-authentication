// Reducers are the functions that actually change the state.
// A reducer takes in a previous state, and changed only what is necessary.
// The action is always an object which takes in:
// 1. A type, or what of the state should change.
// 2. A payload, the actual incoming data that should be manipulated.

// Note that you should always make a copy/clone of your state.
// Here the spread operator is making the copy.

// Reducer are called reducers because they will always return one value.
// Out of convention it's called state and often is an object.
// However it could be a number, array, or whatever you like.

export function authFormReducer(state, action) {
  switch (action.type) {
    case "username":
      return { ...state, username: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "error":
      console.log(action.payload);
      return { ...state, err: action.payload };
    default:
      // Normally in the default you just return state,
      // However, throwing an error makes it easier to debug.
      throw new Error();
  }
}
