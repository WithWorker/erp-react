import React, { useState } from 'react';
import Sidebar from '../include/Sidebar';
import Header from '../include/Header';
import TopNav from './TopNav';
import ApprovalList from './ApprovalList';

const ApprovalPage = () => {
  const [viewMode, setViewMode] = useState(0); // viewMode 상태 관리

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <TopNav setViewMode={setViewMode} /> {/* viewMode를 변경하는 함수 전달 */}
        <div>
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 w-full mb-6">
            <div className="flex flex-col md:flex-row items-start w-full mb-6">
              <div className="w-full p-4">
                <ApprovalList viewMode={viewMode} /> {/* viewMode를 전달 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalPage;
