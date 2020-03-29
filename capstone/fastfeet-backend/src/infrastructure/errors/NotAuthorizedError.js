class NotAuthorizedError extends Error {
  constructor(message) {
    super(message || 'Access not authorized');
    this.status = 401;
    this.name = 'NotAuthorizedError';
  }
}

export default NotAuthorizedError;
