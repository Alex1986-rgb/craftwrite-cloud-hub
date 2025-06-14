
import OrderQuestionGroup from "./OrderQuestionGroup";

interface OrderFormAdditionalProps {
  currentQuestions: Array<{
    label: string;
    type: "text" | "select" | "textarea";
    options?: string[];
  }>;
  answers: Record<string, string>;
  onChange: (label: string, value: string) => void;
}

export default function OrderFormAdditional({ 
  currentQuestions, 
  answers, 
  onChange 
}: OrderFormAdditionalProps) {
  if (currentQuestions.length === 0) return null;

  return (
    <div className="space-y-4 md:space-y-6">
      <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
        Дополнительные параметры
      </h3>
      <OrderQuestionGroup
        questions={currentQuestions}
        answers={answers}
        onChange={onChange}
      />
    </div>
  );
}
