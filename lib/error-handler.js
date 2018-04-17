module.exports = (err, req, res) => {
    console.log(`ERR ERR ERR: ${req.method} ${req.url}`); //eslint-disable-line
    console.log(err); //eslint-disable-line
    res.status(err.status || 500).send(err);
};