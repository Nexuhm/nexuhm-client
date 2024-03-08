import { Button } from '@/components/elements/button';
import Markdown from 'markdown-to-jsx';

export function CandidatesExperience() {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center text-xl font-semibold">
          Experience
        </div>

        <Button variant="secondary" className="inline-flex items-center">
          Download CV
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <ExperienceCard />
      </div>
    </div>
  );
}

export function ExperienceCard() {
  const text = `
  - Led the redesign of the booking process for Airbnb's mobile app,
  resulting in a 30% increase in conversion rates and improved user
  satisfaction. 
  - Conducted extensive user research and usability
  testing to identify pain points in the search and filtering
  experience. 
  - Conducted extensive user research and usability testing
  to identify pain points in the search and filtering experience.
  `;

  return (
    <div className='py-4'>
      <div className='flex items-center justify-between mb-4'>
        <div className='text-base font-semibold'>AirBnb</div>
        <div className='italic text-content-tertiary text-xs'>Oct '20 - Present</div>
      </div>

      <div className='prose text-sm prose-li:marker:text-content-primary'>
        <Markdown>
          {text}
        </Markdown>
      </div>
    </div>
  );
}
