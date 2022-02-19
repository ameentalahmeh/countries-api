const app = require('./app');

app.listen(app.get('PORT'), () => {
    console.log(`The Server is running on http://localhost:${app.get('PORT')}`);
});