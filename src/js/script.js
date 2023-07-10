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
var textid = 1;
var loginUsername = localStorage.getItem("loginUsername");
console.log(loginUsername);

//insert/update text
function insertData() {
    if (text.value == "") {
        message.innerText = "Text Box is Empty Enter some text to save"
        setTimeout(() => {
            message.innerText = "";
        }, 2000)

    }
    else {
        set(ref(db, "Text/" + textid), {
            Text: text.value
        })
            .then(() => {
                message.innerText = "Text Saved"
                setTimeout(() => {
                    message.innerText = "";
                }, 2000)

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
window.addEventListener("load", readText)
//reading the text from firebase db
function readText() {
    const dbref = ref(db);
    get(child(dbref, "Text/" + textid)).then((snapshot) => {
        if (snapshot.exists()) {
            text.value = snapshot.val().Text;
        }
        else {
            console.log("nothing to show");
        }
    })
        .catch((error) => {
            alert("system error" + error);
        });
}
// delete data
function deleteData() {
    remove(ref(db, "Text/" + textid))
        .then(() => {
            // alert("Text cleared")
            text.value = "";
        })
        .catch((error) => {
            alert("unsuccessful")
        })
}
document.getElementById("save").addEventListener('click', insertData);
document.getElementById("copy").addEventListener('click', copyText);
document.getElementById("clear").addEventListener('click', deleteData);




