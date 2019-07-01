import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';

import Actions from "../actions/";

class LoadDataContainer extends Component {

  componentDidMount() {
    
    if(!this.props.todos.loading && !this.props.todos.loaded) {
        this.props.actions.loadToDos();
    }

  }

  render() {
    return <div><main>{this.props.children}</main></div>;
  }

}

LoadDataContainer.propTypes = {
    todos: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  console.log("STATE: ", state);
    return {
      todos: state.todos
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(Actions, dispatch)
    };
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(LoadDataContainer);