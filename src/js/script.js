
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
var key = "6119558";

var encrypted = CryptoJS.AES.encrypt(text.value.toString(), key).toString();
var new_value;
//insert/update text
function insertData() {
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
window.addEventListener("load", () => {
    document.getElementById("welcome_text").innerText = "Welcome,  " + username;
})
window.addEventListener("load", readText)
//reading the text from firebase db
function readText() {
    const dbref = ref(db);
    get(child(dbref, "Text/" + username)).then((snapshot) => {
        if (snapshot.exists()) {
            // var ciphertext = snapshot.val().Text;
            // console.log(ciphertext);
            // console.log(key);
            // var decryptedBytes = CryptoJS.AES.decrypt(ciphertext,key);
            // var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);
            // console.log(plaintext);
            // text.value = plaintext;
            text.value = snapshot.val().Text;
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
document.getElementById("save").addEventListener('click', insertData);
document.getElementById("copy").addEventListener('click', copyText);
document.getElementById("clear").addEventListener('click', deleteData);
document.getElementById("logout").addEventListener('click', logout);




