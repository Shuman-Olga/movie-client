import http from './http-common';

class DataService {
  getAll() {
    return http.get('/');
  }
  create(data) {
    return http.post('/insert', { data });
  }
}

export default new DataService();
