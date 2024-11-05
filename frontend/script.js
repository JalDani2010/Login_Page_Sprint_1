document.getElementById('donorRegisterForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('donorName').value;
    const email = document.getElementById('donorEmail').value;
    const password = document.getElementById('donorPassword').value;
    const contactNumber = document.getElementById('donorContact').value;

    const response = await fetch('http://localhost:3000/api/donors/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, contactNumber })
    });

    const data = await response.json();
    alert(data.message);
});

document.getElementById('donorLoginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('donorLoginEmail').value;
    const password = document.getElementById('donorLoginPassword').value;

    const response = await fetch('http://localhost:3000/api/donors/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    alert(data.message || 'Login successful! Token: ' + data.token);
});

document.getElementById('ngoRegisterForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('ngoName').value;
    const contactPerson = document.getElementById('ngoContactPerson').value;
    const mobileNumber = document.getElementById('ngoMobile').value;
    const email = document.getElementById('ngoEmail').value;
    const address = document.getElementById('ngoAddress').value;
    const password = document.getElementById('ngoPassword').value;

    const response = await fetch('http://localhost:3000/api/ngos/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, contactPerson, mobileNumber, email, address, password })
    });

    const data = await response.json();
    alert(data.message);
});

document.getElementById('ngoLoginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('ngoLoginEmail').value;
    const password = document.getElementById('ngoLoginPassword').value;

    const response = await fetch('http://localhost:3000/api/ngos/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    alert(data.message || 'Login successful! Token: ' + data.token);
});
