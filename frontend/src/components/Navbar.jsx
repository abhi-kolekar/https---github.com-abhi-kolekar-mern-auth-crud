import { Link, redirect,useNavigate } from "react-router-dom";
const Navbar=()=>{
    const navigate = useNavigate();
    const logout=()=>{
        console.log('logout');
        localStorage.removeItem('restuser');
        console.log('logout');
        navigate('/login')
    }
    return(
        <>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <a className="navbar-brand" href="#">Home</a>

            <ul className="navbar-nav">
            <li className="nav-item">
                    <Link to="/register" className="nav-link">Add User</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link"  href="#" onClick={e=>logout()}>Logout</a>
                </li>
            </ul>
</nav>
        </>
    )
}
export default Navbar;