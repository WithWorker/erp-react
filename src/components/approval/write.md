import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { FaRegFolder, FaRegFolderOpen, FaUser } from "react-icons/fa";
import { getOrganization } from '../../service/approvalLogic'; // getOrganization을 가져옵니다

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
    .map((id) =>
      organizationData
        .flatMap((group) => group.children || [])
        .find((person) => person.value === id)?.label
    )
    .filter(Boolean);

  const handleConfirm = () => {
    handleSelectApprovers(selectedLabels); // 선택된 결재자 라벨을 부모로 전달
  };

  // 조직도 데이터를 CheckboxTree에 맞게 변환
  const nodes = (organizationData || []).map((department) => ({
    value: department.departmentId || `department-${Math.random()}`, // departmentId가 없으면 고유한 값 생성
    label: (
      <div className="flex items-center">
        <FaRegFolder className="mr-2" /> {/* 부서 옆 아이콘 */}
        {department.departmentName || '부서명 없음'} / {department.empId} {/* 부서 이름 */}
      </div>
    ),
    showCheckbox: false,
    children: department.children?.map((employee) => ({
      value: employee.empId || `emp-${Math.random()}`, // empId가 null일 경우 고유한 값을 생성
      label: (
        <div className="flex items-center">
          <FaUser className="mr-2" /> {/* 직원 옆 아이콘 */}
          {employee.name || '이름 없음'} / {employee.positionName || '직책 없음'} {/* 직원 이름과 직책 */}
        </div>
      ),
    })),
  }));
  

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
            expandClose: <FaRegFolder />,
            expandOpen: <FaRegFolderOpen />,
            parentClose: null,
            parentOpen: null,
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

export default WriteModal;