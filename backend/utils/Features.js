class Features {
  constructor(query, queryStr) {
    (this.query = query), (this.queryStr = queryStr);
  }

  search() {
    // get the value of keyword from query
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    // perform a search with the received keyword
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    // get the filter value
    const { filter } = this.queryStr;

    // perform a search for the keyword
    if (filter) {
      this.query = this.query.find({ category: filter });
    }
    return this;
  }

  pagination(perPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = perPage * (currentPage - 1);

    this.query = this.query.limit(perPage).skip(skip);
    return this;
  }
}

module.exports = Features;
