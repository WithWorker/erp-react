import React, { useState, useEffect } from 'react';

const ImageCard = () => {
    const [employee, setEmployee] = useState({});
    const empId = localStorage.getItem("empId");

    useEffect(() => {
        fetch('api/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ empId: empId }), 
        })
        .then((response) => response.json())
        .then((data) => setEmployee(data))
        .catch((error) => console.error("Error fetching employee data:", error));
    }, [empId]);

    return (
        <div className="flex-1 p-6 bg-white rounded-3xl shadow min-h-[300px] flex flex-col items-center justify-center">
            <img 
                src={`http://localhost:7777/${employee.imgUrl}`} 
                alt="profile" 
                className="w-100 h-60" 
            />
        </div>
    );
};

export default ImageCard;
