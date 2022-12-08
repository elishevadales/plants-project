import React from 'react'
import { API_URL } from '../../services/apiService';
import { doApiMethod } from '../../services/apiService';
import { Button, Modal } from '@mui/material';

const UserItem = (props) => {
    let item = props.item;

    const onRoleClick = async () => {
        let bodyData;
        if (item.role == "user") {
            bodyData = { role: "admin" }
        }
        else {
            bodyData = { role: "user" }
        }

        let url = API_URL + "/users/changeRole/" + item._id;
        try {
            let resp = await doApiMethod(url, "PATCH", bodyData)
            console.log(resp.data)
            if (resp.data) {
                props.doApi()
            }
        }
        catch (err) {
            console.log(err.response);
            alert("There problem, or you try to change superAdmin to user");
        }
    }

    const onActiveClick = async () => {
        let bodyData;
        if (item.active == true) {
            bodyData = { active: false }
        }
        else {
            bodyData = { active: true }
        }

        let url = API_URL + "/users/changeActive/" + item._id;
        try {
            let resp = await doApiMethod(url, "PATCH", bodyData)
            console.log(resp.data)
            if (resp.data) {
                props.doApi()
            }
        }
        catch (err) {
            console.log(err.response);
            alert("There problem, or you try to change superAdmin to false");
        }
    }

    const onXClick = async() => {
        
        
        if(window.confirm("are you sure you want to delete "+  item.name + "'s acount?")){
    
            

            try {
                let url = API_URL + "/users/" + item._id;
                let resp = await doApiMethod(url, "DELETE");
                console.log(resp.data);
                if (resp.data.deletedCount == 1) {
                    props.doApi()
                }
            }
            catch (err) {
                console.log(err.response);
                alert("There is a problem, or you are trying to delete superAdmin");
            }

        }
        

    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td><img src={item.img_url} height="40" alt="pic"/></td>
            <td>{item.date_created}</td>
            <td>
                {
                    item.role == 'admin' ?
                        <Button style={{ background: "rgb(170, 249, 255)", color: "black", border: "1px solid black" }} onClick={onRoleClick}>
                            {item.role}
                        </Button>
                        :
                        <Button style={{ background: "white", color: "black", border: "1px solid black" }} onClick={onRoleClick}>
                            {item.role}
                        </Button>
                }

            </td>
            <td>
                {item.active ?
                    <Button style={{ background: "green", color: "white" }} onClick={onActiveClick}>
                        {String(item.active)}
                    </Button>
                    :
                    <Button style={{ background: "red", color: "white" }} onClick={onActiveClick}>
                        {String(item.active)}
                    </Button>
                }
            </td>
            <td>
                <Button style={{background:"red",color:"white"}} onClick={onXClick}>X</Button>
            </td>
        </tr>
    )
}

export default UserItem