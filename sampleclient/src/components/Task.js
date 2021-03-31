import { FaTimes } from 'react-icons/fa';

const Task = ({ task, onDelete, onToggle }) => {
	let crossStyle = { color: 'red', cursor: 'pointer' };
	return (
		<div
			className={`task ${task.reminder ? 'reminder' : ''}`}
			onDoubleClick={() => onToggle(task.id)}
		>
			<h3>
				{task.text}
				<FaTimes style={crossStyle} onClick={() => onDelete(task.id)} />
			</h3>
			<p>{task.date}</p>
		</div>
	);
};

export default Task;
