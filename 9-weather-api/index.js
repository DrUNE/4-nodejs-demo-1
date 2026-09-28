import express from 'express';

import { getWeather } from './services/api.service.js';

const port = 8000;
const app = express();

app.get('/weather', async (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).json({
      error: 'Missing required query parameter: city',
      code: 'MISSING_PARAMETER',
    });
  }

  const weatherList = await getWeather(...[city].flat());
  return res.json(weatherList);
});

app.use((err, req, res) => {
  console.log(err.message);
  return res.status(503).json({
    error: 'External weather service temporarily unavailable',
    code: 'UPSTREAM_UNAVAILABLE',
    retryAfterSeconds: 60,
  });
});

app.listen(port, () => console.log(`Сервер запущен на http://localhost:${port}`));
