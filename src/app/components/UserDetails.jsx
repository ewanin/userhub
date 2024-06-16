import React, { useState, useEffect } from 'react';

const UserDetails = ({ selectedUser }) => {
    const [imageLoadError, setImageLoadError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    // Reset imageLoadError and imageLoading when selectedUser changes
    useEffect(() => {
        setImageLoadError(false);
        setImageLoading(true); // Reset image loading state on user change
    }, [selectedUser]);

    // Handle image loading error
    const handleImageError = () => {
        setImageLoadError(true);
        setImageLoading(false); // Image load attempt failed
    };

    // Handle image loading success
    const handleImageLoad = () => {
        setImageLoading(false); // Image successfully loaded
    };

    // Render avatar based on selectedUser, imageLoadError, and imageLoading states
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
                onLoad={handleImageLoad}
                onError={handleImageError}
                className={`w-20 h-20 rounded-full mb-2 ${imageLoading ? 'bg-gray-300 animate-pulse' : ''}`}
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
                            <span className=' lg:mb-1 md:font-normal font-bold'><span className='font-bold text-darkBlue italic md:inline-block	 hidden'>Name:</span> {selectedUser.profile?.firstName} {selectedUser.profile?.lastName}</span>
                            <div className=' lg:mb-1'><span className='font-bold text-darkBlue italic md:inline-block hidden'>Username:</span> @{selectedUser.profile?.username}</div>
                            <div className=' lg:mb-1'><span className='font-bold text-darkBlue italic md:inline-block hidden'>Email:</span> {selectedUser.profile?.email}</div>
                        </div>
                    </div>
                    {/* Additional user details */}
                    <div className=' lg:mb-1'><span className='font-bold text-darkBlue italic w-fit'>Job Title:</span> {selectedUser.jobTitle}</div>
                    <div className=''><span className='font-bold text-darkBlue italic'>Bio:</span> {selectedUser.Bio}</div>
                </div>
            ) : (
                // Display message if no user is selected
                <p>No user selected.</p>
            )}
        </div>
    );
};

export default UserDetails;
