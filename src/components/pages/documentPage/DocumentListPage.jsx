import React, { useState } from 'react'
import Sidebar from '../../include/Sidebar'
import Header from '../../include/Header'
import ApprovalList from './ApprovalList'
import DocumentTopNav from '../../include/DocumentTopNav'
import APList from './APList'
import PendingList from './PendingList'

const DocumentListPage = () => {
  const [tabIndex, setTabIndex] = useState(0); // 탭 상태 관리

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <DocumentTopNav setTabIndex={setTabIndex} /> {/* 탭 클릭 시 상태 업데이트 */}
        <div>
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 w-full mb-6">
            <div className="flex flex-col md:flex-row items-start w-full mb-6">
              <div className="w-full p-4">
                {tabIndex === 0 && <PendingList />}
                {tabIndex === 1 && <APList />}
                {tabIndex === 2 && <ApprovalList />}
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
  )
}

export default DocumentListPage