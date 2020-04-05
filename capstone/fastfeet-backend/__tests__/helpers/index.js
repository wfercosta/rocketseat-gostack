import { database } from '@root/app';

const truncate = () => {
  Object.keys(database.models).map((key) => {
    return database.models[key].destroy({
      truncate: true,
      force: true,
    });
  });
};

export default truncate;
