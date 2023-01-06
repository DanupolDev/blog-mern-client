import {getUser} from './services/authoriza'
import {Route,Navigate} from 'react-router-dom'

const AdminRoute=({component:Component,...rest})=>(
    <Route
    {...rest}
    render ={props =>
        getUser() ? (<Component {...props}/>) : (
        <Navigate to='/login' replace />)
    } />
)

export default AdminRoute