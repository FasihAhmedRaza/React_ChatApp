
import { Button, Form, ListGroup } from 'react-bootstrap';
import './App.css';
import { useEffect, useState } from "react"
// import axios, { AxiosResponse, AxiosInstance } from 'axios';
const axios = require('axios');


// axios : ko install karna partha ha
// fetch : ko install nhi karna parhta

function App() {

  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  // setMessages((previousdata) => {
  //   previousdata.push({ sender: "bot", text: response.data.text });
  //   return [...previousdata];
  // });

  
  function sendMessage(e) {
    e.preventDefault();

    console.log("text: ", text);

    setMessages((previousdata) => {
    
      return [{ sender: "user", text: text }, ...previousdata,];
    });


    axios.post(`http://localhost:3000/talktochatbot`, {
      text: text
    })
      .then((response) => {
        console.log("response", response.data);

        setMessages((previousdata) => {
          return [{ sender: "bot", text: text }, ...previousdata,];
        })
        e.target.reset();
        setText("");

      }).catch(error => {
        console.log("error :", error);

        setMessages((previousdata) => {
          return [{ sender: "bot", text: "dummy response from chatbot" }, ...previousdata,];

        });
        e.target.reset();
        setText("");

      })

  }

  return (
    <div >

      <Form onSubmit={sendMessage}>
        <Form.Group
          style={{
            display: "flex",
            justifyContent: "space-between"
          }} className="mb-3" controlId="formBasicEmail">

         

          <Form.Control
            onChange={(e) => { setText(e.target.value) }}
            type="text"
            placeholder="Enter Your Message"
          />


          <Button variant="primary" onClick={sendMessage}>
            Submit
          </Button>

        </Form.Group>

      </Form>
      <br />
      <br />

      <div style={{ display: "flex", flexDirection: "column" }}>

        {messages?.map((eachMessage, eachMessageIndex) => (
          <div key={`${eachMessageIndex}-message`} style={{
            display: "flex",
            justifyContent: (eachMessage.sender === "user") ? "flex-end" : "flex-start"
          }}>

            <div>{eachMessage.text}</div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default App;
