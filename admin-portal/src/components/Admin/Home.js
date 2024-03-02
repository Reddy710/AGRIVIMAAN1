import React, { useState, useEffect } from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPerson, BsInfoCircle, BsPlusCircle, BsPeopleFill, BsFillBellFill }
    from 'react-icons/bs'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Home({orders, setOrders}) {
    const token = localStorage.getItem('accessToken');
    const headers = {
        Authorization: token,
    }
    const [usersCount, setUsersCount] = useState(0);
    const [pilotsCount, setPilotsCount] = useState(0)
    const [orderCount, setOrderCount] = useState(0)
    const [repaireRequestCount, setRepaireRequestCount] = useState(0);
    const [sprayingRequestCount, setSprayingRequestCount] = useState(0);
    const navigate = useNavigate();
    console.log(orderCount, usersCount, repaireRequestCount, pilotsCount, sprayingRequestCount)
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/pilots/pilots`, { headers });
            setOrders(response.data)
            setPilotsCount(response.data.length)
            const response1 = await axios.get(`http://localhost:8000/order`, { headers });
            setOrderCount(response1.data.length);
            const response2 = await axios.get(`http://localhost:8000/users/allUsers`,{headers});
            setUsersCount(response2.data.length)
            const response3 = await axios.get(`http://localhost:8000/repair_form/`, {headers});
            setRepaireRequestCount(response3.data.length)
            const response4 = await axios.get(`http://localhost:8000/spraying_form/`, {headers});
            setSprayingRequestCount(response4.data.length)
        } catch (error) {
            console.error('Error while fetching count:', error);
        }
    };
    const handleOrders = () => {
        navigate('/orders')
    }
    const handleCustomers = () => {
        navigate('/customers')
    }
    const handleRequestsInProgress = () => {
        navigate('/repair-request')
    }
    const handleRequestsInQueue = () => {
        navigate('/spraying-request')
    }
    const handleCrateAPilot = () => {
        navigate('/pilot-creation')
    }
    const handlePilots = () => {
        navigate('/pilots')
    }
    const handleDroneInventory = () => {
        navigate('/drone-inventory')
    }
    return (
        <>
            <main className='main-container overflow-y-auto p-20 text-white mt-20'>
                <div className='main-cards grid grid-cols-4 gap-20 my-15'>
                    <div className='card bg-blue-500 rounded-lg px-8 py-4 hover:cursor-pointer' onClick={handleOrders}>
                        <div className='card-inner flex items-center justify-between'>
                            <h3>ORDERS</h3>
                            <BsFillArchiveFill className='card_icon text-white text-lg' />
                        </div>
                        <h1>{orderCount}</h1>
                    </div>
                    <div className='card bg-green-700 rounded-lg px-8 py-4 hover:cursor-pointer' onClick={handleCustomers}>
                        <div className='card-inner flex items-center justify-between'>
                            <h3>CUSTOMERS</h3>
                            <BsPeopleFill className='card_icon text-white text-lg' />
                        </div>
                        <h1>{usersCount}</h1>
                    </div>
                    <div className='card bg-orange-500 rounded-lg px-8 py-4 hover:cursor-pointer' onClick={handleRequestsInProgress}>
                        <div className='card-inner flex items-center justify-between'>
                            <h3>REPAIR REQUESTS </h3>
                            <BsInfoCircle className='card_icon text-white text-lg' />
                        </div>
                        <h1>{repaireRequestCount}</h1>
                    </div>
                    <div className='card bg-red-700 rounded-lg px-8 py-4 hover:cursor-pointer' onClick={handleRequestsInQueue}>
                        <div className='card-inner flex items-center justify-between'>
                            <h3>SPRAYING REQUESTS</h3>
                            <BsInfoCircle className='card_icon text-white text-lg' />
                        </div>
                        <h1>{sprayingRequestCount}</h1>
                    </div>
                    <div className='card bg-black rounded-lg px-8 py-4 hover:cursor-pointer' onClick={handleCrateAPilot}>
                        <div className='card-inner flex items-center justify-between'>
                            <h3>CREATE A PILOT</h3>
                            <BsPlusCircle className='card_icon text-white text-lg' />
                        </div>
                    </div>
                    <div className='card bg-black rounded-lg px-8 py-4 hover:cursor-pointer' onClick={handlePilots}>
                        <div className='card-inner flex items-center justify-between'>
                            <h3>PILOTS</h3>
                            <BsPerson className='card_icon text-white text-lg' />
                        </div>
                        <h1>{pilotsCount}</h1>
                    </div>
                    <div className='card bg-black rounded-lg px-8 py-4 hover:cursor-pointer' onClick={handleDroneInventory}>
                        <div className='card-inner flex items-center justify-between'>
                            <h3>DRONE INVENTORY</h3>
                            <BsPlusCircle className='card_icon text-white text-lg' />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Home