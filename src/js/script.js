// firebase: udemyfaseeh@gmail.com
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZqtUppL3lhagw1YdQ3TdmMEz3vd7Vcj0",
    authDomain: "share-it-3a2eb.firebaseapp.com",
    projectId: "share-it-3a2eb",
    storageBucket: "share-it-3a2eb.appspot.com",
    messagingSenderId: "646080011659",
    appId: "1:646080011659:web:dda5b57bafb8c82457a38e"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";
const db = getDatabase();

var text = document.getElementById("input");
var message = document.getElementById("message");
var username = localStorage.getItem("name");
const loader = document.getElementById('loader');

function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}
//insert/update text
function insertData() {
    document.getElementById("main").style.opacity = "0";
    showLoader();
    if (text.value == "") {
        message.innerText = "Text Box is Empty Enter some text to save"
        setTimeout(() => {
            message.innerText = "";
        }, 2000)
    }
    else {
        set(ref(db, "Text/" + username), {
            // Text: encrypted
            Text: text.value
        })
            .then(() => {
                document.getElementById("main").style.opacity = "1";
                hideLoader();
                message.innerText = "Text Saved"
                setTimeout(() => {
                    message.innerText = "";
                }, 2000)
                checkForUpdates();

            })
            .catch((error) => {
                alert("unsuccessful")
            });
    }
}
//copy text inside text area
function copyText() {
    text.select();
    text.setSelectionRange(0, 99999);
    document.execCommand('copy');
    text.blur();
    message.innerText = "Text Copied"
    setTimeout(() => {
        message.innerText = "";
    }, 2000)
}
window.addEventListener("load", () => {
    document.getElementById("welcome_text").innerText = "Welcome,  " + username;
})
window.addEventListener("load", readText);
//reading the text from firebase db
function readText() {
    document.getElementById("main").style.opacity = "0";
    showLoader();
    const dbref = ref(db);
    get(child(dbref, "Text/" + username)).then((snapshot) => {
        if (snapshot.exists()) {

            text.value = snapshot.val().Text;
            document.getElementById("main").style.opacity = "1";
            hideLoader();
        }
        else {
            console.log("nothing to show");
        }
    })
        .catch((error) => {
            console.log("system error" + error);
        });
}
// delete data
function deleteData() {
    remove(ref(db, "Text/" + username))
        .then(() => {
            text.value = "";
        })
        .catch((error) => {
            message.innerText = "Message not Deleted due to Some Problem"
            setTimeout(() => {
                message.innerText = "";
            }, 2000)
        })
}
// logout function
function logout() {
    location.replace("../../../index.html");
}
function checkForUpdates() {
    // Make an AJAX request to your server to get the latest sharing text
    // For example, you can use jQuery's $.get() method:
    $.get("/get-sharing-text", function (data) {
        var sharingText = data.sharing_text;

        // Check if the sharing text has changed
        if ($("#sharing-text").text() !== sharingText) {
            // Update the sharing text element with the new text
            $("#sharing-text").text(sharingText);
        }
    });
}
document.getElementById("save").addEventListener('click', insertData);
document.getElementById("copy").addEventListener('click', copyText);
document.getElementById("clear").addEventListener('click', deleteData);
document.getElementById("logout").addEventListener('click', logout);




