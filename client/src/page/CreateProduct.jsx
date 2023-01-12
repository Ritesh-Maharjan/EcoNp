import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "../redux/slicer/userSlice";
import { createProduct } from "../utils/productApi";

const CreateProduct = () => {
  const naviagte = useNavigate();
  const token = useSelector(getToken);
  const [data, setData] = useState({
    name: "",
    price: "",
    desc: "",
    category: "",
    stock: "",
    discounted: "",
    color: "",
    size: "",
    images: "",
  });
  const [error, setError] = useState("");

  const onDataChange = (e) => {
    const { name, value } = e.target;

    if (e.target.type === "file") {
      setData({
        ...data,
        [name]: e.target.files,
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
    setError("");
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    const {
      name,
      price,
      desc,
      category,
      stock,
      discounted,
      color,
      size,
      images,
    } = data;

    if (!price || !desc || !category || !stock) {
      setError("Name, Price, Description, Category and Stock is required");
    } else {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("price", Number(price));
      formData.append("description", desc);
      formData.append("category", category);
      formData.append("stock", Number(stock));
      if (discounted) {
        formData.append("discountedPrice", discounted);
      }
      if (color) {
        formData.append("color", color);
      }
      if (size) {
        formData.append("size", Number(size));
      }
      if (images) {
        let imagesArr = [...images];
        imagesArr.forEach((el) => {
          formData.append("photos", el);
        });
      }
      const resData = await createProduct(formData, token);

      if (resData?.data?.success) {
        setData({
          name: "",
          price: "",
          desc: "",
          category: "",
          stock: "",
          discounted: "",
          color: "",
          size: "",
          images: "",
        });
        setError("");
        // naviagte("/");
      } else {
        setError(resData.response.data.message);
      }
    }
  };

  return (
    <div className="flex min-h-[90vh] py-10 items-center justify-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-[450px]"
        onSubmit={(e) => submitProduct(e)}
      >
        <h1 className="text-black text-center font-bold text-lg mb-4">
          Create Product
        </h1>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="name"
            placeholder="Enter name"
            name="name"
            value={data.name}
            onChange={(e) => onDataChange(e)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="desc"
          >
            Description*
          </label>
          <textarea
            className="shadow appearance-none border rounded h-20 w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
            id="desc"
            placeholder="Enter description"
            name="desc"
            value={data.desc}
            onChange={(e) => onDataChange(e)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            price*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            placeholder="Enter price"
            name="price"
            onChange={(e) => onDataChange(e)}
            value={data.price}
            onWheel={(e) => e.target.blur()}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            category*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            type="text"
            placeholder="Enter category"
            name="category"
            onChange={(e) => onDataChange(e)}
            value={data.category}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="stock"
          >
            stock*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="stock"
            type="number"
            placeholder="Enter stock"
            name="stock"
            onChange={(e) => onDataChange(e)}
            onWheel={(e) => e.target.blur()}
            value={data.stock}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="discounted"
          >
            Discounted price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="discounted"
            type="number"
            placeholder="Enter discounted"
            name="discounted"
            onChange={(e) => onDataChange(e)}
            value={data.discountedPrice}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="color"
          >
            color
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="color"
            type="string"
            placeholder="Enter color"
            name="color"
            onChange={(e) => onDataChange(e)}
            value={data.color}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="size"
          >
            size
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="size"
            type="number"
            placeholder="Enter size"
            name="size"
            onChange={(e) => onDataChange(e)}
            value={data.size}
          />
        </div>

        <div className="mb-4">
          <label className="inline-block mb-2 text-gray-500">
            Upload Image(jpg,png,svg,jpeg)
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
              <div className="flex flex-col items-center justify-center pt-7">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                  {data.images ? (
                    <span>Images Selected</span>
                  ) : (
                    <span>Select images</span>
                  )}
                </p>
              </div>
              <input
                type="file"
                name="images"
                className="opacity-0"
                multiple
                onChange={(e) => onDataChange(e)}
              />
            </label>
          </div>
        </div>

        {error && (
          <div>
            <p className="text-red-500">{error}</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={(e) => submitProduct(e)}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
