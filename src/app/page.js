// Home.jsx
'use client'; // Assuming this is intended to be 'use strict'; for strict mode

import { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import Image from 'next/image';
import worried from '../../public/worried.svg';

const Home = () => {
  // State variables for managing users, selected user, and errors
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);

  // Effect to fetch data from mock API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users');
        setUsers(response.data);
      } catch (error) {
        setError('Failed to fetch data.'); // Set a generic error message
      }
    };

    fetchData(); // Call the fetchData function

    // Clean-up function is not necessary for this effect
  }, []); // Empty dependency array to run effect only once on mount

  // Determine if data is still loading
  const loading = users.length === 0 && !error;

  return (
    <div className="flex bg-gradient-to-b from-white to-[#D4DFED] px-[5vw] h-[100vh]">
      {/* Conditionally render loading state */}
      {loading ? (
        <LoadingState />
      ) : error ? (
        // Pass error as a prop to ErrorState component
        <ErrorState error={error} />
      ) : (
        // Render user list and details when data is loaded
        <div className='flex lg:flex-row flex-col-reverse lg:items-center justify-between gap-4 w-full h-[100vh] overflow-y-hidden'>
          <UserList users={users} setSelectedUser={setSelectedUser} />
          <UserDetails selectedUser={selectedUser} />
        </div>
      )}
    </div>
  );
};

// Component for rendering loading state placeholders
const LoadingState = () => (
  <div className="flex lg:flex-row flex-col-reverse lg:items-center justify-between gap-4">
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-8 gap-4 p-4 animate-pulse pt-[4vw] h-fit">
      {/* Placeholder elements */}
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="rounded-xl bg-gray-300 lg:w-[255px] sm:w-[200px] w-[80vw] lg:h-[190px] sm:h-[120px] h-[50px]"></div>
      ))}
    </div>
    <div className='rounded-2xl bg-gray-300 animate-pulse xl:w-[400px] lg:w-[350px] sm:h-[300px] h-[250px] lg:mt-0 mt-4'></div>
  </div>
);

// Component for rendering error state
const ErrorState = ({ error }) => (
  <div className='flex flex-col items-center mx-auto my-auto'>
    <Image src={worried} alt='worried Icon' className='w-20 h-20' />
    <p className='text-darkBlue font-bold sm:text-6xl text-3xl tracking-wider mb-10 text-center'>Aww... Don't worry</p>
    <p>It's just a</p>
    <p className='font-bold underline italic'>{error}</p>
  </div>
);

export default Home;