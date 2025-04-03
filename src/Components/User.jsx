import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatDetails, postChat } from "../Slices/ChatBoxSlices";
import { FaRocketchat } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";

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

  const [isPlaying, setIsPlaying] = useState(localStorage.getItem("playingId") || "");
  const handlePlay = (text,id) => {
    
    const value = new SpeechSynthesisUtterance(text);
    value.onend = () => {
      setIsPlaying("");
      localStorage.removeItem("playingId");
    };   
    if (!isPlaying) {
      localStorage.removeItem("playingId");
      window.speechSynthesis.speak(value);
      setIsPlaying(id)
    } else {
      window.speechSynthesis.cancel();
      setPlay(!play);
      setIsPlaying("")
    }
  };

  return (
    <div>
      <div className="w-96  lg:rounded-t-lg  shadow-xl">
        <div className="">
          <div className="bg-violet-600 flex justify-between lg:px-2 px-4 py-4 text-white text-2xl lg:rounded-t-lg ">
            <p className="font-bold">Chatbot</p>
            <FaRocketchat />
          </div>

          <div className="py-4 lg:h-96 h-[540px] overflow-auto">
            {messageDetails.map((value) => {
              return (
                <>
                  <div className="">
                    <div className="flex items-center ">
                      <p
                        className={` p-2 w-auto rounded-lg text-lg text-gray-700 flex ${
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
                          {value.text}
                        </p>
                      </p>
                      <div>
                      <p
                        className={`${isPlaying == value.id ? "hidden" : "block"}`}
                        onClick={() => handlePlay(value.text,value.id)}
                      >
                        <FaPlay className="text-gray-700"/>
                      </p>
                      <p
                        className={`${isPlaying == value.id ? "block" : "hidden"}`}
                        onClick={() => handlePlay(value.text,value.id)}
                      >
                        <FaPause className="text-gray-700"/>
                      </p>
                      </div>
                    </div>
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
