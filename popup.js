// document.getElementById('fetchData').addEventListener('click', function() {
//     fetch('http://127.0.0.1:5000/api/data')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok ' + response.statusText);
//             }
//             return response.json();
//         })
//         .then(data => {
//             document.getElementById('data').textContent = data.data;
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             response.text().then(text => {
//                 console.error('Server response:', text);
//             });
//         });
// });



// document.getElementById('fetchData').addEventListener('click', function() {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         const currentUrl = tabs[0].url;
//         fetch('http://localhost:5000/summarize', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({url: currentUrl})
//         })
//         .then(response => response.json())
//         .then(data => {
//             document.getElementById('data').textContent = data.summary;
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     });
// });

document.getElementById('summarizeButton').addEventListener('click', function() {
    document.getElementById('loading').style.display = 'block'; // Show loading text
    document.getElementById('data').textContent = ''; // Clear previous data

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentUrl = tabs[0].url;
        fetch('http://localhost:5000/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({url: currentUrl})
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('loading').style.display = 'none'; // Hide loading text
            document.getElementById('data').textContent = data.summary;
        })
        .catch(error => {
            document.getElementById('loading').style.display = 'none'; // Hide loading text
            console.error('Error:', error);
        });
    });
});
