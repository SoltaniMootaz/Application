import axios from 'axios';
import React,{useState,useEffect} from 'react'
function InfoClient() {
    const [data, setData] = useState()
    const userId=localStorage.getItem("userID");
    const url = "http://localhost:3001/api/afficherClients/"+userId;
    const getdata=()=>{
      axios.get(url).then((res)=>setData(res.data)).catch((err)=>console.log(err))
    }
   
  useEffect(() => {
  getdata();
  }, []);
  console.log(data);
    return (
        <div>
            
        </div>
    )
}

export default InfoClient
