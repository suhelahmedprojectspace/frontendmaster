import React, { useState, useEffect } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => setResult(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!query.trim()) {
        setFiltered([]);
        return;
      }

      const matches = result.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );

      setFiltered(matches.slice(0, 10));
    }, 300);

    return () => clearTimeout(delay);
  }, [query, result]);

  const highlightedMatch=(text,term)=>{
    if(!term)return text;
    const regex=new RegExp(`(${term})`,"gi");
    return text.split(regex).map((part,i)=>
     part.toLowerCase() === term.toLowerCase() ? (
        <mark key={i} className="font-bold">
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  return (
    <div className="mt-4 w-[300px] relative">
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 w-full shadow"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p className="text-sm text-gray-500 mt-1">Loading products...</p>}

      {filtered.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-200 mt-1 rounded shadow w-full max-h-60 overflow-y-auto">
          {filtered.map((data, index) => (
            <li
              key={index}
              className="flex items-center p-2 gap-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setQuery(data.title)}
            >
              <img
                src={data.images[0]}
                alt={data.title}
                className="w-10 h-10 object-cover rounded"
              />
              <span>{highlightedMatch(data.title,query)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
