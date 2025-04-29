import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function addUser() {
    console.log("add user")
}

function deselectUser() {
    console.log("deselect user")
}

function addTask() {
    console.log("add task")
}

function App() {
    const [theme, setTheme] = useState("light")
    let toggleTheme = () =>
        setTheme(theme == "light" ? "dark" : "light")

    return (
        <div className={theme}>
            <div className="app">
                <aside className="sidebar card">
                    <h2>Usuarios</h2>
                    <ul id="userList"></ul>
                    <form action="" onSubmit={(e) => { e.preventDefault(); addUser() }}>
                        <input type="text" id="newUserInput" placeholder="Nuevo usuario..." /><br />
                        <input type="submit" value="Añadir Usuario" />
                    </form>

                    <div id="userInfo" className="hidden">
                        <hr />
                        <p id="userName"></p>
                        <p id="userStats"></p>
                        <button onClick={deselectUser}>Deseleccionar</button>
                    </div>

                    <button onClick={toggleTheme} style={{ "marginTop": "auto" }}>🌙/☀️ Tema</button>
                </aside>
                <main className="main">
                    <div className="card">
                        <h1 id="mainTitle">Selecciona un usuario</h1>
                        <div id="taskSection" className="hidden">
                            <ul id="taskList"></ul>
                            <input type="text" id="newTaskInput" placeholder="Nueva tarea..." />
                            <button onClick={addTask}>Añadir Tarea</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default App
