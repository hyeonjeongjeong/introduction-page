// kanbanboard JSON
let kanbanboard = {
	cards: [],
	config: { mode: "day", fix: false }
};

// Column setting
$('.kanban__column').each((index, element) => {
	$(element).on({
		"dragover": dragOver,
		"dragenter": dragEnter,
		"dragleave": dragLeave,
		"drop": dragDrop
	});
});
$('.kanban__add-item').each((index, element) => {
	$(element).on({
		"click": addItem
	});
});

// Load todo
let localKanban = JSON.parse(localStorage.getItem('kanbanboard'));
if (localKanban == null) {
	localStorage.setItem('kanbanboard', JSON.stringify(kanbanboard));
} else {
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

// Add todo
function addItem() {
	let newId = Math.floor(Math.random() * 100000);
	let newDescription = ""
	let columnName = $(this).parent().find('.kanban__column-title').html();

	// json 저장
	kanbanboard.cards.push({
		id: newId,
		description: newDescription,
		column: columnName
	});

	// local storage 저장
	localStorage.setItem('kanbanboard', JSON.stringify(kanbanboard));

	let newTodo = createTodo(newId, newDescription);
	let column = $(this).prev();
	column.append(newTodo);

	console.log('add');
}

// Edit todo
let itemInput = null;
function clickItem() {
	itemInput = this;
}
function editItem() {
	// json 저장
	$.each(kanbanboard.cards, (index, obj) => {
		if (obj.id == $(itemInput).attr('id')) {
			obj.description = itemInput.innerText;
		}
	});

	// local storage 저장
	localStorage.setItem('kanbanboard', JSON.stringify(kanbanboard));

	itemInput = null;

	console.log('edit');
}

// Remove todo
function pmClick() {
	let item = event.target.parentNode;
	let itemInput = item.children[0];
	let cardIndex;

	swal({
		title: "REALLY?!",
		text: "정말로 삭제하시겠습니까? 삭제하면 복구할 수 없습니다!",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	}).then((willDelete) => {
		if (willDelete) {
			swal("삭제가 완료되었습니다!", {
				icon: "success",
			});

			item.remove();

			// json 삭제
			$.each(kanbanboard.cards, (index, obj) => {
				if (obj.id == $(itemInput).attr('id')) {
					cardIndex = index;
				}
			});
			kanbanboard.cards.splice(cardIndex, 1);

			// local storage 삭제
			localStorage.setItem('kanbanboard', JSON.stringify(kanbanboard));

			console.log('remove');
		} else {
			console.log('remove cancel');
		}
	});		
}

// Create todo
function createTodo(id, description) {
	const itemDiv = $(document.createElement("div"));
	itemDiv.attr({
		"class": "kanban__item",
		"draggable": true
    }).on({
		"dragstart": dragStart,
		"dragend": dragEnd
	});

	const itemInputDiv = $(document.createElement("div"));
	itemInputDiv.attr({
		"id": id,
		"class": "kanban__item-input",
		"contenteditable": true
	}).on({
		"click": clickItem,
		"blur": editItem
	}).text(description);
	itemDiv.append(itemInputDiv);

	const itembtn = $(document.createElement("div"));
	itembtn.attr({
		"class": "pmBtn"
	}).on({
		"click": pmClick
	}).html("&times;");
	itemDiv.append(itembtn);
	
	const dropzoneDiv = $(document.createElement("div"));
	dropzoneDiv.attr({
		"class": "kanban__dropzone"
	});	
	itemDiv.append(dropzoneDiv);

	return itemDiv;
}

// Move todo
let item = null;
function dragStart() {
	item = this;
	console.log('dragStart');
}
function dragEnd() {
	item = null;
	console.log('dragEnd');
}
function dragOver(e) {
	e.preventDefault();
}
function dragEnter() {
	let kanbanElement = $(this).parent().eq(0);

	$(kanbanElement).css({
		"box-shadow": "0 5px 20px 0 rgba(68, 88, 144, 0.3)",
		"transform": "scale(1.05)"
	});

	console.log('dragEnter');
}
function dragLeave() {
	let kanbanElement = $(this).parent().eq(0);

	$(kanbanElement).css({
		"box-shadow": "",
		"transform": ""
	});

	console.log('dragLeave');
}
function dragDrop() {
	let kanbanElement = $(this).parent().eq(0);

	$(kanbanElement).css({
		"box-shadow": "",
		"transform": ""
	});

	this.children[1].appendChild(item);

	// json 저장
	$.each(kanbanboard.cards, (index, obj) => {
		if (obj.id == item.children[0].id) {
			obj.column = this.children[0].innerText;
		}
	});

	// local storage 저장
	localStorage.setItem('kanbanboard', JSON.stringify(kanbanboard));

	console.log('dropped');
}
