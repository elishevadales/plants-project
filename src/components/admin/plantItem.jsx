import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL,doApiMethod } from '../../services/apiService';

const PlantItem = (props) => {

    const myUserInfo = useSelector((myStore) =>
    myStore.userInfoSlice)
    const nav = useNavigate();

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
    let date = item.date_created.slice(8, 10) + "/" + item.date_created.slice(5, 7) + "/" + item.date_created.slice(0, 4);
    
    
    const onClickItemAdmin = (item) => {
        console.log(item.likesList)
        console.log(myUserInfo)
        nav(
          '/admin/plantDetails', {
          state: {
            item: item,
            like: item.likesList.includes(myUserInfo.user._id) ? true : false
          }
        });
      }

    return (
        
        <tr>
            <td>{props.index + 1}</td>
            <td><span style={{cursor:"pointer"}} onClick={() => onClickItemAdmin(item)}>{item.name}</span></td>
            <td>
            <span style={{fontWeight:"bold"}}>lat: </span>{item.mapLocation.lat.$numberDecimal} <br/>
            <span style={{fontWeight:"bold"}}>long: </span>{item.mapLocation.long.$numberDecimal}
            </td>
            <td><img src={item.img_url_preview} height="40" alt="pic"/></td>
            <td>{item.likes} </td>
            <td>{item.comments} </td>
            <td>{String(item.active)} </td>
            <td>{date} </td>
            <td>{item.user_id._id} </td>
            <td>{item.user_id.name} </td>

            <td>
                <button onClick={() => { onDelClick() }} className='btn btn-danger'>Del</button>
            </td>
        </tr>
    )
}

export default PlantItem