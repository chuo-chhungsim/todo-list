"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
  createdAt: number; // epoch ms
  updatedAt: number; // epoch ms
};

export type TaskFilter = "all" | "active" | "completed";
export type TaskSort = "newest" | "oldest" | "alpha" | "alphaDesc";

const TASKS_KEY = "tasks";
const FILTER_KEY = "tasks_filter";
const SORT_KEY = "tasks_sort";

function safeParseTasks(value: string | null): Task[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value) as Task[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((t) => typeof t?.id === "string" && typeof t?.title === "string")
      .map((t) => ({
        id: t.id,
        title: t.title,
        completed: Boolean(t.completed),
        description: typeof t.description === "string" ? t.description : "",
        createdAt: typeof t.createdAt === "number" ? t.createdAt : Date.now(),
        updatedAt: typeof t.updatedAt === "number" ? t.updatedAt : Date.now(),
      }));
  } catch {
    return [];
  }
}

function saveTasks(tasks: Task[]) {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch {
    // ignore
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [sort, setSort] = useState<TaskSort>("newest");
  const hasLoadedRef = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const loaded = safeParseTasks(localStorage.getItem(TASKS_KEY));
    const storedFilter = (localStorage.getItem(FILTER_KEY) as TaskFilter | null) ?? "all";
    const storedSort = (localStorage.getItem(SORT_KEY) as TaskSort | null) ?? "newest";
    setTasks(loaded);
    setFilter(storedFilter);
    setSort(storedSort);
    hasLoadedRef.current = true;
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hasLoadedRef.current) return;
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((title: string, description?: string) => {
    const trimmed = title.trim();
    if (!trimmed) return false;
    // prevent duplicates (case-insensitive)
    const exists = tasks.some((t) => t.title.toLowerCase() === trimmed.toLowerCase());
    if (exists) return false;
    const now = Date.now();
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: trimmed,
      completed: false,
      description: description ?? "",
      createdAt: now,
      updatedAt: now,
    };
    setTasks((prev) => [newTask, ...prev]);
    return true;
  }, [tasks]);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed, updatedAt: Date.now() } : t));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const renameTask = useCallback((id: string, nextTitle: string) => {
    const trimmed = nextTitle.trim();
    if (!trimmed) return false;
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, title: trimmed, updatedAt: Date.now() } : t));
    return true;
  }, []);

  const setDescription = useCallback((id: string, description: string) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, description, updatedAt: Date.now() } : t));
  }, []);

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  }, []);

  const setFilterSafe = useCallback((next: TaskFilter) => {
    setFilter(next);
    try { localStorage.setItem(FILTER_KEY, next); } catch {}
  }, []);
  const setSortSafe = useCallback((next: TaskSort) => {
    setSort(next);
    try { localStorage.setItem(SORT_KEY, next); } catch {}
  }, []);

  const filteredSortedTasks = useMemo(() => {
    const base = filter === "active" ? tasks.filter((t) => !t.completed)
      : filter === "completed" ? tasks.filter((t) => t.completed)
      : tasks;
    const copy = [...base];
    switch (sort) {
      case "oldest":
        copy.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case "alpha":
        copy.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "alphaDesc":
        copy.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "newest":
      default:
        copy.sort((a, b) => b.createdAt - a.createdAt);
        break;
    }
    return copy;
  }, [tasks, filter, sort]);

  const completedCount = useMemo(() => tasks.filter((t) => t.completed).length, [tasks]);

  return {
    tasks: filteredSortedTasks,
    rawTasks: tasks,
    addTask,
    toggleTask,
    deleteTask,
    renameTask,
    setDescription,
    clearCompleted,
    filter,
    setFilter: setFilterSafe,
    sort,
    setSort: setSortSafe,
    completedCount,
    totalCount: tasks.length,
  };
}

export type UseTasks = ReturnType<typeof useTasks>;


