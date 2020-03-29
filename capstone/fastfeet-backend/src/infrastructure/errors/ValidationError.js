class ValidationError extends Error {
  constructor(message) {
    super(message || 'Data sent is not valid');
    this.status = 400;
    this.name = 'ValidationError';
  }
}

export default ValidationError;
