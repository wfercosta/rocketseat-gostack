class NotFoundError extends Error {
  constructor(message) {
    super(message || 'Entity not found');
    this.status = 404;
    this.name = 'ValidationError';
  }
}

export default NotFoundError;
