import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';

import Actions from "../actions";
import AddToDoComponent from "../components/add_todo_component";
import ToDoListComponent from "../components/todo_list_component";

export class ToDoContainer extends Component {

    render() { 
        return(<div>
                <br />
                    <h2>ToDo List</h2>
                <br />
                <AddToDoComponent actions={this.props.actions} filteredByCompleted={this.props.data.viewState.filteredByCompleted}/>
                <ToDoListComponent data={this.props.data} actions={this.props.actions} />
            </div>);
    }
}

ToDoContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        data: state.todos
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoContainer);
