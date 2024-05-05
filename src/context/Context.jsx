import React, { useState } from "react";
import runChat from "../config/gemini";
export const Context = React.createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const newChat = ()=>{
    setShowResult(false);
    setLoading(false);

  }

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prevData) => prevData + nextWord);
    }, 75 * index);
  };
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      response = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      response = await runChat(input);
      setRecentPrompt(input);
      setPrevPrompts((prevPrompts) => [...prevPrompts, input]);
    }
    let responseArr = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArr.length; i++) {
      if (i == 0 || i % 2 != 1) {
        newResponse += responseArr[i];
      } else {
        newResponse += "<b>" + responseArr[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArr = newResponse2.split(" ");
    for (let i = 0; i < newResponseArr.length; i++) {
      delayPara(i, newResponseArr[i] + " ");
    }
    setLoading(false);
    setInput("");
  };
  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    recentPrompt,
    setRecentPrompt,
    input,
    setInput,
    onSent,
    showResult,
    loading,
    resultData,
    newChat
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
