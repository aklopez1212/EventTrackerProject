window.addEventListener('load', function(e){
	console.log('script.js loaded');
	init();
});
let editConcert = null;

function init() {
	document.concertForm.lookup.addEventListener('click', function(e) {
		e.preventDefault();
		let concertId = document.concertForm.concertId.value;
		console.log(concertId);
		if (!isNaN(concertId) && concertId > 0) {
			getConcert(concertId);
		}
	});
	document.concertForm.showAll.addEventListener('click', function(e){
		e.preventDefault();
		getConcertList();
	});
	document.newConcertForm.addConcert.addEventListener('click', function(e){
		e.preventDefault();
		let fm = document.newConcertForm;
		let newConcert = {
			name: fm.name.value,
			venue: fm.venue.value,
			performer: fm.performer.value,
			genre: fm.genre.value
		};
			console.log(newConcert);
		createConcert(newConcert);
	});
	document.newConcertForm.updateConcert.addEventListener('click', function(e){
		e.preventDefault();
		let fm = document.newConcertForm;
		let newConcert = {
			id: editConcert.id,
			name: fm.name.value,
			venue: fm.venue.value,
			performer: fm.performer.value,
			genre: fm.genre.value
		};
			console.log(newConcert);
		updateConcert(newConcert);
	});
	
}

function getConcert(concertId) {
	console.log('getConcert Concert ID Passed: ' + concertId);
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/concerts/' + concertId);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status < 400){
				let concerts = JSON.parse(xhr.responseText);
				console.log(concerts);
				displayConcert(concerts);
			} else {
				displayError('Concert not found.')
			}
		}
	};
	xhr.send();
}

function getConcertList() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/concerts');
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status < 400){
				let concerts = JSON.parse(xhr.responseText);
				console.log(concerts);
				displayConcerts(concerts);
			} else {
				displayError('Uh oh! Something went wrong!')
			}
		}
	};
	xhr.send();
}

function displayError(msg) {
	let dataDiv = document.getElementById('concertData');
	dataDiv.textContent = msg;
}

function displayConcert(concerts){
let table = document.getElementById('concertTable');

	let tr = document.createElement('tr');
	let td = document.createElement('td');
	td.textContent = concerts.name;
	tr.appendChild(td);
	let td2 = document.createElement('td');
	td2.textContent = concerts.venue;
	tr.appendChild(td2);
	let td3 = document.createElement('td');
	td3.textContent = concerts.performer;
	tr.appendChild(td3);
	let td4 = document.createElement('td');
	td4.textContent = concerts.genre;
	tr.appendChild(td4);
	let td5 = document.createElement('td');
	let btn = document.createElement('input');
	btn.setAttribute('type', 'button');
	btn.setAttribute('value', 'Update');
	// btn.setAttribute('onclick','updateConcert(concerts)');
	btn.addEventListener('click', function(e){
		e.preventDefault();
		let fm = document.newConcertForm;
		// let updatedConcert = {};
		fm.name.value = concerts.name;
		fm.venue.value = concerts.venue;
		fm.performer.value = concerts.performer;
		fm.genre.value = concerts.genre;
		editConcert = concerts;
	});
	td5.appendChild(btn);
	tr.appendChild(td5);
	let td6 = document.createElement('td');
	let deleteBtn = document.createElement('input');
	deleteBtn.setAttribute('type', 'button');
	deleteBtn.setAttribute('value', 'Delete');
	deleteBtn.addEventListener('click', function(e){
		e.preventDefault();
		console.log(concerts.id);
		deleteConcert(concerts.id);
	});
	td6.appendChild(deleteBtn);
	tr.appendChild(td6);
	table.appendChild(tr);
}

function displayConcerts(concerts){
	let listDiv = document.getElementById('concertListDiv');
	listDiv.textContent = '';
	let table = document.createElement('table');
	table.setAttribute('id', 'concertListTable');
	table.setAttribute('border', '1');
	while (table.hasChildNodes()) {
		table.removeChild(table.firstChild);
	}
	for (const concert of concerts) {
		let tr = document.createElement('tr');
		let td = document.createElement('td');
		td.textContent = concert.name;
		let td2 = document.createElement('td');
		td2.textContent = concert.venue;
		let td3 = document.createElement('td');
		td3.textContent = concert.performer;
		let td4 = document.createElement('td');
		td4.textContent = concert.genre;
		tr.appendChild(td);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		let td5 = document.createElement('td');
	let btn = document.createElement('input');
	btn.setAttribute('type', 'button');
	btn.setAttribute('value', 'Update');
	// btn.setAttribute('onclick','updateConcert(concerts)');
	btn.addEventListener('click', function(e){
		e.preventDefault();
		let fm = document.newConcertForm;
		// let updatedConcert = {};
		fm.name.value = concert.name;
		fm.venue.value = concert.venue;
		fm.performer.value = concert.performer;
		fm.genre.value = concert.genre;
		editConcert = concert;
	});
	td5.appendChild(btn);
	tr.appendChild(td5);
	let td6 = document.createElement('td');
	let deleteBtn = document.createElement('input');
	deleteBtn.setAttribute('type', 'button');
	deleteBtn.setAttribute('value', 'Delete');
	deleteBtn.addEventListener('click', function(e){
		e.preventDefault();
		console.log(concert.id);
		deleteConcert(concert.id);
	});
	td6.appendChild(deleteBtn);
	tr.appendChild(td6);
	table.appendChild(tr);
	listDiv.appendChild(table);
	}
}

function createConcert(concert){
let xhr = new XMLHttpRequest();
xhr.open('POST', 'api/concerts');
// On update 'PUT', `api/concerts/${concertId}`
xhr.onreadystatechange = function() {
	if(xhr.readyState === 4){
		if(xhr.status === 201){
			let newConcert = JSON.parse(xhr.responseText);
			displayConcert(newConcert);
		} else {
			displayError('Error creating show: ' + xhr.status);
		}
	}
};
xhr.setRequestHeader("Content-type", "application/json");
let concertJson = JSON.stringify(concert);
xhr.send(concertJson);
}

function updateConcert(concert){
	
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', `api/concerts/` + concert.id);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4){
			if(xhr.status === 201){
				// let newConcert = JSON.parse(xhr.responseText);
				// displayConcert(newConcert);
				getConcertList();
			} else {
				displayError('Error creating show: ' + xhr.status);
			}
		}
	};
	let concertJson = JSON.stringify(concert);
	xhr.send(concertJson);
	}

	function deleteConcert(concertId){
		let xhr = new XMLHttpRequest();
		xhr.open('DELETE', `api/concerts/` + concertId);
		xhr.onreadystatechange = function(){
			if(xhr.readyState = 4){
				if(xhr.status === 201){
					displayError('Concert Deleted.');
					location.reload();
				} else {
					displayError('Error Deleting Concert.')
				}
			}
		}
		xhr.send();
	}