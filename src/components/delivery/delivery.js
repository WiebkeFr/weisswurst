import React, { useState } from "react";
import "./delivery.css";
import SubmitButton from "../submit-button/submit-button";
import { useOrderItems } from "../../state/orderItems-context";
import ContinueButton from "../continue-button/continue-button";
import {getDeliverer} from "../../state/storage";

function Delivery() {
  const { state, dispatch } = useOrderItems();
  const initName = getDeliverer();

  const [name, setName] = useState(initName ? initName : "");

  if(getDeliverer() === null && name !== ""){
    setName("");
  }

  const chooseName = (dispatch, orderItems) => {
    const names = orderItems.map((order) => order.name);
    const name = names[Math.floor(Math.random() * names.length)];
    setName(name);
    dispatch({ type: "SET_DELIVERER", name });
  };

  const onClick = () => {
    document.getElementById("circle-3").click();
  };

  return (
    <div>
      {name === "" || getDeliverer() === "" ? (
        <div>
          <h2 className="h2--delivery">
            Wer darf heute holen? <br /> Drück den "Glücks-Button"
          </h2>
          <SubmitButton
            className="button--submit"
            onClick={() => chooseName(dispatch, state.orderItems)}
            text="Jetzt wählen"
            disabled={state.orderItems.length === 0}
            center={true}
            centeredText={true}
          />
        </div>
      ) : (
        <div>
          <h2 className="h2--delivery">
            <span style={{ marginBottom: "8px", display: "block" }}>
              Herzlichen Glückwünsch!{" "}
            </span>
            {name} darf heute die Bestellung holen.
          </h2>
          <div
            style={{
              margin: "auto",
              width: "max-content",
              height: "58px",
              marginBottom: "80px",
            }}
          >
            <h3 className="h3--delivery">{name}</h3>

            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.3333 60C43.9814 60 56.6667 47.3148 56.6667 31.6667C56.6667 16.0186 43.9814 3.33337 28.3333 3.33337C12.6853 3.33337 0 16.0186 0 31.6667C0 47.3148 12.6853 60 28.3333 60Z"
                fill="#FFCC4D"
              />
              <path
                d="M29.9984 47.5C31.8393 47.5 33.3317 45.6345 33.3317 43.3333C33.3317 41.0321 31.8393 39.1666 29.9984 39.1666C28.1574 39.1666 26.665 41.0321 26.665 43.3333C26.665 45.6345 28.1574 47.5 29.9984 47.5Z"
                fill="#664500"
              />
              <path
                d="M13.5187 35.6382C13.2154 35.6382 12.907 35.5549 12.632 35.3815C11.8537 34.8915 11.6204 33.8632 12.1104 33.0832C13.637 30.6615 18.2787 26.5199 24.927 28.1465C25.8204 28.3649 26.367 29.2682 26.1487 30.1615C25.9287 31.0549 25.022 31.5982 24.1337 31.3832C18.127 29.9132 14.9637 34.8099 14.932 34.8599C14.6137 35.3632 14.072 35.6382 13.5187 35.6382ZM33.4737 29.4015C32.9904 29.4015 32.5137 29.1932 32.1837 28.7915C31.6004 28.0799 31.7037 27.0282 32.417 26.4449C37.7104 22.1049 43.687 23.8415 46.1087 25.3682C46.887 25.8582 47.1204 26.8882 46.6287 27.6665C46.1404 28.4415 45.1154 28.6782 44.3354 28.1915C44.1054 28.0515 39.2487 25.1532 34.5287 29.0232C34.2187 29.2782 33.8454 29.4015 33.4737 29.4015Z"
                fill="#664500"
              />
              <path
                d="M22.2429 52.1217C22.1295 52.1217 22.0145 52.1067 21.9012 52.075C21.2379 51.8867 20.8512 51.1967 21.0395 50.5317C21.7679 47.965 21.4695 45.4833 20.2229 43.7217C19.3945 42.5517 18.2145 41.8367 16.9845 41.7583C16.2945 41.7167 15.7712 41.1217 15.8145 40.4333C15.8579 39.745 16.4495 39.1817 17.1395 39.265C19.1279 39.3883 20.9945 40.4867 22.2612 42.2767C23.9462 44.6583 24.3779 47.915 23.4429 51.2117C23.2879 51.7633 22.7862 52.1217 22.2429 52.1217ZM40.6379 47.02C40.4012 47.02 40.1629 46.9533 39.9512 46.8133C38.0062 45.53 36.9179 43.285 36.9645 40.655C37.0129 37.93 38.3129 35.4 40.2712 34.2067C40.8595 33.8467 41.6279 34.0333 41.9879 34.625C42.3479 35.215 42.1612 35.9817 41.5695 36.3417C40.3445 37.0883 39.4962 38.84 39.4629 40.6983C39.4295 42.4567 40.1112 43.925 41.3262 44.7267C41.9029 45.1067 42.0612 45.8817 41.6812 46.4583C41.4412 46.8233 41.0445 47.02 40.6379 47.02Z"
                fill="#E2A62D"
              />
              <path
                d="M28.6319 4.53325C28.5602 4.45158 28.4485 4.40658 28.3169 4.38158C28.3169 4.38158 1.77687 -0.656752 0.628537 0.356581C-0.518129 1.37158 1.23354 28.3299 1.23354 28.3299C1.24187 28.4649 1.27187 28.5799 1.3452 28.6616C2.35187 29.8016 9.2752 25.3216 16.8102 18.6599C24.3469 11.9966 29.6385 5.67325 28.6319 4.53325Z"
                fill="#DD2E44"
              />
              <path
                d="M0.580911 0.451672C0.555911 0.501672 0.534245 0.570006 0.517578 0.656672C0.782578 2.94167 3.34258 21.7433 4.93758 27.62C7.33091 26.2817 9.76258 24.4633 12.6192 22.1983C10.1926 17.7567 1.92924 0.243339 0.580911 0.451672Z"
                fill="#EA596E"
              />
              <path
                d="M49.8371 48.715L32.2154 46.5433C30.332 46.3733 27.0204 46.3567 27.1904 43.3733C27.3454 40.6683 30.5904 41.085 32.9887 41.44L50.7187 44.3967L49.8371 48.715Z"
                fill="#3B88C3"
              />
              <path
                d="M50.7163 44.3984L43.6797 43.1918C42.8563 43.0434 42.123 44.2701 42.0863 45.5684C42.0447 47.0118 42.4647 47.7418 43.2963 47.9118L50.203 48.7651L50.7163 44.3984Z"
                fill="#88C9F9"
              />
              <path
                d="M58.1973 43.9016L53.8273 47.9199L46.0156 39.4249L50.3856 35.4066C52.654 33.3199 56.2173 33.4699 58.304 35.7383L58.529 35.9833C60.614 38.2533 60.4656 41.8149 58.1973 43.9016Z"
                fill="#3B88C3"
              />
              <path
                d="M53.8249 47.9224C55.7018 46.1966 55.4749 42.896 53.318 40.5501C51.1612 38.2043 47.8911 37.7016 46.0142 39.4274C44.1373 41.1531 44.3642 44.4538 46.5211 46.7996C48.6779 49.1454 51.948 49.6481 53.8249 47.9224Z"
                fill="#88C9F9"
              />
              <path
                d="M52.2607 46.2231C53.1992 45.3602 52.9109 43.5198 51.617 42.1125C50.323 40.7051 48.5132 40.2637 47.5747 41.1266C46.6363 41.9895 46.9245 43.8299 48.2185 45.2372C49.5125 46.6446 51.3222 47.086 52.2607 46.2231Z"
                fill="#226699"
              />
              <path
                d="M4.1665 58.3334C5.54722 58.3334 6.6665 57.2141 6.6665 55.8334C6.6665 54.4527 5.54722 53.3334 4.1665 53.3334C2.78579 53.3334 1.6665 54.4527 1.6665 55.8334C1.6665 57.2141 2.78579 58.3334 4.1665 58.3334Z"
                fill="#55ACEE"
              />
              <path
                d="M48.3333 6.66667C50.1743 6.66667 51.6667 5.17428 51.6667 3.33333C51.6667 1.49238 50.1743 0 48.3333 0C46.4924 0 45 1.49238 45 3.33333C45 5.17428 46.4924 6.66667 48.3333 6.66667Z"
                fill="#55ACEE"
              />
              <path
                d="M8.10701 48.7434L4.21035 39.3834L0.687012 49.4584L8.10701 48.7434ZM43.3337 8.33337L36.667 10L38.3337 3.33337L43.3337 8.33337Z"
                fill="#EA596E"
              />
              <path
                d="M53.3315 21.6667L59.9999 13.3317L54.9999 10L53.3315 21.6667Z"
                fill="#77B255"
              />
            </svg>
          </div>
          <div className="button-container--delivery">
            <SubmitButton
              onClick={() => chooseName(dispatch, state.orderItems)}
              text="Nochmal versuchen"
              disabled={false}
              center={true}
              icon="wwf-arrow.svg"
            />
            <ContinueButton
              text="Weiter zur Shopping-Liste >"
              onClick={onClick}
              mobile={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Delivery;
