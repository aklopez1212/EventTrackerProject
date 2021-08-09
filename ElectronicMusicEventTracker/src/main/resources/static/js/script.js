window.addEventListener('load', function(e){
	console.log('script.js loaded');
	init();
});

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
			name: fm.name.value,
			venue: fm.venue.value,
			performer: fm.performer.value,
			genre: fm.genre.value
		};
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
	let td2 = document.createElement('td');
	td2.textContent = concerts.venue;
	let td3 = document.createElement('td');
	td3.textContent = concerts.performer;
	let td4 = document.createElement('td');
	td4.textContent = concerts.genre;
	tr.appendChild(td);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	table.appendChild(tr);
}

function displayConcerts(concerts){
	let table = document.getElementById('concertListTable');
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
		table.appendChild(tr);
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
	xhr.open('PUT', `api/concerts/${concertId}`);
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

	function deleteConcert(){
		let xhr = new XMLHttpRequest();
		xhr.open('DELETE', `api/concerts/${concertId}`);
		xhr.onreadystatechange = function(){
			if(xhr.readyState = 4){
				if(xhr.status === 201){
					displayError('Concert Deleted.')
				} else {
					displayError('Error Deleting Concert.')
				}
			}
		}
		xhr.send();
	}