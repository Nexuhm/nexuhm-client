import clsx from 'clsx';

export interface FaqSectionProps {
  items: Array<{
    question: string;
    answer: string;
  }>;
}

export function FaqSection({ items }: FaqSectionProps) {
  return (
    <section className="bg-surface-secondary py-24">
      <div className="container mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-14 border-b border-light-gray pb-10">
          <div className="max-w-xl text-center mx-auto">
            <h2 className="mb-6 text-4xl font-medium md:text-6xl">
              Frequently asked questions
            </h2>

            <p className="text-xl">
              Find answers to our most asked questions, including building job
              posts, culture lead teams, and more.
            </p>
          </div>
        </div>

        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          {items.map(({ question, answer }) => {
            return (
              <div className="flex flex-col gap-6">
                <div className="max-w-lg rounded-3xl bg-content-primary p-4 text-white">
                  {question}
                </div>

                <div
                  className={clsx(
                    'ml-auto max-w-lg rounded-3xl bg-white p-4',
                    'font-medium text-content-primary shadow-lg',
                  )}
                >
                  {answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
