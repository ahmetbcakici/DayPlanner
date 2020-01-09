const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/products', (req, res) => {
    res.send([
        { name: 'Test' },
        { name: 'Loremdol' },
        { name: 'Ipsumattiroy' },
        { name: 'Dolor' },
        { name: 'Sit' },
        { name: 'Amet' },
    ]);
});

app.listen(3001 || process.env.PORT);