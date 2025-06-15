
import ChatbotAudienceSelector from '../advanced/ChatbotAudienceSelector';
import DialogFlowBuilder from '../advanced/DialogFlowBuilder';

interface AudienceStepProps {
  audience: string;
  dialogTypes: string[];
  onAudienceChange: (audience: string, scenarios: string[], style: string) => void;
  onDialogTypesChange: (types: string[], price: number) => void;
  onCustomScenariosChange: (scenarios: string) => void;
}

export default function AudienceStep({
  audience,
  dialogTypes,
  onAudienceChange,
  onDialogTypesChange,
  onCustomScenariosChange
}: AudienceStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Аудитория и диалоги</h3>
        <p className="text-gray-600">Настройте общение под вашу аудиторию</p>
      </div>
      
      <ChatbotAudienceSelector
        onAudienceChange={onAudienceChange}
        initialAudience={audience}
      />
      
      <DialogFlowBuilder
        onDialogTypesChange={onDialogTypesChange}
        onCustomScenariosChange={onCustomScenariosChange}
        initialTypes={dialogTypes}
      />
    </div>
  );
}
