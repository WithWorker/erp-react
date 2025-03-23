import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { FaRegFolder, FaRegFolderOpen, FaUser } from "react-icons/fa";
import { getOrganization } from "../../service/approvalLogic";

const WriteModal = ({ isModalOpen, handleCloseModal, handleSelectApprovers }) => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [organizationData, setOrganizationData] = useState([]);

  // 조직도 데이터 불러오기
  useEffect(() => {
    if (isModalOpen) {
      getOrganization()
        .then((data) => {
          setOrganizationData(data); // 받은 데이터로 조직도 상태 업데이트
        })
        .catch((error) => {
          console.error("조직도 불러오기 오류:", error);
        });
    }
  }, [isModalOpen]); // 모달이 열릴 때마다 데이터 새로 불러오기

  // 선택된 결재자 라벨을 가져오기
  const selectedLabels = checked
  .map((id) => {
    const empId = parseInt(id, 10); // id를 숫자로 변환하여 비교
    return organizationData
      .flatMap((department) => department.employees || [])
      .find((employee) => employee.empId === empId);
  })
  .filter(Boolean)
  .map((employee) => `${employee.name} / ${employee.positionName}`);

  const handleConfirm = () => {
    const selectedApprovers = checked
      .map((id) => {
        const empId = parseInt(id, 10);
        return organizationData
          .flatMap((department) => department.employees || [])
          .find((employee) => employee.empId === empId);
      })
      .filter(Boolean)
      .map((employee) => ({
        empId: employee.empId, 
        name: employee.name,
        positionName: employee.positionName,
      }));
  
    handleSelectApprovers(selectedApprovers); // 객체 배열 전달
  };

  // 조직도 데이터를 CheckboxTree에 맞게 변환
  const nodes = [
    {
      value: "전체", // '전체' 노드 추가
      label: (
        <div className="flex items-center">
          <span>전체</span>
        </div>
      ),
      children: organizationData.map((department) => ({
        value: department.departmentName || `department-${Math.random()}`, // 부서명으로 value 설정
        label: (
          <div className="flex items-center">
            <span>{department.departmentName}</span> {/* 부서 이름 */}
          </div>
        ),
        children: department.employees?.map((employee) => ({
          value: employee.empId || `emp-${Math.random()}`, // 직원 고유값
          label: (
            <div className="flex items-center">
              <FaUser className="mr-2" /> {/* 직원 아이콘 */}
              {employee.name} / {employee.positionName} {/* 직원 이름과 직책 */}
            </div>
          ),
        })),
      })),
    },
  ];

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      className="modal-content bg-white p-6 w-[500px] rounded-3xl shadow-lg"
      overlayClassName="fixed inset-0 bg-[#323232] bg-opacity-80 flex justify-center items-center"
      appElement={document.getElementById("root")}
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
            expandClose: <FaRegFolder />, // 폴더 닫힘 아이콘
            expandOpen: <FaRegFolderOpen />, // 폴더 열림 아이콘
            parentClose: null, // 부서 아이콘 제거
            parentOpen: null, // 부서 아이콘 제거
            leaf: null, // 직원 아이콘을 별도로 사용하지 않음
          }}
        />

        <div className="mt-4 p-3 border rounded-lg">
          <h3 className="font-bold mb-2">선택된 결재자</h3>
          {selectedLabels.length > 0 ? (
            selectedLabels.map((label, index) => (
              <p key={index} className="text-base text-gray-700">- {label}</p>
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

export default WriteModal;