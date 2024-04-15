import PersonSevenImage from '@/assets/images/home/person-7.webp';
import AIDrivenImage from '@/assets/images/home/ai-driven.webp';
import SimpleTrackingImage from '@/assets/images/home/hiring-pipeline.webp';
import { TextAndImage } from './text-and-image';
import { HeroSection } from './hero-section';
import { BenefitsSections } from './benefits-section';
import { PlansSections } from './plans-section';
import { FaqSection } from './faq-section';
import { GetStartedSection } from './get-started';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      <TextAndImage
        title="Culture Score"
        image={PersonSevenImage}
        content={
          <>
            Our Culture Score ensures your hires not only have the skills but
            also vibe with your company's heartbeat. Say goodbye to mismatched
            hires.
          </>
        }
      />

      <TextAndImage
        layout="right"
        title="AI Driven"
        image={AIDrivenImage}
        content={
          <>
            With AI guiding the way, Nexuhm streamlines the hiring process,
            making tasks like finding, assessing, and selecting top talent a
            breeze. By letting technology handle the heavy lifting, it frees up
            time to focus on impactful aspects that truly drive progress.
          </>
        }
      />

      <TextAndImage
        title="Simple Tracking"
        image={SimpleTrackingImage}
        content={
          <>
            Nexuhm's user-friendly platform offers simple tracking. Stay on top
            of your hires, streamline processes, and focus on what
            matters—building your dream team.
          </>
        }
      />

      <BenefitsSections
        items={[
          {
            title: 'Recruiters',
            description:
              'Nexuhm simplifies your work—less admin, more talent. Boost efficiency, save time, and find the perfect cultural fits effortlessly.',
          },
          {
            title: 'Hiring Managers',
            description:
              "Nexuhm empowers hiring managers to effortlessly align hires with the company's vision, enhancing retention, reducing turnover costs, and cultivating a high-performing, culture-driven workforce. ",
          },
          {
            title: 'Talent Acquisition Teams',
            description:
              "Nexuhm streamlines talent acquisition, fostering collaboration with hiring managers. Simplify your process, attract top talent, and elevate your team's success.",
          },
          {
            title: 'C-suite/founders',
            description:
              'Nexuhm cuts recruitment costs, offering transparent reporting. Align hires with your vision, drive productivity, and build a high-performing culture.',
          },
        ]}
      />

      <PlansSections />

      <FaqSection
        items={[
          {
            question: 'What makes Nexuhm unique among ATS platforms?',
            answer:
              'Nexuhm stands out as the first culture-driven ATS platform, emphasising the alignment of teams with organisational culture. Unlike traditional ATS, we prioritise cultural fit for lasting team success.',
          },
          {
            question: 'Why is cultural fit important in recruitment?',
            answer:
              'Culture is everything. Cultural fit is crucial for team cohesion and long-term success. Nexuhm recognises the significance of aligning candidates with a company’s mission, value, purpose, goals, leadership, team intelligence, fostering a positive work environment.',
          },

          {
            question: 'How does Nexuhm use AI in recruitment?',
            answer:
              'Nexuhm leverages AI to enhance the hiring process. Our AI algorithms analyse both written and video resumes to provide deeper insights into candidates’ skills and cultural alignment.',
          },
          {
            question: 'What kind of support does Nexuhm offer?',
            answer:
              'Nexuhm provides comprehensive customer support. Our team is available to assist you with any queries or challenges you may encounter while using our platform.',
          },
          {
            question: 'How does Nexuhm ensure ensure unbiased recruitment?',
            answer:
              'Nexuhm incorporates AI to reduce bias in the hiring process. By focusing on skills and cultural fit, our platform helps create a fair and equitable recruitment environment.',
          },
        ]}
      />

      <GetStartedSection />
    </div>
  );
}
