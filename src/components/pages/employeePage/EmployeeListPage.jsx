import { useState,  } from 'react';
import Header from '../../include/Header';
import SearchBar from '../../include/SearchBar';
import Sidebar from '../../include/Sidebar';
import EmployeeTable from './EmployeeTable';
import { useDispatch, useSelector } from 'react-redux';
import { loadEmployees } from '../../../redux/slice/employeeSlice';
import CategoryDropdown from './CategoryDropdown';

const EmployeeListPage = () => {
  const { searchQuery } = useSelector((state) => state.employee); // 리덕스 상태에서 검색어 가져오기

  
/* 
  useEffect(() => {
    dispatch(loadEmployees()); // 직원 목록 로드
  }, [dispatch]); */

  
  

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <div>
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4 w-full mb-6">
            <CategoryDropdown />
            <SearchBar />
          </div>
          <div className="flex flex-col md:flex-row items-start w-full mb-6">
            <div className="w-full p-4">
              <EmployeeTable searchQuery={searchQuery} /> {/* 검색어를 EmployeeTable에 전달 */}
            </div>
          </div>
        </div>
    </div>
  </div>
  );
};

export default EmployeeListPage;
