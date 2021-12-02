import * as _axios from 'axios'

export const axios = _axios.default.create({
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json'
  }
})