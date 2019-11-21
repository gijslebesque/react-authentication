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
      throw new Error();
  }
}
