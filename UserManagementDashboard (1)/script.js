const API_URL = "https://jsonplaceholder.typicode.com/users";  
let users = []; // Store users locally  

function fetchUsers() {  
    fetch(API_URL)  
        .then(response => response.json())  
        .then(data => {  
            users = data; // Store data locally  
            renderUsers();  
        })  
        .catch(error => alert("Error fetching users"));  
}  

function renderUsers() {  
    const tableBody = document.getElementById("userTableBody");  
    tableBody.innerHTML = "";  
    users.forEach((user, index) => {  
        const row = `<tr>  
            <td>${user.id}</td>  
            <td>${user.firstName || user.name.split(" ")[0]}</td>  
            <td>${user.lastName || user.name.split(" ")[1] || ""}</td>  
            <td>${user.email}</td>  
            <td>
                <button onclick="editUser(${index})">Edit</button>
                <button onclick="deleteUser(${index})">Delete</button>
            </td>  
        </tr>`;  
        tableBody.innerHTML += row;  
    });  
}  

function addUser(event) {  
    event.preventDefault();  
    const id = document.getElementById("userId").value;  
    const firstName = document.getElementById("firstName").value;  
    const lastName = document.getElementById("lastName").value;  
    const email = document.getElementById("email").value;  

    if (id) {  
        // Update existing user  
        const index = users.findIndex(user => user.id == id);  
        users[index] = { id, firstName, lastName, email };  
        alert("User updated!");  
    } else {  
        // Add new user  
        const newUser = { id: users.length + 1, firstName, lastName, email };  
        users.push(newUser);  
        alert("User added!");  
    }  

    renderUsers();  
    resetForm();  
}  

function editUser(index) {  
    const user = users[index];  
    document.getElementById("userId").value = user.id;  
    document.getElementById("firstName").value = user.firstName || user.name.split(" ")[0];  
    document.getElementById("lastName").value = user.lastName || user.name.split(" ")[1] || "";  
    document.getElementById("email").value = user.email;  
}  

function deleteUser(index) {  
    users.splice(index, 1); // Remove user from array  
    renderUsers();  
    alert("User deleted!");  
}  

function resetForm() {  
    document.getElementById("userForm").reset();  
    document.getElementById("userId").value = "";  
}  

document.getElementById("userForm").addEventListener("submit", addUser);