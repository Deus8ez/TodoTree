import React, { useState } from "react";

export default function Todo(props) {
    const [isEditing, setEditing] = useState(false);
    const [newNode, setNewNode] = useState(false);
    const [newName, setNewName] = useState('');
    const divStyle = {
        marginLeft: 15 * props.level,
      };

    function handleChange(e) {
        setNewName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
    }

    function addNewNode(e){
        e.preventDefault();
        props.addTask(newName, props.level + 1, props.id)
        setNewNode(false);
    }

    const nodeTemplate = (
        <form onSubmit={addNewNode}>
          <div>
            <label htmlFor={props.id}>
              New node name
            </label>
            <input
                id={props.id}
                type="text"
                value={newName}
                onChange={handleChange}
                style={{marginLeft: 5}}
            />
          </div>
          <div>
            <button
                type="button"
                onClick={() => setNewNode(false)}
                >
                Cancel
                <span> adding new node</span>
            </button>
            <button type="submit">
                Add
            </button>
          </div>
        </form>
      );
    const editingTemplate = (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor={props.id}>
              New name for {props.name}
            </label>
            <input
                id={props.id}
                type="text"
                onChange={handleChange}
                style={{marginLeft: 5}}
            />
           </div>
          <div>
            <button
                type="button"
                onClick={() => setEditing(false)}
                >
                Cancel
                <span> renaming {props.name}</span>
            </button>
            <button type="submit">
                Save
                <span> new name for {props.name}</span>
            </button>
          </div>
        </form>
      );
      const viewTemplate = (
        <div style={divStyle}>
          <div>
              <label htmlFor={props.id}>
                {props.name}
              </label>
            </div>
            <div>
                <button type="button" onClick={() => setNewNode(true)}>
                    Add new child node
                </button>
                <button type="button" onClick={() => setEditing(true)}>
                    Edit <span>{props.name}</span>
                </button>
                <button
                    type="button"
                    onClick={() => props.deleteTask(props.id)}
                >
                    Delete <span>{props.name}</span>
                </button>
            </div>
        </div>
      );
      

    if(isEditing){
        return editingTemplate
    } else if (newNode){
        return nodeTemplate
    } else {
        return viewTemplate
    }
  }