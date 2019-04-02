# Redux: Writing a Todo List Reducer (Toggling a Todo)

Learn how to implement toggling a todo in a todo list application reducer.

## Transcript

00:00 In this lesson, we will continue creating the reducer for to-do list application. The only action that this reducer currently handles is called At-To-Do. We also created a test that makes sure that when the reducer is called with an empty array as a state and the at-to-do action, it returns an array with a single to do element.

00:25 In this lesson, we will follow the same approach to implement another action called Toggle To-Do. We're going to start with a test again. This time, we're testing a different action and we have a different initial state. The state before calling the reducer now includes two different to-dos with ID zero and one. Notice how both of them have their completed fields set to false.

00:55 Next, I declare the action. The action is an object with the type property which is a toggle to-do string and the ID of the to-do that I want to be toggled. I declare the state that I expect to receive after calling the reducer. It's pretty much the same as before calling the reducer. However, I expect the to-do with the ID specified in the action or one in this case. The change is completed field.

01:25 The reducer must be a pure function. As a matter of precaution, I called reprise on the state and the action. Finally, just like in the previous lesson, I'm asserting that the result of calling my reducer with the state before and the action is going to be deeply equal to the state after.

01:47 My test is a function, so I need to call it at the end of the file. If I run it, it fails because I have not implemented handling this action yet.

01:58 I'm adding a new switch case to my reducer. I remember that I shouldn't change the original array, so I'm using the array map method to produce a new array.

02:10 The function I pass as an argument will be called for every to-do. If it's not a to-do I'm looking for, I don't want to change it. I just return it as is. However, if the to-do is the one we want to toggle, I'm going to return a new object that has all the properties of the original to-do object thanks to the object's pred operator, but also an inverted value of the completed field.

02:38 Now both of our tests run successfully. We have an implementation of the reducer that can add and toggle to-dos.

```js
const expect = require("expect");

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case "TOGGLE_TODO":
      return state.map(todo => {
        if (todo.id !== action.id) {
          return todo;
        }
        return {
          ...todo,
          completed: !todo.completed
        };
      });
    default:
      return state;
  }
};

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: "ADD_TODO",
    id: 0,
    text: "Learn Redux"
  };
  const stateAfter = [
    {
      id: 0,
      text: "Learn Redux",
      completed: false
    }
  ];

  Object.freeze(stateBefore);
  Object.freeze(action);

  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: "Learn Redux",
      completed: false
    },
    {
      id: 1,
      text: "Go shopping",
      completed: false
    }
  ];

  const action = {
    type: "TOGGLE_TODO",
    id: 1
  };

  const stateAfter = [
    {
      id: 0,
      text: "Learn Redux",
      completed: false
    },
    {
      id: 1,
      text: "Go shopping",
      completed: true
    }
  ];

  Object.freeze(stateBefore);
  Object.freeze(action);

  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

testAddTodo();
console.log("All tests passed!");
```
