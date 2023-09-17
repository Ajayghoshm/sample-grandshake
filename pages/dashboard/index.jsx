"use client";

import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import EditModal from "../../components/EditModal";
import DeleteModal from "../../components/DeleteModal";
import Modal from "react-modal";

const Dashboard = ({ skillList }) => {

  const [SkillListState, setSkillListState] = useState([]);

  useEffect(() => {
    setSkillListState(skillList);
  }, [skillList]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeletModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [selectedSkill, setSlectedSkill] = useState();

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

  const onEditModalChange = (value) => {
    setShowEditModal((state) => !state);
    if (value) {
      setSlectedSkill(value);
    } else {
      setSlectedSkill(null);
    }
  };

  const onDeleteModalChange = (value) => {
    setShowDeletModal((state) => !state);
    if (value) {
      setSlectedSkill(value);
    } else {
      setSlectedSkill(null);
    }
  };

  const router = useRouter();

  const onSkillDetails = (value) => {
    router.push("/" + value);
  };

  const updateBlogList = async () => {
    let res = await fetch("/api/skill", {
      method: "GET",
    });
    res = await res.json();
    console.debug("await", res);
    setSkillListState(res);
  };

  const saveModalDetails = async (title, desc,imgSrc,video,multi, id) => {
    setShowEditModal(false);
    let res = await fetch("/api/skill", {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        desc: desc,
        id: id,
        imgSrc:imgSrc,
        video:video,
        multi:multi
      }),
    });
    res = await res.json();
    await updateBlogList();
    await setSlectedSkill();
  };

  const onBlogDelete = async (id) => {
    setShowDeletModal(false);
    let res = await fetch("/api/skill", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    });
  };

  const onAddModalChange = () => {
    setShowAddModal((state) => !state);
  };

  const saveNewModalDetails = async (title, desc,imgSrc,video,multi) => {
    onAddModalChange();
    let res = await fetch("/api/skill", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        desc: desc,
        imgSrc:imgSrc,
        id: title,
        video:video,
        multi:multi
      }),
    });
    await updateBlogList();
    setSlectedSkill();
  };
  return (
    <>
      <div className="p-4">
        <div className="flex justify-center space-y-2 p-4 flex-col items-center">
          <h3 className="text-4xl font-bold px-2 ">Skill Dashboard</h3>
          <p className="text-gray-500">
            This is the list of Skill from my mongoDB Atlas
          </p>
        </div>
        <div className="flex justify-end text-blue-500 ">
          <div
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => onAddModalChange()}
          >
            + Add New Skill
          </div>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
          {SkillListState.map((item) => {
            return (
              <div>
                <BlogCard
                  key={item.id}
                  item={item}
                  onReadMore={onSkillDetails}
                  onEditModalChange={onEditModalChange}
                  onDeleteModalChange={onDeleteModalChange}
                />
              </div>
            );
          })}
        </div>
        <Modal
          isOpen={showEditModal}
          onRequestClose={onEditModalChange}
          style={customStyles}
        >
          <EditModal
            onEditModalChange={onEditModalChange}
            item={selectedSkill}
            saveModalDetails={saveModalDetails}
            edit={true}
          />
        </Modal>

        <Modal
          isOpen={showAddModal}
          onRequestClose={onAddModalChange}
          style={customStyles}
        >
          <EditModal
            onEditModalChange={onAddModalChange}
            item={selectedSkill}
            saveModalDetails={saveNewModalDetails}
            edit={false}
          />
        </Modal>

        <Modal
          isOpen={showDeleteModal}
          onRequestClose={onDeleteModalChange}
          style={customStyles}
        >
          <DeleteModal
            onDeletModalChange={onDeleteModalChange}
            item={selectedSkill}
            onBlogDelete={onBlogDelete}
          />
        </Modal>
      </div>
    </>
  );
};

export default Dashboard;

export async function getServerSideProps(ctx) {
  let { DEV_URL } = process.env;
  let response = await fetch(`${DEV_URL}/api/skill`);
  let skillList = await response.json();

  return {
    props: { skillList },
  };
}
