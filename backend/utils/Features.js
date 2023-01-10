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
    // get all the query strings
    const queryCopy = { ...this.queryStr };

    // Removing some fields from queries for category
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((el) => delete queryCopy[el]);

    // perform a search for the keyword
    this.query = this.query.find(queryCopy);
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    console.log(currentPage)

    this.query = this.query.limit(resultPerPage).skip(skip)
    return this
  }
}

module.exports = Features;
