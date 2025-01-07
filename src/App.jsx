import axios from 'axios';
import React, { useState } from 'react';

const App = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [style,setstyle] = useState(true)

  async function generateAnswer() {
    setAnswer("Loading....");

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB5HJZwm8kD6rxqb1R9f1nXOUREraGdTWw",
        method: "post",
        data: {
          "contents": [{
            "parts": [{
              "text": question
            }]
          }]
        }
      });

      const generatedAnswer = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry....Answer not available";
      setAnswer(generatedAnswer);
      
    } catch (error) {
      setAnswer("Error: Unable to fetch answer.");
    }
  }



  return (
    <>
      <center>
        <h1 className='heading'>AI Chatbot</h1>
        <div className='main'>
          <pre>{answer}</pre>
        </div>

        <div className='container'>
          <textarea
            className='text'
            placeholder='Type your question here....'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            cols="80" rows="2"
          />
          <button className='answer' onClick={generateAnswer}>Answer</button>
        </div>
      </center>
    </>
  );
};

export default App;
