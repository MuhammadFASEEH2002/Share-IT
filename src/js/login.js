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
var loginUsername;
var loginPassword;

function register() {
    location.href = "../../src/resources/register/index.html"
}
function login() {
    loginUsername = document.getElementById("username");
    loginPassword = document.getElementById("password");
    const dbref = ref(db);
    get(child(dbref, "User/" + loginUsername.value + "/")).then((snapshot) => {
        if (snapshot.exists()) {
            if ((loginUsername.value != snapshot.val().Username) && (loginPassword.value != snapshot.val().Password)) {
                message.innerText = "Username or Password may be incorrect"
                setTimeout(() => {
                    message.innerText = "";
                }, 2000)
            }
            else {
                location.href = "../../src/resources/main-page/index.html";
                localStorage.setItem("loginUsername", loginUsername);
            }
        }
        else {
            message.innerText = "User Doesnot Exist, Kindly Register"
            setTimeout(() => {
                message.innerText = "";
            }, 2000)
        }
    })
        .catch((error) => {
            alert("system error" + error);
        });
}

document.getElementById("register").addEventListener('click', register);
document.getElementById("login").addEventListener('click', login);