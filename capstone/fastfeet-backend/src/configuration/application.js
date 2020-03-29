const configuration = {
  auth: {
    secret: process.env.AUTHORIZATION_SECRET,
    expiration: process.env.AUTHORIZATION_EXPIRATION,
  },
};

export default configuration;
