import * as auth from '@modules/auth/utils/dataProvider/dataProvider';

async function bootstrapUserData() {
  let userData = { user: null };
  if (auth.isLoggedIn()) {
    const user = await auth.getUser();
    userData = { user };
  }

  return userData;
}

export { bootstrapUserData };
