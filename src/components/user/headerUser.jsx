import React from 'react'
import { TOKEN_NAME } from '../../services/apiService'
import { Link ,useNavigate} from 'react-router-dom'

const HeaderUser = () => {

  
  const nav = useNavigate();

  const onClick = () => {
    if(window.confirm('are you sure you want to log-out?')){
      localStorage.removeItem(TOKEN_NAME);
    nav("/");
    }
    
  }

  return (
    <div style={{background:"green",color:"white"}}>
      HeaderUser
      <button onClick={onClick}>log-out</button>
    </div>
  )
}

export default HeaderUser