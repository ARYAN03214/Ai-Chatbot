import {useState} from "react";
import { useEffect } from "react";

import './App.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import SyncLoader from "react-spinners/SyncLoader";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
function App() {
  
  const APIKEY = "AIzaSyCn9PiLHTRVDpBjIiFlMh5vCGnfg1I-ymE"
  // "AIzaSyCn9PiLHTRVDpBjIiFlMh5vCGnfg1I-ymE";
  //import.meta.env.VITE_API_GEMINI_KEY;

  
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState([
  {
  prompt:"Hi, can you help me today?",
  response: "Absolutely I'd be happy to assist. Feel free to ask.",
  }
  ])
  let [loading, setLoading] = useState(false);
  

async  function fetchChatResponseFromGemini(){
  setLoading(true);
  // create an instance of the GoogleGenerativeAI
    const genAI = new GoogleGenerativeAI(APIKEY);
    // we have selected the model "gemini -1.5-flash"
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
   
    // we have given the prompt to the model and it will generate the response
    const result = await model.generateContent(prompt);
    // we will get the response from the model
   const newResponse = [
    ...response,
    {prompt: prompt, response: result.response.text()},
   ]
    setResponse(newResponse);
   // setResponse(result.response.text());
   setPrompt("");
   setLoading(false);
   // save the response in the local storage
   //localStorage.setItem('chatbotResponse', JSON.stringify(newResponse));
  }

  //  useEffect(()=>{
  // //    // get the response from the local storage
  //  const data =  localStorage.getItem('chatbotResponse');
  //  if (data){
  //  setResponse(JSON.parse(data));
  //  }
  //  },[])
  //  console.log("response", response);

  return (
    <>
    <h1 className='heading'>AI Chatbot</h1>
     <div className= 'chatbot_container'>

      <div className="chatbot_response_container">
     
      {
        response?.map((res,index)=>(
          <div key={index} className="response"> 
          <p className="chatbot_prompt">
            <strong>user :-</strong> {res.prompt}</p>
            <p className="chatbot_response"><strong>chatbot :- </strong> {res.response}</p>
          </div>
         )
       )
      }
      {
        loading &&
      <SyncLoader
        color={"chocolate"}
        loading={loading}
        cssOverride={override}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      }     
    </div>
     <div className="chatbot_input">
      <input type="text" name="input" placeholder="enter your questions" className="input" value={prompt}
       onChange={(e)=>{
        setPrompt(e.target.value);

      }}/>
      <button type="button" onClick={fetchChatResponseFromGemini}>submit</button>
      </div>  
    </div>
    </>
  )
}
export default App
