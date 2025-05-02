import { useState } from 'react'
import './App.css'


function App() {
    const [count, setCount] = useState(0)
    const [theme, setTheme] = useState("light")
    let toggleTheme = () =>
        setTheme(theme == "light" ? "dark" : "light")

    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState(0)

    function addUser(name) {
        setCount(c => { c++ })
        setUsers((prevUsers) => [...prevUsers, { id: count, name: name, tasks: [] }]);
    }

    function selectUser(user) {
        setCurrentUser(user)
    }

    function deselectUser() {
        setCurrentUser(undefined)
    }

    function addTask(task) {
        console.log(task)
        console.log(users)
        setUsers((prevUsers) => {
            const updatedUsers = prevUsers.map((user) => {
                if (user.id == currentUser) {
                    return { ...user, tasks: [...user.tasks, task] };
                }
                return user;
            });
            return updatedUsers;
        });
    }


    return (
        <div className={theme}>
            <div className="app">
                <aside className="sidebar card">
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
                        addUser(input.value)
                    }}>
                        <input type="text" id="newUserInput" className="text" placeholder="Nuevo usuario..." /><br />
                        <input type="submit" value="Añadir Usuario" />
                    </form>

                    {
                        currentUser == 0 ?
                            <></>
                            :
                            <div id="userInfo">
                                <hr />
                                <p id="userName">{currentUser.name}</p>
                                <p id="userStats"></p>
                                <button onClick={deselectUser}>Deseleccionar</button>
                            </div>
                    }

                    <button onClick={toggleTheme} style={{ "marginTop": "auto" }}>🌙/☀️ Tema</button>
                </aside>
                <main className="main">
                    <div className="card">
                        <h1 id="mainTitle">{currentUser ? currentUser.name : "Selecciona un usuario"}</h1>
                        {currentUser ? (
                            <div id="taskSection">
                                <form action="" onSubmit={(e) => {
                                    e.preventDefault()
                                    let newTaskInput = document.getElementById("newTaskInput")
                                    addTask(newTaskInput.value)
                                    newTaskInput.value = ""
                                }}>
                                    <ul id="taskList">
                                        <li>task.name</li>
                                        <li>adsasd -&gt; {currentUser.tasks}</li>
                                        {currentUser.tasks.map((task, index) => (
                                            <li>task.name</li>
                                        ))}
                                    </ul>
                                    <input type="text" id="newTaskInput" placeholder="Nueva tarea..." />
                                    <input type="submit" value="Añadir Tarea" />
                                </form>
                            </div>
                        ) : <></>}
                    </div>
                </main>
            </div>
        </div >
    )
}

export default App
