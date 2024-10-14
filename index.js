// Змінні
const body = document.body;
const themeBtn = document.getElementById('themeBtn');
const bookGrid = document.getElementById('bookGrid');
const readerGrid = document.getElementById('readerGrid');
const cardGrid = document.getElementById('cardGrid');
let books = JSON.parse(localStorage.getItem('books')) || [];
let readers = JSON.parse(localStorage.getItem('readers')) || [];
let cards = JSON.parse(localStorage.getItem('cards')) || [];

// Відкриття вкладок
function openTab(evt, tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// Зміна теми
function toggleTheme() {
    const isLightTheme = body.classList.toggle('light-theme');
    themeBtn.textContent = isLightTheme ? '☀️' : '🌙';
}

// Додавання нової книги
function addNewBook() {
    const title = prompt("Введіть назву книги:");
    const author = prompt("Введіть автора:");
    const quantity = prompt("Введіть кількість:");

    if (title && author && quantity) {
        const newBook = { title, author, quantity, cover: "images/nnBook.jpg" };
        books.push(newBook);
        localStorage.setItem('books', JSON.stringify(books));
        bookGrid.appendChild(createBookCard(newBook));
    }
}

// Створення карточки книги
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
        <img src="${book.cover}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p>Автор: ${book.author}</p>
        <p>Кількість: ${book.quantity}</p>
        <button class="deleteBookBtn">Видалити</button>
    `;
    card.querySelector('.deleteBookBtn').onclick = () => deleteBook(book.title, card);
    return card;
}

// Видалення книги
function deleteBook(bookTitle, bookCard) {
    books = books.filter(storedBook => storedBook.title !== bookTitle);
    bookCard.remove();
    localStorage.setItem('books', JSON.stringify(books));
}

// Завантаження книг з локального сховища
function loadBooks() {
    books.forEach(book => {
        bookGrid.appendChild(createBookCard(book));
    });
}

// Додавання нового читача
function addNewReader() {
    const name = prompt("Введіть ім'я читача:");
    const address = prompt("Введіть адресу читача:");
    const phone = prompt("Введіть телефон читача:");

    if (name && address && phone) {
        const newReader = { name, address, phone };
        readers.push(newReader);
        localStorage.setItem('readers', JSON.stringify(readers));
        readerGrid.appendChild(createReaderCard(newReader));
    }
}

// Створення карточки читача
function createReaderCard(reader) {
    const card = document.createElement('div');
    card.className = 'reader-card';
    card.innerHTML = `
        <img src="images/human.png" alt="Читач" class="reader-image">
        <h3>${reader.name}</h3>
        <p>Адреса: ${reader.address}</p>
        <p>Телефон: ${reader.phone}</p>
        <button class="deleteReaderBtn">Видалити</button>
    `;
    card.querySelector('.deleteReaderBtn').onclick = () => deleteReader(reader.name, card);
    return card;
}

// Видалення читача
function deleteReader(readerName, readerCard) {
    readers = readers.filter(storedReader => storedReader.name !== readerName);
    readerCard.remove();
    localStorage.setItem('readers', JSON.stringify(readers));
}

// Збереження картки
function saveCard() {
    const issueDate = prompt("Введіть дату видачі книги (дд.мм.рррр):");
    const readerName = prompt("Введіть ім'я читача:");
    const bookTitle = prompt("Введіть назву книги:");

    if (issueDate && readerName && bookTitle) {
        const newCard = { readerName, bookTitle, issueDate };
        cards.push(newCard);
        localStorage.setItem('cards', JSON.stringify(cards));
        cardGrid.appendChild(createCardRow(newCard));
    }
}

// Створення рядка картки
function createCardRow(card) {
    const row = document.createElement('div');
    row.className = 'card-item';
    row.innerHTML = `
        <img src="images/human.png" alt="Читач" class="card-image">
        <div class="card-details">
            <p class="reader-name">Читач: ${card.readerName}</p>
            <img src="images/NoHeart.png" alt="Книга: ${card.bookTitle}" class="book-image">
            <p class="book-title">Книга: ${card.bookTitle}</p>
            <p>Дата видачі: <span>${card.issueDate}</span></p>
            <button class="deleteCardBtn">Видалити</button>
        </div>
    `;
    row.querySelector('.deleteCardBtn').onclick = () => deleteCard(card.readerName, card.bookTitle, row);
    return row;
}

// Видалення картки
function deleteCard(readerName, bookTitle, cardElement) {
    cards = cards.filter(storedCard => 
        !(storedCard.bookTitle === bookTitle && storedCard.readerName === readerName)
    );
    cardElement.remove();
    localStorage.setItem('cards', JSON.stringify(cards));
}

// Ініціалізація
document.addEventListener('DOMContentLoaded', () => {
    // Завантажити вже існуючі дані з HTML
    document.querySelectorAll('.book-card').forEach(card => {
        const title = card.querySelector('h3').innerText;
        const author = card.querySelector('p:nth-child(3)').innerText.split(': ')[1];
        const quantity = card.querySelector('p:nth-child(4)').innerText.split(': ')[1];
        const newBook = { title, author, quantity, cover: card.querySelector('img').src };
        books.push(newBook);
        card.querySelector('.deleteBookBtn').onclick = () => deleteBook(title, card);
    });

    // Завантаження книг та читачів з локального сховища
    loadBooks();
    readers.forEach(reader => readerGrid.appendChild(createReaderCard(reader)));
    cards.forEach(card => cardGrid.appendChild(createCardRow(card)));

    document.getElementById('addBookBtn').onclick = addNewBook;
    document.getElementById('addReaderBtn').onclick = addNewReader;
    document.getElementById('saveCardBtn').onclick = saveCard;
    themeBtn.onclick = toggleTheme;
});
