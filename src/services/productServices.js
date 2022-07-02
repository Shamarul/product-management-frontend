import axios from 'axios';
import authHeader from './authHeader';

let API_URL = process.env.REACT_APP_API_BASE_URL

class ProductServices {
  getProduct() {
    return axios.get(API_URL + '/product' , { headers: authHeader() });
  }

  addProduct(name, quantity) {
    return axios.post(API_URL + '/product', {name, quantity} , { headers: authHeader() });
  }

  deleteProduct(id) {
    return axios.delete(API_URL + '/product/' + id , { headers: authHeader() });
  }

  updateProduct(id, name, quantity) {
    return axios.put(API_URL + '/product/' + id , {name, quantity} , { headers: authHeader() });
  }
}

export default new ProductServices();