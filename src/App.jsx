import { useEffect, useState, useRef } from 'react'
import { InputTodo } from './todo'

import './App.css'

function App() {


  return (
    <>
     
     <Pomodoro></Pomodoro>
     <footer className="grid grid-cols-1 items-center mx-auto w-[50%]">
          <span className="text-slate-700 font-semibold text-sm">Leonardo Martinez - 2024</span>
        </footer>
    </>
  )
}

const Pomodoro = () => {
  
  const [timer, setTimer] = useState(0)
  const [secPaused, setSecondPaused] = useState(0)
  const [totalTimer, setTotalTimer] = useState(0)
  const [start, setStart] = useState(false)
  const [sec, setSec] = useState(0)
  const [end, setEnd] = useState(false)
  const [restart, setRestart] = useState(false)

  const input = useRef(null);
  const title = useRef(null);


  useEffect(()=>{

    console.log("here")
    if(start && !restart){
      setSec(secPaused)
  
      console.log("started at ", timer)
      
    }
  },[restart])


  useEffect(() => {
    let intervalId;
    
    if (start && !restart && input.current.value !== "") {
      intervalId = setInterval(() => {
        setSecondPaused(sec);
        
        if (sec === 0 && timer > 0) {
          setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : prevTimer));
         
          setSec(59)
          
        }else{
          setSec((prevSec) => (prevSec > 0 ? prevSec - 1 : prevSec));
        }
        
        if (timer === 0 && sec === 0 && !restart) {
          clearInterval(intervalId);
          setEnd(true);
          input.current.disabled = false;
          EndSound()
        }
        document.title = (timer < 10 ? `0${timer}`: timer ) + ":" + (sec<10?`0${sec}`:sec) + " | Pomodoro Cat"
        console.log("total",totalTimer)
      }, 1000);
    }else{
      console.log("insertar numero")
    }

    return () => clearInterval(intervalId);
  }, [start, timer, sec]);

  
  const handleStart = () => {

    if(restart){
      setSec(0)
      setTimer(input.current.value)
      setRestart(false)
      setStart(false)
    }
    setStart(true);
    title.current.classList.remove("paused") 
    setTotalTimer(input.current.value)
    input.current.disabled = true;

  };

  const handleStop = () => {

    setStart(false);
    setSec(secPaused)
    title.current.classList.add("paused") 

  };


  const handleRestart = () => {

    setSec(0)
    setSecondPaused(0)
    setTimer(0)
    input.current.value = ""
    setRestart(true)
    setEnd(false)
    input.current.disabled = false;

  };

  const handleInput = (e, value=0) =>{
    setTimer(e.target.value - value)
  }
  

 
  
  return (
    <>
      
       
      <section className='w-[90%] lg:w-3/5 mx-auto '>
      
       <section className='my-5'>

            {
              start ? (<h1 ref={title} className='text-6xl'>{timer<10?`0${timer}`:timer}:{sec<10?`0${sec}`:sec}</h1>) : (<h1 ref={title} className='text-6xl'>00:00</h1>) 
            }
            {
              end&&(<h1 className='text-2xl text-slate-900 font-semibold flex items-end'><EndKitty number={2}/>¡Concluido! <EndKitty number={1}/></h1>)
            }
       </section>
        
        
        
        <input className='lg:w-[50%] mx-auto mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-0.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="number" name="timer" placeholder='Ingresar el tiempo' id="" ref={input} onChange={(e) => handleInput(e)}/>

        <section className='lg:w-3/5 md:w-3/5 mx-auto grid grid-cols-3 gap-3 items-center mt-14'>

        <button  onClick={e => {handleStart()}} ><svg className="w-6 h-6 mx-auto text-gray-800 dark:text-white" aria-hidden="true"  fill="#ec4899" viewBox="0 0 14 16">
             <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z"/>
            </svg></button>
        
   
          <button  onClick={e => {handleStop()}}><svg className="w-6 h-6 mx-auto text-gray-800 dark:text-white" fill="#ec4899" viewBox="0 0 12 16">
              <path d="M3 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm7 0H9a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z"/>
            </svg></button>
          <button  onClick={e => {handleRestart()}}><svg className="w-6 h-6 mx-auto text-gray-800 dark:text-white" aria-hidden="true" fill="none" viewBox="0 0 20 18">
              <path stroke="#ec4899" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3"/>
            </svg></button>

        </section>

        <InputTodo/>
      </section>
      <section>
      
       {
        start&&[<EndKitty number={2} anim='moving-right'/>, <EndKitty number={1} /> , <EndKitty number={3} anim='moving-left'/>]
       }
        
      
     
     

     
      </section>

       

     
   
    </>
  )

}

const EndKitty = ({number, anim=""}) => {
  return(

      <img className={`kitty mx-auto`} style={{animation:`${anim} 10s infinite`}} src={`Kitty${number}.gif`}></img>
    
  )
}

function EndSound(){
  const finallySound = new Audio("./sound/finally.ogg")
  finallySound.play()
}

export default App
