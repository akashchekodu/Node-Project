class Custom extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustom = (msg, statusCode) => {
  return new Custom(msg, statusCode);
};

module.exports = {
  Custom,
  createCustom,
};
