import React, { useState } from "react";
import Modal from "react-modal";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { FaRegFolder, FaRegFolderOpen, FaUser } from "react-icons/fa";

const WriteModal = ({ isModalOpen, handleCloseModal }) => {
  const [checked, setChecked] = useState([]); // 선택된 항목
  const [expanded, setExpanded] = useState([]); // 펼쳐진 항목

  // 조직도 트리 데이터
  const nodes = [
    {
      value: "all",
      label: "전체",
      showCheckbox: false, // 전체 체크박스 제거
      children: [
        {
          value: "hr",
          label: "인사",
          showCheckbox: false, // 팀 체크박스 제거
          children: [
            { value: "hr-1", label: "김철수 / 팀장", icon: <FaUser /> },
            { value: "hr-2", label: "이영희 / 선임개발자", icon: <FaUser /> },
            { value: "hr-3", label: "박민수 / 개발자", icon: <FaUser /> },
          ],
        },
        {
          value: "dev",
          label: "개발",
          showCheckbox: false, // 팀 체크박스 제거
          children: [
            { value: "dev-1", label: "김철수 / 팀장", icon: <FaUser /> },
            { value: "dev-2", label: "이영희 / 선임개발자", icon: <FaUser /> },
            { value: "dev-3", label: "박민수 / 개발자", icon: <FaUser /> },
          ],
        },
        {
          value: "frontend",
          label: "프론트엔드팀",
          showCheckbox: false, // 팀 체크박스 제거
          children: [
            { value: "fe-1", label: "김민지 / 프론트엔드 개발자", icon: <FaUser /> },
            { value: "fe-2", label: "박지훈 / 프론트엔드 개발자", icon: <FaUser /> },
          ],
        },
      ],
    },
  ];

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      className="modal-content bg-white p-6 w-[500px] rounded-3xl shadow-lg"
      overlayClassName="fixed inset-0 bg-[#323232] bg-opacity-80 flex justify-center items-center"
    >
      <div className="p-4">
        <h2 className="font-bold text-lg mb-4">결재자 선택</h2>

        {/* 검색창 */}
        <div className="mb-3 flex">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
            placeholder="이름, 부서, 직급으로 검색"
          />
          <button className="ml-2 px-4 py-2 bg-gray-200 rounded-lg">검색</button>
        </div>

        {/* 트리 컴포넌트 */}
        <CheckboxTree
          nodes={nodes}
          checked={checked}
          expanded={expanded}
          onCheck={setChecked}
          onExpand={setExpanded}
          icons={{
            check: <span className="text-green-600">✔</span>,
            uncheck: <span className="text-gray-400">◻</span>,
            halfCheck: <span className="text-yellow-500">➖</span>,
            expandClose: <FaRegFolder />,
            expandOpen: <FaRegFolderOpen />,
            parentClose: null, // "전체" 아이콘 제거
            parentOpen: null, // "전체" 아이콘 제거
            leaf: <FaUser />, // 직원 아이콘 설정
          }}
        />

        {/* 선택된 결재자 목록 */}
        <div className="mt-4 p-3 border rounded-lg">
          <h3 className="font-bold mb-2">선택된 결재자</h3>
          {checked.length > 0 ? (
            checked.map((id) => (
              <p key={id} className="text-sm text-gray-700">
                - {nodes
                    .flatMap(group => group.children || [])
                    .flatMap(team => team.children || [])
                    .find(person => person.value === id)?.label || id}
              </p>
            ))
          ) : (
            <p className="text-gray-400">결재자를 선택하세요.</p>
          )}
        </div>

        {/* 버튼 */}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={handleCloseModal}
            className="px-6 py-2 border border-gray-300 rounded-full text-gray-600"
          >
            취소
          </button>
          <button className="px-6 py-2 bg-[#006D2C] text-white rounded-full">
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WriteModal;
