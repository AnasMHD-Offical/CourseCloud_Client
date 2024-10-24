import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
function Admin_Login_Auth({children}) {

  const admin = useSelector(state => state?.admin?.admin_data?.admin)
  console.log(admin);
  
    if(admin){
      return <Navigate to={"/admin/dashboard"}/> 
    }
    return children
}

export default Admin_Login_Auth