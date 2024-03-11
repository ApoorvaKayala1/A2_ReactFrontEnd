import React, { useState, useEffect } from 'react';

import './Style/AccountPage.css';

const AccountPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    id: 1, 
    username: '',
    contact: '',
    email: '',
    shipping_address: '',
    city: '',
    province: '',
    country: '',
    zip_code: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Log the constructed API URL
    const apiUrl = `http://localhost/SEM%202/A2_KidsFashionStore/Users_API.php/${userData.id}`;
    console.log('API URL:', apiUrl);
  
    const fetchUserData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const userDataFromAPI = await response.json();

        // If the API returns an array, use the first element
        const user = Array.isArray(userDataFromAPI) ? userDataFromAPI[0] : userDataFromAPI;    

        setUserData(user);
        console.log('User Data received:', user);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setIsLoading(false);
      }
    };
  
    fetchUserData();
  }, [userData.id]);

  console.log('Render userData:', userData);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Send a PUT request to update user data in the users table
      await fetch(`http://localhost/SEM%202/A2_KidsFashionStore/Users_API.php/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>; // Render a loading indicator
  }

  return (
    <div className="container3">
      <h2>User Profile</h2>
      <div>
        <p>
          <b>Name:</b>{' '}
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
            />
          ) : (
            userData.username
          )}
        </p>
        <p>
          <b>Contact Number:</b>{' '}
          {isEditing ? (
            <input
              type="text"
              name="contact"
              value={userData.contact}
              onChange={handleInputChange}
            />
          ) : (
            userData.contact
          )}
        </p>
        <p>
          <b>Email:</b>{' '}
          {isEditing ? (
            <input
              type="text"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          ) : (
            userData.email
          )}
        </p>
        <p>
          <b>Address:</b>{' '}
          {isEditing ? (
            <input
              type="text"
              name="shipping_address"
              value={userData.shipping_address}
              onChange={handleInputChange}
            />
          ) : (
            userData.shipping_address
          )}
        </p>
        <p>
          <b>City:</b>{' '}
          {isEditing ? (
            <input
              type="text"
              name="city"
              value={userData.city}
              onChange={handleInputChange}
            />
          ) : (
            userData.city
          )}
        </p>
        <p>
          <b>Province:</b>{' '}
          {isEditing ? (
            <input
              type="text"
              name="province"
              value={userData.province}
              onChange={handleInputChange}
            />
          ) : (
            userData.province
          )}
        </p>
        <p>
          <b>Country:</b>{' '}
          {isEditing ? (
            <input
              type="text"
              name="country"
              value={userData.country}
              onChange={handleInputChange}
            />
          ) : (
            userData.country
          )}
        </p>
        <p>
          <b>Zip Code:</b>{' '}
          {isEditing ? (
            <input
              type="text"
              name="zip_code"
              value={userData.zip_code}
              onChange={handleInputChange}
            />
          ) : (
            userData.zip_code
          )}
        </p>
      </div>
      <div>
        {isEditing ? (
          <>
            <button className="button" onClick={handleSave}>
              Save
            </button>
            <button className="button" onClick={handleEditToggle}>
              Cancel
            </button>
          </>
        ) : (
          <button className="button" onClick={handleEditToggle}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
