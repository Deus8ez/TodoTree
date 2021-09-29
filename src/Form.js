import React, { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.addTask(name, 0, 1);
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        <label htmlFor="new-todo-input">
          Insert your node
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" style={{marginLeft: 5, width: 100}}>
        Add
      </button>
    </form>
  );
}

export default Form;