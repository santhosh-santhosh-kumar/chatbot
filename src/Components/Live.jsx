import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatDetails } from "../Slices/ChatBoxSlices";

const Live = () => {
  const dispatch = useDispatch();
  const messageDetails=useSelector(chatDetails)
  console.log(messageDetails)
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
     
      dispatch(addChat({...values,status:"live"}));
      formik.resetForm()
    },
  });
  return (
    <div>
      <div className="border ">
        <div className="border">
            <div>
                  {messageDetails.map((value)=>{

                        return <>
                       <p className={`mt-4 p-2 w-auto rounded-lg text-lg text-gray-700 flex ${value.status=="user" ? "justify-start " : "justify-end "} inline-block`}>
                        <p className={`py-2 px-4 rounded-lg text-lg text-gray-700 flex ${value.status=="user" ? "justify-start bg-slate-500" : "justify-end bg-gray-200"} inline-block`}> {value.text}</p>
                    </p>
                        </>
                  })}
            </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="text"
            className="border w-full p-4 rounded-lg"
            value={formik.values.text}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <p className="text-red-500">{formik.errors.text}</p>
          <div className="flex justify-center items-center bg-blue-600 text-white">        
          <button type="submit" className="p-4 text-xl">send</button>   
          </div>
        </form>
      </div>
      <p className="flex justify-center text-2xl">LIVE</p>
    </div>
  );
};



export default Live