let requestJsonBox = document.getElementById('requestJsonBox');

// Hide the requestCustomParam initially
let requestCustomParamBox = document.getElementById('requestCustomParamBox');
requestCustomParamBox.style.display = 'none';

// Hide the requestCustomParam when content type JSON is selected
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    requestJsonBox.style.display = 'block';
    requestCustomParamBox.style.display = 'none';
    addedParamsBox.style.display = 'none';
});

// Hide the requestJsonBox when content type custom parameters is selected
let customParamRadio = document.getElementById('customParamRadio');
customParamRadio.addEventListener('click', () => {
    requestJsonBox.style.display = 'none';
    requestCustomParamBox.style.display = 'flex';
    addedParamsBox.style.display = 'block';
});



// Add more cutom parameters

// No. of added parameters
let addedParamCount = 0;

let cutomParamAddBtn = document.getElementById('cutomParamAddBtn');
cutomParamAddBtn.addEventListener('click', () => {
    let string = `<div class="form-row my-3">
                    <div class="col-2">
                    <label for="customParam">Parameter ${addedParamCount + 2}</label>
                    </div>
                    <div class="col">
                    <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter parameter ${addedParamCount + 2} key value">
                    </div>
                    <div class="col">
                    <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter parameter ${addedParamCount + 2} value">
                    </div>
                    <button type="submit" class="btn btn-danger mb-2 customParamDeleteBtn" id="id${addedParamCount + 2}" onclick="deleteConfirmation(this.id)">-</button>
                    </div>`;

    let addedParamsBox = document.getElementById('addedParamsBox');
    addedParamsBox.innerHTML += string

    addedParamCount++;
})

// when user clicks on submit button
let submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', () => {

    // Show please wait in response box
    let responseBox = document.getElementById('responseBox');
    responseBox.innerHTML = `Fetching response please wait...`;

    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;


    // If user has selected params option, collect all the parameters in an object
    if (contentType == 'customParam') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }


    // Log all the values in console for debugging
    console.log("url is ", url);
    console.log("requestType is ", requestType);
    console.log("contentType is ", contentType);
    console.log("data is ", data);

    // if the request type is post, invoke fetch api to create a post request
    if (requestType == 'get') {
        fetch(url, {
            method: 'GET'
        }).then(response => response.text()).then((text) => {
            responseBox.innerHTML = text;
            Prism.highlightAll();
        })
    }

    // if the request type is get, invoke fetch api to create a get request
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.text()).then((text) => {
            responseBox.innerHTML = text;
            Prism.highlightAll();
        })
    }

})


// Dark Mode Button
let darkModeBtn = document.getElementById('darkModeBtn');
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('darkMode');
})

// Function for deleting custom parameters which works on clicking '-' button
function deleteConfirmation(e) {
    let deleteOrNot = window.confirm("Are you sure you want to delete this item");
    if (deleteOrNot == true) {
        let id = document.getElementById(e);
        id.parentElement.remove()
    }
}