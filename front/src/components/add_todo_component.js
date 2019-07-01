import React, {Component} from "react";

class AddToDoComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            priority: 1,
            complete: false,
            error: {
                showError: false,
                message: ''
            }
        };

        this.descriptionHandler = this.descriptionHandler.bind(this);
        this.priorityHandler = this.priorityHandler.bind(this);
        this.completeStatusHandler = this.completeStatusHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.destroyState = this.destroyState.bind(this);
        this.renderError = this.renderError.bind(this);
        this.isDataCorrect = this.isDataCorrect.bind(this);
    }

    descriptionHandler(evt) {
        let { value } = evt.target;
        this.setState({description: value});
    }

    priorityHandler(evt) {
        let { value } = evt.target;
        this.setState({priority: parseInt(value, 10)});
    }

    completeStatusHandler(evt) {
        let { checked } = evt.target;
        this.setState({complete: checked});
    }
    
    onSubmitHandler() {

        const {description, priority, complete} = this.state;
        if(!this.isDataCorrect(description, priority)) return;

        this.props.actions.createToDo(description, complete, priority, this.props.filteredByCompleted);
        this.destroyState();
    }

    isDataCorrect(description, priority) {

        if(description.length === 0 || priority.length === 0) {

            this.setState({error: {
                showError: true,
                message: "Description and priority should be not empty"
            }});

            return false;
        }

        return true;
    }   

    destroyState() {
        this.setState({
            description: '',
            priority: 1,
            complete: false,
            error: {
                showError: false,
                message: ''
            }
        });
    }

    renderError() {

        return (<div className="alert alert-warning" role="alert">
                        Warning! {this.state.error.message}
                    </div>);

    }

    render() {

        let content = '';

        content = (<div>
                       {this.state.error.showError && this.renderError()}
                    <div className="row">
                        <div className="form-group mx-sm-3 mb-2">
                            <input type="text" className="form-control" placeholder="Discription" value={this.state.description} onChange={this.descriptionHandler} />
                        </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <input type="number" min="1" max="100" className="form-control" placeholder="Priority" value={this.state.priority} onChange={this.priorityHandler} />     
                        </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <input type="checkbox" className="form-check-input" checked={this.state.complete} onChange={this.completeStatusHandler} />       
                        </div>
                        <button className="btn btn-success mb-2" onClick={this.onSubmitHandler}>Add ToDo</button>
                    </div>
                </div>
        );
        
        return content;
    }
}


export default AddToDoComponent;
