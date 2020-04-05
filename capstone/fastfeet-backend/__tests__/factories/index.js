import { factory } from 'factory-girl';
import faker from 'faker';
import { User, Recipient } from '@models';

faker.locale = 'pt_BR';

factory.define('User', User, {
  name: faker.name.findName,
  email: faker.internet.email,
  password: faker.internet.password,
});

factory.define('Recipient', Recipient, {
  name: faker.name.findName,
  street: () => `${faker.address.streetSuffix()} ${faker.address.streetName()}`,
  number: faker.random.number,
  complement: faker.address.secondaryAddress,
  state: faker.address.state,
  city: faker.address.city,
  zipcode: faker.address.zipCode,
});

export default factory;
