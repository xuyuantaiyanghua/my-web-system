let currentClass = '1';
let students = [];

function changeClass() {
    currentClass = document.getElementById('class-select').value;
    loadStudents();
}

function loadStudents() {
    students = JSON.parse(localStorage.getItem(`class${currentClass}`)) || [];
    renderTable();
}

function saveStudents() {
    localStorage.setItem(`class${currentClass}`, JSON.stringify(students));
}

function renderTable() {
    const tbody = document.querySelector('#students-table tbody');
    tbody.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td><input type="text" value="${student.name}" onchange="updateName(${index}, this.value)"></td>
            <td>${student.score}</td>
            <td>
                <button onclick="updateScore(${index}, 1)">+1</button>
                <button onclick="updateScore(${index}, -1)">-1</button>
                <button onclick="customScore(${index})">自定义</button>
                <button onclick="deleteStudent(${index})">删除</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function addStudent() {
    const newId = students.length + 1;
    students.push({ id: newId, name: `学生${newId}`, score: 0 });
    saveStudents();
    renderTable();
}

function updateName(index, newName) {
    students[index].name = newName;
    saveStudents();
}

function updateScore(index, change) {
    students[index].score += change;
    saveStudents();
    renderTable();
}

function customScore(index) {
    const newScore = prompt('请输入新的积分:');
    if (newScore !== null && !isNaN(newScore)) {
        students[index].score = parseInt(newScore, 10);
        saveStudents();
        renderTable();
    }
}

function deleteStudent(index) {
    students.splice(index, 1);
    saveStudents();
    renderTable();
}

function sortStudents() {
    students.sort((a, b) => b.score - a.score);
    renderTable();
}

function bulkUpdate(action) {
    const change = prompt(`请输入全班${action === 'add' ? '加分' : '减分'}的数值:`);
    if (change !== null && !isNaN(change)) {
        students.forEach(student => {
            student.score += action === 'add' ? parseInt(change, 10) : -parseInt(change, 10);
        });
        saveStudents();
        renderTable();
    }
}

function exportData() {
    const dataStr = JSON.stringify(students);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `class${currentClass}_students.json`;
    link.click();
}

function clearAll() {
    if (confirm('确定要一键清零所有积分吗？')) {
        students.forEach(student => student.score = 0);
        saveStudents();
        renderTable();
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    loadStudents();
});