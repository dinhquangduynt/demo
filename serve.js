const express = require('express')
const app = express();
const natural = require('natural');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = 3000;

app.get('/', (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/html",
    });
    res.write("<head><meta charset='utf-8'></head>");
    res.write("<body style='text-align:center'>");
    res.write("<h1>Vnext Wordcloud</h1>");
    res.write("<form method='POST' action='/text-mining'>");
    res.write("<div style='margin-bottom:20px'><textarea style='font-size: 16px' name='text' rows='10' cols='60'></textarea></div>");
    res.write("<button type='submit'>Submit</button>");
    res.write("</form></body>");
    res.end();
})
app.post('/text-mining', async function (req, res) {
    var text = req.body.text;
    console.log(text);
    console.log(decodeURI(text));
    var tokenizer = new natural.TokenizerJa();
    let data = tokenizer.tokenize(text);
    let result = {};
    data.forEach((d) => {
        if (result[d] != null) {
            result[d] = result[d] + 1;
        } else {
            result[d] = 1;
        }
    })
    let format = []
    for (const property in result) {
        format.push({
            word: property,
            count: result[property]
        })
    }
    res.send(format);
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})