import React from 'react';
import { jsPDF } from "jspdf";


const App = () => {

  const pdfDownload = e => {
      e.preventDefault()
      let doc = new jsPDF("landscape", 'pt', 'A4');
      doc.html(document.getElementById('pdf-view'), {
        callback: () => {
          doc.save('test.pdf');
        }
      });
  }
    return (
      <div>
        <div id="pdf-view">
          <h1 style={{color: '#33959a'}}>Testing html to pdf converter</h1>
        </div>
        <button onClick={pdfDownload}>Download as pdf</button>
      </div>
    );
}

export default App;