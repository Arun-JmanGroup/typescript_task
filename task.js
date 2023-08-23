//@ts-nocheck

var tasks = [];

//Adding the tasks
function addrow() {
    var inputTask = document.getElementById("inputBox").value.split(" ").join("");
    var inputTaskUpperCase = inputTask.toUpperCase();
    if (inputTaskUpperCase.length >= 1) {
        if (!tasks.includes(inputTaskUpperCase)) {
            tasks.push(inputTaskUpperCase);
            var table = document.getElementById("taskTable");
            var row1 = document.getElementById("firstRow");
            var newRow = table.insertRow(row1.rowIndex + 1);
            var cell1 = newRow.insertCell(0);
            cell1.innerHTML = '<input type="checkbox">';
            var cell2 = newRow.insertCell(1);
            cell2.innerHTML = document.getElementById("inputBox").value;
            var taskTextElement = cell2.innerHTML;
            var cell3 = newRow.insertCell(2);
            var status_1 = '<select onchange="updateRow(this)" name="status"><option>Incomplete</option><option>Inprogress</option><option>Completed</option></select>';
            cell3.innerHTML = status_1;
            var cell4 = newRow.insertCell(3);
            cell4.innerHTML = "<button class='trash' onclick='removeTask(this)'><i class='fa-solid fa-trash'></i></button>";
        }
        else {
            alert("Oops! Already exists..");
        }
    }
}

//Deleting the tasks
function removeTask(task) {
    var input = document.getElementById("inputBox").value.split(" ").join("");
    var i = task.parentNode.parentNode.rowIndex;
    document.getElementById("taskTable").deleteRow(i);
    tasks = tasks.filter(function (val) {
        if (val !== input) {
        }
        else {
            return val;
        }
    });
}

//Searching tasks
function findTask() {
    var input = document.getElementById("searchInput");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("taskTable");
    var tr = table.getElementsByTagName("tr");
    for (var i = 1; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            var txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
            }
        }
    }
}

//Checkout the task when it gets completed
function updateRow(selectElement) {
    var input = document.getElementById("inputBox").value.split(" ").join("");
    var row = selectElement.parentNode.parentNode;
    var statusValue = selectElement.value;
    var taskCell = row.cells[1];
    var checkboxCell = row.cells[0];
    if (statusValue === "Completed") {
        taskCell.innerHTML = "<del>" + taskCell.textContent + "</del>";
        checkboxCell.firstChild.checked = true;
        tasks = tasks.filter(function (val) {
            if (val !== input) {
            }
            else {
                return val;
            }
        });
    }
    else {
        taskCell.innerHTML = taskCell.textContent;
        checkboxCell.firstChild.checked = false;
    }
}
