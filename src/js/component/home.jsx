import React, { useState, useEffect } from "react";
import List from "./list.jsx";

const Home = () => {
	const [input, setInput] = useState("");
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		getTasks();
	}, []);

	const getTasks = async () => {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/Angela"
			//, {method: "GET"}//
		);
		const list = await response.json();
		setTasks(list);
	};

	useEffect(() => {
		updateTasks();
	}, [tasks]);

	const updateTasks = async () => {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/Angela",
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(tasks),
			}
		);
	};

	return (
		<div className="bg-light justify-content-center">
			<p className="title text-center">todos</p>
			<input
				className=" col-4 border-0 shadow p-3"
				type="text"
				onChange={(e) => setInput(e.target.value)}
				value={input}
				onKeyDown={(e) => {
					const labels = tasks.map((item) => item.label);
					if (e.key === "Enter") {
						input.trim() && !labels.includes(input.trim())
							? setTasks([...tasks, { label: input, done: true }])
							: null +
							  alert("This task already exist or is empty");
						setInput("");
					}
				}}
			/>

			<ul className="list-group">
				{tasks.map((task, index) => {
					if (task.done == true) {
						return (
							<List
								key={index}
								inputTask={task.label}
								quit={() =>
									setTasks(
										tasks.filter((item, i) => i != index)
									)
								}
							/>
						);
					}
				})}

				<span className="col-4 border-0 shadow p-3 bg-white">
					{tasks.filter((task) => task.done == true).length === 0
						? "No tasks, add a task"
						: tasks.filter((task) => task.done == true).length +
						  " item left"}
				</span>
			</ul>
		</div>
	);
};

export default Home;
