const authSwitchLinks = document.querySelectorAll('.switch');
const authModals = document.querySelectorAll('.auth .modal');
const authWrapper = document.querySelector('.auth');
const signUpForm = document.querySelector('.sign-up');
const signInForm = document.querySelector('.sign-in');
const signOut = document.querySelector('.sign-out');

// toggle auth modals
authSwitchLinks.forEach((link) => {
	link.addEventListener('click', () => {
		authModals.forEach((modal) => modal.classList.toggle('active'));
	});
});

// sign up form
signUpForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = signUpForm.email.value;
	const password = signUpForm.password.value;

	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then((user) => {
			console.log('signed up', user);
			signUpForm.reset();
			signUpForm.querySelector('.error').textContent = '';
		})
		.catch((error) => {
			signUpForm.querySelector('.error').textContent = error.message;
		});
});

// sign in form
signInForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = signInForm.email.value;
	const password = signInForm.password.value;

	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((user) => {
			console.log('signed in', user);
			signInForm.reset();
			signInForm.querySelector('.error').textContent = '';
		})
		.catch((error) => {
			signInForm.querySelector('.error').textContent = error.message;
		});
});

// sign out
signOut.addEventListener('click', () => {
	firebase
		.auth()
		.signOut()
		.then(() => {
			console.log('signed out');
		});
});

// authentication listener
firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		authWrapper.classList.remove('open');
		authModals.forEach((modal) => modal.classList.remove('active'));
	} else {
		authWrapper.classList.add('open');
		authModals[0].classList.add('active');
	}
});
