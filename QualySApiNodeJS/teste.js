//https://nodejs.org/api/crypto.html#crypto_crypto
const crypto = require('crypto');

const secret = 'senha';
const hash = crypto.createHash('MD5')
                   .update(secret)
                   .digest('hex');

// crypto.createHmac('MD5', secret)
//                    .update('I love cupcakes')
//                    .digest('hex');
console.log(hash);
// Prints:
//   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e