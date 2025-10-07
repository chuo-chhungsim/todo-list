"use client";

import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";
import ControlsBar from "@/components/ControlsBar";
import ThemeToggle from "@/components/ThemeToggle";
import { useTasks } from "@/hooks/useTasks";
import TaskDetailModal from "@/components/TaskDetailModal";
import { useState } from "react";

export default function Home() {
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    renameTask,
    setDescription,
    clearCompleted,
    filter,
    setFilter,
    sort,
    setSort,
    completedCount,
    totalCount,
  } = useTasks();
  const activeTask = tasks.find((t) => t.id === activeTaskId) ?? null;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] animate-fadeInUp">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <header className="flex items-center justify-between mb-8 animate-fadeInUp" style={{ animationDelay: "40ms" }}>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Tasks</h1>
            <p className="text-[var(--muted-foreground)] mt-1">Stay organized and productive</p>
          </div>
          <ThemeToggle />
        </header>
        
        <div className="space-y-6">
          {/* Add Task Section */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm animate-scaleIn" style={{ animationDelay: "60ms" }}>
            <TaskInput onAdd={addTask} />
          </div>

          {/* Controls and Progress */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm animate-scaleIn" style={{ animationDelay: "100ms" }}>
            <ControlsBar
              filter={filter}
              setFilter={setFilter}
              sort={sort}
              setSort={setSort}
              onClearCompleted={clearCompleted}
              completedCount={completedCount}
              totalCount={totalCount}
            />
          </div>

          {/* Task List */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm animate-scaleIn" style={{ animationDelay: "140ms" }}>
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--muted)] flex items-center justify-center">
                  <svg className="w-8 h-8 text-[var(--muted-foreground)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">No tasks yet</h3>
                <p className="text-[var(--muted-foreground)]">Add your first task to get started</p>
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onRename={renameTask}
                onOpenDetail={(id) => setActiveTaskId(id)}
              />
            )}
          </div>
        </div>

        <footer className="mt-12 text-center">
          <p className="text-sm text-[var(--muted-foreground)]">
            Minimal To‑Do • KSHRD Project 2025
          </p>
        </footer>
        <TaskDetailModal
          task={activeTask}
          onClose={() => setActiveTaskId(null)}
          onSaveTitle={renameTask}
          onSaveDescription={setDescription}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}
