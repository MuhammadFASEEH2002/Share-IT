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
var username_regex = /^[a-zA-Z]{8,}$/;
var password_regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=\[{\]}\|:;\"'<,>.?/])(?!.*\s).{8,}$/;
var username = document.getElementById("email");
var password = document.getElementById("password");
var message = document.getElementById("message");

function signup() {
    if ((email.value.trim() == "") || (password.value.trim() == "")) {
        message.innerText = "Some Fields are Empty"
        setTimeout(() => {
            message.innerText = "";
        }, 2000)
    }
    else {
        if (username_regex.test(email.value.trim())) {
            if (password_regex.test(password.value.trim())) {
                const dbref = ref(db);
                get(child(dbref, "User/" + username.value)).then((snapshot) => {
                    if (snapshot.exists()) {
                        message.innerText = "User Already Exist, Try Using another email"
                        setTimeout(() => {
                            message.innerText = "";
                        }, 2000)
                    }
                    else {
                        if ((email.value == "") || (password.value == "")) {
                            message.innerText = "Some Fields are Empty"
                            setTimeout(() => {
                                message.innerText = "";
                            }, 2000)
                        }
                        else {
                            set(ref(db, "User/" + username.value), {
                                Username: username.value,
                                Password: password.value
                            })
                                .then(() => {

                                    message.innerText = "User Successfully Registered"
                                    setTimeout(() => {
                                        message.innerText = "";
                                    }, 2000)
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
        }
    }
}
document.getElementById("signup").addEventListener("click", signup);