import React from "react";
import { Search } from "lucide-react";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full rounded-lg px-4 py-2 text-black focus:outline-none"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Search className="absolute right-3 top-2.5 text-gray-500" size={20} />
    </div>
  );
}
