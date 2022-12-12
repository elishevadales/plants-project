import React from 'react'
import btnStyles from "./css/addPlantBtn.module.css"
import { useNavigate } from 'react-router-dom'

const PlantsUser = () => {

  const nav = useNavigate();

  const onPlusBtn = () => {
    nav("/user/newPlant")
  }

  return (
    <div>PlantsUser
            <div className={btnStyles.addPlantDiv} onClick={onPlusBtn}>
        
        </div>
    </div>
  )
}

export default PlantsUser