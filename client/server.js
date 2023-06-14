const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const cors = require('cors');

const configuration = new Configuration({
  //Openai api
  apiKey:process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const app = express();

app.use(express.json());
app.use(cors());

const port = 3080;

app.post('/', async (req, res) => {
  const { message } = req.body;
  console.log(message);
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: 'Create serveral steps for the todo: ' + message,
      max_tokens: 100,
    // temperature: 0,
  });
  res.json({
    message: response.data.choices[0].text,
    // message: 'sample steps',
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
