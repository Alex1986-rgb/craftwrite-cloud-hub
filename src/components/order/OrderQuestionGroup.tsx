
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Question = {
  label: string;
  type: "text" | "select" | "textarea";
  options?: string[];
};

type OrderQuestionGroupProps = {
  questions: Question[];
  answers: Record<string, string>;
  onChange: (label: string, value: string) => void;
};

export default function OrderQuestionGroup({ questions, answers, onChange }: OrderQuestionGroupProps) {
  return (
    <div className="grid gap-2 py-2 animate-fade-in">
      {questions?.map(q => {
        const value = answers[q.label] || "";
        if (q.type === "text") {
          return (
            <Input
              key={q.label}
              name={q.label}
              value={value}
              required
              placeholder={q.label}
              onChange={e => onChange(q.label, e.target.value)}
              className="mt-2"
            />
          );
        }
        if (q.type === "textarea") {
          return (
            <Textarea
              key={q.label}
              name={q.label}
              value={value}
              required
              placeholder={q.label}
              rows={3}
              onChange={e => onChange(q.label, e.target.value)}
              className="mt-2"
            />
          );
        }
        if (q.type === "select" && q.options) {
          return (
            <select
              key={q.label}
              name={q.label}
              value={value}
              required
              onChange={e => onChange(q.label, e.target.value)}
              className="border-input bg-background rounded-md px-3 py-2 text-sm mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="" disabled>
                {q.label}
              </option>
              {q.options.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          );
        }
        return null;
      })}
    </div>
  );
}
