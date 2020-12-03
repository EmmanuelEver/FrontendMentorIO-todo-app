let dropzone = document.querySelector(".dropzone");
let draggabless = null;
let selectedTask = "";
let selectedPos = 0;


const addEvent = (draggable) => {
	console.log(draggable);
	draggable.addEventListener("dragstart", dragstart);
	draggable.addEventListener("dragend", dragend);
	draggable.addEventListener("drag", drag);
	draggable.addEventListener("touchstart", dragstart);
	draggable.addEventListener("touchend", dragend);
	draggable.addEventListener("touchmove", drag);
	draggable.addEventListener("touchend", drop);
}


const drag = (e) => {
	e.preventDefault();
	draggedPosition(e.clientY);
}


const dragstart = (e) => {
	e.target.classList.add("dragging");
	draggabless = document.querySelectorAll(".draggable");
	selectedTask = e.target;
}


const dragend = (e) => {
	e.target.classList.remove("dragging");
	e.preventDefault();
	dropzone.removeChild(selectedTask);
	dropzone.insertBefore(selectedTask, dropzone.childNodes[selectedPos])
}


const drop = (e) => {
	e.preventDefault();
	dropzone.removeChild(selectedTask);
	if(selectedPos===1){
		dropzone.appendChild(selectedTask);
	}
	dropzone.insertBefore(selectedTask, dropzone.childNodes[selectedPos + 1]);
	reStack()

}

const dragover = (e) => {
	e.preventDefault();
	if(selectedPos === 0){
		reStack()
		draggabless[selectedPos].style.marginTop = "50px";
	}
	else if(selectedPos >= draggabless.length){
		reStack()
		draggabless[selectedPos - 1].style.marginBottom = "50px";
	}
	else{
		reStack();
		draggabless[selectedPos] ? (draggabless[selectedPos].style.marginTop = "50px") : null
	}
}

const reStack = () => {
	draggabless.forEach( drag => drag.style.margin= "0")
}

const getDraggablesPosition = (draggables) => {
	draggables.forEach( draggable => {
		let position = draggable.getBoundingClientRect();
		let positionCenter = position.top + ((position.bottom - position.top) / 2);
		draggable.attributes["yPosition"] = positionCenter;
	})
}

const draggedPosition = (currentPosition) => {
	let draggables = document.querySelectorAll(".draggable");
	getDraggablesPosition(draggables)
	for(let i = 0; i < draggables.length; i++){
		if(draggables[i].attributes["yPosition"] < currentPosition){
			let taskAbove = draggables[i]
			selectedPos = i + 1;	
		}
		if(draggables[0].attributes["yPosition"] > currentPosition){
			selectedPos = 0;
		}
	console.log(selectedPos)

	}
}


dropzone.addEventListener("drop", drop);
dropzone.addEventListener("dragover", dragover);
