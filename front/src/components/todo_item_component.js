import React, {Component} from "react";
import moment from "moment";

class ToDoItemComponent extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            description: this.props.description,
            priority: this.props.priority,
            completed: this.props.completed
        };

        this.completeStatusHandler = this.completeStatusHandler.bind(this);
        this.descriptionHandler = this.descriptionHandler.bind(this);
        this.priorityHandler = this.priorityHandler.bind(this);
        this.editToDoHandler = this.editToDoHandler.bind(this);
        this.deleteToDoHandler = this.deleteToDoHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onCancelHandler = this.onCancelHandler.bind(this);
    }

    completeStatusHandler(evt) {
        let id = this.props.todoId;
        const { checked } = evt.target;
        this.props.completeStatusHandler(id, checked);
    }

    descriptionHandler(evt) {
        let { value } = evt.target;
        this.setState({description: value});
    }

    priorityHandler(evt) {
        let { value } = evt.target;
        this.setState({priority: parseInt(value, 10)});
    }
    
    editToDoHandler() {
        this.setState({ edit: true });
    }

    deleteToDoHandler() {
        var answer = window.confirm("Are you shure?")
        if(!answer) return;

        let id = this.props.todoId;
        this.props.actions.deleteToDo(id);
    }

    onSubmitHandler() {
        const { description, complete, priority } = this.state;
        if(!this.isDataCorrect(description, priority)) return;

        let todoId = this.props.todoId; 
        let createAt = this.props.createAt;
        this.props.actions.updateToDos(todoId, description, createAt, complete, priority);
        this.setState({ edit: false });
    }

    isDataCorrect(description, priority) {

        if(description.length === 0 || priority.length === 0) {

            alert("Description and priority should be not empty")

            return false;
        }

        return true;
    } 

    onCancelHandler() {
        this.setState({
            edit: false, 
            description: this.props.description, 
            priority: this.props.priority
        });
    }

    renderStatic() {

        return (
            <tr data-id={this.props.todoId}>
                    <td><div>{this.props.index}</div></td>
                    <td><div>{this.props.priority}</div></td>
                    <td><div>{this.props.description}</div></td>
                    <td><div>{moment(this.props.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div></td>
                    <td><div>
                            <input type="checkbox" className="form-check-input" onChange={this.completeStatusHandler} checked={this.props.completed} />
                        </div>
                    </td>
                    <td>
                        <button onClick={this.editToDoHandler} className="btn btn-primary mb-2">Edit</button>
                    </td>
                    <td>
                        <button onClick={this.deleteToDoHandler} className="btn btn-danger mb-2">Delete</button>
                    </td>
                </tr>
        );
    }

    renderEdit() {;

        return (
            <tr data-id={this.props.todoId}>
                <td>
                    <div>{this.props.index}</div>
                </td>
                <td>
                    <div> 
                        <input type="number" min="1" max="100" className="form-control" placeholder="Priority" onChange={this.priorityHandler} value={this.state.priority} />
                    </div>
                </td>
                <td>
                    <div>
                        <input type="text" className="form-control" placeholder="Discription" onChange={this.descriptionHandler} value={this.state.description} />
                    </div>
                </td>
                <td>
                    <div>{moment(this.props.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                </td>
                <td><div>
                        <input type="checkbox" className="form-check-input" onChange={this.completeStatusHandler} checked={this.props.completed} />
                    </div>
                </td>
                <td>
                    <button onClick={this.onSubmitHandler} className="btn btn-success mb-2">Save</button>
                </td>
                <td>
                    <button onClick={this.onCancelHandler} className="btn btn-warning mb-2">Cancel</button>
                </td>
            </tr>
        );
    }

    render() {

        let content = null;
        
        if(this.state.edit) {
            content = this.renderEdit();
        } else {
            content = this.renderStatic();
        }
       
        return content;
    }
}


export default ToDoItemComponent;
