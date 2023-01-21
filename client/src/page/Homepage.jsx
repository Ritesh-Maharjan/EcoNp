import React, { useState } from "react";
import { useEffect } from "react";
import Card from "../component/Card";
import Loading from "../component/Loading";
import { getAllProducts, getCategoryApi } from "../utils/productApi";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState();
  const [category, setCategory] = useState();
  const [page, setPage] = useState(1);
  const [paginationLength, setPaginationlength] = useState();

  useEffect(() => {
    // getting all the products
    const getProducts = async () => {
      setLoading(true);
      const resData = await getAllProducts(search, filter, page);
      setLoading(false);

      if (resData.data?.success) {
        // setting up the pagination
        setPaginationlength(
          Math.ceil(resData.data.totalProductCount / resData.data.perPage)
        );
        setProducts(resData.data.products);
      }
    };

    // getting all the category from db to update the filter by list
    const getCategory = async () => {
      const resData = await getCategoryApi();
      setCategory(resData.data.categories);
    };

    getProducts();
    getCategory();
  }, [search, filter, paginationLength, page]);

  return (
    <div className="min-h-[90vh]">
      <div className="flex flex-col w-[90vw] m-auto">
        <form className="flex flex-col gap-4 sm:flex-row sm:items-center justify-center w-full my-8">
          <div className="flex items-center w-[280px] gap-4">
            <label htmlFor="search" className="font-bold md:text-lg">
              Search:
            </label>
            <input
              type="text"
              placeholder="Search for items"
              id="search"
              className="w-full rounded-md p-1 bg-slate-200 text-gray-700"
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="filter" className="font-bold md:text-lg">
              Filter by:
            </label>
            <select
              className="w-36 text-gray-700 bg-slate-200 rounded-md p-1"
              id="filter"
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(1);
              }}
            >
              <option
                value=""
                className="rounded-md cursor-pointer bg-slate-300"
              ></option>
              {category &&
                category.map((el) => {
                  return (
                    <option
                      value={el}
                      className="rounded-md bg-slate-300 text-black"
                      key={el}
                    >
                      {el}
                    </option>
                  );
                })}
            </select>
          </div>
        </form>

        <section className="flex flex-col my-4 gap-4">
          {loading ? (
            <Loading />
          ) : (
            <>
              <h1 className="text-center text-lg md:text-2xl font-black underline underline-offset-8">
                Our Products
              </h1>
              <div className="flex flex-wrap gap-4 justify-center">
                {products.length === 0 ? (
                  <h1 className="h-full my-10 font-bold text-red-400 text-3xl">
                    No product found
                  </h1>
                ) : (
                  products.map((el) => {
                    return <Card data={el} key={el._id} />;
                  })
                )}
              </div>
              <div className="">
                <ul className="flex justify-center items-center w-full flex-wrap gap-2">
                  {paginationLength > 1 &&
                    Array.from(Array(paginationLength), (e, i) => {
                      return (
                        <li
                          className="border-2 px-2 cursor-pointer"
                          key={i}
                          onClick={() => setPage(i + 1)}
                        >
                          {i + 1}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Homepage;
