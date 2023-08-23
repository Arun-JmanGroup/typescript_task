//@ts-nocheck

const tasks: string[] = [];

//Adding the tasks
function addrow(): void {
    const inputTask = document.getElementById("inputBox").value.split(" ").join("");
    const inputTaskUpperCase = inputTask.toUpperCase();
    if (inputTaskUpperCase.length >= 1) {
        if (!tasks.includes(inputTaskUpperCase)) {
            tasks.push(inputTaskUpperCase);
            const table = document.getElementById("taskTable") as HTMLTableElement;
            const row1 = document.getElementById("firstRow") as HTMLTableRowElement;
            const newRow = table.insertRow(row1.rowIndex + 1);
            const cell1 = newRow.insertCell(0);
            cell1.innerHTML = '<input type="checkbox">';
            const cell2 = newRow.insertCell(1);
            cell2.innerHTML = (document.getElementById("inputBox") as HTMLInputElement).value;
            const taskTextElement = cell2.innerHTML;
            const cell3 = newRow.insertCell(2);
            const status = '<select onchange="updateRow(this)" name="status"><option>Incomplete</option><option>Inprogress</option><option>Completed</option></select>';
            cell3.innerHTML = status;
            const cell4 = newRow.insertCell(3);
            cell4.innerHTML = "<button class='trash' onclick='removeTask(this)'><i class='fa-solid fa-trash'></i></button>";
        } else {
            alert("Oops! Already exists..");
        }
    }
}

//Deleting the tasks
function removeTask(task: HTMLElement): void {
    const input = (document.getElementById("inputBox") as HTMLInputElement).value.split(" ").join("");
    const i = task.parentNode.parentNode.rowIndex;
    document.getElementById("taskTable").deleteRow(i);
    tasks = tasks.filter(function (val) {
      if( val !== input){
        
      }
      else{
        return val;
      }
});
}

//Searching tasks
function findTask(): void {
    const input = document.getElementById("searchInput") as HTMLInputElement;
    const filter = input.value.toUpperCase();
    const table = document.getElementById("taskTable") as HTMLTableElement;
    const tr = table.getElementsByTagName("tr");
    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            const txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

//Checkout the task when it gets completed 
function updateRow(selectElement: HTMLSelectElement): void {
    const input = (document.getElementById("inputBox") as HTMLInputElement).value.split(" ").join("");
    const row = selectElement.parentNode.parentNode as HTMLTableRowElement;
    const statusValue = selectElement.value;
    const taskCell = row.cells[1];
    const checkboxCell = row.cells[0];
    if (statusValue === "Completed") {
        taskCell.innerHTML = "<del>" + taskCell.textContent + "</del>";
        (checkboxCell.firstChild as HTMLInputElement).checked = true;
        tasks = tasks.filter(function (val) {
          if (val !== input) {
          }
          else {
              return val;
          }
      });
    } else {
        taskCell.innerHTML = taskCell.textContent;
        (checkboxCell.firstChild as HTMLInputElement).checked = false;
    }
}