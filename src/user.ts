import {driver} from './mongodb';

const userCollection = 'users';

export interface User {
  _id: string,
  username: string,
  password: string
}

export const findOne = async (username: string) => {
  try {
    return {
      user: await driver().db()
        .collection(userCollection)
        .findOne<User>({username: username})
    };
  } catch (e) {
    return {user: null, err: e};
  }
};

export const findById = async (id: string) => {
  try {
    return {
      user: await driver().db()
        .collection(userCollection)
        .findOne({_id: id})
    };
  } catch (e) {
    return {user: null, err: e};
  }
};
