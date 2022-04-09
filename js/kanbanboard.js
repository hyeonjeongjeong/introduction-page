// kanbanboard JSON
let kanbanboard = {
	cards: [],
	config: { mode: "day", fix: false }
};

// drag & drop
let item = null;
const allItem = document.querySelectorAll(".kanban__item");
const allColumn = document.querySelectorAll(".kanban__column");

allItem.forEach((item) => {
	item.addEventListener("dragstart", dragStart);
	item.addEventListener("dragend", dragEnd);
});
allColumn.forEach((column) => {
	column.addEventListener("dragover", dragOver);
	column.addEventListener("dragenter", dragEnter);
	column.addEventListener("dragleave", dragLeave);
	column.addEventListener("drop", dragDrop);
	// column.addEventListener("click", pmClick);
});


const allRemoveBtn = document.querySelectorAll(".pmBtn");

allRemoveBtn.forEach((removeBtn) => {
	removeBtn.addEventListener("click", pmClick);
});

function pmClick() {
	console.log("remove");
	let column = event.target;
	let columnparent = column.parentNode;
	let itemInput = columnparent.children[0];

	if (column.className == "pmBtn") {
		column.remove();
		columnparent.remove();
	}

	let cardIndex;
	$.each(kanbanboard.cards, (index, obj) => {
		if (obj.id == itemInput.getAttribute("id")) {
			cardIndex = index;
		}
	});
	kanbanboard.cards.splice(cardIndex, 1);
	localStorage.setItem('kanbanboard', JSON.stringify(kanbanboard));
}

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

	// json 저장
	$.each(kanbanboard.cards, (index, obj) => {
		if (obj.id == item.children[0].id) {
			obj.column = this.children[0].innerText;
		}
	});

	// local storage 저장
	localStorage.setItem('kanbanboard', JSON.stringify(kanbanboard));

	console.log("dropped");
}


// Edit Item
let itemInput = null;
const allitemInput = document.querySelectorAll(".kanban__item-input");

allItem.forEach((itemInput) => {
	itemInput.addEventListener("click", clickItem);
	itemInput.addEventListener("blur", editItem);
});
function clickItem() {
	itemInput = this;
}
function editItem() {
	// json 저장
	$.each(kanbanboard.cards, (index, obj) => {
		if (obj.id == itemInput.id) {
			obj.description = itemInput.innerText;
		}
	});

	// local storage 저장
	localStorage.setItem('kanbanboard', JSON.stringify(kanbanboard));

	itemInput = null;
	console.log('blur');
}


// Add Item

const allAddBtn = document.querySelectorAll(".kanban__add-item");

allAddBtn.forEach((addBtn) => {
	addBtn.addEventListener("click", addItem);
});

function addItem() {
	let columnName = $(this).parent().find(".kanban__column-title").html();
	let newId = Math.floor(Math.random() * 100000);
	let newDescription = ""
	
	// json 저장
	kanbanboard.cards.push({
		id: newId,
		description: newDescription,
		column: columnName
	});
	console.log(kanbanboard);
	localStorage.setItem('kanbanboard', JSON.stringify(kanbanboard));

	let newTodo = createTodo(newId, newDescription);

	let column = document.querySelector(".kanban__items");
	column = this.previousElementSibling;
	column.appendChild(newTodo);

	console.log("add");
}


// ===== local storage =====

// localStorage의 JSON 불러오기
let localKanban = JSON.parse(localStorage.getItem('kanbanboard'));

// load todo
if (localKanban == null) {
	localStorage.setItem('kanbanboard', JSON.stringify(kanbanboard));
}
else {
	localKanban.cards.forEach((item) => {
		kanbanboard.cards.push(item); // local storage -> json

		let newTodo = createTodo(item.id, item.description);

		$(".kanban__items").each((index, element) => {
			let columnName = $(element).prev().html();
			if (columnName == item.column) {
				$(element).append(newTodo);
			}
		});
	});
}

function createTodo(id, description) {
	const itemDiv = document.createElement("div");
	itemDiv.className = "kanban__item";
	itemDiv.setAttribute("draggable", "true");
	itemDiv.addEventListener("dragstart", dragStart);
	itemDiv.addEventListener("dragend", dragEnd);

	const itemInputDiv = document.createElement("div");
	itemInputDiv.className = "kanban__item-input";
	itemInputDiv.setAttribute("contenteditable", true);
	itemInputDiv.id = id;
	itemInputDiv.innerText = description;
	itemInputDiv.addEventListener("click", clickItem);
	itemInputDiv.addEventListener("blur", editItem);
	itemDiv.appendChild(itemInputDiv);

	const itembtn = document.createElement("div");
	itembtn.className = "pmBtn";
	itembtn.innerHTML = "-"
	itembtn.addEventListener("click", pmClick);
	itemDiv.appendChild(itembtn);

	const dropzoneDiv = document.createElement("div");
	dropzoneDiv.className = "kanban__dropzone";
	itemDiv.appendChild(dropzoneDiv);

	return itemDiv;
}
