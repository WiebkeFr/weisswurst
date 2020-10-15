
const handleChange=(id)=>{
    console.log(id)
    const number = document.getElementById("button-number").innerText
    if(id === "button-sub"){
        if(number === "0") return
        document.getElementById("button-number").innerText=(Number.parseInt(number) - 1).toString()
    }else{
        if(id === "button-add"){
            document.getElementById("button-number").innerText=(Number.parseInt(number) + 1).toString()
        }
    }
}

const changeList = (id) => {
    console.log(id)
    if(id === "Wurstliebhaber"){

    }else{

    }
}