import React from "react";
import { OrderItemsContext } from "./orderItems-context";
import "./slider-header.css";

function SliderHeader({ page, setPage }) {
  const onClick = (orderItems, event) => {
    if (orderItems.length === 0) return;
    const page = event.target.id
      .toString()
      .charAt(event.target.id.toString().length - 1);
    setPage(page);
  };

  return (
    <OrderItemsContext.Consumer>
      {(value) => (
        <div className="button--container">
          <hr />
          <div className="circle--container">
            <a
              href="#slide-1"
              onClick={(event) => onClick(value.orderItems, event)}
            >
              <div
                id="circle-1"
                className={
                    value.orderItems.length !== 0
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
                  page === "1" || value.orderItems.length !== 0
                    ? "link--caption-active"
                    : "link--caption-inactive"
                }
              >
                Bestellung
              </p>
            </a>
            <a
              href={value.orderItems.length === 0 ? "#slide-1" : "#slide-2"}
              onClick={(event) => onClick(value.orderItems, event)}
            >
              <div
                id="circle-2"
                className={
                  value.deliverer !== ""
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
                  value.deliverer !== "")
                    ? "link--caption-active"
                    : "link--caption-inactive"
                }
              >
                Wer darf holen?
              </p>
            </a>
            <a
              href={value.orderItems.length === 0 ? "#slide-1" : "#slide-3"}
              onClick={(event) => onClick(value.orderItems, event)}
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
            </a>
          </div>
        </div>
      )}
    </OrderItemsContext.Consumer>
  );
}

export default SliderHeader;
