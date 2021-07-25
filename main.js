console.log("script Loaded");

$(document).ready(function () {

    var infoContentContainer = document.getElementById("info-content");

    var url = "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D"
    var responseDataArr = [];
    $.get( url , function( res ) {

        res.map((data)=>{
            responseDataArr.push(data);

            const {id,firstName,lastName,email,phone} = data;
            // console.log(id, firstName, lastName, email, phone);

           
            var currRow = `
                <tr id="${id}"  class="data-row">
                    <td class="column1">${id}</td>
                    <td class="column2">${firstName}</td>
                    <td class="column3">${lastName}</td>
                    <td class="column4">${email}</td>
                    <td class="column5">${phone}</td>
                </tr> 
            `

            //console.log(currRow);
            var clickRowId = "#" + $(currRow).attr("id")
            
            $("#table-body").append(currRow);
            
           
        })

        // console.log(responseDataArr)
        function Select_HighLight_Row(responseDataArr) {
            var table = document.getElementById('table-data');
            var cells = table.getElementsByTagName('td');
            
            var k = 0;
            for (var i = 0; i < cells.length; i++) {
                // Take each cell
                var cell = cells[i];
               
                // do something on onclick event for cell
                cell.onclick = function () {
                    // Get the row id where the cell exists
                    var rowId = this.parentNode.rowIndex;
        
                    var rowsNotSelected = table.getElementsByTagName('tr');
                    for (var row = 0; row < rowsNotSelected.length; row++) {
                        
                        rowsNotSelected[row].classList.remove('active');
                    }
                    var rowSelected = table.getElementsByTagName('tr')[rowId];
                   
                    rowSelected.className += " active";
                    
                    // msg = 'The ID of the table row is: ' + rowSelected.cells[0].innerHTML;
                    // msg += '\nThe cell value is: ' + this.innerHTML;
                    // alert(msg);
                    selectedId = parseInt(rowSelected.cells[0].innerHTML)

                    //console.log(selectedId)
                    //create elemenet from belowData
                    ///console.log(responseDataArr[rowId]["firstName"] + responseDataArr[rowId]["lastName"])
                   // console.log($("#info-content").html())
                    $("#info-content").html(
                        `
                        <div><b>User selected:</b> ${responseDataArr[rowId]["firstName"] + " "} ${responseDataArr[rowId]["lastName"]}</div>
                        <div>
                            <b>Description: </b>
                                ${responseDataArr[rowId]["description"] }
                            </textarea>
                        </div>
                        <div><b>Address:</b>  ${responseDataArr[rowId]["address"]["streetAddress"]}</div>
                        <div><b>City:</b>  ${responseDataArr[rowId]["address"]["city"]}</div>
                        <div><b>State:</b> ${responseDataArr[rowId]["address"]["state"]}</div>
                        <div><b>Zip:</b>  ${responseDataArr[rowId]["address"]["zip"]}</div>

                        `
                    )
                }
                k++;
            }
        
        }
        Select_HighLight_Row(responseDataArr)


    });

    $("#search-box").keyup(
        
        function myFunction() {
            console.log("Seacched function called !!")
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("search-box");
            console.log(input.value)
            filter = input.value.toUpperCase();
            table = document.getElementById("table-data");
            tr = table.getElementsByTagName("tr");

            console.log("Tr lenght" + tr.length)
            for (i = 0; i < tr.length; i++) {
              td = tr[i].getElementsByTagName("td")[0];
              if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                  tr[i].style.display = "";
                } else {
                  tr[i].style.display = "none";
                }
              }       
            }
          }
    
    )
   
      
});
