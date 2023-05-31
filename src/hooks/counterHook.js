import { useState } from "react";

// נהוג שם של הוק להתחיל עם יוז
export default function useCounter(_num){
  const [num,setNum] = useState(_num);

  const addOne = () => {
    setNum(num+1);
  }

  const resetNum = () => {
    setNum(0);
  }

  const addCustom = (_val) => {
    setNum(num+_val);
  }

  // הוק
  // יחזיר בדרך כלל דיסטרקשן של מערך או אובייקט במקום
  // JSX
  return [num,addOne,resetNum,addCustom]

}