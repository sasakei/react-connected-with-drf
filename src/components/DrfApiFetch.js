import React, { useState, useEffect } from "react";
import axios from "axios";

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [editedTask, setEditedTask] = useState({ id: "", title: "" });
  const [id, setId] = useState(1);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tasks/", {
        headers: {
          Authorization: "Token 74422bbba49a051fed1491ba9c89ce2b6e813e1c",
        },
      })
      .then((res) => {
        setTasks(res.data);
      });
  }, []);

  const getTask = () => {
    axios
      .get(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        headers: {
          Authorization: "Token 74422bbba49a051fed1491ba9c89ce2b6e813e1c",
        },
      })
      .then((res) => {
        setSelectedTask(res.data);
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        headers: {
          Authorization: "Token 74422bbba49a051fed1491ba9c89ce2b6e813e1c",
        },
      })
      .then((res) => {
        setTasks(tasks.filter((task) => task.id !== id));
        setSelectedTask([]);
      });
  };

  const newTask = (task) => {
    const data = {
      title: task.title,
    };

    axios
      .post("http://127.0.0.1:8000/api/tasks/", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 74422bbba49a051fed1491ba9c89ce2b6e813e1c",
        },
      })
      .then((res) => setTasks([...tasks, res.data]));
    setEditedTask({ id: "", title: "" });
  };

  const handleInputChange = () => (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const editTask = (task) => {
    axios
      .put(`http://127.0.0.1:8000/api/tasks/${task.id}`, task, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 74422bbba49a051fed1491ba9c89ce2b6e813e1c",
        },
      })
      .then((res) => {
        setTasks(
          tasks.map((task) => (task.id === editedTask.id ? res.data : task))
        );
      });
    setEditedTask({ id: "", title: "" });
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} : {task.id} :
            <button onClick={() => deleteTask(task.id)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </li>
        ))}
      </ul>
      Set id
      <br />
      <input
        type="text"
        value={id}
        onChange={(evt) => {
          setId(evt.target.value);
        }}
      />
      <br />
      <button type="button" onClick={() => getTask()}>
        Set Task
      </button>
      {/* <button type="button" onClick={() => deleteTask()}>
        Delete Task
      </button> */}
      <h3>
        {selectedTask.id}:{selectedTask.title}
      </h3>
      <input
        type="text"
        name="title"
        value={editedTask.title}
        onChange={handleInputChange()}
        placeholder="New Task"
        required
      />
      <button onClick={() => newTask(editedTask)}>Create</button>
    </div>
  );
};

export default DrfApiFetch;
