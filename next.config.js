const path = require('path');
const dev = process.env.NODE_ENV !== 'production';

module.exports = {
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname);
        return config;
    },
    // env: {
    //     BASE_URL: dev ? 'http://localhost:5000/graphql' : 'https://next-apollo-m.herokuapp.com/graphql'
    // }
};
