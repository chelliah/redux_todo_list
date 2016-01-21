import React from 'react';
import { PropTypes } from 'react';
import Immutable     from 'immutable';

export default class TodosView extends React.Component {
    static propTypes = {
        todos:         PropTypes.instanceOf(Immutable.List).isRequired,
        editTodo:   PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired
    };

    handleDelete = (e) => {
        const id = Number(e.target.dataset.id);

        //equivalent to 'dispatch(deleteTodo))'
        this.props.deleteTodo(id);
    };

    handleEdit = (e, index) => {
        console.log('here is index', index);
        const id = Number(e.target.dataset.id);
        console.log('here is id', id);
        const val = this.props.todos.get(id).text;

        //for cutting edge ux
        let newVal = window.prompt('', val);
        this.props.editTodo(id, newVal);
    };

    render(){
        return(
            <div id="todo-list">
                {
                    this.props.todos.map( (todo, index) => {
                        return (
                            <div key={index}>
                                <span>{todo}</span>

                                <button data-id={index} onClick={this.handleDelete}>
                                    X
                                </button>
                                <button data-id={index} onClick={this.handleEdit.bind(index)}>
                                    Edit
                                </button>

                            </div>
                        )
                    })
                }
            </div>
        )
    }
}