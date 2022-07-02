import axios from "axios";

let API_URL = process.env.REACT_APP_API_BASE_URL

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "/login", {username, password},{
        headers: {
          'Content-Type': 'application/json',
        }
      }
      )
      .then(response => {
        console.log('response', response);
        if (response.status) {
          const item = {
            value: response.data.accessToken,
            expiry: (new Date()).getTime() + 3600000,
          }
          localStorage.setItem("token", JSON.stringify(item));
        }
        return response.data.message;
      });
  }

  getCurrentUser() {
    // return JSON.parse(localStorage.getItem('user'))
    const itemStr = localStorage.getItem('token')
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem('token')
      return null
    }
    console.log('item', item);
    return item.value
  }
}

export default new AuthService();