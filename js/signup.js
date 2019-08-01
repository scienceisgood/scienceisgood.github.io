// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCWZ4Rzqzc49X4S0AN4wmTTebQG4_QWiik",
    authDomain: "silkswap-48055.firebaseapp.com",
    databaseURL: "https://silkswap-48055.firebaseio.com",
    projectId: "silkswap-48055",
    storageBucket: "silkswap-48055.appspot.com",
    messagingSenderId: "355544937461",
    appId: "1:355544937461:web:6e5ccf13c6b00449"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const dataService = firebase.database();
const dataRef = dataService.ref();

let emailAddy;

function handleEmailType(e) {
    emailAddy = e.target.value;
    console.log(emailAddy);
}

document.querySelector('.email').addEventListener('change', handleEmailType);
document.querySelector('.contribute-button').addEventListener('click', submitToFirebaseOverlord);

function submitToFirebaseOverlord(e) {
  if (emailAddy === undefined) {
    console.log("nope on email");
    return;
  }

  const newChildRef = dataRef.child('users').push()

  newChildRef.set({
      contact:emailAddy
  });
}
