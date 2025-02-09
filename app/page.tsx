"use client"

import Tabs from "@/components/tabs";
import InterviewPrep from "@/components/interview-prep";
import OtherTab from "@/components/other-tab";
import Reviewer from "@/components/reviewer";

export default function Home() {
  const tabs = [
    { name: "Interview", component: <InterviewPrep /> },
    { name: "Reviewer", component: <Reviewer /> },
    { name: "Other Tab", component: <OtherTab /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">PrepLab</h1>
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}