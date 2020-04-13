import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {text}
    axios.post('/api/new', newPost)
      .then(() => {
        console.log("success")
        axios.get('/api/all')
          .then((res) => {
            setTodos(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log(err);
      })
    
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setText(value);
  }

  // useEffect(() => {
  //   function handleRetrieveTodos(){

  //   }
  //   axios.get('/api/all')
  //     .then((res) => {
  //       setTodos(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={handleChange}/>
        <button>Submit</button>
      </form>
      <ul>
        {
          todos.map((todo) => {
            return (
              <li>{todo.text}</li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
