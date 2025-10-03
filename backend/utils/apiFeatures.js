const { Op } = require("sequelize");

class APIFeatures {
  constructor(model, queryString) {
    this.model = model;
    this.queryString = queryString;
    this.options = {
      where: {},
      include: [],
    };
  }

  filter() {
    const { status } = this.queryString;

    if (status && status !== "all") {
      this.options.where.status = status;
    }

    return this;
  }

  sort() {
    const { sort } = this.queryString;

    if (sort) {
      if (sort.toLowerCase() === "asc") {
        this.options.order = [["priority", "ASC"]];
      } else if (sort.toLowerCase() === "desc") {
        this.options.order = [["priority", "DESC"]];
      }
    }

    return this;
  }

  async exec() {
    return this.model.findAll(this.options);
  }
}

module.exports = APIFeatures;
