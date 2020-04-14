// import { FETCH_TODOS, ADD_TODO } from './actions';
// import { tassign } from 'tassign';
import { tassign } from 'tassign'; 
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, CLEAR_TODOS } from './actions'; 

export interface IAppState {
    // counter: number;
    // messaging?: {
    //     newMessages: number;
    // }
    todos: any[];
    lastUpdate: Date;
}

export const INITIAL_STATE : IAppState = {
    // counter: 0,
    // messaging: {
    //     newMessages: 5
    // }
    todos: [],
    lastUpdate: null
}

function addTodo(state, action) {
    
}

function toggleTodo(state, action) {
    var todo = state.todos.find(t => t.id === action.id);

    var index = state.todos.indexOf(todo);

    return tassign(state, {
        todos: [

            ...state.todos.slice(0, index),
            tassign(todo, { isCompleted: !todo.isCompleted }),
            ...state.todos.slice(index + 1),

        ],
        lastUpdate: new Date()
    });
}

function removeTodo(state, action) {
    return tassign(state, {
        todos: state.todos.filter(t => t.id !== action.id),
        lastUpdate: new Date()
    });
}

function clearTodos(state, action) {
    return tassign(state, { 
        todos: [],
        lastUpdate: new Date()
    });
}

class TodoActions {
    constructor(private state, private action) {
    }

    addTodo() {
        var newTodo = { id: this.state.todos.length + 1, title: this.action.title };

        return tassign(this.state, { 
            todos: this.state.todos.concat(newTodo),
            lastUpdate: new Date()
        });
    }
}

export function rootReducer(state: IAppState, action): IAppState {
    var actions = new TodoActions(state, action);

    switch (action.type) {
        // case FETCH_TODOS: 
            // return { counter: state.counter + 1 };
            // return tassign(state, { counter: state.counter + 1 })
            // return tassign(state, { })
        case ADD_TODO: return actions.addTodo();
        case TOGGLE_TODO: return toggleTodo(state, action);
        case REMOVE_TODO: return removeTodo(state, action);        
        case CLEAR_TODOS: return clearTodos(state, action);
    }
    return state;
}