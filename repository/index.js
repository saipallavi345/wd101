let userForm = document.getElementById("userform");

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    return entries ? JSON.parse(entries) : [];
}

let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();
    const tableEntries = entries.map(entry => {
        const nameCell = <td>${entry.name}</td>;
        const emailCell = <td>${entry.email}</td>;
        const passwordCell = <td>${entry.password}</td>;
        const dobCell = <td>${entry.dob}</td>;
        const acceptTermsCell = <td>${entry.acceptTerms ? "true" : "false"}</td>;

        return <tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>;
    }).join("\n");

    const table = `<table>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Dob</th>
            <th>Accepted terms?</th>
        </tr>${tableEntries}
    </table>`;

    document.getElementById("user-entries").innerHTML = table;
}

const saveUserForm = (event) => {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;

    // Email regex validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Age validation (18 to 55 years)
    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    const dayDiff = today.getDate() - dobDate.getDate();

    // Simplified age validation
    const validAge = (age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))) &&
                     (age < 55 || (age === 55 && (monthDiff < 0 || (monthDiff === 0 && dayDiff <= 0))));

    if (!validAge) {
        alert("Age must be between 18 and 55 years.");
        return;
    }

    const entry = { name, email, password, dob, acceptTerms };
    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    
    displayEntries(); // Show the new entry immediately
    userForm.reset();  // Reset form after submission
}

// Load and display entries when the page is loaded
window.onload = displayEntries; 
userForm.addEventListener("submit", saveUserForm);