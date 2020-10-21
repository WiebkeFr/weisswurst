import React from 'react'

function OrderItem(props){

    const editOrder = () => {
        props.editOrder(props.order)
    }

    return(
        <tr className="orderItem" >
            <td style={{width: "50%"}}>{props.order.name}</td>
            <td>
                {props.menu.map(menuItem => {
                    return (
                        <React.Fragment key={menuItem.id}>
                            {Number.parseInt(props.order.meals[menuItem.id].amount) > 0 ?
                                props.order.meals[menuItem.id].amount + "x " + menuItem.name + " " : ""}
                        </React.Fragment>
                    )
                })}
            </td>
            <td><button onClick={editOrder}>B</button></td>
            <td>L</td>
        </tr>
    )
}

export default OrderItem
