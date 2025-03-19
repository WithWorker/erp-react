import React from 'react'
import Header from '../../include/Header'
import Sidebar from '../../include/Sidebar'
import ProfileCard from './ProfileCard'
import SalaryCard from './SalaryCard'
import WorkStatusCalendar from './WorkStatusCalendar'
import Personal from './personal'
import Personal2 from './Personal2'

const MyPage = () => {
    return (
        <div className="flex h-screen bg-gray-100">
        <Sidebar className='fixed'/> 
        <div className="flex-1 p-6 overflow-y-auto">
            <Header />
            <div className="flex flex-row md:flex-row items-start justify-between space-y-4 md:space-y-0 md:space-x-4 w-full mb-6">
                <div className="flex flex-col space-y-4 w-full ml-6 mr-8 p-4">
                    <div className="flex-row space-x-s space-y-8 items-center w-full">
                        <div className="w-full flex-1 flex space-x-8">
                            <ProfileCard />
                            <Personal />
                            <SalaryCard />
                        </div>
                        <div className="w-full">
                            <Personal2 />
                            <WorkStatusCalendar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default MyPage