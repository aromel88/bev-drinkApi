
const handleQuery = (res, err, doc) => {
  if (err) {
    return res.status(400).json(err);
  }
  return res.status(200).json(doc);
};

module.exports = {
  handleQuery,
};
