import React from "react";
import { OrderItemsContext } from "../orderItems-context";
import "./slider-header.css";

function SliderHeader({ page, setPage }) {

  const onClick = (orderItems, event) => {
    if (orderItems.length === 0) return;
    const newPage = event.target.id
      .toString()
      .charAt(event.target.id.toString().length - 1);

    const slides = document.getElementById("slides")
    const slidesWidth = slides.getBoundingClientRect().width
    const left = slidesWidth * (newPage - 1)

    slides.scrollTo({
      left,
      behavior: "smooth"
    })

    setPage(page);
  };

  return (
    <OrderItemsContext.Consumer>
      {({state, dispatch}) => (
        <div className="button--container">
          <hr />
          <div className="circle--container">
            <button
              onClick={(event) => onClick(state.orderItems, event)}
            >
              <div
                id="circle-1"
                className={
                  state.orderItems.length !== 0
                    ? "circle-done"
                    : (
                        page === "1"
                        ? "circle-active"
                        : "circle"
                    )
                }
              />
              <p
                id="caption-1"
                className={
                  page === "1" || state.orderItems.length !== 0
                    ? "link--caption-active"
                    : "link--caption-inactive"
                }
              >
                Bestellung
              </p>
            </button>
            <button
              onClick={(event) => onClick(state.orderItems, event)}
            >
              <div
                id="circle-2"
                className={
                  state.deliverer !== ""
                    ? "circle-done"
                    : page === "2"
                    ? "circle-active"
                    : "circle"
                }
                style={{ margin: "auto" }}
              />
              <p
                id="caption-2"
                className={
                    (page === "2" ||
                        state.deliverer !== "")
                    ? "link--caption-active"
                    : "link--caption-inactive"
                }
              >
                Wer darf holen?
              </p>
            </button>
            <button
              onClick={(event) => onClick(state.orderItems, event)}
            >
              <div
                id="circle-3"
                className={page === "3" ? "circle-active" : "circle"}
                style={{ float: "right" }}
              />
              <p
                id="caption-3"
                className={
                  page === "3"
                    ? "link--caption-active"
                    : "link--caption-inactive"
                }
                style={{ marginTop: "28px" }}
              >
                Einkaufsliste
              </p>
            </button>
          </div>
        </div>
      )}
    </OrderItemsContext.Consumer>
  );
}

export default SliderHeader;
