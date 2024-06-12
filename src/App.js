import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";
import "./index.css";
import axios from 'axios';
import sendimg from './assets/send_icon.png';



function App() {
  const [input, setinput] = useState("");
  const [ans, setans] = useState("");
  const [loading ,setloading] = useState(false);

  const apiKey = process.env.REACT_APP_API_KEY;

  async function generateAnswer() {
    setloading(true);
    setans("loading...");
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        { contents: [{ parts: [{ text: input }] }] }
      );
      

    setans(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
  }catch(err){
    setans(err);
  }finally {
    setloading(false);
  }
  }


  return (
    <main>
      <section className="markdown">
      <h1>AI Bot</h1>
      <div className="input-field">
      <input type="text"
        className="prompt"
        placeholder="Enter the prompt here.."
        value={input}
        onChange={(e) => {
          setinput(e.target.value);
        }}
      />
      <button onClick={generateAnswer} className="btn"><img src={sendimg}/></button>
      </div>
        <article className="result">
        {loading ? (<div className="loader"> <hr/><hr/><hr/> </div> ):(<ReactMarkdown>{ans}</ReactMarkdown>)}
        </article>
      </section>
    </main>
  );
}

export default App;
