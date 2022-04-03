import React, { memo, useEffect, useState } from "react";
import Header from "../../Components/Header";
import { useParams } from 'react-router-dom';
import { apis, request } from "../../HttpUtil";

const UserDetail = () => {
    let params = useParams();
    const [user, setUser] = useState({ transaction: [] });

    useEffect(() => {
        getUserDetail();
    }, [])

    const getUserDetail = async () => {
        const response = await request(apis.getUserDetail, { method: 'POST', data: { id: params.id } });
        if (response && response.success) {
            setUser(response.data);
        }
    }
    return (
        <div class="card">

            <div className="full-width d-flex card-header">
                <div className="half-width">
                    {user.firstName} {user.lastName}
                </div>
                <div className="half-width text-right">
                    <span><span>Total Available Point: </span><span>{user.availablePoints}</span></span>
                    <span className="pl-1"><span>Total Expired Point: </span> <span className="red-text">{user.expirePoint} </span></span>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Transaction Date</th>
                        <th>Billing Amount </th>
                        <th>Reward Points</th>
                        <th>Expiry Date</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        user && user.transaction && user.transaction.map((trans) => {
                            return (
                                <tr key={trans.id} >
                                    <td >{trans.createdDate}</td>
                                    <td >{trans.amount}</td>
                                    <td className={new Date(trans.expiryDate) < new Date() && "red-text"}>{trans.points}</td>
                                    <td>{trans.expiryDate}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                !(user && user.transaction && user.transaction.length) && <div className="no-record">No Records</div>
            }
        </div>
    )
}

export default Header({ title: 'Reward Point History' })(memo(UserDetail));