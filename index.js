const inputdate = document.getElementById('dob');
const wrongdate = document.getElementById('error');
const maxdate = new Date();
maxdate.setFullYear(maxdate.getFullYear() - 18);
const mindate = new Date();
mindate.setFullYear(mindate.getFullYear() - 55);

inputdate.setAttribute('max', maxdate.toISOString().split('T')[0]);
inputdate.setAttribute('min', mindate.toISOString().split('T')[0]);

inputdate.addEventListener('change', function() {
    const today = new Date();
    const dateentered = new Date(this.value);
    
    // Calculate age based on the selected date
    const age = today.getFullYear() - dateentered.getFullYear();
    const currage = today.getMonth() - dateentered.getMonth();
    
    if (currage < 0 || (currage === 0 && today.getDate() < dateentered.getDate())) {
        age--;
    }
    
    if (age < 18 || age > 55) {
        errorText.style.display = 'block';
        this.value = ''; // Reset the date input
    } else {
        errorText.style.display = 'none';
    }
});


const userform = document.getElementById("userdata");
const entriesBody = document.getElementById("entriesBody");

const retrieveEntries = () => {
    const entries = JSON.parse(localStorage.getItem("user-entries")) || [];
    return entries;
};

const displayEntries = () => {
    entriesBody.innerHTML = '';

    const entries = retrieveEntries();
    entries.forEach((entry) => {
        const newRow = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = entry.name;
        newRow.appendChild(nameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = entry.email;
        newRow.appendChild(emailCell);

        const passwordCell = document.createElement('td');
        passwordCell.textContent = entry.password;
        newRow.appendChild(passwordCell);

        const dobCell = document.createElement('td');
        dobCell.textContent = entry.dob;
        newRow.appendChild(dobCell);

        const acceptTermsCell = document.createElement('td');
        acceptTermsCell.textContent = entry.acceptedTermsAndconditions ? 'Yes' : 'No';
        newRow.appendChild(acceptTermsCell);

        entriesBody.appendChild(newRow);
    });
};

const saveUserData = (event) => {
    event.preventDefault();
    const name = document.getElementById("Name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTermsAndconditions = document.getElementById("checkbox").checked;
    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTermsAndconditions
    };
    const entries = retrieveEntries();
    entries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(entries));
    displayEntries();
};

userform.addEventListener("submit", saveUserData);
displayEntries();

