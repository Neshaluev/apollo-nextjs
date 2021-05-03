const BaseModel = require('./BaseModel');

class ForumCategory extends BaseModel {
  constructor(model, user) {
    super(model, user);
    this.writeRights = ['instructor', 'admin'];
  }

  create(data) {
    console.log('create category controllsers');
    if (!this.user || !this.writeRights.includes(this.user.role)) {
      throw new Error('Not Authorised!!!');
    }

    return this.Model.create(data);
  }

  getAll() {
    return this.Model.find({});
  }

  getBySlug(slug) {
    return this.Model.findOne({ slug }).populate('user');
  }
}

module.exports = ForumCategory;
