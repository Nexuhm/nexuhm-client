interface BenefitsSectionsProps {
  items: Array<{
    title: string;
    description: string;
  }>;
}

export function BenefitsSections({ items = [] }: BenefitsSectionsProps) {
  return (
    <section className="bg-beige py-28">
      <div className="container mx-auto max-w-7xl px-6 md:px-8">
        <h2 className="mb-8 md:mb-14 text-center text-4xl font-medium md:text-6xl">
          Why Choose Nexuhm
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {items.map(({ title, description }, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white px-8 py-6 shadow-xl"
            >
              <h3 className="mb-2 text-2xl font-medium">{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
