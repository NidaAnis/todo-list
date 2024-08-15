#! /usr/bin/env node
 import inquirer from "inquirer";

let todos:string[] = [];
let condition = true;

async function main() {
  while (condition) {
    const { action } = await inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["Add Todo", "Delete Todo", "View Todos", "Update Todo", "Exit"]
      }
    ]);

    switch (action) {
      case "Add Todo":
        await addTodo();
        break;
      case "Delete Todo":
        await deleteTodo();
        break;
      case "View Todos":
        viewTodos();
        break;
      case "Update Todo":
        await updateTodo();
        break;
      case "Exit":
        condition = false;
        console.log("Exiting the application. Goodbye!");
        break;
      default:
        console.log("Invalid action.");
    }
  }
}

async function addTodo() {
  const { todo, todoAdded } = await inquirer.prompt([
    {
      name: "todo",
      type: "input",
      message: "What do you want to add to your to-do list?"
    },
    {
      name: "todoAdded",
      type: "confirm",
      message: "Do you want to add more?",
      default: false
    }
  ]);

  if (todo.trim() !== "") {
    todos.push(todo);
    console.log("Todo added:", todo);
  } else {
    console.log("Empty todo not added.");
  }

  if (todoAdded) {
    await addTodo();
  }

  console.log("Current Todos:", todos);
}

async function deleteTodo() {
  if (todos.length === 0) {
    console.log("No todos to delete.");
    return;
  }

  const { todoToDelete } = await inquirer.prompt([
    {
      name: "todoToDelete",
      type: "list",
      message: "Which todo do you want to delete?",
      choices: todos
    }
  ]);

  todos = todos.filter(todo => todo !== todoToDelete);
  console.log("Todo deleted:", todoToDelete);
  console.log("Current Todos:", todos);
}

function viewTodos() {
  if (todos.length === 0) {
    console.log("No todos to view.");
  } else {
    console.log("Current Todos:");
    todos.forEach((todo, index) => {
      console.log(`${index + 1}. ${todo}`);
    });
  }
}

async function updateTodo() {
  if (todos.length === 0) {
    console.log("No todos to update.");
    return;
  }

  const { todoToUpdate, newTodo } = await inquirer.prompt([
    {
      name: "todoToUpdate",
      type: "list",
      message: "Which todo do you want to update?",
      choices: todos
    },
    {
      name: "newTodo",
      type: "input",
      message: "Enter the new todo for the selected todo:"
    }
  ]);

  if (newTodo.trim() !== "") {
    const index = todos.indexOf(todoToUpdate);
    todos[index] = newTodo;
    console.log("Todo updated:", newTodo);
  } else {
    console.log("Empty todo not saved.");
  }

  console.log("Current Todos:", todos);
}

main();
