
const handleChange=(id) => {
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
        document.getElementById("mealList2").style.display = "none"
        document.getElementById("mealList1").style.display = "block"
    }else{
        document.getElementById("mealList1").style.display = "none"
        document.getElementById("mealList2").style.display = "block"
    }
}

const placeOrder = () => {
    const order = {}
    order.name = document.getElementById("name-input").value
    order.email = document.getElementById("email-input").value
    order.meal = document.getElementById("Wurstliebhaber").checked ? "mealList1" : "mealList2"

    document.getElementById("addingNewOrder").style.display = "none"
}

const openNewOrder = () => {
    document.getElementById("addingNewOrder").style.display = "block"
}
