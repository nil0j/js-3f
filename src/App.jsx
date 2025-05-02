import { useState, useMemo } from 'react'
import './App.css'


function App() {
    const [count, setCount] = useState(0)
    const [theme, setTheme] = useState("light")
    let toggleTheme = () =>
        setTheme(theme == "light" ? "dark" : "light")

    const [users, setUsers] = useState([])
    const [currentUserId, setCurrentUserId] = useState(undefined)
    const currentUser = users.find(user => user.id == currentUserId);

    function addUser(input) {
        let name = input.value
        if (name == "") return
        setCount(c => c + 1)
        setUsers((prevUsers) => [...prevUsers, { id: count, name: name, tasks: [] }]);
        input.value = ""
    }

    function selectUser(user) {
        setCurrentUserId(user.id)
    }

    function deselectUser() {
        setCurrentUserId(undefined)
    }

    function addTask(task) {
        if (task == "") return
        setUsers((prevUsers) => {
            return prevUsers.map((user) => {
                if (user.id == currentUserId) {
                    return { ...user, tasks: [...user.tasks, task] };
                }
                return user;
            });
        });
    }

    function deleteTask(index) {
        setUsers((prevUsers) => {
            return prevUsers.map((user) => {
                if (user.id == currentUserId) {
                    return {
                        ...user, tasks: currentUser.tasks.filter((_, i) => i != index)
                    };
                }
                return user;
            });
        });
    }

    function editTask(index) {
        let value = prompt("ALBERT ESCRIBE VAVAVAVA QUE SE ACABA EL TIEMPO")
        if (value == "") return
        setUsers((prevUsers) => {
            return prevUsers.map((user) => {
                if (user.id == currentUserId) {
                    return {
                        ...user, tasks: currentUser.tasks.map((t, i) => i == index ? value : t)
                    };
                }
                return user;
            });
        });
    }

    return (
        <div className={theme}>
            <div className="app">
                <Sidebar
                    users={users}
                    addUser={addUser}
                    selectUser={selectUser}
                    deselectUser={deselectUser}
                    currentUser={currentUser}
                    toggleTheme={toggleTheme}
                />
                <Main
                    currentUser={currentUser}
                    addTask={addTask}
                    editTask={editTask}
                    deleteTask={deleteTask}
                />
            </div>
        </div >
    )
}

function Sidebar({ users, addUser, selectUser, deselectUser, currentUser, toggleTheme }) {
    return <aside className="sidebar card">
        <h2>Usuarios</h2>
        <ul id="userList">
            {users.map((user, index) => (
                <li key={index} style={{ cursor: "pointer" }} onClick={_ => selectUser(user)}>
                    {user.name}
                </li>
            ))}
        </ul>
        <form action="" onSubmit={(e) => {
            e.preventDefault()
            let input = e.target.querySelector(".text")
            addUser(input)
        }}>
            <input style={{ "width": "100%", "boxSizing": "border-box" }} type="text" id="newUserInput" className="text" placeholder="Nuevo usuario..." /><br />
            <input style={{ "width": "100%" }} type="submit" value="Añadir Usuario" />
        </form>

        {
            currentUser != undefined ?
                <div id="userInfo">
                    <hr />
                    <p id="userName">{currentUser.name}</p>
                    <p id="userStats"></p>
                    <button onClick={deselectUser}>Deseleccionar</button>
                </div>
                :
                <></>
        }

        <button onClick={toggleTheme} style={{ "marginTop": "auto" }}>🌙/☀️ Tema</button>
    </aside>

}

function Main({
    currentUser,
    addTask,
    editTask,
    deleteTask,
}) {
    return <main className="main">
        <div className="card">
            <h1 id="mainTitle">{currentUser ? currentUser.name : "Selecciona un usuario"}</h1>
            {currentUser !== undefined ? (
                <div id="taskSection">
                    <form action="" onSubmit={(e) => {
                        e.preventDefault()
                        let newTaskInput = document.getElementById("newTaskInput")
                        addTask(newTaskInput.value)
                        newTaskInput.value = ""
                    }}>
                        <TaskList currentUser={currentUser} editTask={editTask} deleteTask={deleteTask} />
                        <input type="text" id="newTaskInput" placeholder="Nueva tarea..." />
                        <input type="submit" value="Añadir Tarea" />
                    </form>
                </div>
            ) : <></>}
        </div>
    </main>
}

function TaskList({ currentUser, editTask, deleteTask }) {
    return <ul id="taskList">
        {currentUser.tasks.map((task, index) => (
            <li key={index}>
                <span>{task}</span>
                <div className="actions">
                    <button style={{ 'display': 'none' }}>✏️</button>
                    <button onClick={() => { editTask(index) }}>✏️</button>
                    <button onClick={() => { deleteTask(index) }}>🗑️</button>
                </div>
            </li>
        ))}
    </ul>
}


export default App
