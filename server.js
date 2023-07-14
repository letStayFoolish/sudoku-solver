const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(cors()) //
app.use(express.json()) // to correctly handle json

app.post('/solve', async (req, res) => {
    const options = {
      method: 'POST',
      url: 'https://solve-sudoku.p.rapidapi.com/',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com'
      },
      data: {
        puzzle: req.body.data
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      res.json(response.data)
    } catch (error) {
      console.error(error);
    }
})

app.listen(PORT, console.log(`Server is listenining on port: ${PORT}`))