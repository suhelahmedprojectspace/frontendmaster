import React, { useState, useEffect, useMemo } from 'react';

function UserDirectory() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  // Debounce query input by 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setCurrentPage(1); // Reset to first page on new search
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Fetch data once
  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then(data => setData(data.users));
  }, []);

  // Filter users based on debounced query
  const filteredUsers = useMemo(() => {
    if (!debouncedQuery) return data;

    const lowerQuery = debouncedQuery.toLowerCase();

    return data.filter(user =>
      user.firstName.toLowerCase().includes(lowerQuery) ||
      user.lastName.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery) ||
      user.phone.toLowerCase().includes(lowerQuery) ||
      user.address.address.toLowerCase().includes(lowerQuery) ||
      user.address.city.toLowerCase().includes(lowerQuery) ||
      user.address.state.toLowerCase().includes(lowerQuery)
    );
  }, [data, debouncedQuery]);


  const noOfPages = Math.ceil(filteredUsers.length / perPage);

 
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredUsers.slice(start, start + perPage);
  }, [filteredUsers, currentPage]);

  // Page change handler with bounds checking
  const goToPage = (page) => {
    if (page >= 1 && page <= noOfPages) setCurrentPage(page);
  };

  return (
    <div className="mt-2 px-2">
      <input
        type="text"
        value={query}
        placeholder="Search something"
        className="mb-2 border border-gray-300 px-4 py-2 rounded w-full max-w-md"
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">First Name</th>
              <th className="border border-gray-300 px-4 py-2">Last Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map(user => (
                <tr key={user.id}>
                  <td className="border border-gray-300 px-4 py-2">{user.firstName}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.lastName}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.address.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
      <div className="flex mt-6 justify-center gap-2 flex-wrap">
        <button
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(noOfPages)].map((_, index) => {
          const pageNum = index + 1;
          const isActive = pageNum === currentPage;
          return (
            <button
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              className={`px-3 py-1 border rounded ${
                isActive ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          disabled={currentPage === noOfPages}
          onClick={() => goToPage(currentPage + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UserDirectory;
