import { Route,Routes, Navigate, Redirect,redirect } from "react-router-dom";
import Register from "./components/Register"
import Login from "./components/Login"
import Authlayout from "./components/Authlayout"
import Userslist from "./components/Userslist";
import Edituser from "./components/Edituser";
import { ToastContainer, toast } from 'react-toastify';
function App() {
  
  return (
    <div className="App">
      <ToastContainer position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
      <div className="container">
        <Routes>
          <Route path="/" element={<Authlayout />}>
            <Route index element={<Navigate replace to="/users" />}></Route>  
            <Route path="/users" element={<Userslist />}></Route>  
            <Route path="/users/:id/edit" element={<Edituser />}></Route>  
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
