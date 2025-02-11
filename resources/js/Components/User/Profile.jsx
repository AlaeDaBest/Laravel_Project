import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserInfo = () => {
    // const [user, setUser] = useState(null);
    console.log(localStorage.getItem('userRole'));
    console.log(localStorage.getItem('user'));
    const user=JSON.parse(localStorage.getItem('user'))
    return (
        <div>
            <p>Welcome, {user.first_name}!</p>
            <p>Email: {user.email}</p>
            {/* ... other user details */}
        </div>
    );
};

export default UserInfo;