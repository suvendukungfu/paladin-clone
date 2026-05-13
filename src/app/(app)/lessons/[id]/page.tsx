"use client";

import { use } from "react";
import { StoryEngine } from "@/components/lessons/StoryEngine";

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="h-screen w-full overflow-hidden">
      <StoryEngine lessonId={id} />
    </div>
  );
}
