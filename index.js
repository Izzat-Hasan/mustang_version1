var jsonURLArray = [];
var jsonArray = [];
var loadingInfo = 0;
function initApplication() {
    console.log('Mustang V.1- Starting!');
}

function loadIndex() {
    var valueRequest = new XMLHttpRequest();
    valueRequest.open('GET', 'https://mustang-index.azurewebsites.net/index.json');
    valueRequest.onload = function() {
        console.log("Index JSON:" + valueRequest.responseText);
        document.getElementById("indexID").innerHTML = valueRequest.responseText;
        contactIndex = JSON.parse(valueRequest.responseText);
        jsonURLArray.length = 0;
        for (i=0; i<contactIndex.length; i++) {
            jsonURLArray.push(contactIndex[i].ContactURL);
        }
        console.log("ContactURLArray: " + JSON.stringify(jsonURLArray));
    }
    valueRequest.send();
}

function loadContacts() {

    jsonArray.length = 0;
    loadingInfo = 0;


    if (jsonURLArray.length > loadingInfo) {
        loadNextContact(jsonURLArray[loadingInfo]);
    }
}

function loadNextContact(URL) {
    console.log("URL: " + URL);
    contactRequest = new XMLHttpRequest();
    contactRequest.open('GET', URL);
    contactRequest.onload = function() {
        console.log(contactRequest.responseText);
        var contact;
        contact = JSON.parse(contactRequest.responseText);
        console.log("Contact: " + contact.firstName);
        jsonArray.push(contact);
        document.getElementById("contactsID").innerHTML = JSON.stringify(jsonArray);

        loadingInfo++;
        if (jsonURLArray.length > loadingInfo) {
            loadNextContact(jsonURLArray[loadingInfo]);
        }
    }

    contactRequest.send();
}

function logContacts() {
    console.log(jsonArray);
}
