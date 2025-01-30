//if you want to search some product in our database
class ApiFiters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          //if keyword is in the query , then we will simply have to search in the name keyword
          name: {
            $regex: this.queryStr.keyword, //search in the name of the product not exactly match the product name with the keyword
            $options: "i", //search is going to be insensitive
          },
        }
      : {}; //if keyword is not there ,this is going to be an empty objects
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filters() {
    const queryCopy = { ...this.queryStr }; //because i have to play around with that copy

    // I have already handled the keyword=apple in search() so remove this keyword now handle e.g category=Headphone
    const fieldsToRemove = ["keyword", "page"]; // we have to also remove the page that handled by pagination(resperPage)

    fieldsToRemove.forEach((el) => delete queryCopy[el]);
    // Advance filter for price, ratings etc
    let queryStr = JSON.stringify(queryCopy); //here i will use Stringify() to stringify my javascript object(queryCopy) so that why i can get back my string here
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1); //e.g resPerpage=10 if we want to go the the page number two  then currentPage=2
    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}
export default ApiFiters;
