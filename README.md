# Hooks

With React hooks we no longer need class components. The benefits of is that it makes components easier to reuse, prop destructuring looks more elegant (imo), and there is no use of the mildly confusing this keyword.

This repo is using two of the most common hooks.

1. useState
   The useState hook is replacing the state of a class component.

Take this simple component which will only add one to the counter state on a button click.

```
class App extends Component {
  constructor(){
    super()
    this.state = {
      counter: 0
    }
  }

  clickHandler = () => this.setState({counter: this.state.counter + 1})

  render() {
    return(
      <div>
        <h1>There were: {this.state.counter} clicks</h1>
        <button onClick={this.clickHandler}>Add to counter</button>
      </div>
    )
  }

}
```

With initialising the setState hook we declare a variable and a function with which we can manipulate the state variable. So the above code would become:

```
const App = ( ) => {
  // Here we initalisase our state. Initial value of counter is 0.
  const [ counter, setCounter] = useState(0);

  const clickHandler = () => setCounter( counter + 1 );

  return(
      <div>
        <h1>There were: {counter} clicks</h1>
        <button onClick={clickHandler}>Add to counter</button>
      </div>
    )
}
```

2. useEffect

Instead of ComponentDidMount, ComponentDidUpdate and ComponentWillUnmount we can use the useEffect hook.

When we need, for example, some user data after a component has mounted.

```
  useEffect(() => {
    const getUser = async () => {
      let user;
      try {
        //Making the actual API call.
        user = await authService.isLoggedIn();
      } catch (err) {
        user = null;
      } finally {
        //Irregardless of the result we want to set state.
        setUserState(user);
      }
    };
    getUser();
  }, []);
};
```
