import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatDetails, postChat } from "../Slices/ChatBoxSlices";
import { FaRocketchat } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

const User = () => {
  const dispatch = useDispatch();
  const messageDetails = useSelector(chatDetails);
  console.log(messageDetails);
  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.text.trim()) {
        errors.text = "Message cannot be empty";
      }
      return errors;
    },
    onSubmit: (values) => {
      dispatch(postChat(values.text));
      formik.resetForm();
    },
  });
  return (
    <div>
      <div className="w-96 lg:rounded-t-lg  shadow-xl">
        <div className="">
          <div className="bg-violet-600 flex justify-between lg:px-2 px-4 py-4 text-white text-2xl lg:rounded-t-lg ">
            <p className="font-bold">Chatbot</p>
            <FaRocketchat />
          </div>

          <div className="py-4">
            {messageDetails.map((value) => {
              return (
                <>
                  <div className="">
                    <p
                      className={`mt-4 p-2 w-auto rounded-lg text-lg text-gray-700 flex ${
                        value.status == "user"
                          ? "justify-end "
                          : "justify-start "
                      } inline-block`}
                    >
                      <p
                        className={`py-2 px-4 rounded-lg text-lg text-gray-700 flex ${
                          value.status == "user"
                            ? "justify-start bg-slate-500"
                            : "justify-end bg-gray-200"
                        } inline-block`}
                      >
                        {" "}
                        {value.text}
                      </p>
                    </p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} className="py-4">
          <div className="flex justify-center items-center px-4 rounded-lg gap-3">
            <textarea
              type="text"
              name="text"
              rows="1"
              value={formik.values.text}
              placeholder="Message..."
              onChange={(e) => {
                formik.handleChange(e);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              className="border  flex items-center justify-end w-full pl-2 py-3 text-xl resize-none overflow-hidden rounded-lg"
            />
            <div className="flex justify-center items-center bg-violet-600 text-white  rounded-lg">
              <button type="submit" className="text-xl p-4 ">
                <IoSend />
              </button>
            </div>
          </div>
          <p className="text-red-500">{formik.errors.text}</p>
        </form>
      </div>
    </div>
  );
};

export default User;
