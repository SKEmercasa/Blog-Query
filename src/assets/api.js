import axios from 'axios';

const baseURL = 'https://blog.kata.academy/api';

export asyos.get(`${baseURL}/articles?limit=5&offset=${(page - 1) * 5}`);
  return await response.data;
}

export async function getUsers() {
  const response = await axios.post('https://blog.kata.academy/api/users', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    user: {
      username: 'emercasafront1',
      email: 'emercasafront1@list.ru',
      password: 'qwerty2906',
    },
  });
  return await response.data;
}

export async function getLogin() {
  const response = await axios.post('https://blog.kata.academy/api/users/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    user: {
      email: 'emercasafront@list.ru',
      password: 'qwerty2906',
    },
  });
  return await response.data;
}

export async function getUser() {
  const response = await axios.get('https://blog.kata.academy/api/user', {
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2JhMDI3NjBjNjc1MWIwMGI3NjRiOSIsInVzZXJuYW1lIjoiZW1lcmNhc2Fmcm9udDEiLCJleHAiOjE2ODY4MTMyMjQsImlhdCI6MTY4MTYyOTIyNH0.WEX6YfS9gl8sKAWlGKKg9xHrF-sVZ9M2RY_yYk24lb4',
    },
  });
  return await response.data;
}
