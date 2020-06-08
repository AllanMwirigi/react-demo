

async function fetchData(route){
  const fetchOptions = {
    method: "GET"
  }
  // TODO, surround with try-catch and handle the errors where this function is used 
  let res = await fetch(route, fetchOptions);
  let result = await res.json();
  return result;
}

async function postData(route, data){
  const fetchOptions ={
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  // TODO, surround with try-catch and handle the errors where this is used   
  const res = await fetch(route, fetchOptions);
  const result = await res.json();
  return result;
}

export {fetchData, postData}