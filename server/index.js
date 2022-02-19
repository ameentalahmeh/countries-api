const app = require('./app');

app.listen(app.get('PORT'), () => {
    console.log(`The server is running on http://localhost:${app.get('PORT')}`);
});