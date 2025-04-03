import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatDetails, postChat } from "../Slices/ChatBoxSlices";
import { FaRocketchat } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const User = () => {
  const dispatch = useDispatch();
  const chatContainerRef = useRef(null);

  const messageDetails = useSelector(chatDetails);
  console.log(messageDetails);
  const [ismode,setIsMode]=useState(false)
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

  const [isPlaying, setIsPlaying] = useState(
    localStorage.getItem("playingId") || ""
  );
  const handlePlay = (text, id) => {
    const value = new SpeechSynthesisUtterance(text);
    value.onend = () => {
      setIsPlaying("");
      localStorage.removeItem("playingId");
    };
    if (!isPlaying) {
      localStorage.removeItem("playingId");
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(value);
      setIsPlaying(id);
    } else {
      window.speechSynthesis.cancel();
      setIsPlaying("");
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messageDetails]);

  
  return (
    <div>
      <div className="w-96  lg:rounded-t-lg  shadow-xl lg:mt-10">
        <div className="">
          <div className="flex justify-between items-center bg-violet-600 px-4">
            <div className={`${ismode ? "text-gray-800" :"text-white"} bg-violet-600 flex items-center gap-4 lg:px-2  py-4 text-white text-2xl lg:rounded-t-lg`}>
              <FaRocketchat size={30}/>
              <p className="font-bold">Chatbot</p>
            </div>

           <div>
           <div className={`${ismode ? "hidden" : "block"} text-3xl text-white`} onClick={()=>setIsMode(true)}>
              <MdOutlineDarkMode />
            </div>
            <div className={`${ismode ? "block" : "hidden"} text-3xl text-gray-800`} onClick={()=>setIsMode(false)}>
            <MdDarkMode />
            </div>
           </div>
          </div>
          <div
            ref={chatContainerRef}
            className={`${ismode ? "bg-black" :"bg-white"}  py-4 lg:h-96 h-[540px] overflow-auto`}
          >
            {messageDetails.map((value) => {
              return (
                <>
                  <div className="">
                    <div className={`px-4 flex gap-2 ${
                            value.status == "user"
                              ? "flex-row-reverse justify-end "
                              : "flex justify-start "
                          } inline-block  items-center mt-6`} >
                      <p
                        className={` p-2 w-auto rounded-lg text-lg text-gray-700 ${
                          value.status == "user"
                            ? " bg-slate-500"
                            : " bg-gray-200"
                        }`}
                      >
                        <p
                          className={`flex py-2 px-4 rounded-lg text-lg text-gray-700 `}
                        >
                          {value.text}
                        </p>
                      </p>
                      <div>
                        <p
                          className={`${
                            isPlaying == value.id ? "hidden" : "block"
                          }`}
                          onClick={() => handlePlay(value.text, value.id)}
                        >
                          <FaPlay className="text-gray-700" />
                        </p>
                        <p
                          className={`${
                            isPlaying == value.id ? "block" : "hidden"
                          }`}
                          onClick={() => handlePlay(value.text, value.id)}
                        >
                          <FaPause className="text-gray-700" />
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} className={`${ismode ? "bg-black" :"bg-white"} py-4`}>
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
            <div className={`${ismode ? "text-black" : "text-white"} text-3xl  flex justify-center items-center bg-violet-600  rounded-lg`}>
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
