import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import User from './Components/User';

function App() {

  const [Tao,setTao] = useState([]);

  const fetchData = async () => {
    fetch('http://localhost:8080/api/tao',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => setTao(data))
    .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
     <h1 className='text-2xl'>Hello</h1>
     <User/>

     <h2 className='text-2xl mt-8'>Aray mo</h2>
     <div>
      {Tao.map((item, index) => (
        <div key={index} className="p-4 border-b">
          <p><strong>ID:</strong> {item.id}</p>
          <p><strong>Name:</strong> {item.name}</p>
          <p><strong>age:</strong> {item.age}</p>
          <p><strong>gender:</strong> {item.gender}</p>
        </div>
      ))}
     </div>
    </>
  )
}

export default App
