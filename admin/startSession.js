export function startSession(token,username){
  fetch('https://dummyjson.com/auth/me', {
  method: 'GET', /* or POST/PUT/PATCH/DELETE */
  headers: {
    'Authorization': `Bearer ${token}`, 
    'Content-Type': 'application/json'
  }, 
  
})
.then(res => res.json())
.then(data=>{return data.username === username });

}