const BaseModel = require('./BaseModel');

class User extends BaseModel {
  getAuthUser(ctx) {
    if (ctx.isAuthenticated()) {
      return ctx.getUser();
    }

    return null;
  }

  async signUp(signUpData) {
    console.log('regestration user', signUpData);
    if (signUpData.password !== signUpData.passwordConfirmation) {
      throw new Error('Password must be the same as confirmation password!');
    }
    signUpData.role = 'admin';
    try {
      return await this.Model.create(signUpData);
    } catch (e) {
      if (e.code && e.code === 11000) {
        throw new Error('User with provided email already exists!');
      }

      throw e;
    }
  }

  async signIn(signInData, ctx) {
    console.log('signInData', signInData);
    console.log('Context', ctx);
    try {
      const user = await ctx.authenticate(signInData);
      return user;
    } catch (error) {
      return error;
    }
  }

  signOut(ctx) {
    try {
      ctx.logout();
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = User;
