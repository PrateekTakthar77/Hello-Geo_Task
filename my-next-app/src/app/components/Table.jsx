"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Table() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5; // Define the number of items per page

    useEffect(() => {
        setLoading(true);
        const offset = (currentPage - 1) * itemsPerPage;

        axios.get(`http://localhost:5009/api/v1/users?limit=${itemsPerPage}&offset=${offset}`)
            .then(response => {
                setUsers(response?.data?.users);
                const totalItems = response?.data?.total;
                setTotalPages(Math.ceil(totalItems / itemsPerPage));
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setError(error);
                setLoading(false);
            });
    }, [currentPage]);

    if (error) return <p>Error loading data</p>;

    return (
        <>
            {loading ? (
                <section className="bg-white dark:bg-gray-900 mt-5">
                    <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 animate-pulse sm:space-y-0 sm:flex-row">
                        <p className="w-32 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                        <p className="w-48 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                        <p className="w-64 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                    </div>
                </section>
            ) : (
                <section className="container px-4 mx-auto">
                    <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-800">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    User ID
                                                </th>
                                                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    User Name
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    User Email
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    Permalink
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    Enable
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    Deleted
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                            {users.map(user => (
                                                <tr key={user._id}>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>
                                                            <h2 className="font-medium text-gray-800 dark:text-white">{user._id}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>
                                                            <h2 className="font-medium text-gray-800 dark:text-white">{user.userName}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <div>
                                                            <h4 className="text-gray-700 dark:text-gray-200">{user.userEmail}</h4>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <div>
                                                            <h4 className="text-gray-700 dark:text-gray-200">{user.permalink}</h4>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <div className={`inline px-3 py-1 text-sm font-normal rounded-full gap-x-2 ${
                                                            user.enabled ? 'text-emerald-500 bg-emerald-100/60' : 'text-red-500 bg-red-100/60'
                                                        } dark:bg-gray-800`}>
                                                            {user.enabled ? 'Active' : 'Inactive'}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <div className={`inline px-3 py-1 text-sm font-normal rounded-full gap-x-2 ${
                                                            user.deleted ? 'text-emerald-500 bg-emerald-100/60' : 'text-red-500 bg-red-100/60'
                                                        } dark:bg-gray-800`}>
                                                            {user.deleted ? 'Active' : 'Inactive'}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-6 mb-6">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 disabled:opacity-50"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>
                            <span>Previous</span>
                        </button>

                        <div className="items-center hidden md:flex gap-x-3">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-2 py-1 text-sm rounded-md dark:bg-gray-800 ${
                                        currentPage === index + 1 ? 'text-blue-500 bg-blue-100/60' : 'text-gray-500 dark:text-gray-300 hover:bg-gray-100'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 disabled:opacity-50"
                        >
                            <span>Next</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </button>
                    </div>
                </section>
            )}
        </>
    );
}

export default Table;
