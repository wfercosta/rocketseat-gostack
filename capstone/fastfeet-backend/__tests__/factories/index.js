import { factory } from 'factory-girl';
import faker from 'faker';
import { User, Recipient, Deliveryman, Delivery, Problem } from '@models';

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

factory.define('Deliveryman', Deliveryman, {
  name: faker.name.findName,
  email: faker.internet.email,
});

factory.define(
  'Delivery',
  Delivery,
  {
    product: faker.commerce.productName,
  },
  {
    afterBuild: async (model) => {
      const { id: recipient } = await factory.create('Recipient');
      const { id: deliveryman } = await factory.create('Deliveryman');

      model.recipient_id = recipient;
      model.deliveryman_id = deliveryman;

      return model;
    },
  }
);

factory.define('Problem', Problem, {
  description: faker.lorem.words(6),
});

export default factory;
