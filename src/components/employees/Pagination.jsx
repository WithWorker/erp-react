import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const Pagination = ({
    totalPages,
    currentPage,
    pageGroup,
    setCurrentPage,
    setPageGroup,
}) => {
const getPageNumbers = () => {
const pageNumbers = [];
const start = pageGroup * 5 + 1;
const end = Math.min(start + 4, totalPages);
for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
}

return pageNumbers;
};

// 페이지 그룹 이동 (다음, 이전)
const changePageGroup = (direction) => {
const newPageGroup = pageGroup + direction;
if (newPageGroup >= 0 && newPageGroup * 5 < totalPages) {
    setPageGroup(newPageGroup);
    setCurrentPage(newPageGroup * 5 + 1); // 새로운 그룹의 첫 페이지로 설정
}
};

// 맨 처음 페이지 이동
const goToFirstPage = () => {
setCurrentPage(1);
setPageGroup(0); // 첫 번째 페이지 그룹으로 설정
};

// 맨 마지막 페이지 이동
const goToLastPage = () => {
const lastPageGroup = Math.floor((totalPages - 1) / 5);
setCurrentPage(totalPages);
setPageGroup(lastPageGroup); // 마지막 페이지 그룹으로 설정
};

return (
<div className="flex justify-center mt-4 space-x-2">
    {/* 맨 처음 버튼 */}
    <button
    onClick={goToFirstPage}
    disabled={currentPage === 1}
    className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
    >
    <ChevronsLeft size={20} />
    </button>

    {/* 이전 버튼 */}
    <button
    onClick={() => changePageGroup(-1)}
    disabled={pageGroup === 0}
    className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
    >
    <ChevronLeft size={20} />
    </button>

    {/* 페이지 번호 버튼들 */}
    {getPageNumbers().map((pageNumber) => (
    <button
        key={pageNumber}
        onClick={() => setCurrentPage(pageNumber)}
        className={`px-3 py-1 rounded-lg ${
        currentPage === pageNumber
            ? "bg-[#006D2C] text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
    >
        {pageNumber}
    </button>
    ))}

    {/* 다음 버튼 */}
    <button
    onClick={() => changePageGroup(1)}
    disabled={(pageGroup + 1) * 5 >= totalPages}
    className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
    >
    <ChevronRight size={20} />
    </button>

    {/* 맨 마지막 버튼 */}
    <button
    onClick={goToLastPage}
    disabled={currentPage === totalPages}
    className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
    >
    <ChevronsRight size={20} />
    </button>
</div>
);
};

export default Pagination;
