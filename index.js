const entries = [];
let filtered = [];
const entryTable = document.querySelector('.entry-table');
const searchBar = document.querySelector('.search-bar');
const searchByBar = document.querySelector('.search-by-bar');

searchByBar.addEventListener('change', ()=>{
    const value = searchByBar.value;
    if(value === "First Name") {
        highlightTableHeading();
        removeAllEntries();
        entries.sort((x, y) => x.firstName.localeCompare(y.firstName));
        if(searchBar.children) {
            updateFiltered('firstName')
            appendEntries(filtered)
        } else {
            appendEntries(entries);
        }
        highlightCells();
    } else if (value === "Last Name") {
        highlightTableHeading();
        removeAllEntries();
        entries.sort((x, y) => x.lastName.localeCompare(y.lastName));
        if(searchBar.children) {
            updateFiltered('lastName')
            appendEntries(filtered)
        } else {
            appendEntries(entries);
        }
        highlightCells();
    } else if (value === "Company") {
        highlightTableHeading();
        removeAllEntries();
        entries.sort((x, y) => x.company.localeCompare(y.company));
        if(searchBar.children) {
            updateFiltered('company')
            appendEntries(filtered)
        } else {
            appendEntries(entries);
        }
        highlightCells();
    }
});

searchBar.addEventListener('input', ()=>{
    let value = searchByBar.value;
    removeAllEntries();
    if(value === "First Name") {
        value = 'firstName';
    } else if (value === "Last Name") {
        value = 'lastName';
    } else if (value === "Company") {
        value = 'company';
    }
    updateFiltered(value)
    appendEntries(filtered)
    highlightCells();
    highlightTableHeading();
});

const updateFiltered = (property) => {
    let input = searchBar.value.toLowerCase();
    filtered = entries.filter((entry)=>{
        let slice = entry[property].slice(0,input.length).toLowerCase();
        return slice === input; 
    });
}

const highlightTableHeading = () => {
    const tableHeadings = document.querySelectorAll('th');
    const value = searchByBar.value;
    if(value === "First Name") {
        tableHeadings[0].style.backgroundColor = "#4c8bf5";
        tableHeadings[1].style.backgroundColor = "";
        tableHeadings[2].style.backgroundColor = "";
    } else if (value === "Last Name") {
        tableHeadings[1].style.backgroundColor = "#4c8bf5";
        tableHeadings[2].style.backgroundColor = "";
        tableHeadings[0].style.backgroundColor = "";
    } else if (value === "Company") {
        tableHeadings[2].style.backgroundColor = "#4c8bf5";
        tableHeadings[1].style.backgroundColor = "";
        tableHeadings[0].style.backgroundColor = "";
    }
}

const highlightCells = () => {
    const value = searchByBar.value;
    if(value === "First Name") {
        highlightColumn(0);
    } else if (value === "Last Name") {
        highlightColumn(1);
    } else if (value === "Company") {
        highlightColumn(2);
    }
}

const highlightColumn = (num) => {
    let rows = document.querySelectorAll('tr');
    for(let i=1; i<rows.length; i++) {
        rows[i].children[num].style.backgroundColor = "white"    
    }
}

const removeAllEntries = () => {
    const table = document.querySelector('.entry-table');
    const length = table.children.length;
    for(let i=length-1; i>0; i--) {
            table.removeChild(table.lastChild);
    }
}

const createEntries = () => {
    for(let i=0; i<100; i++) {
        const entry = {};
        entry.firstName = faker.name.firstName();
        entry.lastName = faker.name.lastName();
        entry.company = faker.company.companyName();
        entry.phone = faker.phone.phoneNumber();
        entries.push(entry)
    }
}
const appendEntries = (arr) => {
    for(let i=0; i<arr.length; i++) {
        const row = document.createElement('tr');
        const firstName = document.createElement('td');
        firstName.innerText = arr[i].firstName;
        row.appendChild(firstName)
        const lastName = document.createElement('td');
        lastName.innerText = arr[i].lastName;
        row.appendChild(lastName)
        const company = document.createElement('td');
        company.innerText = arr[i].company;
        row.appendChild(company)
        const phone = document.createElement('td');
        phone.innerText = arr[i].phone;
        row.appendChild(phone)
        entryTable.appendChild(row);
    }
}

const buildInitialTable = () =>{
    createEntries();
    entries.sort((x, y) => x.firstName.localeCompare(y.firstName));
    appendEntries(entries);    
}

buildInitialTable();

