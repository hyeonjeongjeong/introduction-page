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
	let columnName = $(this).parent().find(".kanban__column-title").html();
	let newId = Math.floor(Math.random() * 100000);
	// json 저장
	kanbanboard.cards.push({
		id: newId,
		description: "",
		column: columnName
	});
	console.log(kanbanboard);
	localStorage.setItem('kanbanboard', JSON.stringify(kanbanboard));


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


// ===== local storage =====

// kanbanboard JSON
let kanbanboard = {
	cards: [
		{
			id: 1,
			description: "내용",
			column: "In Progress"
		},
		{
			id: 2,
			description: "내용2",
			column: "Not Started"
		}
	],
	config: { mode: "dark", fix: false }
};
// localStorage에 JSON 저장
localStorage.setItem('kanbanboard', JSON.stringify(kanbanboard));
// localStorage의 JSON 불러오기
let localKanban = JSON.parse(localStorage.getItem('kanbanboard'));

// load todo
let cards = localKanban.cards;
cards.forEach((item) => {
	const itemDiv = document.createElement("div");
	itemDiv.className = "kanban__item";
	itemDiv.setAttribute("draggable", "true");
	itemDiv.addEventListener("dragstart", dragStart);
	itemDiv.addEventListener("dragend", dragEnd);

	const itemInputDiv = document.createElement("div");
	itemInputDiv.className = "kanban__item-input";
	itemInputDiv.setAttribute("contenteditable", true);
	itemInputDiv.innerText = item.description;
	itemDiv.appendChild(itemInputDiv);

	const dropzoneDiv = document.createElement("div");
	dropzoneDiv.className = "kanban__dropzone";
	itemDiv.appendChild(dropzoneDiv);

	$(".kanban__items").each((index, element) => {
		let columnName = $(element).prev().text();
		if (columnName == item.column) {
			$(element).append(itemDiv);
        }
    })
});
