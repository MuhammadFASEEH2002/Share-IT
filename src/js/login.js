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
const loader = document.getElementById('loader');
// register button function
function register() {
    document.getElementById("main").style.opacity = "0";
    showLoader();
    setTimeout(() => {
        location.replace("src/resources/register/index.html");

    }, 1500);
}
function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}
// login button function
function login() {
    loginUsername = document.getElementById("username");
    loginPassword = document.getElementById("password");
    const key = "6119558";
    const encrypted = CryptoJS.AES.encrypt(loginPassword.value, key).toString();
    const dbref = ref(db);
    document.getElementById("main").style.opacity = "0";
    showLoader();
    get(child(dbref, "User/" + loginUsername.value + "/")).then((snapshot) => {
        if (snapshot.exists()) {
            if ((loginUsername.value != snapshot.val().Username) && (encrypted != snapshot.val().Password)) {
                message.innerText = "Username or password may be incorrect."
                setTimeout(() => {
                    message.innerText = "";
                }, 2000)
            }
            else {
                hideLoader();
                document.getElementById("main").style.opacity = "1";
                location.replace("src/resources/main-page/index.html");

                var name = loginUsername.value;
                localStorage.setItem("name", name);
            }
        }
        else {
            message.innerText = "User doesnot exist, kindly register."
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
