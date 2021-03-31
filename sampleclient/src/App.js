import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';
import { FcRightUp } from 'react-icons/fc';

const App = () => {
	const [showAddTask, setShowAddTask] = useState(false);
	const [id, setId] = useState(1);
	const [tasks, setTasks] = useState([]);

	/*
	// mock backend
	// useEffect to run upon program start, similar to componentDidMount/Update/Unmount
	// [] for any dependencies
	useEffect(() => {
		const getTasks = async () => {
			const tasksFromServer = await fetchTasks();
			setTasks(tasksFromServer);
		};

		getTasks();
	}, []);

	// Fetch Tasks
	const fetchTasks = async () => {
		const res = await fetch('http://localhost:5000/tasks');
		const data = await res.json();

		return data;
	};

	// Fetch Task
	const fetchTask = async (id) => {
		const res = await fetch(`http://localhost:5000/tasks/${id}`);
		const data = await res.json();

		return data;
	};

	// Add Task
	const addTask = async (task) => {
		const res = await fetch('http://localhost:5000/tasks', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(task),
		});

		const data = await res.json();

		setTasks([...tasks, data]);

		// const id = Math.floor(Math.random() * 10000) + 1
		// const newTask = { id, ...task }
		// setTasks([...tasks, newTask])
	};

	// Delete Task
	const deleteTask = async (id) => {
		const res = await fetch(`http://localhost:5000/tasks/${id}`, {
			method: 'DELETE',
		});
		// control the response status to decide if we will change the state or not.
		res.status === 200
			? setTasks(tasks.filter((task) => task.id !== id))
			: alert('Error Deleting This Task');
	};
	
	// Toggle Reminder
	const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
	*/

	// add task
	const addTask = (task) => {
		const newTask = { id, ...task };
		setTasks([...tasks, newTask]);
		setId(id + 1);
	};

	// delete task
	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	// toggle reminder, keep all other values the same
	const toggleReminder = (id) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, reminder: !task.reminder } : task
			)
		);
	};

	return (
		<Router>
			<div className="container">
				<Header
					onAdd={() => setShowAddTask(!showAddTask)}
					showAdd={showAddTask}
				/>
				<Route
					path="/"
					exact
					render={(props) => (
						<>
							{showAddTask && <AddTask onAdd={addTask} />}
							{tasks.length > 0 ? (
								<Tasks
									tasks={tasks}
									onDelete={deleteTask}
									onToggle={toggleReminder}
								/>
							) : (
								<React.Fragment>
									<span>Add tasks</span> <FcRightUp />
								</React.Fragment>
							)}
						</>
					)}
				/>
				<Route path="/about" component={About} />
				<Footer />
			</div>
		</Router>
	);
};

export default App;
