function generateTable(k) {
  // creates a <table> element and a <tbody> element
  const tbl = document.createElement("table");
  const tbHeader = tbl.createTHead();
  const tblBody = document.createElement("tbody");

  row = tbHeader.insertRow(0);
  var cell = row.insertCell(0);
  cell.innerHTML = "<b>Produto de " + 1 + "</b>"
  cell.colSpan = 2;
  cell.style.textAlign = "center"

  // creating all cells
  for (let i = 1; i < 11; i++) {
    // creates a table row
    const row = document.createElement("tr");
    for (let j = 0; j < 2; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      if (j == 0) {
        const cell = document.createElement("td");
        const cellText = document.createTextNode(`${i}x${k}`);
        cell.appendChild(cellText);
        row.appendChild(cell);
        cell.style.textAlign = "center";
      }

      if (j == 1) {
        const cell = document.createElement("td");
        const cellText = document.createTextNode(`${i * k}`);
        cell.appendChild(cellText);
        row.appendChild(cell);
        cell.style.textAlign = "center";
      }

    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }
  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  document.body.appendChild(tbl);
  // sets the border attribute of tbl to '2'
  tbl.setAttribute("border", "1");
  tbl.setAttribute("border-right-width", "44px;")

}
