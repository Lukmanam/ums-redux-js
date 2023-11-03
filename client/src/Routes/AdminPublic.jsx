import {Navigate} from 'react-router-dom'

function AdminPublic(props){
    if(localStorage.getItem('admintoken')){
        return <Navigate to='/admin/dashboard' />
    }else{
        return props.children;
    }
}

export default AdminPublic;