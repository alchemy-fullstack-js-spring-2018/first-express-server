module.exports = (err, req, res) => {
    console.log('BIG FAIL!');
    console.log(err);
    res.status(err.status || 500).send(err);
};