# Welcome to React!

Create your react apps
```terminal
 npx create-react-app product-management-frontend 
```

After install successful change directory into the react app folder
```terminal
 cd product-management-frontend
 yarn start
```

# Sort and update architecture file
Open product-management-frontend using visual studio code

1. Create .env.local file add these line, this will be inside git ignore because it might contain sensitive data
```
PORT=3000

REACT_APP_API_BASE_URL      = "http://localhost:8000"
```

and add .env.example for reference purposes

```
PORT=

REACT_APP_API_BASE_URL      = 
```

2. Open package.json and update these line
```
"start": "react-scripts start",
"build": "react-scripts build",
```

***to***

```
"start": "dotenv -e .env.local react-scripts start",
"build": "dotenv -e .env.local react-scripts build",
```

3. Remove/clear dummy files

i. src/App.css(clear)

ii. src/App.js(update)
```js
import './App.css';

function App() {
  return (
    <div className="App">
      Clean
    </div>
  );
}

export default App;
```

add at last object of package.json

```json
 "devDependencies": {
    "dotenv-cli": "^4.0.0"
  }
```

ii. src/logo.svg(remove)

4. Create important folders

i. src/assets

ii. src/assets/img

iii. src/assets/svg

iv. src/components

v. src/components/product

vii. src/modules

xiv. src/services

xv. src/services/product

xvi. src/services/auth

5. Create important files

i. components/components.css

ii. compontents/main/index.js

iii. ...

6. Install libraries from npm

```
npm install react-router-dom@6
npm install antd
npm install dotenv
npm install axios
```







