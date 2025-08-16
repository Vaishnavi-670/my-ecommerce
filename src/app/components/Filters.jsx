import React from "react";

export default function Filters({ categories, selectedCategory, setSelectedCategory, priceRange, setPriceRange }) {
    return (
        <aside className="w-64 bg-gradient-to-b from-indigo-50 to-purple-100 text-gray-900 rounded-2xl p-6 shadow space-y-6">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Filters
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
            />
            <div>
                <h3 className="font-medium mb-2">Category</h3>
                <ul className="space-y-2">
                    {["All", ...categories].map((cat) => (
                        <li key={cat}>
                            <label
                                className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md transition ${selectedCategory === cat ? "bg-indigo-200 font-semibold" : "hover:bg-indigo-100"}`}
                            >
                                <input
                                    type="radio"
                                    name="category"
                                    value={cat}
                                    checked={selectedCategory === cat}
                                    onChange={() => setSelectedCategory(cat)}
                                />
                                {cat}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="font-medium mb-2">Price</h3>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([0, Number(e.target.value)])}
                    className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-sm">
                    <span>$0</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>
        </aside>
    );
}
