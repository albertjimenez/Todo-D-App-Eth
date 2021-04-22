import React, {useState} from "react";
import {Card, Form} from "react-bootstrap";
import '../App.css';

export default function ToDo({task, toggleCompleted}) {
    const [completed, setCompleted] = useState(task.completed);
    const completedTaskClass = completed ? "completed-task" : "";

    return <Card className="shadow" border="light" bg={completed ? "success" : "secondary"} text={"white"} key={task.id}>
        <Card.Body>
            <Card.Title className={completedTaskClass}>Task #{task.id}</Card.Title>
            <Card.Text className={completedTaskClass}>
                {task.content}
            </Card.Text>
        </Card.Body>
        <Card.Footer>
            <Form.Check
                type={"checkbox"}
                id={`completed ${task.id}`}
                label={`${task.completed ? "" : "Not"} Completed`}
                defaultChecked={task.completed}
                onClick={() => {
                    toggleCompleted(task.id);
                    setCompleted(prevState => !prevState);
                }}
            />
        </Card.Footer>
    </Card>
}
