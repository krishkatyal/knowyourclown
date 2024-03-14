import React from "react";
import { useState } from "react";
import axios from "axios";
import Demo from "../components/Demo.png";
import IdVerifiy from "./IdVerifiy";
import { WebcamStreamCapture } from "./Video";
import { useHistory } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";

const CardInput = () => {
  //   const history = useHistory();
  const [file, setFile] = useState();
  const [base64Image, setBase64Image] = useState("");
  const [base64Image2, setBase64Image2] = useState("");
  const [data, setData] = useState("");
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64Image(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  const [file2, setFile2] = useState();
  function handleChange2(e) {
    console.log(e.target.files);
    setFile2(URL.createObjectURL(e.target.files[0]));
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64Image2(reader.result);
    };
    if (file2) {
      reader.readAsDataURL(file2);
    }
  }

  console.log(base64Image);
  console.log(base64Image2);

  async function handleSubmit() {
    // history.push('/your/path')
    const data = new FormData();
    data.append("image", file);

    const options = {
      method: "POST",
      url: "https://id-document-recognition2.p.rapidapi.com/api/iddoc_base64",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "bf9660f6bamshe1fe7a17f9b4147p1c099ejsne6fe25a225da",
        "X-RapidAPI-Host": "id-document-recognition2.p.rapidapi.com",
      },
      data: {
        image: base64Image,
        image2: base64Image2,
      },
    };

    try {
      //   axios.post(
      //     "https://id-document-recognition2.p.rapidapi.com/api/iddoc",
      //     data,
      //     {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //         "x-rapidapi-host": "id-document-recognition2.p.rapidapi.com",
      //         "x-rapidapi-key":
      //           "bf9660f6bamshe1fe7a17f9b4147p1c099ejsne6fe25a225da",
      //       },
      //     }
      //   );
      const response = await axios.request(options);
      console.log(response.data);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>CardInput</div>
      <div className=" flex items-center justify-center ">
        <div className="App bg-white  bg-opacity-60 flex-col gap-8 rounded-xl border border-gray-100 flex items-center justify-center w-11/12 p-2  ">
          <h2>Add Image:</h2>
          <input type="file" onChange={handleChange} />
          <img src={file} />
          <input type="file" onChange={handleChange2} />
          <img src={file2} />
          <Link
            to={"/video"}
            onClick={handleSubmit}
            className="bg-purple-900 p-2 text-white  rounded-xl"
          >
            Submit
          </Link>
          {/* <IdVerifiy data={data} /> */}
        </div>
      </div>
    </>
  );
};

export default CardInput;
