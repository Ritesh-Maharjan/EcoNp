import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getToken, getUser } from "../redux/slicer/userSlice";
import {
  getProduct,
  getProductReview,
  submitReview,
} from "../utils/productApi";

const ProductDetail = () => {
  const param = useParams();
  const { id } = param;
  const user = JSON.parse(useSelector(getUser));
  const token = useSelector(getToken);
  const [product, setProduct] = useState();
  const [productReview, setProductReview] = useState();
  const [errors, setErrors] = useState();
  const [mainImage, setMainImage] = useState();
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState({
    productId: id,
    rating: 1,
    comments: "",
  });
  const [reviewDependency, setReviewDependency] = useState();

  useEffect(() => {
    const getProductApi = async () => {
      const resData = await getProduct(id);
      if (resData?.data?.success) {
        setProduct(resData.data.product);
        setMainImage(resData.data.product.images[0].url);
      } else {
        setErrors(resData.response.data.message);
      }
    };

    const getProductReviewAPi = async () => {
      const resData = await getProductReview(id);
      if (resData?.data?.success) {
        setProductReview(resData.data.reviews);
      }
    };

    getProductApi();
    getProductReviewAPi();
  }, [id, reviewDependency]);

  const changeValue = (status) => {
    if (status === "decrement" && quantity > 0) {
      setQuantity((prevState) => (prevState = prevState - 1));
    }
    if (status === "increment") {
      setQuantity((prevState) => {
        return (prevState = prevState + 1);
      });
    }
  };

  //   Changing review in temporary state to send to backend
  const changeReview = (e) => {
    const { name, value } = e.target;

    setReview((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  //   Submit review in the database
  const submitReviewApi = async (e) => {
    e.preventDefault();
    const resData = await submitReview(token, review);
    if (resData?.data?.success) {
      setReview({
        productId: id,
        rating: 1,
        comments: "",
      });
      //   to call the useEffect api and get the updated review
      setReviewDependency((prevState) => !prevState);
    }
  };

  return (
    <main className="min-h-[90vh] py-4">
      {errors && <p className="text-center text-red-400">{errors}</p>}

      {product && (
        <section className="flex flex-col gap-4 sm:flex-row m-auto w-[90vw]">
          {/* Images */}
          <div className="flex flex-col items-center gap-4 flex-1">
            <div>
              <img
                src={mainImage}
                alt="main product"
                className="h-[400px] sm:h-[500px] object-cover"
              />
            </div>
            <div className="flex gap-2 overflow-hidden">
              {product.images.map((el) => {
                return (
                  <img
                    key={el.public_id}
                    src={el.url}
                    alt="different view"
                    className="h-[50px] w-[70px] sm:w-[100px] sm:h-[100px] object-cover object-top"
                    onClick={(e) => setMainImage(el.url)}
                  />
                );
              })}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col items-center gap-3 sm:items-start">
            <h1 className="font-bold tracking-wider text-xl sm:text-2xl md:text-3xl">
              {product.name}
            </h1>

            <p>{product.description}</p>

            {/* Star ratings */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={`${product.ratings === 1 ? "yellow" : "none"}`}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 color"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={`${product.ratings === 2 ? "yellow" : "none"}`}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 color"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={`${product.ratings === 3 ? "yellow" : "none"}`}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 color"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={`${product.ratings === 4 ? "yellow" : "none"}`}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 color"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={`${product.ratings === 5 ? "yellow" : "none"}`}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 color"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </div>

              <span className="text-lg lg:text-xl">{`${product.numOfReviews} reviews`}</span>
            </div>

            <h2 className="md:text-xl">${`${product.price}`} CAD</h2>

            {/* Quantity */}
            <div className="flex gap-2">
              <span onClick={(e) => changeValue("increment")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </span>
              <span className="text-black w-12 text-center border-2 bg-white">
                {quantity}{" "}
              </span>
              <span onClick={(e) => changeValue("decrement")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15"
                  />
                </svg>
              </span>
            </div>

            {user?.role === "admin" ? (
              <div className="flex gap-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Delete
                </button>
              </div>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add to Cart
              </button>
            )}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-4 m-auto w-[90vw] mt-10">
        {/* Post review */}
        <div className="flex-1">
          {user ? (
            <div className="flex flex-col items-center">
              <h1 className="font-bold text-xl">Leave a review</h1>

              <form
                className="bg-white text-gray-700 font-semibold text-lg shadow-md rounded px-2 md:px-6 pt-6 pb-8 mb-4 flex flex-col gap-4"
                onSubmit={submitReviewApi}
              >
                <div className="flex gap-4">
                  <label className="w-20">Rating:</label>
                  <select
                    className="w-32 text-gray-700 bg-slate-200 rounded-md p-1"
                    name="rating"
                    onChange={(e) => changeReview(e)}
                    value={review.rating}
                  >
                    <option className="rounded-md bg-slate-200" value={1}>
                      1
                    </option>
                    <option className="rounded-md bg-slate-200" value={2}>
                      2
                    </option>
                    <option className="rounded-md bg-slate-200" value={3}>
                      3
                    </option>
                    <option className="rounded-md bg-slate-200" value={4}>
                      4
                    </option>
                    <option className="rounded-md bg-slate-200" value={5}>
                      5
                    </option>
                  </select>
                </div>
                <div className="flex item-center gap-4">
                  <label className="w-20">Comment:</label>
                  <textarea
                    placeholder="Leave your review"
                    className="text-black w-[200px] h-[80px] border-2"
                    name="comments"
                    value={review.comments}
                    onChange={(e) => changeReview(e)}
                    required
                  />
                </div>

                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  onSubmit={(e) => submitReviewApi(e)}
                >
                  Submit
                </button>
              </form>
            </div>
          ) : (
            <h1 className="text-center">Please log in to leave a review</h1>
          )}
        </div>

        {/* Reviews  */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-xl md:text-3xl mb-2">Reviews</h1>
          {productReview?.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {productReview.map((el, index) => {
                return (
                  <div
                    key={index}
                    className="border-2 p-4 my-2 flex flex-col gap-4"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <h1>
                        <span className="text-lg font-bold">User:</span>
                        {el.name}
                      </h1>
                      <div className="flex">
                        <span className="text-lg font-bold">Rating:</span>
                        <div className="flex">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={`${el.rating === 1 ? "yellow" : "none"}`}
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 color"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={`${el.rating === 2 ? "yellow" : "none"}`}
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 color"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={`${el.rating === 3 ? "yellow" : "none"}`}
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 color"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={`${el.rating === 4 ? "yellow" : "none"}`}
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 color"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={`${el.rating === 5 ? "yellow" : "none"}`}
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 color"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p>
                      <span className="text-lg font-bold">Comments: </span>
                      {el.comments}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No reviews for this product yet</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;