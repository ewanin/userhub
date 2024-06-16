import React, { useState, useEffect } from 'react';

const UserDetails = ({ selectedUser }) => {
    const [imageLoadError, setImageLoadError] = useState(false);

    // Reset imageLoadError when selectedUser changes
    useEffect(() => {
        setImageLoadError(false);
    }, [selectedUser]);

    // Handle image loading error
    const handleImageError = () => {
        setImageLoadError(true);
    };

    // Render avatar based on selectedUser and imageLoadError state
    const renderAvatar = () => {
        if (!selectedUser || !selectedUser.avatar || imageLoadError) {
            // Render initials or default avatar if avatar is not available or loading error occurs
            return (
                <div className="w-20 h-20 rounded-full bg-[#88c9d3] text-[24px] text-darkBlue font-bold flex items-center justify-center mb-4">
                    <span>{selectedUser ? (selectedUser.profile?.firstName[0] + selectedUser.profile?.lastName[0]) : 'NN'}</span>
                </div>
            );
        }

        // Render user avatar if available
        return (
            <img
                src={selectedUser.avatar}
                alt={selectedUser.profile?.username || 'User Avatar'}
                onError={handleImageError}
                className="w-20 h-20 rounded-full mb-2"
            />
        );
    };

    return (
        <div className="">
            {/* User details header */}
            <h2 className="text-3xl font-bold p-4 text-darkBlue text-center bg-red-00 lg:relative sticky top-0">Users Details</h2>
            {selectedUser ? (
                // Render user details if selectedUser is available
                <div className='xl:w-[400px] lg:w-[350px] lg:p-8 p-4 border-2 border-darkBlue rounded-2xl overflow-x-hidden'>
                    <div className='lg:block flex gap-2'>
                        {/* Render user avatar */}
                        {renderAvatar()}
                        <div>
                            {/* User information */}
                            <div className='flex gap-2 lg:mb-1 md:font-normal font-bold'><div className='font-bold text-darkBlue italic md:block hidden'>Name:</div> {selectedUser.profile?.firstName} {selectedUser.profile?.lastName}</div>
                            <div className='flex gap-2 lg:mb-1'><div className='font-bold text-darkBlue italic md:block hidden'>Username:</div> @{selectedUser.profile?.username}</div>
                            <div className='flex gap-2 lg:mb-1'><div className='font-bold text-darkBlue italic md:block hidden'>Email:</div> {selectedUser.profile?.email}</div>
                        </div>
                    </div>
                    {/* Additional user details */}
                    <div className='flex gap-2 lg:mb-1'><div className='font-bold text-darkBlue italic w-fit'>Job Title:</div> {selectedUser.jobTitle}</div>
                    <div className='flex gap-2'><div className='font-bold text-darkBlue italic'>Bio:</div> {selectedUser.Bio}</div>
                </div>
            ) : (
                // Display message if no user is selected
                <p>No user selected.</p>
            )}
        </div>
    );
};

export default UserDetails;