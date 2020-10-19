import React, {useState} from "react"

function Delivery(){
    const [name, setName] = useState("")

    const arr = ["name1", "name2", "name3"]

    const chooseName = () => {
        const name = arr[Math.floor(Math.random() * arr.length)]
        setName(name)
    }

    return(
        <div>
            <h1>2 Wer darf holen?</h1>
            <h2>Wer darf heute holen? Drück den "Glücks-Button". Toi Toi Toi.</h2>
            <button className="buttons" onClick={chooseName}>Jetzt wählen</button>
            <h2>Herzlichen Glückwünsch! Gewinner darf heute die Bestellung holen.</h2>
            <h3>{name}</h3>
            <button className="buttons" onClick={chooseName}>Nochmal versuchen</button>
        </div>

    )
}

export default Delivery