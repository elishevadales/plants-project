import React, { useEffect, useState } from 'react'

const useLazy = () => {

    let [endScreen, setEndScreen] = useState(false);
    let [isEvent, setIsEvent] = useState(false);


    useEffect(() => {
        // window.addEventListener("scroll", onScroll);
        // setIsEvent(true)
        // console.log("addEventListener")
        return () => {
            window.removeEventListener("scroll", onScroll);
            setIsEvent(false)
            console.log("removeEventListener")
        }
    }, [])

    const onScroll = () => {
        // if(isEvent == true){
                    // גובה החלון
        let windowHeight = window.innerHeight;
        //כמה רחוק הקצה העליון של החלון מהקצה העליון של המסמך
        let scrollTop = document.documentElement.scrollTop;
        //גובה המסמך
        let docHeight = document.documentElement.offsetHeight;
        console.log("scrollTop: " + scrollTop, "docHeight: " + docHeight)
        if (Math.ceil(windowHeight + scrollTop) >= docHeight -500) {
            console.log("end of page")
            setEndScreen(true)
        }
        // }


    }

    const endScreenFalse = () => {
        setEndScreen(false)
    }

    const endEvent = () => {
        window.removeEventListener("scroll", onScroll)
        setIsEvent(false)
        console.log("removeEventListener")
    }

    const addEvent = () => {
        window.addEventListener("scroll", onScroll);
        setIsEvent(true)
        console.log("addEventListener")
    }

    return [endScreen, endScreenFalse,endEvent,addEvent,isEvent]
}

export default useLazy