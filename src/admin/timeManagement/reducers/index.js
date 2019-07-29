import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
// import { VisibilityFilters } from '../actions'
export default combineReducers({
  todos,
  visibilityFilter
})
// const initialState = {
//   visibilityFilter: VisibilityFilters.SHOW_ALL,
//   todos: []
// }
// export default function(state=initialState, action) {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return [
//         ...state.todos,
//         {
//           id: action.id,
//           text: action.text,
//           completed: false
//         }
//       ]
//     case 'TOGGLE_TODO':
//       return state.todos.map(todo =>
//           (todo.id === action.id)
//               ? {...todo, completed: !todo.completed}
//               : todo
//       )
//     case 'SET_VISIBILITY_FILTER':
//       return action.filter
//     default:
//       return state
//   }
// }
