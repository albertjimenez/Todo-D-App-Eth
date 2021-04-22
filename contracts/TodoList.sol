pragma solidity ^0.5.0;
contract TodoList {
    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool completed;
    }
    mapping(uint => Task) public tasks;

    constructor() public {
        createTask("First task");
    }
    event TaskCreated(
        uint id,
        string content,
        bool completed
    );
    event TaskCompleted(
        uint id,
        bool completed
    );
    function toggleCompleted(uint _id) public {
        Task memory _task = tasks[_id];
        _task.completed = true;
        tasks[_id] = _task;
        emit TaskCompleted(_id, true);
    }
    function createTask(string memory _content) public {
        taskCount ++;
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);
    }

}
