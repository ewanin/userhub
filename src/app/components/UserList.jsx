import React, { useState, useEffect } from 'react';

const UserList = ({ users, setSelectedUser }) => {
    const [selectedIndex, setSelectedIndex] = useState(0); // State for the index of the selected user
    const [imageLoadErrorIndices, setImageLoadErrorIndices] = useState([]); // State to track image loading errors

    // Effect to update selected user when users or selectedIndex change
    useEffect(() => {
        if (users.length > 0) {
            setSelectedUser(users[selectedIndex]); // Update selected user based on selectedIndex
        }
    }, [users, selectedIndex, setSelectedUser]);

    // Handler for image loading errors
    const handleImageError = (index) => {
        setImageLoadErrorIndices(prev => [...prev, index]); // Add index to image loading error state
    };

    // Handler for user click events
    const handleUserClick = (index, user) => {
        setSelectedUser(user); // Set selected user
        setSelectedIndex(index); // Set selected index
    };

    return (
        <div className="overflow-hidden bg-yellow-00">
            {/* User list header */}
            <h2 className="text-3xl font-bold p-4 text-darkBlue text-center">Users list</h2>

            {/* User grid */}
            <div className='grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-8 gap-4 p-4 h-[90vh] overflow-y-auto'>
                {/* Map through users and render each user card */}
                {users.map((user, index) => (
                    <div key={user.createdAt} className="group h-full">
                        {/* User card */}
                        <div className={`h-full border lg:p-5 p-3 rounded-xl bg-[#f8faff] ${selectedIndex === index ? 'bg-darkBlue shadow-md scale-105' : 'group-hover:bg-white'} flex md:flex-col flex-row items-center md:gap-4 gap-2 transition-all duration-300 cursor-pointer group-hover:shadow-md group-hover:scale-105`}
                            onClick={() => handleUserClick(index, user)}>
                            {/* Render initials if image loading failed */}
                            {imageLoadErrorIndices.includes(index) ? (
                                <div className={`w-20 h-20 rounded-full ${selectedIndex === index ? 'bg-white' : 'bg-[#88c9d3]'} text-[24px] text-[#05264e] font-bold flex items-center justify-center`}>
                                    <span>{user.profile.firstName[0]}{user.profile.lastName[0]}</span>
                                </div>
                            ) : (
                                // Render user avatar
                                <img
                                    src={user.avatar}
                                    alt={user.profile.username[0]}
                                    onError={() => handleImageError(index)}
                                    width={80}
                                    height={80}
                                    className="w-20 h-20 rounded-full"
                                />
                            )}
                            {/* User details */}
                            <div>
                                <div className={`text-[#05264e] ${selectedIndex === index ? 'text-white' : 'group-hover:text-[#3c65f5]'} lg:text-[20px] text-[18px] lg:leading-[26px] leading-[23px] md:text-center font-bold transition-all duration-300`}>{user.profile.firstName} {user.profile.lastName}</div>
                                <div className={`${selectedIndex === index ? 'text-white' : ' text-black'} text-[12px] leading-[18px] font-medium md:text-center transition-all duration-300`}>@{user.profile.username}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;