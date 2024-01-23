import { useEffect, useState, useRef } from 'react'


function InputTodo() {

    const [todo, setTodo] = useState([])
    const [newTodo, setNewTodo] = useState("")


    const inputText = useRef(null)
    
 

    return(
        <article>
            <h3 className='mt-4 lg:mt-8 text-2xl font-bold'>Todo-List</h3>
            <section className='flex gap-1 mt-4'>
                <input className='lg:w-[80%] mx-auto  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-0.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" name="" id="" onChange={(e) => setNewTodo(e.target.value)} ref={inputText}/>
                <button className='w-[50%] bg-blue-500 hover:bg-blue-700 text-white font-bold rounded' onClick={() => {
                    inputText.current.value = ""
                    setTodo([...todo, newTodo]) //agregamos todas las todos antiguas y la nueva. No andaba porque no estaba recibiendo un array[]
                    setNewTodo('')
                 }}>Add</button>
            </section>
            <section className='lg:mt-14'>
                {
                    todo.map((item,index) => 
                        <TodoList key={index} todo={item} />
                    )
                }
            </section>
        </article>
)
}

function TodoList({todo}){

    const [states,setState] = useState(false)
    const [remove, setRemove] = useState(false)
    const doneStyle = {
        textDecoration: "line-through",
        opacity: 0.6
    }
    const notDoneStyle = {
        textDecoration: "none",
        opacity: 1
    }
    

    function handleState(state){
        state && setState(!states) 
        console.log("clicked", states)
    }

    function handleRemoveTodo(){
        setRemove(true)
    }
    return(
        <div className="flex align-middle mt-2 mx-auto justify-center" style={remove ? {display: "none"} : {display: "flex"}}>
            <h3 className='link w-5/6 h-7' onClick={() => handleState(true)} style={states === true ? doneStyle : notDoneStyle } >{todo}</h3>
            <button className='bg-red-500 hover:bg-red-700 text-white font-bold rounded w-8 h-7' onClick={() => handleRemoveTodo()}>X</button>
        </div>
  

    )
}



export{
    InputTodo
}