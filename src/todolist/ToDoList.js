import React, {useState} from "react";
import {Button, CardColumns, Col, Form, Row} from "react-bootstrap";
import ToDo from "./ToDo";

export default function ToDoList({tasks, createTask, toggleCompleted}) {
    const [text, setText] = useState("");
    return <>
        <Row>
            <Col>
                <Form onSubmit={event => {
                    event.preventDefault();
                    if (text)
                        createTask(text);
                    else
                        alert("Empty text cannot be persisted")
                }}>
                    <Form.Row>

                        <Col>
                            <Form.Control value={text} onChange={event => setText(event.target.value)} type="text"
                                          placeholder="Enter the task"/>
                        </Col>
                        <Col>
                            <Button variant="success" type="submit">
                                Submit new ToDo
                            </Button>
                        </Col>
                    </Form.Row>

                </Form>
            </Col>
        </Row>
        <br/>
        <CardColumns>
            {tasks.map(task => <ToDo task={task} toggleCompleted={toggleCompleted}/>)}
        </CardColumns>
    </>;
}
