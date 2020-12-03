const tasks_container = document.querySelector(".tasks-container")
const input_text = document.querySelector("#input-text");
const form = document.querySelector("form");
const task_num = document.querySelector("#quantity");
let filter_value = "ALL";
let selectedFilter = document.querySelector(".tasks-actions ul li.active");
let tasks = []

form.addEventListener("submit", (e) => {
	e.preventDefault();
	add_task(input_text.value);
	input_text.value = "";
	updateTaskNums()
})



const add_task = (value) => {
	let id = Date.now()
	const new_task = { id: id, value:value, status:"ACTIVE" }
	let task = document.createElement("div");
	let flat = document.createElement("span");
	let close = document.createElement("span");
	let close_image = document.createElement("img");
	let text = document.createElement("p");
	task.className = "task draggable";
	task.setAttribute("data-status", "ACTIVE");
	task.setAttribute("draggable", "true");
	task.setAttribute("data-id", id);
	flat.className = "flat-icon";
	close.className = "close-task";
	close_image.setAttribute("src", "./images/icon-cross.svg");
	flat.addEventListener("click", (e) => checkTask(e.target));
	flat.addEventListener("touchstart", (e) => checkTask(e.target));
	close.appendChild(close_image);
	text.innerHTML = value;
	task.appendChild(flat);
	task.appendChild(text);
	task.appendChild(close);
	addEvent(task);
	tasks_container.appendChild(task);
	tasks.push(new_task);
}

const checkTask = (elem) => {
	let task = elem.parentElement;
	let id = task.getAttribute("data-id");
	let text = task.children[1];
	tasks.forEach((task) => (parseInt(id)===task.id && (task.status = "COMPLETE")))
	elem.className += " check";
	text.className += " checked";
	updateTaskNums()
}

const updateTaskNums = () => {
	console.log(tasks.length);
	let num = tasks.filter((task) => task.status === "ACTIVE").length
	task_num.innerHTML = `${num} item/s left`;
}

const filter = (e) => {
	selectedFilter.classList.remove("active");
	filter_value = e.getAttribute("data-value");
	selectedFilter = e
	if(filter_value === "active"){
		filterByPending()
	}
	else if(filter_value === "complete"){
		filterByComplete()
	}

	else if(filter_value === "all"){
		filterByAll()
	}
	selectedFilter.classList.add("active");

}

const filterByComplete = () => {
	tasks_container.innerHTML = "";
	tasks.forEach( task => {
		if(task.status === "COMPLETE"){
			tasks_container.appendChild(toTask(task.value, task.status))
		}
	})
}

const filterByPending = () => {
	tasks_container.innerHTML = "";
	tasks.forEach( task => {
		if(task.status === "ACTIVE"){
			tasks_container.appendChild(toTask(task.value, task.status))
		}
	})	
}

const filterByAll = () => {
	tasks_container.innerHTML = "";
	tasks.forEach( task => {
		tasks_container.appendChild(toTask(task.value, task.status, task.id))
	})
}

const clearComplete = () => {
	let new_task = tasks.filter((el) => el.status !== "COMPLETE");
	tasks = [...new_task];
	filterByAll();
}

const toTask = (value, status, id) => {
	let task = document.createElement("div");
	let flat = document.createElement("span");
	let close = document.createElement("span");
	let close_image = document.createElement("img");
	let text = document.createElement("p");
	task.className = "task draggable";
	task.setAttribute("data-status", status);
	task.setAttribute("draggable", "true");
	task.setAttribute("data-id", id);
	flat.className = status === "COMPLETE" ? "check flat-icon" : "flat-icon" ;
	close.className = "close-task";
	close_image.setAttribute("src", "./images/icon-cross.svg");
	flat.addEventListener("click", (e) => checkTask(e.target));
	close.appendChild(close_image);
	text.innerHTML = value;
	text.className = status === "COMPLETE" && "checked";
	task.appendChild(flat);
	task.appendChild(text);
	task.appendChild(close);
	console.log(status === "COMPLETED" && "checked")
	return task
}
updateTaskNums();