import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {firstName, lastName, email, password};
    axios.post('/api/register', newUser)
      .then((res) => {
        setCurrentUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setErrMsg(err.response.data);
        console.log(err);
      })
    
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
      <h1>Register</h1>
      <p>{errMsg}</p>
      <form onSubmit={handleRegister}>
        First Name
        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>
        Last Name
        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
        Email
        <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
        Password
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button>Submit</button>
      </form>

      <br />

      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        Email
        <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
        Password
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button>Submit</button>
      </form>
      {
        currentUser && 
          <h1>{currentUser.firstname}</h1>
      }
      
    </div>
  );
}

export default App;
