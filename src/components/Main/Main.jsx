import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
function Main() {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    return (
        <div className='main'>
            <div className='nav'>
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult ? <>
                    <div className="greet">
                        <p><span>Hello, Prashant</span></p>
                        <p>How can I help you today?</p>
                    </div>
                    <div className="cards">
                        <div className="card">
                            <p>Give me ideas for what to do with whats in this image?</p>
                            <img src={assets.compass_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>Help create a weekly meal plan for two</p>
                            <img src={assets.code_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>Act like Mowgli from The Jungle Book and answer questions</p>
                            <img src={assets.message_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>Explain what the keto diet is in simple terms</p>
                            <img src={assets.bulb_icon} alt="" />
                        </div>
                    </div>

                </> : <div className="result">
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {loading ? <div className="loader">
                            <hr />
                            <hr />
                            <hr />
                        </div> :
                            <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                        }
                    </div>
                </div>
                }
                <div className="main-bottom">
                    <div className="search-box">
                        <input type="text" placeholder='Enter a prompt here' onChange={(e) => setInput(e.target.value)} value={input} />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input?<img onClick={() => onSent()} src={assets.send_icon} alt="" />:null}
                        </div>
                    </div>
                    <p className='bottom-info'>
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy & Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Main