import React, { useState, useEffect } from 'react';

const ProfileCard = () => {
    const [employee, setEmployee] = useState({});

useEffect(() => {
    fetch('/api/employee')
        .then((response) => response.json())
        .then((data) => setEmployee(data))
        .catch((error) => console.error("Error fetching employee data:", error));
    }, []);

    return (
    <div className="flex-1 p-6 bg-white rounded-3xl shadow min-h-[300px] flex flex-col items-center justify-center">
        <img src={employee.profileImage || "/profile.jpg"} alt="profile" className="w-24 h-24 rounded-full" />
    </div>
    );
};

export default ProfileCard;
