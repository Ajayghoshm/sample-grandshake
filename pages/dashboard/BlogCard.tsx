"use client";

import React, { useState } from "react";
import Modal from "react-modal";
 import DetailsModal from '../../components/DetailsModal'
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const BlogCard = ({
  item,
  onReadMore,
  onEditModalChange,
  onDeleteModalChange,
}) => {

  const [detailsView, setDetailsView] = useState(false)

  const onDetailsModalChange=()=>{
    setDetailsView(state=>!state)
  }

  return (
    <>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end  p-4 ">
          <div className="flex space-x-2 items-center">
            <div onClick={() => onEditModalChange(item)}>
              <img src={"/editIcon.svg"} className="w-3 cursor-pointer " />
            </div>
            <div onClick={() => onDeleteModalChange(item)}>
              <img src={"/deleteIcon.svg"} className="w-3 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={item.imgSrc}
            alt="Fake image" />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{item.title}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</span>
          <div className="flex mt-4 space-x-3 md:mt-6">
            <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => onReadMore(item.id)}>Know More</a>
            <button
              onClick={() => {
                setDetailsView(true)
              }}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center
             text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 
             focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
              Details View</button>
          </div>
        </div>
      </div>
      <Modal
          isOpen={detailsView}
          onRequestClose={onDetailsModalChange}
          style={customStyles}
        >
          <DetailsModal
            onDetailsModalChange={onDetailsModalChange}
            item={item}
          />
        </Modal>
    </>
  );
};

export default BlogCard;
