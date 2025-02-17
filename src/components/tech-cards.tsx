interface TechCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

export function TechCard({ icon, title, description, link }: TechCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center rounded-lg bg-gray-700 p-4 transition-all hover:bg-gray-600"
    >
      <div className="mb-2 h-12 w-12 transition-transform group-hover:scale-110">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-blue-300">{title}</h3>
      <p className="text-sm text-gray-300">{description}</p>
    </a>
  );
}
