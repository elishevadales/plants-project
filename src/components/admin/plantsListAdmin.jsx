import React from 'react'
import CheckAdmin from './checkAdmin'
import { useState ,useEffect} from 'react';
import { API_URL,doApiGet } from '../../services/apiService';
import PageNav from '../general/pageNav';
import PlantItem from './plantItem';
import { useSearchParams } from 'react-router-dom';

const PlantsListAdmin = () => {

  const [ar, setAr] = useState([]);
  const [querys] = useSearchParams();

  useEffect(() => {
    doApi();
  }, [querys.get("page")])

  const doApi = async () => {
    
    //?page= איסוף
    let page = querys.get("page") || 1;
    let url = API_URL + "/plants/?page="+page;
    try {
      console.clear()
      let resp = await doApiGet(url);
      console.log(resp.data);
      setAr(resp.data);
    }
    catch (err) {
      console.log(err);
      alert("there problem ,try again later")
    }
  }

  return (
    <div>
      <CheckAdmin />

      <h1>List of plants</h1>
      <PageNav urlPageApi={API_URL+"/plants/count"} perPage={5} navToDir="/admin/plantsList?page=" cssClass="btn btn-info ms-2"  />
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>General Location</th>
            <th>Map Location</th>
            <th>Img_url</th>
            <th>Likes</th>
            <th>Coments</th>
            <th>Active</th>
            <th>Date</th>
            <th>UserId</th>
            <th>Edit/Del</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) => {
            return(
              <PlantItem key={item._id} index={i} item={item} doApi={doApi} />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default PlantsListAdmin