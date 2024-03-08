import { Button } from "@/components/elements/button";
import { CandidateStatus } from "@/components/modules/candidate-status";

export function StageActions() {
  return (
    <div className="mb-6 rounded-lg bg-white p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xl font-medium">Stage</span>

        <div className="flex gap-5">
          <Button>Book interview</Button>
        </div>
      </div>

      <div className="flex gap-6">
        <CandidateStatus status="applied" date={new Date()} />
        <CandidateStatus status="interview" date={new Date()} />
        <CandidateStatus status="awaiting" />
        <CandidateStatus status="offer" />
        <CandidateStatus status="hired" />
      </div>
    </div>
  );
}
