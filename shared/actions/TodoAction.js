import request from 'axios';

const API_URL = 'mongodb://localhost/todo';

export function getTodos(){
    return {
        type: 'GET_TODOS',
        promise: request.get(API_URL)
    }
}

export function createTodo(text){
    return {
        type: 'CREATE_TODO',
        text,
        date: Date.now()
    }
}

export function editTodo(id,text) {
    return {
        type: 'EDIT_TODO',
        id,
        text,
        date: Date.now()
    }
}

export function deleteTodo(id){
    return {
        type: 'DELETE_TODO',
        id
    }
}