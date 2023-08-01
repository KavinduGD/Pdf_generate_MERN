import axios from "axios";
import { saveAs } from "file-saver";
import { useState } from "react";
function App() {
  const [name, setName] = useState("");
  const [receiptID, setReceiptID] = useState(0);
  const [price1, setPrice1] = useState(0);
  const [price2, setPrice2] = useState(0);

  function downloadPDF() {
    axios
      .post("/create-pdf", { name, receiptID, price1, price2 })
      .then(() => axios.get("fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "newPdf.pdf");
      });
  }

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Name"
        name="name"
        onClick={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Receipt ID"
        name="receiptID"
        onClick={(e) => {
          setReceiptID(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Price 1"
        name="price1"
        onClick={(e) => {
          setPrice1(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Price 2"
        name="price2"
        onClick={(e) => {
          setPrice2(e.target.value);
        }}
      />
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
}

export default App;
