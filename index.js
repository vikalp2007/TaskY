const taskContainer = document.querySelector(".task__container");

const globalStore = [];

const generateNewCard = (taskData) =>  `
<div class="col-md-6 col-lg-4">
      <div class="card">
        <div class="card-header d-flex justify-content-end gap-2">
          <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
          <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"><i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i></button>
        </div>
        <!--for card image-->
        <img src=${taskData.imageUrl}
          class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${taskData.taskTitle}</h5>
          <p class="card-text">${taskData.taskDesciption}</p>
          <a href="#" class="btn btn-primary">${taskData.taskType}</a>
        </div>
        <div class="card-footer">
          <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
        </div>
      </div>
    </div>
`;

const loadInitialCardData = () => {
  // access the local storage to get tasky card data
  const getCardData = localStorage.getItem("tasky");

  // convert to normal object
  const {cards} = JSON.parse(getCardData);

  // loop over those array of task object to create HTML card and inject it to DOM
  cards.map((cardObject) => {
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject))

    // update our globalStore
    globalStore.push(cardObject);
  }) 
};

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`, //date object gives unique no for id at every millisecond
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDesciption: document.getElementById("taskdescription").value,
    };

    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData))

    globalStore.push(taskData);

    localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));
};

const deleteCard = (event) => {
  event = window.event;
  // giving id 
  const targetID = event.target.id;
  const tagname = event.target.tagName; //BUTTON
    // match the id of the element with the id inside the globalStore
    // if match found, remove

  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  localStorage.setItem("tasky", JSON.stringify({cards:globalStore})); 
  // contact parent
  
  if(tagname === "BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }else{
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
};