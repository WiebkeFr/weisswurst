import React, {useState} from "react"
import './delivery.css'

function Delivery({orderItems, setDeliverer}){
    const [name, setName] = useState("")

    const chooseName = () => {
        const names = orderItems.map(order => order.name)
        const name = names[Math.floor(Math.random() * names.length)]
        setName(name)
        setDeliverer(name)
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