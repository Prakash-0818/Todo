import { useState } from "react";
import './TodoList.css';
import { useEffect } from "react";

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [Todo, setTodo] =  useState([]);

  useEffect(()=>{
    const storedTodo = localStorage.getItem('Todo');
    try{
        const parsedData = JSON.parse(storedTodo);
        setTodo(parsedData);
    }catch(error){
        console.log("Error parsing", error);
    }
  },[setTodo]);

  useEffect(()=>{
    localStorage.setItem('Todo', JSON.stringify(Todo));
  },[Todo]);

  function submitHandler(e){
    e.preventDefault();
    if(inputValue.trim() ==="") {
        alert("Please Enter details")
    }else {
        setTodo((prev)=> {
            const updatedList = [...prev, inputValue];
            setInputValue('');
            return updatedList;
        });
    }
    
  }

  function removeHandler(i) {
    const updatedListData = Todo.filter((ele, id)=>{
        return i!=id;
    })

    setTodo(updatedListData);
  }

  function deleteAllHandler(){
    setTodo([]);
  }

  return (
    <>
      <div className="container">
        <h1 className="heading">Todo List Here !!</h1>
        <div className="input-btn">
            <form onSubmit={submitHandler} >
            <input
            type="text"
            placeholder="Enter worklist "
            value={inputValue}
            maxLength={30}
            onChange={(e) => setInputValue(e.target.value)}
            
          />
          <button type="submit">ADD</button>
            </form>
         
        </div>
        <p className="list-heading">Your Added list Below :=)</p>
        <hr className="horizontal-border"/>
        {
          Todo!=[] && Todo.map((data, index)=>{return (
            <>
            <div className="list-data-container" key={index}>
            <p className="list-data" >{data}</p>
            <button onClick={()=>removeHandler(index)}>Delete (-)</button>
            </div>
            </>
          )
          })
        }

        {
            Todo.length > 1 ? <div className="remove-all"><button onClick={deleteAllHandler}>Delete All</button></div>: ""
        }        
      </div>
    </>
  );
};

export default TodoList;
