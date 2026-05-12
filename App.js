import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const getTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {

    await axios.post("http://localhost:5000/api/tasks/add", {
      title,
      description
    });

    setTitle("");
    setDescription("");

    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <h1>Task Manager</h1>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <button onClick={addTask}>Add Task</button>

      <hr />

      {
        tasks.map((task) => (
          <div key={task._id}>

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <hr />

          </div>
        ))
      }

    </div>
  );
}

export default App;