import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Todo from './components/Todo';

function App() {
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Todo List</h1>
            {/* <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Todo />}></Route>
                </Routes>
            </BrowserRouter> */}
            <Todo />
        </div>
    );
}

export default App;
