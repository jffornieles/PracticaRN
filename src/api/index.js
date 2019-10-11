import axios from 'axios';

export function configure() {
  axios.defaults.baseURL = 'https://www.googleapis.com';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
}

export function fetchBooks() {
  const url = '/books/v1/volumes?q=stephen+king&startIndex=0&maxResults=40';
  return axios.get(url);
}
