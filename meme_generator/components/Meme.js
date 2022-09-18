import React from "react"
import domtoimage from "dom-to-image"
import Note from "./Note"

export default function Meme() {
    
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/1bij.jpg",
        subject:"One Does Not Simply"
    })
    const [allMemes, setAllMemes] = React.useState([])
    

    
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    
    
    
    const download=()=>{
        let node=document.getElementById("meme--container");
        domtoimage.toJpeg(node).then((dataUrl)=>{
            var anchor=document.createElement('a');
            anchor.download=`${meme.subject}.jpeg`
            anchor.href=dataUrl
            anchor.click()
        })
    }
    
    const getMemeImage=()=> {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        const subjectName=allMemes[randomNumber].name
        setMeme(prevMeme => Object.assign({},prevMeme,{randomImage:url,subject:subjectName}))
    }
    
    const handleChange=(event)=> {
        const {name, value} = event.target
        setMeme(prevMeme => Object.assign({},prevMeme,{[name]:value}))
    }
    
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme" id="meme--container">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            <button className="download" onClick={download}>
                Download &#10515;
            </button>
            
            <Note/>
            
        </main>
    )
}