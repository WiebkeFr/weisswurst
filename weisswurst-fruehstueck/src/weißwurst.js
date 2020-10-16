
const handleChange=(id) => {
    let buttonNumber = Number.parseInt(id.toString().charAt(id.length-1))
    if(id.toString().charAt(id.length-2) === "1") buttonNumber = 11
    if(id.toString().startsWith("button-sub")){
        buttonNumber++
        const number = document.getElementById("button-number-" + buttonNumber).innerText
        if(number === "0") return
        document.getElementById("button-number-" + buttonNumber).innerText = (Number.parseInt(number) - 1).toString()
    }else{
        if(id.toString().startsWith("button-add")){
            buttonNumber--
            const number = document.getElementById("button-number-" + buttonNumber).innerText
            document.getElementById("button-number-" + buttonNumber).innerText = (Number.parseInt(number) + 1).toString()
        }
    }
}

const changeList = (id) => {
    console.log(id)
    if(id === "Wurstliebhaber"){
        document.getElementById("meatList").style.display = "block"
    }else{
        document.getElementById("meatList").style.display = "none"
    }
}

const placeOrder = () => {
    const order = {}
    order.name = document.getElementById("name-input").value
    order.email = document.getElementById("email-input").value
    order.meal = {
        weißwürste: document.getElementById("button-number-1").innerText,
        debreziner: document.getElementById("button-number-4").innerText,
        karottensalat: document.getElementById("button-number-7").innerText,
        brezen: document.getElementById("button-number-10").innerText
    }

    document.getElementById("addingNewOrder").style.display = "none"
    nameForOrder = document.createElement("p")
    nameForOrder.innerText = order.name
    let newOrder = document.createElement("li")
    newOrder.setAttribute("class", "orderContainer")
    console.log(newOrder.class)
    newOrder.appendChild(nameForOrder)
    orderText =
    document.getElementById("orderList").appendChild(newOrder)
}

const openNewOrder = () => {
    document.getElementById("addingNewOrder").style.display = "block"
}
