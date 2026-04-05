# Finance Dashboard UI

A responsive finance dashboard built using **HTML, CSS, JavaScript, Bootstrap, and Chart.js**.

This project allows users to view financial summaries, manage transactions, explore spending patterns, switch roles, use dark mode, and export transaction data.

---

## Features

### Dashboard Overview
- Total Balance
- Total Income
- Total Expenses
- Balance Trend chart
- Spending Breakdown chart

### Transactions
- View transaction list
- Search transactions
- Filter by type and category
- Sort by date or amount
- Add, edit, and delete transactions (Admin only)

### Role-Based UI
- **Admin**: can add, edit, delete, and export
- **Viewer**: can only view data

### Insights
- Highest spending category
- Monthly comparison
- Average transaction amount

### Export
- Export data as **CSV**
- Export data as **JSON**

### Other Features
- Dark mode
- Local storage persistence
- Responsive design for mobile, tablet, and desktop
- Empty state handling

---

## Categories Used

- Salary
- Freelancing
- Shopping
- Food
- Travelling

---

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Bootstrap Icons
- Chart.js
- localStorage

---

## Approach

This project was built as a frontend-only dashboard using mock data.  
The UI is designed with Bootstrap and custom CSS, while JavaScript handles:

- transactions data
- filters and sorting
- role switching
- theme switching
- chart updates
- export functionality

State is managed using plain JavaScript objects instead of React or other libraries, keeping the project simple and easy to understand.

---

## Setup Instructions

### Run locally
1. Download or clone the project
2. Open `index.html` in your browser

### Or use a local server
With VS Code Live Server:
- Open the project
- Right click `index.html`
- Select **Open with Live Server**

Or with Python:
```bash
python -m http.server 8000