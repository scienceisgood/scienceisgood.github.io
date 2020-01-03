// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "removed",
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

const emails = document.querySelectorAll('.email');
const submits = document.querySelectorAll('.contribute-button');

for (const m of emails)  {
    m.addEventListener('change', handleEmailType);
}

for (const m of submits) {
    m.addEventListener('click', submitToFirebaseOverlord);
}

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
