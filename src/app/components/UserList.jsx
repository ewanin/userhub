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
                                    className="w-20 h-20 rounded-full bg-gray-300"
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



// import React, { useState, useEffect } from 'react';

// const UserDetails = ({ selectedUser }) => {
//     const [imageLoadError, setImageLoadError] = useState(false);

//     // Reset imageLoadError when selectedUser changes
//     useEffect(() => {
//         setImageLoadError(false);
//     }, [selectedUser]);

//     // Handle image loading error
//     const handleImageError = () => {
//         setImageLoadError(true);
//     };

//     // Render avatar based on selectedUser and imageLoadError state
//     const renderAvatar = () => {
//         if (!selectedUser || !selectedUser.avatar || imageLoadError) {
//             // Render initials or default avatar if avatar is not available or loading error occurs
//             return (
//                 <div className="w-20 h-20 rounded-full bg-[#88c9d3] text-[24px] text-darkBlue font-bold flex items-center justify-center mb-4">
//                     <span>{selectedUser ? (selectedUser.profile?.firstName[0] + selectedUser.profile?.lastName[0]) : 'NN'}</span>
//                 </div>
//             );
//         }

//         // Render user avatar if available
//         return (
//             <img
//                 src={selectedUser.avatar}
//                 alt={selectedUser.profile?.username || 'User Avatar'}
//                 onError={handleImageError}
//                 className="w-20 h-20 rounded-full mb-2"
//             />
//         );
//     };

//     return (
//         <div className="">
//             {/* User details header */}
//             <h2 className="text-3xl font-bold p-4 text-darkBlue text-center bg-red-00 lg:relative sticky top-0">Users Details</h2>
//             {selectedUser ? (
//                 // Render user details if selectedUser is available
//                 <div className='xl:w-[400px] lg:w-[350px] lg:p-8 p-4 border-2 border-darkBlue rounded-2xl overflow-x-hidden'>
//                     <div className='lg:block flex gap-2'>
//                         {/* Render user avatar */}
//                         {renderAvatar()}
//                         <div>
//                             {/* User information */}
//                             <div className='flex gap-2 lg:mb-1 md:font-normal font-bold'><div className='font-bold text-darkBlue italic md:block hidden'>Name:</div> {selectedUser.profile?.firstName} {selectedUser.profile?.lastName}</div>
//                             <div className='flex gap-2 lg:mb-1'><div className='font-bold text-darkBlue italic md:block hidden'>Username:</div> @{selectedUser.profile?.username}</div>
//                             <div className='flex gap-2 lg:mb-1'><div className='font-bold text-darkBlue italic md:block hidden'>Email:</div> {selectedUser.profile?.email}</div>
//                         </div>
//                     </div>
//                     {/* Additional user details */}
//                     <div className='flex gap-2 lg:mb-1'><div className='font-bold text-darkBlue italic w-fit'>Job Title:</div> {selectedUser.jobTitle}</div>
//                     <div className='flex gap-2'><div className='font-bold text-darkBlue italic'>Bio:</div> {selectedUser.Bio}</div>
//                 </div>
//             ) : (
//                 // Display message if no user is selected
//                 <p>No user selected.</p>
//             )}
//         </div>
//     );
// };

// export default UserDetails;