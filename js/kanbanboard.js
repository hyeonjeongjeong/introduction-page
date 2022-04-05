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