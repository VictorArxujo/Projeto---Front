document.addEventListener('DOMContentLoaded', () => {
    renderizarLista();
});

function cadastrarUsuario(event) {
    event.preventDefault();

    const email = document.getElementById('register-email').value;
    const name = document.getElementById('register-name').value;

    if (!email || !name) {
        alert('Por favor, preencha Nome e Email.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido.');
        return;
    }

    const usuario = {
        name,
        email,
        date: new Date().toLocaleString('pt-BR')
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(usuario);
    localStorage.setItem('users', JSON.stringify(users));

    limparCampos();
    renderizarLista();
    alert('Usuário cadastrado com sucesso!');
}

function renderizarLista(lista = null) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    const users = lista || JSON.parse(localStorage.getItem('users')) || [];

    users.forEach((user) => {
        const li = document.createElement('li');
        li.classList.add('user-list-item');

        const info = document.createElement('span');
        info.textContent = `${user.date} - ${user.name} - ${user.email}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => excluirUsuario(user);

        li.appendChild(info);
        li.appendChild(deleteBtn);
        userList.appendChild(li);
    });
}

function excluirUsuario(userToDelete) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.filter(user =>
        user.name !== userToDelete.name ||
        user.email !== userToDelete.email ||
        user.date !== userToDelete.date
    );
    localStorage.setItem('users', JSON.stringify(users));
    renderizarLista();

    const searchTerm = document.getElementById('search-input').value;
    if (searchTerm) {
        pesquisarUsuario();
    }
}

function excluirTodos() {
    if (confirm('Tem certeza que deseja excluir todos os usuários?')) {
        localStorage.removeItem('users');
        renderizarLista();
    }
}

function pesquisarUsuario() {
    const term = document.getElementById('search-input').value.toLowerCase();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );

    renderizarLista(filteredUsers);
}

function limparCampos() {
    document.getElementById('register-email').value = '';
    document.getElementById('register-name').value = '';
    document.getElementById('search-input').value = '';
    renderizarLista();
}