import './App.css';
import {useEffect, useState} from "react";
import Web3 from "web3";
import {TODO_ABI, TODO_ADDRESS} from "./config";
import ToDoList from "./todolist/ToDoList";
import Header from "./header/header";
import {Container} from "react-bootstrap";

function App() {
    const [account, setAccount] = useState("");
    const [todoList, setTodoList] = useState({});
    const [taskCount, setTaskCount] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        web3.eth.getAccounts().then(accounts => {
            setAccount(accounts[0] || "No accounts");
            setTodoList(new web3.eth.Contract(TODO_ABI, TODO_ADDRESS));
        }).catch(console.log);
    }, [isLoading]);
    useEffect(() => {
        todoList.methods?.taskCount().call().then(_taskCount => setTaskCount(_taskCount)).catch(console.log);
    }, [todoList]);

    useEffect(() => {
        setTasks([]);
        for (let i = 1; i <= taskCount; i++) {
            todoList.methods?.tasks(i).call().then(task => setTasks(prevState => [...prevState, task])).catch(console.log);
        }
        // eslint-disable-next-line
    }, [taskCount]);

    const createTask = content => {
        setIsLoading(true);
        todoList.methods?.createTask(content).send({from: account})
            .once('receipt', receipt => {
                console.log("Receipt", receipt);
                setIsLoading(false);
            });
    }
    const toggleCompleted = taskId => {
        todoList.methods?.toggleCompleted(+taskId).send({from: account})
            .once('receipt', receipt => console.log(receipt))
    }
    return <>
        <Header/>
        <Container>
            <br/>
            <h1 className="text-center display-4 font-weight-light">ToDo D-App</h1>
            <br/>
            {isLoading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <ToDoList tasks={tasks} createTask={createTask} toggleCompleted={toggleCompleted}/>
            }
        </Container>
    </>;
}

export default App;
