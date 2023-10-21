
import { useEffect, useState } from 'react';
import './App.css';
import Allroutes from './Components/Allroutes';
import Navbar from './Components/Navbar';
import { Spinner } from '@chakra-ui/react';
// import Navbar from './Components/Navbar';
// import Signup from './Components/Signup';

function App() {

  const [data,setData]=useState([])
  const [loading, setLoading] = useState(true);
  // console.log("data:",data)
    const key="17be99a7ad524f6eaf2e4da9306f6427"
    const num=15
    useEffect(()=>{
        fetch(`https://api.spoonacular.com/recipes/random?apiKey=${key}&number=${num}`).then(res=>res.json()).then(res=>{
            // console.log(res.recipes)
            localStorage.setItem('food', JSON.stringify(res.recipes));
            setData(res.recipes)
            setLoading(false)
        }).catch(err=>{
            // console.log(err)
            setLoading(true)
        })
    },[])
  return (
    <div className="App">
      
      {loading ? (
      <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl'
    /> 
      ) 
      : 
      (
        <>
        <Navbar/>
        <Allroutes recipe={data} />
        </>
    )}
      {/* <Signup/> */}
    </div>
  );
}

export default App;
