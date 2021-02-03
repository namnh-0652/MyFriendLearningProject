
/// edits
function editTask(index) {
  var buttonEditElement = document.getElementById(`list-action-${index}`)
  var listTaskViewElement = document.getElementById(`list-task-view-${index}`)

  buttonEditElement.innerHTML = renderActionEditTask(index);
  listTaskViewElement.innerHTML = renderViewListEditTask(index);

}

const formAddList = document.getElementById('formAddList');
formAddList.addEventListener('submit', e => {
  e.preventDefault();
  checkInputsValue();
});

function checkInputsValue() {
  var isValid = true;

  const descriptionValueElement = document.getElementById('description');
  const titleValueElement = document.getElementById('title');

  // Validity
  if (titleValueElement.value.length === 0) {
    setErrorFor(titleValueElement, 'Bạn Cần Nhập Tiêu Đề Này');
    isValid = false;
  } else {
    setSuccessFor(titleValueElement);
  }
  if (descriptionValueElement.value.trim().length === 0) {
    setErrorFor(descriptionValueElement, 'Bạn cần nhập chi tiết');
    isValid = false;
  } else {
    setSuccessFor(descriptionValueElement);
  }

  // set setErrorFor
  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const p = formControl.querySelector('p');
    formControl.className = 'form-control error';
    p.innerText = message;
  }

  // set setSuccess
  function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
  }
  addTasKValue(descriptionValueElement, titleValueElement, isValid)
}

// Tao Task
function addTasKValue(descriptionValueElement, titleValueElement, isValid) {
  if (isValid) {
    var item = {
      title: titleValueElement.value,
      description: descriptionValueElement.value,
    }
    todoListTask.unshift(item);
  }

  renderListTask(todoListTask)

  titleValueElement.value = "";
  descriptionValueElement.value = "";
}
var todoListTask = [];

function renderListTask(todoListTask) {
  var todoListTaskHtml = "";
  todoListTask.forEach(function (item, index) {
    todoListTaskHtml = todoListTaskHtml + `
    <div class="card" key=${index}>
      <div id="list-action-${index}" class="card-button">
        ${renderActionTask(index)}
        <button type="button" class="delete-task" id="deleteTask${index}" onclick="deleteTask(${index})">Delete</button>
      </div>
      <div id="list-task-view-${index}" class='card-info'>
        ${renderViewListTask(index)}
      </div>
    </div>
    `;
  })

  const todoListTaskTaskElement = document.getElementById('list-tasks')
  todoListTaskTaskElement.innerHTML = todoListTaskHtml;
}

function renderActionTask(index) {
  return `
    <button type="button" class="edit" onclick="editTask(${index})">Edit</button>
`}

function renderActionEditTask(index) {
  return `
      <button type="button" class="confirm-task" onclick="updateTask(${index})">Confirm</button>
      <button type="button" class="cancel-task" onclick="cancelTask(${index})">Cancel</button>
    `}

function renderViewListTask(index) {
  return `
    <h2 id="titleName${index}">Title:${todoListTask[index].title}</h2>
    <p id="descriptionName${index}">Description:${todoListTask[index].description}</p>
  `}

function renderViewListEditTask(index) {
  return `
    <input type="text" id="title-task${index}" value="${todoListTask[index].title}" name="title" placeholder="Title...">
    <input type="text" id="description-task${index}" value="${todoListTask[index].description}" name="description"  placeholder="Description">
`}

function updateTask(index) {

  var titleInputValueElement = document.getElementById(`title-task${index}`)
  var descriptionInputValueElement = document.getElementById(`description-task${index}`)

  var item = {
    title: titleInputValueElement.value.trim(),
    description: descriptionInputValueElement.value.trim(),
  }

  todoListTask.splice(index, 1, item);

  renderListTask(todoListTask)
}

renderListTask(todoListTask);

function deleteTask(index) {
  todoListTask.splice(index, 1);
  renderListTask(todoListTask)
}

function cancelTask(index) {
  var buttonEditElement = document.getElementById(`list-action-${index}`);
  var listTaskViewElement = document.getElementById(`list-task-view-${index}`);

  buttonEditElement.innerHTML = renderActionTask(index);
  listTaskViewElement.innerHTML = renderViewListTask(index);
}

//Search 

document.getElementById('searchTextBox').onclick = searchListTask;
function searchListTask() {
  console.log(searchTextBoxElement);
  var searchTextBoxElement = document.getElementById("searchTextBox");
  var newToDoListTask = todoListTask.filter(function (item) {
    return item.title.toLowerCase().indexOf(searchTextBoxElement.value.trim().toLowerCase()) !== -1;
  });

  renderListTask(newToDoListTask);
}
