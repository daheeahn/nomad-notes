import { BrowserRouter, Route, Switch } from "react-router-dom";

import Add from "../../Routes/Add";
import Edit from "../../Routes/Edit";
import { GET_NOTES } from "../../queries";
import Note from "../../Routes/Note";
import Notes from "../../Routes/Notes";
import { Query } from "react-apollo";
import React from "react";

function App() {
  return (
    // <div className="App">
    //   {/* <Query query={GET_NOTES}>{() => null}</Query> */}
    //   <p>hi</p>
    // </div>
    <BrowserRouter>
      <Switch>
        <Route exact={true} path={"/"} component={Notes} />
        <Route path={"/note/:id"} component={Note} />
        <Route path={"/add"} component={Add} />
        <Route path={"/edit/:id"} component={Edit} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
