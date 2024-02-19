

const API_URL = 'http://localhost:8000/v1'
async function httpGetPlanets() {
 const response = await fetch(`${API_URL}/planets`)
  // Load planets and return as JSON.
  
  return await response.json()
}
 
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`)
  // Load launches, sort by flight number, and return as JSON.
  const fetchedLaunches = await response.json()
  return fetchedLaunches.sort((a,b)=>{
    return a.flightNumber-b.flightNumber;
  })
}
async function httpSubmitLaunch(launch) {
  try{
  return await fetch(`${API_URL}/launches`,{
    method:"post",
    body:JSON.stringify(launch),
    headers:{
      "Content-Type":"application/json"

    }
  })
  // Submit given launch data to launch system.
}
catch(err){
  return{
    ok:false
  }

}
}

async function httpAbortLaunch(id) {
  try{
  return await fetch(`${API_URL}/launches/${id}`,{
   method:"delete",

 })
}catch(err){
  return{
    ok:false
  }
}
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};