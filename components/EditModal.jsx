import React, { useState, useEffect } from "react";
import DetailsModal from "./DetailsModal";
import Modal from "react-modal";

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

const EditModal = ({ onEditModalChange, item, saveModalDetails, edit }) => {
  const [title, setTitle] = useState();
  const [imgSrc, setImgSrc] = useState()
  const [desc, setDesc] = useState();
  const [video, setVideo] = useState()
  const [multi, setMulti] = useState({ 0: true, 1: true })
  const [previewModal, setPreviewModal] = useState(false)

  const getBase64 = (file, callback) => {
    let reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onload = function () {
      callback(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  useEffect(() => {
    if (item) {
      setTitle(item?.title);
      setDesc(item?.desc);
      setImgSrc(item?.imgSrc)
      setVideo(item?.video)
      setMulti(item?.multi)
    }
  }, [item]);

  const onMultiSelect = (value, check) => setMulti(state => {
    let newState = { ...state }
    newState[value] = check
    return newState
  })


  const showPreview = () => {
    setPreviewModal(state => !state)
  }

  return (
    <>
      <div>
        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {edit ? "Edit Skill Details" : "Add New Skill"}
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => onEditModalChange()}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        <div className="flex space-y-4 flex-col py-4">
          <div className="grid grid-cols-2 gap-4">
            <p>Name</p>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name of the Skill"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <p>Image URL</p>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              className="bg-gray-50 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Please enter a image URL"
              required
              // value={imgSrc}
              onChange={(e) => {
                getBase64(e, (value) => {
                  setImgSrc(value)
                })
              }
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <p>Video</p>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name of the Skill"
              required
              value={video}
              onChange={(e) => setVideo(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <p>description</p>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your Skill description here"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="flex  justify-between py-6">
          <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <input id="bordered-checkbox-1"
              checked={multi[0]}
              type="checkbox"
              onChange={(e) => onMultiSelect(0, e.target.checked)}
              name="bordered-checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label for="bordered-checkbox-1"
              class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 pr-4">Have related degree</label>
          </div>
          <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <input
              checked={multi[1]}
              id="bordered-checkbox-2"
              type="checkbox"
              onChange={(e) => onMultiSelect(1, e.target.checked)}
              name="bordered-checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label for="bordered-checkbox-2"
              class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 pr-4">
              Have Enterprise Experience
            </label>
          </div>
        </div>
        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
            type="button"
            className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => showPreview()}
          >
            Preview
          </button>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => saveModalDetails(title, desc, imgSrc, video, multi, item?._id)}
          >
            Save
          </button>
          <button
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            onClick={() => onEditModalChange()}
          >
            Cancel
          </button>

        </div>

      </div>
      <Modal
        isOpen={previewModal}
        onRequestClose={showPreview}
        style={customStyles}
      >
        <DetailsModal
          onDetailsModalChange={showPreview}
          item={{
            title,imgSrc,video,desc,multi
          }}
        />
      </Modal>
    </>
  );
};

export default EditModal;
