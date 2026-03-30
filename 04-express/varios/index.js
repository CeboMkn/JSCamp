import express from 'express';
import jobs from '../jobs.json' with {type: 'json'}

const PORT = process.env.PORT || 3000;
const app = express();

app.use((req, res, next) => {
  const timeString = new Date().toLocaleTimeString();
  console.log(`[${timeString}] ${req.method} ${req.url}`);
  next();
})

/* Ejecutar cualquier MiddleWare antes de la ruta deseada */

const previusMiddleware = (req, res, next) => {
  console.log('Ejecutando middleware previo a la ruta /');
  next();
}

app.get('/', previusMiddleware, (req, res) => {
  res.send('Hello World!');
});

app.get('/get-jobs', (req, res) => {
  return res.json(jobs);
})

app.get('/get-single-job/:id', (req, res) => {
  const { id } = req.params;
  const idNumber = Number(id);
  res.json({
    job: { idNumber, title: `Trabajo con id ${id}` }
  })
})

/* Rutas Opcionales */

app.get('/a{b}cd', (req, res) => {
  res.send('Ruta con letra b opcional');
})

/* Comodín */

app.get('/bb*bb', (req, res) => {
  res.send('Ruta con comodín');
})

/* Rutas mas largas que no sabes como terminan */

app.get('/file/*filename', (req, res) => {
  res.send(`Archivo solicitado: ${req.params.filename}`);
})

/* Regex, Ruta que termina con fly */

app.get('.*fly$', (req, res) => {
  res.send('Ruta que termina con fly');
})


app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor saludable' });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});