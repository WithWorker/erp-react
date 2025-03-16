import React from 'react'
import Sidebar from '../include/Sidebar'
import Header from '../include/Header'
import DocumentTopNav from './TopNav'
import PendingList from './PendingList'
import APList from './APList'
import ApprovalList from './ApprovalList'

const ApprovalPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <DocumentTopNav /> {/* 탭 관련 부분은 디자인만 남김 */}
        <div>
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 w-full mb-6">
            <div className="flex flex-col md:flex-row items-start w-full mb-6">
              <div className="w-full p-4">
                <PendingList /> {/* 예시로 PendingList만 남겨두었음 */}
                {/* 원하는 리스트 컴포넌트를 남기세요 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApprovalPage
