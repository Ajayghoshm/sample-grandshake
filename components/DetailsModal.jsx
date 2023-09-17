import React, { useState, useEffect } from "react";

const DetailsModal = ({ onDetailsModalChange, item }) => {



    return (
        <div>
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    <p>{item.title}</p>
                </h3>
                <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => onDetailsModalChange()}
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
                <div className="flex justify-center">
                    <img src={item.imgSrc} className="w-28" />
                </div>
                <div className="flex flex-col items-center ">
                    <p>{item.title}</p>
                </div>
                <div className="flex justify-center flex-col space-x-4 space-y-4 items-center">
                    <p>{item.video}</p>
                    <video src={item.video} width="750" height="500" controls>
     </video>
                </div>
            </div>
            <div className="flex  justify-between py-6 space-x-4">
                <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                    <input id="bordered-checkbox-1"
                        checked={item.multi[0]}
                        type="checkbox"
                        disabled
                        name="bordered-checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="bordered-checkbox-1"
                        class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 pr-4">Have related degree</label>
                </div>
                <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                    <input
                        checked={item.multi[1]}
                        id="bordered-checkbox-2"
                        type="checkbox"
                        disabled
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
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={() => onDetailsModalChange()}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default DetailsModal;
