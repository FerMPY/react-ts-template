import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";

interface TechCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
}

export function TechCard({
  icon: Icon,
  title,
  description,
  link,
}: TechCardProps) {
  return (
    <Card className="relative h-full">
      <CardHeader>
        <Icon aria-hidden className="mb-2 size-5 text-muted-foreground" />
        <CardTitle>
          {/* The ::after overlay makes the whole card clickable. */}
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="outline-none after:absolute after:inset-0 after:rounded-xl hover:underline focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
          >
            {title}
          </a>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
