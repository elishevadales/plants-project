
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

import React, { useRef } from 'react'
import { API_URL ,TOKEN_NAME} from '../../services/apiService';

const AddAvatar = (props) => {

    const fileRef = useRef();
    const nav = useNavigate();

    const onSub = (e) => {
      console.clear()
      e.preventDefault();
      
      doApiFileUpload();
  
    }
  
    const doApiFileUpload = async() => {
        console.log(fileRef.current.files[0])
        if(fileRef.current.files.length == 0){
          return alert("you need to choose file and then upload it")
        }
        let myFile = fileRef.current.files[0];
        if(myFile.size > 2 * 1024 * 1024){
          return alert("file too big")
        }
        console.log(myFile);
        // new FormData() -> יודע להתעסק בטופס עם מידע כמו קבצים מהצד לקוח
        const formData = new FormData();
        formData.append("avatar",myFile);
        let url = API_URL+"/upload/avatar/";
        try{  
          let resp = await axios.post(url, formData, {
            headers: {
              'x-api-key': localStorage[TOKEN_NAME]
            }
          })
          if(resp.data.status){
            alert("file uploaded")
            props.handleClose();
            // props.doApi();
          }
        }
        catch (err) {
          alert("there error, try again later")
          console.log(err);
        }
      }

    return (
        <div>
        <form onSubmit={onSub}>
          <label>Upload file</label>
          <input ref={fileRef} type="file"  />
          <br/>
          <button>Upload</button>
        </form>
      </div>
    )
}

export default AddAvatar