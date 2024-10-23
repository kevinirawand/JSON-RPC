const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

function addNumbers(params) {
    if (params.length !== 2 || typeof params[0] !== 'number' || typeof params[1] !== 'number') {
        return { error: "Invalid parameters" };
    }
    return { result: params[0] + params[1] };
}

app.post('/rpc', (req, res) => {
    const { jsonrpc, method, params, id } = req.body;

    if (jsonrpc !== '2.0' || !method || !params || !id) {
        return res.status(400).json({ jsonrpc: '2.0', error: 'Invalid request', id });
    }

    if (method === 'add') {
        const response = addNumbers(params);
        return res.json({ jsonrpc: '2.0', result: response.result, error: response.error, id });
    } else {
        return res.status(400).json({ jsonrpc: '2.0', error: 'Method not found', id });
    }
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});