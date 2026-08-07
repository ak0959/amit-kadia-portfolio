interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  centered?: boolean;
  darkTheme?: boolean;
  descriptionWrap?: boolean;
}

export function SectionHeader({ label, title, description, centered = false, darkTheme = false, descriptionWrap = false }: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      <span
        className={`${darkTheme ? 'text-[#DDE3E8]' : 'text-[#24756D]'} font-bold tracking-widest uppercase text-sm mb-2 block`}
      >
        {label}
      </span>
      <h2
        className={`text-3xl md:text-5xl font-display font-bold ${darkTheme ? 'text-[#F8FAFC]' : 'text-[#172536]'} mb-4`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-base sm:text-lg ${darkTheme ? 'text-[#DDE3E8]' : 'text-[#52606D]'} font-normal max-w-none md:max-w-4xl lg:max-w-5xl mx-auto ${
            descriptionWrap
              ? 'whitespace-normal overflow-visible text-clip'
              : 'whitespace-normal md:whitespace-nowrap overflow-hidden text-ellipsis'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
