import { useEffect, useState } from 'react';

function App() {
const [users, setUsers] = useState([])
const [limit, setState] = useState(25)
const [isBottomPage, setIsBottomPage] = useState(false);

  useEffect(() => { 
    fetch(`https://dummyjson.com/users?limit=${limit}`)
    .then(resp => resp.json())
    .then(data => setUsers(data.users))
  }, [limit])
  
  window.onscroll = function() {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
      if (users.length === limit) {
        setIsBottomPage(true)
      }
    }
  }
  useEffect(() => {
    if (isBottomPage) {
      setState(limit + 25)
      setIsBottomPage(false)
    }
  },[isBottomPage])

  const map = users.map((user) => {
    return (<div key={user.id}>
      <p>{user.firstName}</p>
      <p>{user.lastName}</p>
      <img src={user.image} alt={user.id}/>
    </div>)
  })
  return (
    <div className="App">
      {users && map}
    </div>
  );
}

export default App;
