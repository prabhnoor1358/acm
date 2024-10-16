const allItems = {};

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = JSON.parse(localStorage.getItem(key));

    // Check if the required properties are present
    if (!value.name || !value.email) {
        localStorage.removeItem(key);
        continue;
    }

    allItems[key] = value;
}

const table = document.querySelector('tbody');

for (const key in allItems) {
    const tempEle = document.createElement('tr');

    const { email, name, pwd, blocked = false } = allItems[key];
    const username = key;

    const nameCell = document.createElement('td');
    nameCell.textContent = name;
    tempEle.appendChild(nameCell);

    const usernameCell = document.createElement('td');
    usernameCell.textContent = username;
    tempEle.appendChild(usernameCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = email;
    tempEle.appendChild(emailCell);

    const statusCell = document.createElement('td'); 
    statusCell.textContent = blocked ? "❌" : "✔";
    tempEle.appendChild(statusCell);

    tempEle.addEventListener('click', () => {
        const rows = document.querySelectorAll('tbody tr');
        rows.forEach(row => row.classList.remove('selected'));
        tempEle.classList.add('selected');
    });

    table.appendChild(tempEle);
}

function getSelectedUser() {
    const selectedRow = document.querySelector('tbody tr.selected');
    if (selectedRow) {
        const usernameCell = selectedRow.cells[1];
        return usernameCell.textContent;
    }
    return null;
}

function toggleBlock(username) {
    if (!username) return; 
    const user = JSON.parse(localStorage.getItem(username));
    user.blocked = true;
    localStorage.setItem(username, JSON.stringify(user));
    location.reload(); // Reload to update the table
}

function toggleUnblock(username) {
    if (!username) return;
    const user = JSON.parse(localStorage.getItem(username));
    user.blocked = false;
    localStorage.setItem(username, JSON.stringify(user));
    location.reload();
}

function deleteUser(username) {
    if (!username) return;
    localStorage.removeItem(username);
    location.reload();
}

document.getElementById('blockUser').onclick = () => {
    const username = getSelectedUser();
    toggleBlock(username);
};

document.getElementById('unblockUser').onclick = () => {
    const username = getSelectedUser();
    toggleUnblock(username);
};

document.getElementById('deleteUser').onclick = () => {
    const username = getSelectedUser();
    deleteUser(username);
};
