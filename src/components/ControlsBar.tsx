"use client";

import { Button } from "./ui/button";

type Props = {
  filter: "all" | "active" | "completed";
  setFilter: (f: "all" | "active" | "completed") => void;
  sort: "newest" | "oldest" | "alpha" | "alphaDesc";
  setSort: (s: "newest" | "oldest" | "alpha" | "alphaDesc") => void;
  onClearCompleted: () => void;
  completedCount: number;
  totalCount: number;
};

export default function ControlsBar({ filter, setFilter, sort, setSort, onClearCompleted, completedCount, totalCount }: Props) {
  return (
    <div className="space-y-4">
      {/* Filter and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--muted-foreground)]">Filter:</span>
          <div className="flex items-center gap-1 bg-[var(--muted)] rounded-lg p-1">
            <FilterChip label="All" active={filter === "all"} onClick={() => setFilter("all")} />
            <FilterChip label="Active" active={filter === "active"} onClick={() => setFilter("active")} />
            <FilterChip label="Completed" active={filter === "completed"} onClick={() => setFilter("completed")} />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[var(--muted-foreground)]">Sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="rounded-md border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="alpha">A → Z</option>
              <option value="alphaDesc">Z → A</option>
            </select>
          </div>
          
          <Button
            onClick={onClearCompleted}
            disabled={completedCount === 0}
            variant="secondary"
            size="sm"
          >
            Clear completed
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-[var(--muted-foreground)]">
          {completedCount} of {totalCount} tasks completed
        </span>
        <div className="flex items-center gap-2">
          <div className="w-32 h-2 bg-[var(--muted)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--primary)] transition-all duration-300 ease-out"
              style={{ width: `${totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)}%` }}
            />
          </div>
          <span className="text-[var(--muted-foreground)] min-w-[3rem] text-right">
            {totalCount === 0 ? "0%" : `${Math.round((completedCount / totalCount) * 100)}%`}
          </span>
        </div>
      </div>
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
        active 
          ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm" 
          : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]"
      }`}
    >
      {label}
    </button>
  );
}


