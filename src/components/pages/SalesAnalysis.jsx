import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion"; // motion 추가
import { selectSalesData, selectTotalSales, selectGrowthRate } from "../../redux/salesSlice";

const SalesAnalysis = () => {
  const salesData = useSelector(selectSalesData);
  const totalSales = useSelector(selectTotalSales);
  const growthRate = useSelector(selectGrowthRate);
  
  const [highestData, setHighestData] = useState(null);
  const [lowestData, setLowestData] = useState(null);

  useEffect(() => {
    // 제일 높은 값 찾기
    if (salesData.length > 0) {
      const highest = salesData.reduce((prev, current) =>
        prev.valueHeight > current.valueHeight ? prev : current
      );
      setHighestData(highest);
    }

    // 제일 낮은 값 찾기
    const lowest = salesData.reduce((prev, current) =>
      prev.valueHeight < current.valueHeight ? prev : current
    );
    setLowestData(lowest);

  }, [salesData]);

  // salesData의 valueHeight를 1.5배 늘려서 더 길게 만듬
  const modifiedSalesData = salesData.map((data) => ({
    ...data,
    valueHeight: data.valueHeight * 2.5,
  }));

  const lowestDropRate = highestData && lowestData 
  ? ((highestData.valueHeight - lowestData.valueHeight) / highestData.valueHeight * 100).toFixed(2) 
  : 0;
  
  // 애니메이션 variants 설정
  const barAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 },  // 순차적인 딜레이
    }),
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg relative w-full">
      <h2 className="text-lg font-bold mb-16">매출 분석</h2>
      {highestData && (
        <motion.div
          className="absolute flex flex-col items-center"
          style={{
            top: `${140 - highestData.valueHeight}px`, // 제일 높은 막대 기준 위치
            left: `calc(${(modifiedSalesData.findIndex((d) => d.id === highestData.id) / (modifiedSalesData.length - 1)) * 100}% - 108px)`, // index 기반 위치 조정
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 값 출력 */}
          <div className="text-[#006D2C] font-bold text-lg">
            {totalSales.toLocaleString()} 원
          </div>
          <div className="text-gray-500 text-sm">
            전일 대비 {growthRate}% 상승
          </div>
          {/* 화살표 */}
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-[#006D2C] mt-1"></div>
        </motion.div>
      )}

      {/* 제일 낮은 값 표시 */}
      {lowestData && (
        <motion.div
          className="absolute flex flex-col items-center"
          style={{
            top: `${210 - lowestData.valueHeight}px`,
            left: `calc(${(modifiedSalesData.findIndex((d) => d.id === lowestData.id) / (modifiedSalesData.length - 1)) * 100}% + 75px)`,
            /* top: `${240 - highestData ? highestData.valueHeight - lowestData.valueHeight + 20 : 0}px`, // 높이 차이에 따른 위치 보정
            left: `calc(${(modifiedSalesData.findIndex((d) => d.id === lowestData.id) / (modifiedSalesData.length - 1)) * 100}% + ${lowestData.valueHeight / 4}px)`, // 값에 따라 위치 보정 */
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 최저값 메시지 */}
          <div className="text-[#D32F2F] font-bold text-lg text-center">
            최고 매출액 대비 <br />{lowestDropRate}% 하락
          </div>
          <div className="text-gray-500 text-sm">
            최저 매출 기록 {lowestData.valueHeight.toLocaleString()} 원
          </div>
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-[#D32F2F] mt-1"></div>
        </motion.div>
      )}

      {/* 막대 그래프 */}
      <div className="flex justify-between items-end mt-10 gap-x-2 w-full">
        {modifiedSalesData.map((data, index) => (
          <div key={data.id} className="flex flex-col items-center w-full">
            {/* 값 막대 */}
            <motion.div
              className="w-full bg-gradient-to-t from-[#309458] to-[#006D2C] rounded-md"
              style={{ 
                height: `${data.valueHeight}px`,
              }}
              //initial={{ opacity: 0, y: 20 }}
              //animate={{ opacity: 1, y: 0 }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
              variants={barAnimation}
              custom={index} // 애니메이션 딜레이를 위한 index 전달
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesAnalysis;