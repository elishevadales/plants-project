import React from 'react'
import btnStyles from "./css/addPlantBtn.module.css"
import { useNavigate } from 'react-router-dom'


const MapUser = () => {


  const nav = useNavigate();
  const onPlusBtn = () => {
    nav("/user/newPlant")
  }


  return (
    <div>
      Map User
      <div className={btnStyles.addPlantDiv} onClick={onPlusBtn}>
        
        </div>
  </div>
  )
}

export default MapUser

