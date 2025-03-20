import React, { useState } from "react";
import Modal from "react-modal";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { FaRegFolder, FaRegFolderOpen, FaUser } from "react-icons/fa";

const TestModal = ({ isModalOpen, handleCloseModal, handleSelectApprovers }) => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const nodes = [
    {
      value: "all",
      label: "전체",
      showCheckbox: false,
      children: [
        {
          value: "hr",
          label: "인사",
          showCheckbox: false,
          children: [
            { value: "hr-1", label: "김철수 / 팀장", icon: <FaUser /> },
            { value: "hr-2", label: "이영희 / 선임개발자", icon: <FaUser /> },
            { value: "hr-3", label: "박민수 / 개발자", icon: <FaUser /> },
          ],
        },
        {
          value: "dev",
          label: "개발",
          showCheckbox: false,
          children: [
            { value: "dev-1", label: "홍길동 / 팀장", icon: <FaUser /> },
            { value: "dev-2", label: "이영희 / 선임개발자", icon: <FaUser /> },
            { value: "dev-3", label: "박민수 / 개발자", icon: <FaUser /> },
          ],
        },
      ],
    },
  ];

  const selectedLabels = checked
    .map((id) =>
      nodes
        .flatMap((group) => group.children || [])
        .flatMap((team) => team.children || [])
        .find((person) => person.value === id)?.label
    )
    .filter(Boolean);

  const handleConfirm = () => {
    handleSelectApprovers(selectedLabels); // 선택된 결재자 라벨을 부모로 전달
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      className="modal-content bg-white p-6 w-[500px] rounded-3xl shadow-lg"
      overlayClassName="fixed inset-0 bg-[#323232] bg-opacity-80 flex justify-center items-center"
      appElement={document.getElementById("root")}  // appElement 설정
    >
      <div className="p-4">
        <h2 className="font-bold text-lg mb-4">결재자 선택</h2>

        <CheckboxTree
          nodes={nodes}
          checked={checked}
          expanded={expanded}
          onCheck={setChecked}
          onExpand={setExpanded}
          icons={{
            check: <span className="text-green-600">✔</span>,
            uncheck: <span className="text-gray-400">◻</span>,
            expandClose: <FaRegFolder />,
            expandOpen: <FaRegFolderOpen />,
            parentClose: null, // "전체" 아이콘 제거
            parentOpen: null, // "전체" 아이콘 제거
            leaf: <FaUser />,
          }}
        />

        <div className="mt-4 p-3 border rounded-lg">
          <h3 className="font-bold mb-2">선택된 결재자</h3>
          {selectedLabels.length > 0 ? (
            selectedLabels.map((label) => (
              <p key={label} className="text-sm text-gray-700">- {label}</p>
            ))
          ) : (
            <p className="text-gray-400">결재자를 선택하세요.</p>
          )}
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={handleCloseModal}
            className="px-6 py-2 border border-gray-300 rounded-full text-gray-600"
          >
            취소
          </button>
          <button onClick={handleConfirm} className="px-6 py-2 bg-[#006D2C] text-white rounded-full">
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
};


export default TestModal