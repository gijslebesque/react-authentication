import React from "react";

let userObj = {
  name: "Gijs"
};

userObj = null;

export default function App() {
  return (
    <div className="container">
      <h1>Higher order components</h1>
      <p>
        Remember the definition of a higher-order function: "Higher-Order
        function is a function that receives a function as an argument or
        returns the function as output."
      </p>
      <p>
        Since React components really just are functions, we can do the same.
        Only we pass another component as a prop.
      </p>

      <HigherOrderFunction theComponentToRender={Profile} user={userObj} />

      <HigherOrderFunction theComponentToRender={Profile} user={userObj} />
    </div>
  );
}

function HigherOrderFunction({
  theComponentToRender: Component,
  user,
  ...rest
}) {
  if (user) return <Component user={user} {...rest} />;
  else return null;
}

function Profile({ user }) {
  return <p>hi, {user.name} </p>;
}
