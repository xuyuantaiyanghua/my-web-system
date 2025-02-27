const classSelector = document.getElementById('classSelector');
const startBtn = document.getElementById('startBtn');
const nameDisplay = document.getElementById('nameDisplay');
const speedControl = document.getElementById('speedControl');
const historyDisplay = document.getElementById('history');

const classes = {
    '1': [
        "张皓然", "王瀚卿", "郭天骐", "沈鑫源", "柴瑀霏", "张曦媛", "姜月龙", "崔晨曦", "王之静简", "汪轩皓",
        "肖敬严", "史雨杭", "徐歆恬", "王海鑫", "郑羽萱", "卢诗洋", "刘骁", "陈京玉", "祁昊然", "张喆",
        "朱思静", "王泓舟", "沙雨萱", "马连想", "吴明轩", "高苗天乐", "郝义涵", "王梓晗", "龚品瑄", "李熙俊",
        "陈梓馨", "李梓仟", "祝婕雅", "王嘉驿", "安李昊涵", "张雨乐", "刘万坤", "宋元悦"
    ],
    '2': [
        "刘雨莹", "张玟玉", "付嘉祺", "谢馨怡", "司耀阳", "杨一晨", "李若琪", "马晨曦", "郑梓晨", "李芳维",
        "皮佳涵", "吴梦琪", "安雨馨", "赵钰鑫", "王子恒", "丁寅通", "马雨皓", "李浩然", "吴绮暄", "许胜熙",
        "王子涵", "孙宇芮", "王冬誉", "张越恩", "隗欣瑶", "穆泓宇", "王嘉晨", "张澳", "隗菁", "李牧熙",
        "张家硕", "史航程", "韩鑫伊", "李泽雯", "刘鑫禧", "郭淼", "李铭轩"
    ]
};

let interval;
let history = [];
let currentClass = '';
let availableNames = [];

classSelector.addEventListener('change', () => {
    currentClass = classSelector.value;
    if (currentClass) {
        startBtn.disabled = false;
        availableNames = [...classes[currentClass]]; // 初始化可用姓名列表
        reset();
    } else {
        startBtn.disabled = true;
    }
});

startBtn.addEventListener('click', () => {
    if (interval) {
        clearInterval(interval);
        interval = null;
        startBtn.textContent = '开始提问';
        highlightSelectedName();
        addToHistory(nameDisplay.textContent);
    } else {
        startBtn.textContent = '暂停';
        interval = setInterval(() => {
            if (availableNames.length === 0) {
                availableNames = [...classes[currentClass]]; // 如果抽完一轮，重新初始化
            }
            const randomIndex = Math.floor(Math.random() * availableNames.length);
            nameDisplay.textContent = availableNames[randomIndex];
        }, 1000 / speedControl.value);
    }
});

speedControl.addEventListener('input', () => {
    if (interval) {
        clearInterval(interval);
        interval = setInterval(() => {
            if (availableNames.length === 0) {
                availableNames = [...classes[currentClass]];
            }
            const randomIndex = Math.floor(Math.random() * availableNames.length);
            nameDisplay.textContent = availableNames[randomIndex];
        }, 1000 / speedControl.value);
    }
});

function highlightSelectedName() {
    nameDisplay.style.color = 'purple';
    nameDisplay.style.fontSize = '4em';
    const selectedName = nameDisplay.textContent;
    availableNames = availableNames.filter(name => name !== selectedName); // 移除已选中的姓名
}

function addToHistory(name) {
    if (history.length >= 10) {
        history.shift();
    }
    history.push(name);
    historyDisplay.textContent = '历史记录: ' + history.join(', ');
}

function reset() {
    clearInterval(interval);
    interval = null;
    startBtn.textContent = '开始提问';
    nameDisplay.textContent = '请选择班级后开始';
    nameDisplay.style.color = '#333';
    nameDisplay.style.fontSize = '3em';
    history = [];
    historyDisplay.textContent = '历史记录：';
    availableNames = [...classes[currentClass]];
}