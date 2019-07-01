import React, {Component} from "react";
import ToDoItemComponent from "./todo_item_component";

class ToDoListComponent extends Component {
    
    constructor(props) {
        super(props);

        this.completeStatusHandler = this.completeStatusHandler.bind(this);
        this.orderByHandler = this.orderByHandler.bind(this);
        this.filterHandler = this.filterHandler.bind(this);
    }

    completeStatusHandler(todoId, complete) {
        this.props.actions.changeTodoCompleteStatus(todoId, complete, this.props.data.viewState.filteredByCompleted);
    }

    orderByHandler(evt) {
        const orderBy = evt.currentTarget.getAttribute("data");
        this.props.actions.loadToDos(orderBy, !this.props.data.viewState.ascOrDesc, this.props.data.viewState.filteredByCompleted);
    }

    filterHandler() {
        this.props.actions.loadToDos(this.props.data.viewState.orderBy, this.props.data.viewState.ascOrDesc, !this.props.data.viewState.filteredByCompleted);
    }

    renderFilterButton() {

        let content = null;

        if(this.props.data.viewState.filteredByCompleted) {

            content = (<div>Filter by: <button className="btn btn-primary" onClick={this.filterHandler}>Isn't Complete</button></div>);
        } else {

            content = (<div>Filter by: <button className="btn btn-primary" onClick={this.filterHandler}>Completed</button></div>);
        }

        return content;
    }

    render() {

        let content = null;

        if (this.props.data.loading) {
            return (<div className="content">
                        <span> Loading ...</span>
                    </div>);
        }

        if (this.props.data.loaded) {

            content = (
                    <div>
                        <br />
                         {this.renderFilterButton()}
                        <br />
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"><div>#</div></th>
                                <th scope="col" data="priority" className="pointer" onClick={this.orderByHandler}><div>Priority</div></th>
                                <th scope="col" data="description" className="pointer" onClick={this.orderByHandler}><div>Description</div></th>
                                <th scope="col" data="createdAt" className="pointer" onClick={this.orderByHandler}><div>Created At</div></th>
                                <th scope="col"><div>Complete</div></th>
                                <th scope="col"><div></div></th>
                                <th scope="col"><div></div></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.data.list.map((item, index) => {
                                return (
                                    <ToDoItemComponent
                                        key={index}
                                        todoId={item.id}
                                        priority={item.priority}
                                        completed={item.completed}
                                        description={item.description}
                                        createdAt={item.createdAt}
                                        completeStatusHandler={this.completeStatusHandler}
                                        actions={this.props.actions} />
                                );
                            }, this)
                        }
                        </tbody>
                    </table>
                    </div>
            );
        }

        return content;
    }
}

export default ToDoListComponent;
