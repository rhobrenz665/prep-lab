"use client"
import { JSX, useState } from "react";

type Tab = {
  name: string;
  component: JSX.Element;
};

type TabsProps = {
  tabs: Tab[];
};

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdown, setIsDropdown] = useState(false);

  return (
    <div className="w-full">
      <div className="hidden sm:flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`py-2 px-4 font-medium ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="sm:hidden">
        <button
          onClick={() => setIsDropdown(!isDropdown)}
          className="w-full text-left py-2 px-4 bg-gray-100 rounded-md"
        >
          {tabs[activeTab].name} ▼
        </button>
        {isDropdown && (
          <div className="absolute bg-white border rounded-md shadow-md w-full mt-2">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveTab(index);
                  setIsDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-4">{tabs[activeTab].component}</div>
    </div>
  );
};

export default Tabs;