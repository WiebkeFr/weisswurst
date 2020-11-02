import React from "react";
import List from "../../components/shopping-list/list";
import SubmitButton from "../../components/submit-button/submit-button";

function PrintList() {
  return (
    <div style={{ margin: "auto", maxWidth: "648px" }}>
      <List />
      <SubmitButton
        className="print-button"
        text="Einkaufszettel drucken"
        disabled={false}
        onClick={() => window.print()}
        icon={"wwf-print.svg"}
      />
    </div>
  );
}

export default PrintList;
