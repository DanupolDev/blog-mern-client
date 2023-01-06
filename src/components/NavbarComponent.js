import { Link,useLocation,useNavigate } from "react-router-dom"
import { withRouter } from "../services/withRouter"
import { getUser,logout } from "../services/authoriza"


const NavbarComponent =(props)=>{
    let navigate = useNavigate();
    const location = useLocation()
    const logoutPage = ()=>{
        if(location.pathname ==='/'){
            logout(()=>navigate(0))
        }else {
            logout(()=>navigate('/'))
        }
    }
    return(
        <nav>
            <ul className="nav nav-tabs">
                <li className="nav-item pr-3 pt-3 pb-3">
                    <Link to="/" className="nav-link">หน้าแรก</Link>
                </li>
                {!getUser() && (<li className="nav-item pr-3 pt-3 pb-3">
                    <Link to="/login" className="nav-link">เข้าสู่ระบบ</Link>
                </li>
                )}
                {getUser() &&(
                    <li className="nav-item pr-3 pt-3 pb-3">
                    <Link to="/create" className="nav-link">เขียนบทความ</Link>
                    </li>
                )}
                {getUser() && (
                <li className="nav-item pr-3 pt-3 pb-3">
                    <button  className="nav-link" onClick={()=>logoutPage()}>ออกจากระบบ</button>
                </li>)}
            </ul>
        </nav>
    )
}
export default withRouter(NavbarComponent)