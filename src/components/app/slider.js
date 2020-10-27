import React from "react"
import './slider.css'
import {useState} from "react"
import Intro from "../intro/intro"
import Delivery from "../delivery/delivery"

function Slider () {
    const [page, setPage] = useState('1')

    const onClick= (event) => {
        const page = event.target.href.toString().charAt(event.target.href.toString().length -1)
        setPage(page)
    }

    return(

        <div className="slider">
            <Intro />

            <div className="button--container">
                <hr/>
                <div className="circle--container">
                    <a className={page === '1' ? "bigCircle": "circle"} href="#slide-1" onClick={onClick}/>
                    <a className={page === '2' ? "bigCircle": "circle"} href="#slide-2" onClick={onClick}/>
                    <a className={page === '3' ? "bigCircle": "circle"} href="#slide-3" onClick={onClick}/>
                </div>
            </div>

            <div className="link--container">
                <a className={page === '1' ? "link--active": "link--inactive"} href="#slide-1" onClick={onClick}>Bestellung</a>
                <a className={page === '2' ? "link--active": "link--inactive"} href="#slide-2" onClick={onClick}>Wer darf holen?</a>
                <a className={page === '3' ? "link--active": "link--inactive"} href="#slide-3" onClick={onClick}>Einkaufsliste</a>
            </div>

            <div className="slides">
                <div className="page" id="slide-1">
                    1
                </div>
                <div className="page" id="slide-2">
                    <Delivery orderItems={[]} setDeliverer={() => console.log("deliverer")}/>
                </div>
                <div className="page" id="slide-3">
                    3
                </div>
            </div>

        </div>
    )
}

export default Slider
