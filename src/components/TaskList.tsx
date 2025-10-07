"use client";

import TaskItem from "./TaskItem";
import type { Task } from "@/hooks/useTasks";
import { useEffect, useState } from "react";

type Props = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => boolean;
  onOpenDetail?: (id: string) => void;
};

export default function TaskList({ tasks, onToggle, onDelete, onRename, onOpenDetail }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!deletingId) return;
    const t = setTimeout(() => setDeletingId(null), 250);
    return () => clearTimeout(t);
  }, [deletingId]);

  return (
    <ul className="flex flex-col gap-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`transition-all duration-300 ease-out animate-fadeInUp ${
            deletingId === task.id 
              ? "opacity-0 scale-95 -translate-y-2" 
              : "opacity-100 scale-100 translate-y-0"
          }`}
        >
          <TaskItem
            task={task}
            onToggle={onToggle}
            onRename={onRename}
            onDelete={(id) => {
              setDeletingId(id);
              setTimeout(() => onDelete(id), 300);
            }}
            onOpenDetail={onOpenDetail}
          />
        </div>
      ))}
    </ul>
  );
}


