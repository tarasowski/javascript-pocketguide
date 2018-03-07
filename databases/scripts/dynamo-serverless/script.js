const request = new Request('https://localhost:3000/projects/all', {
	method: 'GET', 
	//chmode: 'cors', 
	redirect: 'follow',
	headers: new Headers({
		'Content-Type': 'applicaton/json'
	})
});


fetch(request)
    .then(response => {
        const output = document.getElementById('output');
        output.innerHTML = response;
    })
    .catch(err => console.log(err));

