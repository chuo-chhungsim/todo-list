"use client";

import { useEffect, useRef, useState } from "react";
import type { Task } from "@/hooks/useTasks";
import { Checkbox } from "./ui/checkbox";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => boolean;
  onOpenDetail?: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete, onRename, onOpenDetail }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  useEffect(() => {
    setDraft(task.title);
  }, [task.title]);

  const commit = () => {
    const ok = onRename(task.id, draft);
    if (ok) setIsEditing(false);
  };

  return (
    <li className="group flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 transition-all duration-200 hover:shadow-md hover:border-[var(--ring)]/20">
      <Checkbox checked={task.completed} onChange={() => onToggle(task.id)} />
      <button
        onClick={() => onOpenDetail?.(task.id)}
        className={`flex-1 text-left truncate transition-colors ${
          task.completed 
            ? "line-through text-[var(--muted-foreground)] opacity-60" 
            : "text-[var(--foreground)] hover:text-[var(--primary)]"
        }`}
      >
        {task.title}
      </button>
      <button
        onClick={() => onOpenDetail?.(task.id)}
        aria-label="Edit task"
        className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-md p-1"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
        </svg>
      </button>
      <button
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
        className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-[var(--muted-foreground)] hover:text-[var(--destructive)] hover:bg-[var(--destructive)]/10 rounded-md p-1"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </li>
  );
}


