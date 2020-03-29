const auth = {
  secret: process.env.AUTHORIZATION_SECRET,
  expiration: process.env.AUTHORIZATION_EXPIRATION,
};

export { auth };
