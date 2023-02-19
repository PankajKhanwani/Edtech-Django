import axios from "axios";

const endPoint =
"https://prod-in2.100ms.live/hmsapi/shiksha.app.100ms.live/";


    

    
    
        
        
    
 

export default async function getToken(role) {

    var bodyFormData = new FormData()
    bodyFormData.append('batch_id',localStorage.getItem('batch_id'))
    let res = await axios.post('http://127.0.0.1:8000/edtech/roominfo',bodyFormData)
    let id = res.data['room_id']
  // Fix in endPoint and roomId
    const response = await fetch(`${endPoint}api/token`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: 'Pankaj', // User ID assigned by you (different from 100ms' assigned id)
        role: role, // listener , speaker , moderator
        room_id: id
      }),
    });

    const { token } = await response.json();
  
    return token;
  }
    