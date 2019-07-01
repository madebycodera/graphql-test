import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css';

import LoadDataContainer from "./containers/load_data_container";
import ToDoContainer from "./containers/todo_container";

class App extends Component {
  render() {
    return (
        <div className="container">
          <LoadDataContainer>
           <ToDoContainer />
          </LoadDataContainer>
        </div>);
      }
}

export default App
