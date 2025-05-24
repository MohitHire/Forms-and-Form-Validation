📝 React Form with Validation & GitHub Deployment
A React-based form application with client-side validation, dynamic dropdowns, and successful submission handling. Deployed on GitHub Pages for easy access.

🔗 Live Demo: https://yourusername.github.io/form-app (Replace yourusername with your GitHub username)

✨ Features
✅ Form Validation (Real-time error messages)
✅ Required Fields (Prevents submission if empty)
✅ Password Toggle (Show/Hide password)
✅ Dynamic Dropdowns (Country → City selection)
✅ Number-Only Fields (Phone & Aadhar validation)
✅ Success Page (Displays submitted data)
✅ GitHub Pages Deployment (Free hosting)

🛠 Technologies Used
React.js (Frontend)

React Router (Navigation)

GitHub Pages (Deployment)

CSS (Styling)

🚀 How to Run Locally
1. Clone the Repository
bash
git clone https://github.com/yourusername/form-app.git
cd form-app
2. Install Dependencies
bash
npm install
3. Start the Development Server
bash
npm start
(Runs on http://localhost:3000)

📦 How to Deploy to GitHub Pages
1. Update package.json
Add these lines:

json
"homepage": "https://yourusername.github.io/form-app",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
2. Install gh-pages
bash
npm install gh-pages --save-dev
3. Build & Deploy
bash
npm run deploy
4. Enable GitHub Pages
Go to Repo Settings → Pages

Select gh-pages branch and /(root)

Save & wait ~2 mins

🔗 Your app is live at: https://yourusername.github.io/form-app
