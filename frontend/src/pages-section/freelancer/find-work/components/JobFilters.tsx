export function JobFilters({
  filterTabs,
  activeTab,
  setActiveTab,
  savedJobs,
}: {
  filterTabs: { id: string; label: string }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedJobs: number;
}) {
  return (
    <div className="flex space-x-6">
      {filterTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`pb-3 px-1 text-base font-medium ${
            activeTab === tab.id
              ? "text-foreground border-b-2 border-green-600"
              : "text-gray-500 hover:text-foreground"
          }`}
        >
          {tab.label} {tab.id === "saved-jobs" && `(${savedJobs})`}
        </button>
      ))}
    </div>
  );
}
