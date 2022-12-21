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
    console.log(item.name)

    return (
        
        <tr>
            <td>{props.index + 1}</td>
            <td>{item.name}</td>
            <td>{item.location}</td>
            <td>{JSON.stringify(item.mapLocation, null, 2)}</td>
            <td><img src={item.img_url} height="40" alt="pic"/></td>
            <td>{item.likes} </td>
            <td>{item.comments} </td>
            <td>{String(item.active)} </td>
            <td>{item.date_created} </td>
            <td>{item.user_id} </td>

            <td>
                <button onClick={() => { onDelClick() }} className='btn btn-danger'>Del</button>
            </td>
        </tr>
    )
}

export default PlantItem