// const express = require('express');
// const speakeasy = require('speakeasy');
// const path = require('path')
// const app = express();


// const accounts = [
//     { name: 'Zerodha Deepak', secret: 'JBSWY3DPEHPK3PXP' },
//     { name: 'Zerodha Devansh', secret: 'KRSXG5DFNFZSAYJA' },
//     { name: 'Angel One', secret: 'IFXWYZB4J5D7O43K' }
// ];

// function generateTOTP(secret) {
//     return speakeasy.totp({
//         secret: secret,
//         encoding: 'base32'
//     });
// }

// app.get('/api/otps', (req, res) => {
//     const otps = accounts.map(account => ({
//         name: account.name,
//         otp: generateTOTP(account.secret)
//     }));
//     res.json(otps);
// });

// // app.use(express.static('./src'))
// app.use(express.static(path.join(__dirname, 'src')));
// app.use(express.static(path.join(__dirname, 'dist')));
// app.use(express.json());

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './index.html'));
// })

// app.listen(5003, () => {
//     console.log("Server of this app is now running");
// });


const express = require('express');
const path = require('path');
const speakeasy = require('speakeasy');
const app = express();

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api/otps', (req, res) => {
    const accounts = [
        { name: 0, secret: 'LD3OJ5Y5OQD54TJJOXLI5C3QUC45JFWW' },
        { name: 1, secret: '6AZAHLCGK4XDGN7ZRE3P26HSPJZ7STJW' },
        { name: 2, secret: 'T6R3PD6BU6OISOIBQ5NOIXVPEM' }
    ];

    function generateTOTP(secret) {
        return speakeasy.totp({
            secret: secret,
            encoding: 'base32'
        });
    }

    res.json(
        accounts.map(account => ({
            index: account.name,
            otp: generateTOTP(account.secret)
        }))
    );
    // res.json([{ index: 0, otp: 132497 }, {index: 1, otp: 3466}, {index: 2, otp: 8763}]);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(5003, () => {
    console.log("Server of this app is now running");
});
