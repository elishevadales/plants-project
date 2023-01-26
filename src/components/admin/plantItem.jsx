import React from 'react'
import { API_URL,doApiMethod } from '../../services/apiService';

const PlantItem = (props) => {

    

    const onDelClick = async () => {
        if (window.confirm("Are you sure you want to delete " + item.name + "?")) {
            try {
                let url = API_URL + "/plants/" + item._id;
                let resp = await doApiMethod(url, "DELETE");
                console.log(resp.data);
                if (resp.data.deletedCount == 1) {
                    props.doApi();
                }
            }
            catch (err) {
                console.log(err.response);
                alert("There problem , try again later")
            }

        }
    }

    let item = props.item;

    return (
        
        <tr>
            <td>{props.index + 1}</td>
            <td>{item.name}</td>
            <td>
            <span style={{fontWeight:"bold"}}>lat: </span>{item.mapLocation.lat.$numberDecimal} <br/>
            <span style={{fontWeight:"bold"}}>long: </span>{item.mapLocation.long.$numberDecimal}
            </td>
            <td><img src={props.previeImage + item.img_url_preview} height="40" alt="pic"/></td>
            <td>{item.likes} </td>
            <td>{item.comments} </td>
            <td>{String(item.active)} </td>
            <td>{item.date_created} </td>
            <td>{item.user_id._id} </td>
            <td>{item.user_id.name} </td>

            <td>
                <button onClick={() => { onDelClick() }} className='btn btn-danger'>Del</button>
            </td>
        </tr>
    )
}

export default PlantItem