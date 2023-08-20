
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [coursename, setCoursename] = useState('')
  const [fireDate, setFireDate] = useState('July 20, 69 20:17:40 GMT+00:00')
  const [time, setTime] = useState('')
  const [plan, setPlan] = useState('')
  const [date, setDate] = useState(Date())

  const [coursenumber, setCoursenumber] = useState('')




  const activateBot = () => {
    if(username == '' || password == '' || coursename == '' || coursename == '' || time == ''){
      alert('Nicht alle Werte wurden eingegeben!')
    }
    else if((myDate - Date.now())/1000 > 180) {
      alert('Den Button erst drei Minuten vorher (180 Sekunden) drücken!')
    }
    else
    {
      axios.post('http://localhost:3001/activateBot/inputValues', {
        username : username,
        password: password,
        lvname: coursename,
        lvcode: coursenumber,
        time : parseInt(time),
        plan: plan
       // coursetype: coursetype 
      }).then((response) => {
        if (response.success) {
          setTime('')
          alert('die Anmeldung war erfolgreich!')
        }
      }).catch((error) => {
        alert(error.message + 'Versuchen Sie es nochmal')
      
      })
    }
     
  }



  useEffect(()=>{
    var timer = setInterval(()=>setDate( Date()), 1000 )
    return function cleanup() {
        clearInterval(timer)
    }
  }, [time || date])

  const today = new Date()
  const myDate = new Date(`${today.getFullYear().toString()}-${parseInt(today.getUTCMonth().toString()) < 10 ? '0' : ''}${parseInt(today.getUTCMonth().toString())+1}-${today.getDate().toString()}T${time - 2}:00:00Z`)


  


  return (
    <>
    <div className='LPIS-body' >
     <h1 className='LPIS-header'>LPIS-Bot</h1>
     <br></br>
     <h2 className='LPIS-header'>Wichtige Informationen:</h2>
     <h3 className='info'>Der Bot hilft Ihnen dabei, automatisch und schnell den anmelde-button freizuschalten und ihn im Anschluss zu drücken. Eine gute Internetverbindung ist dennoch unerlässlich und spielt eine wichtige Rolle. Sie müssen sich nicht anmelden, auch das übernimmt der Bot! Bevor sie den Bot verwenden können, müssen Sie unbedingt der Bot-Server starten! Alle Handlungen sind eigenverantwortlich! Maximal drei Minuten vorher auf den "FIRE"-Button drücken, sonst funktioniert die Anmeldung nicht!
     Der Bot funktioniert nur auf deutscher Sprache und im zentral-europäischen Zeitraum, das Gerät muss unbedingt auf jene Zeit geschalten sein! Viel Erfolg!</h3>
     <br></br>
     <div className='input-box'>
    <h4 className='LPIS-header'>Studienplan: </h4> <input onChange={(e)=>{setPlan(e.target.value)}} value={plan}></input></div>
     <br></br>
     <div className='input-box'>
    <h4 className='LPIS-header'>LPIS-Benutzername: </h4> <input onChange={(e)=>{setUsername(e.target.value)}} value={username}></input></div>
     <br></br>
     <div></div>
     <h4 className='LPIS-header'>LPIS-Passwort: </h4>  <input type={'password'} value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
     <br></br>
     <div>
     <h4 className='LPIS-header'>Kursname: </h4>  <input placeholder='z.B. Betriebswirtschaft' value={coursename} onChange={(e)=>{setCoursename(e.target.value)}}></input>
     </div>
    
     <br></br>
     <div>
     <h4 className='LPIS-header'>Kursnummer: </h4>  <input placeholder='z.B. 1000' value={coursenumber} onChange={(e)=>{setCoursenumber(e.target.value)}}></input>
     </div>
  
     <br></br>
     <br></br>
     <select name='Uhrzeit der Anmeldung wählen' onChange={(e)=>{
      setTime(e.target.value)
      setFireDate(new Date(`${e.target.value}`))
     }}>
      <option id={0} value={9} >9:00</option>
      <option id={1} value={10} >10:00</option>
      <option id={2} value={11} >11:00</option>
      <option id={3} value={12}>12:00</option>
      <option id={4} value={13}>13:00</option>
      <option id={5} value={14}>14:00</option>
      <option id={6} value={15}>15:00</option>
      <option id={7} value={16}>16:00</option>
      <option id={8} value={17}>17:00</option>
     </select>
     <br></br>
      <br></br>
     <button className='button' onClick={()=>{activateBot()}}>FIRE!</button>
    </div>
         <div className='timer' style={{display: time !== '' ? 'flex' : 'none'}}>
         <h2>Timer für {time}:00</h2>
         <h3 key={date}>{date}</h3>
         <h4>noch {(myDate - Date.now())/1000} Sekunden</h4>
         <button className='button' onClick={()=>{
        setTime('')
        setPassword('')
        setUsername('')
        setCoursename('')
        setCoursenumber('')}}>abbrechen</button>
         </div>
         </>

  );
}

export default App;
