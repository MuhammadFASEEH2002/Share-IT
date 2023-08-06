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
var username_regex = /^[a-zA-Z]{5,}$/; //al least 6 digit username
var password_regex = /^.{8,}$/; //at least 8 digit password
var username = document.getElementById("username");
var password = document.getElementById("password");
var message = document.getElementById("message");
const loader = document.getElementById('loader');

function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

function signup() {
    if ((username.value.trim() == "") || (password.value.trim() == "")) {
        message.innerText = "Some fields are empty."
        setTimeout(() => {
            message.innerText = "";
        }, 2000)
    }
    else {
        if (username_regex.test(username.value.trim())) {
            if (password_regex.test(password.value.trim())) {
                document.getElementById("main").style.opacity = "0";
                showLoader()
                const dbref = ref(db);
                get(child(dbref, "User/" + username.value)).then((snapshot) => {
                    if (snapshot.exists()) {
                        hideLoader();
                        document.getElementById("main").style.opacity = "1";
                        message.innerText = "User already exist, try using another username."
                        setTimeout(() => {
                            message.innerText = "";
                        }, 2000)
                    }
                    else {
                        if ((username.value == "") || (password.value == "")) {
                            message.innerText = "Some fields are empty."
                            setTimeout(() => {
                                message.innerText = "";
                            }, 2000)
                        }
                        else {
                            document.getElementById("main").style.opacity = "0";
                            showLoader()
                            const key = "6119558";
                            const encrypted = CryptoJS.AES.encrypt(password.value, key).toString();
                            set(ref(db, "User/" + username.value), {
                                Username: username.value,
                                Password: encrypted
                            })
                                .then(() => {
                                    hideLoader();
                                    document.getElementById("main").style.opacity = "1";
                                    message.innerText = "User Successfully Registered, Redirecting to Login Page"
                                    setTimeout(() => {
                                        document.getElementById("main").style.opacity = "0";
                                        showLoader();
                                    }, 1500)
                                    setTimeout(() => {
                                        location.replace("../../../index.html");
                                    }, 2600)
                                })
                                .catch((error) => {
                                    alert("unsuccessful" + error)
                                });
                        }
                    }
                })
                    .catch((error) => {
                        alert("system error" + error);
                    });
            }
            else {
                message.innerText = "Password should be atleast 8 characters long";
                setTimeout(() => {
                    message.innerText = "";
                }, 2000)
            }
        }
        else {
            message.innerText = "Username should be atleast 5 characters long having only letters";
            setTimeout(() => {
                message.innerText = "";
            }, 2000)
        }
    }
}
function login() {
    document.getElementById("main").style.opacity = "0";
    showLoader();
    setTimeout(() => {
        location.replace("../../../index.html");
    }, 1500);
}
document.getElementById("signup").addEventListener("click", signup);
document.getElementById("login").addEventListener("click", login);