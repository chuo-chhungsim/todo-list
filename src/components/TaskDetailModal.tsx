"use client";

import { useEffect, useRef, useState } from "react";
import type { Task } from "@/hooks/useTasks";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

type Props = {
  task: Task | null;
  onClose: () => void;
  onSaveTitle: (id: string, title: string) => boolean;
  onSaveDescription: (id: string, description: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskDetailModal({ task, onClose, onSaveTitle, onSaveDescription, onToggle, onDelete }: Props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDesc(task.description ?? "");
      setTimeout(() => firstFieldRef.current?.focus(), 0);
    }
  }, [task]);

  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-sm animate-fadeInUp" onClick={onClose}>
      <div className="w-full max-w-lg rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Checkbox checked={task.completed} onChange={() => onToggle(task.id)} />
            <input
              ref={firstFieldRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => onSaveTitle(task.id, title)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSaveTitle(task.id, title);
              }}
              className="bg-transparent text-lg font-semibold outline-none border-b-2 border-transparent focus:border-[var(--ring)]"
            />
          </div>
          <button onClick={onClose} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">×</button>
        </div>
        <div className="mt-4">
          <label className="text-sm font-medium text-[var(--muted-foreground)]">Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            onBlur={() => onSaveDescription(task.id, desc)}
            className="mt-2 w-full min-h-28 resize-y rounded-lg border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent"
            placeholder="Add more details..."
          />
        </div>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs text-[var(--muted-foreground)]">Created {new Date(task.createdAt).toLocaleString()}</span>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={onClose}>Close</Button>
            <Button variant="destructive" onClick={() => { onDelete(task.id); onClose(); }}>Delete</Button>
          </div>
        </div>
      </div>
    </div>
  );
}


