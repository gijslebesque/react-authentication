# Hooks

With React hooks we no longer need class components. The benefits of is that it makes components easier to reuse, prop destructuring looks more elegant (imo), and there is no use of the mildly confusing this keyword.

This repo is using two of the most common hooks.

## 1. useState

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

## 2. useEffect

Instead of ComponentDidMount, ComponentDidUpdate and ComponentWillUnmount we can use the useEffect hook.

When we need, for example, some user data after a component has mounted.

Before, to get user data in we would do it like so:

```
  componentDidMount = async () => {
    let user;
    try {
      //Making the actual API call.
      user = await this.authService.isLoggedIn();
    } catch (err) {
      user = null;
    } finally {
      //Irregardless of the result we want to set state.
      this.setUserState(user);
    }
  };
```

With useEffect we need to make some small adjustments. React doesn't want the callback to be asychronous, because it should return a 'clean up function' if necessary. An async functions, instead will return a promise.

So we can refactor componendDidMount to:

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

Notice that the function declared inside useEffect, is async, not the callback of useEffect.
And that we still need to call getUser.

Also note the second paramater (line 95) of useEffect is an empty array. Since we're updating the state, useEffect will be called again. With adding the empty array (dependcy array) we avoid ending up in an infinite loop.
