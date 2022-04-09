// drag & drop

let item = null;
const allItem = document.querySelectorAll(".kanban__item");
const allColumn = document.querySelectorAll(".kanban__column");

allItem.forEach((item) => {
	item.addEventListener("dragstart", dragStart);
	item.addEventListener("dragend", dragEnd);
})
allColumn.forEach((column) => {
	column.addEventListener("dragover", dragOver);
	column.addEventListener("dragenter", dragEnter);
	column.addEventListener("dragleave", dragLeave);
	column.addEventListener("drop", dragDrop);
});

function dragStart() {
	item = this;
	console.log("dragStart");
}

function dragEnd() {
	item = null;
	console.log("dragEnd");
}

function dragOver(e) {
	e.preventDefault();
}

function dragEnter() {
	this.style.border = "1px dashed #ccc";
	console.log("dragEnter");
}

function dragLeave() {
	this.style.border = "none";
	console.log("dragLeave");
}

function dragDrop() {
	this.style.border = "none";
	this.children[1].appendChild(item);
	console.log("dropped");
}

// Add Item

const allAddBtn = document.querySelectorAll(".kanban__add-item");

allAddBtn.forEach((addBtn) => {
	addBtn.addEventListener("click", addItem);
})

function addItem() {
	const itemDiv = document.createElement("div");
	itemDiv.className = "kanban__item";
	itemDiv.setAttribute("draggable", "true");
	itemDiv.addEventListener("dragstart", dragStart);
	itemDiv.addEventListener("dragend", dragEnd);

	const itemInputDiv = document.createElement("div");
	itemInputDiv.className = "kanban__item-input";
	itemInputDiv.setAttribute("contenteditable", true);
	itemDiv.appendChild(itemInputDiv);

	const dropzoneDiv = document.createElement("div");
	dropzoneDiv.className = "kanban__dropzone";
	itemDiv.appendChild(dropzoneDiv);

	let column = document.querySelector(".kanban__items");
	column = this.previousElementSibling;
	column.appendChild(itemDiv);

	console.log("add");
}