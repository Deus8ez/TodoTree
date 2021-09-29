import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';
import Todo from "./ToDo";
import Form from "./Form";
import { nanoid } from "nanoid";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  const taskList = tasks.map(task => (
    <Todo
        id={task.id}
        name={task.name}
        level={task.level}
        key={task.id}
        addTask={addTask}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    )
  );

  const style = {marginLeft: 20}

  function resetTaskList(){
    setTasks([])
  }

  function addTask(name, level, sourceId) {
    const newTask = { id: "id" + nanoid(), name: name, level: level };
    console.log(sourceId);

    const searchedObject = tasks.find(x => x.id == sourceId);
    const sourceIndex = tasks.indexOf(searchedObject)
    console.log(sourceIndex)
    if(sourceIndex != -1){
      var arr = tasks;

      var jumpDistance = 1;
      var onTheSameLevel = true; 
      var i = sourceIndex + 1;

      while(onTheSameLevel){
        if(i == arr.length){
          onTheSameLevel = false;
          continue;
        }

        if(arr[i].level == level || arr[i].level > level){
          jumpDistance++;
          i++;
        } else {
          onTheSameLevel = false;
        }
      }

      arr.splice(sourceIndex + jumpDistance, 0, newTask);
      setTasks([...arr]);
    } else {
      setTasks([...tasks, newTask]);
    }
    console.log(tasks)
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  return (
    <div style={style}>
      <h1>TodoTree</h1>
      <Form addTask={addTask} />
      <ul style={{paddingLeft: 0}}>
        {taskList}
      </ul>
      <button onClick={resetTaskList} style={{marginLeft: 5, width: 100}}>
        Reset
      </button>
    </div>
  ); 
}


export default App;
