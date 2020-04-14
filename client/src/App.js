import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [regErrMsg, setRegErrMsg] = useState("");
  const [logErrMsg, setLogErrMsg] = useState("");
  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {firstName, lastName, email, password};
    axios.post('/api/register', newUser)
      .then((res) => {
        const token = res.data;
        localStorage.setItem('token', token);
        console.log(res.data);
      })
      .catch((err) => {
        setRegErrMsg(err.response.data);
        console.log(err);
      })
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {logEmail, logPassword};
    axios.post('/api/login', user)
      .then((res) => {
        // setCurrentUser(res.data);
        const token = res.data;
        localStorage.setItem('token', token);
        console.log(res.data);
      })
      .catch((err) => {
        setLogErrMsg(err.response.data);
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
      {
        localStorage.getItem('token') &&
        <button onClick={() => localStorage.removeItem("token")}>Signout</button>
      }

      <h1>Register</h1>
      <p>{regErrMsg}</p>
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
      <p>{logErrMsg}</p>
      <form onSubmit={handleLogin}>
        Email
        <input type="text" value={logEmail} onChange={e => setLogEmail(e.target.value)}/>
        Password
        <input type="password" value={logPassword} onChange={e => setLogPassword(e.target.value)}/>
        <button>Submit</button>
      </form>

      <br/>

      {
        currentUser && 
          <h1>{currentUser.firstname}</h1>
      }
      
    </div>
  );
}

export default App;
