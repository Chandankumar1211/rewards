import React, { memo, useEffect, useState } from "react";
import Header from "../../Components/Header";
import { useNavigate } from 'react-router-dom';
import { request, apis } from '../../HttpUtil';

const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const onUserClick = (id) => {
        navigate(`/user-detail/${id}`);
    }

    const getUsersData = async () => {
        const response = await request(apis.getUsers, { menthod: 'GET' });
        if (response && response.success) {
            setUsers(response.data);
        }
    }

    useEffect(() => {
        getUsersData();
    }, []);

    return (
        <div class="card">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>Total Reward Points</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => {
                            return (
                                <tr key={user.id} >
                                    <td><span className="a-tag" onClick={() => onUserClick(user.id)}>{user.firstName} {user.lastName}</span></td>
                                    <td>{user.contactNumber}</td>
                                    <td>{user.availablePoints}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div >
    )
}

export default Header({ title: "Customer Detail" })(memo(Users));