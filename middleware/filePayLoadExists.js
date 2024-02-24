const filePayLoadExists = (req, res, next) => {
    if (!req.files) {
        return res.status(400).json({ status: 'Failed', message: 'Missing files' });
    }
    next()
}

module.exports = filePayLoadExists;