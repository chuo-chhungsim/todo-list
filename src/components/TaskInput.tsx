"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "./ui/button";

type Props = {
  onAdd: (title: string, description?: string) => boolean;
};

export default function TaskInput({ onAdd }: Props) {
  const [value, setValue] = useState("");
  const [desc, setDesc] = useState("");
  const [showDesc, setShowDesc] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = useCallback(() => {
    if (!value.trim()) return;
    const ok = onAdd(value, desc.trim() || undefined);
    if (ok) {
      setValue("");
      setDesc("");
      setShowDesc(false);
      inputRef.current?.focus();
    }
  }, [onAdd, value, desc]);

  return (
    <div className="flex w-full flex-col gap-3 items-stretch">
      <div className="flex gap-3 items-start">
        <input
          ref={inputRef}
          value={value}
          onFocus={() => setShowDesc(true)}
          onChange={(e) => {
            const v = e.target.value;
            setValue(v);
            if (v.trim().length > 0) setShowDesc(true);
            if (v.trim().length === 0 && desc.trim().length === 0) setShowDesc(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          placeholder="Add a new task..."
          className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent transition-all duration-200"
        />
        <Button onClick={submit} size="md" variant="default">
          Add Task
        </Button>
      </div>
      {showDesc && (
        <textarea
          value={desc}
          onChange={(e) => {
            const d = e.target.value;
            setDesc(d);
            if (value.trim().length === 0 && d.trim().length === 0) setShowDesc(false);
          }}
          placeholder="Optional description..."
          className="w-full min-h-20 resize-y rounded-lg border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent"
        />
      )}
    </div>
  );
}


