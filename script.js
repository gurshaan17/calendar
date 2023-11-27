let currentView = 'monthly';
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function generateCalendar() {
  const calendarBody = document.getElementById('calendarBody');
  const calendarHeader = document.getElementById('currentMonthYear');
  calendarHeader.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
  calendarBody.innerHTML = '';

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

  let dayCount = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      if (i === 0 && j < firstDay) {
        cell.textContent = '';
      } else if (dayCount <= lastDay) {
        cell.textContent = dayCount;
        dayCount++;
      }
      row.appendChild(cell);
    }
    calendarBody.appendChild(row);
  }
}

function generateWeeklyCalendar() {
  const calendarBody = document.getElementById('calendarBody');
  const calendarHeader = document.getElementById('currentMonthYear');
  calendarHeader.textContent = `Week ${getWeekNumber(currentYear, currentMonth, 1)} - ${getWeekNumber(currentYear, currentMonth, 7)}`;

  calendarBody.innerHTML = '';

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

  let dayCount = 1;
  for (let i = 0; i < 1; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      if (dayCount <= lastDay) {
        cell.textContent = dayCount;
        dayCount++;
      }
      row.appendChild(cell);
    }
    calendarBody.appendChild(row);
  }
}

function getMonthName(month) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[month];
}

function getWeekNumber(year, month, day) {
  const date = new Date(year, month, day);
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
  return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
}

function switchView(view) {
  currentView = view;
  if (currentView === 'monthly') {
    generateCalendar();
  } else if (currentView === 'weekly') {
    generateWeeklyCalendar();
  }
}

function next() {
  if (currentView === 'monthly') {
    currentMonth = (currentMonth + 1) % 12;
    if (currentMonth === 0) {
      currentYear++;
    }
    generateCalendar();
  } else if (currentView === 'weekly') {
    currentMonth = (currentMonth + 1) % 12;
    if (currentMonth === 0) {
      currentYear++;
    }
    generateWeeklyCalendar();
  }
}

function previous() {
  if (currentView === 'monthly') {
    currentMonth = (currentMonth - 1 + 12) % 12;
    if (currentMonth === 11) {
      currentYear--;
    }
    generateCalendar();
  } else if (currentView === 'weekly') {
    currentMonth = (currentMonth - 1 + 12) % 12;
    if (currentMonth === 11) {
      currentYear--;
    }
    generateWeeklyCalendar();
  }
}
generateCalendar();