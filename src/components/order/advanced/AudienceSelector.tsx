
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Users, Plus } from 'lucide-react';

interface AudienceSelectorProps {
  onAudienceChange: (audience: string) => void;
  initialAudience?: string;
}

const PREDEFINED_AUDIENCES = {
  'business': [
    'Предприниматели 25-45 лет, малый и средний бизнес',
    'Руководители компаний, принимающие решения о закупках',
    'Стартаперы и основатели технологических компаний',
    'Менеджеры по продажам и маркетингу',
    'Владельцы интернет-магазинов и e-commerce проектов'
  ],
  'tech': [
    'IT-специалисты и разработчики программного обеспечения',
    'Системные администраторы и DevOps инженеры',
    'Дизайнеры и UX/UI специалисты',
    'Продуктовые менеджеры в IT-сфере',
    'Студенты и выпускники технических вузов'
  ],
  'education': [
    'Студенты высших учебных заведений',
    'Преподаватели и научные сотрудники',
    'Родители школьников и подростков',
    'Специалисты, повышающие квалификацию',
    'Организаторы образовательных курсов и тренингов'
  ],
  'health': [
    'Люди, заботящиеся о своем здоровье 30-55 лет',
    'Родители с детьми, ищущие медицинские услуги',
    'Спортсмены и любители фитнеса',
    'Пожилые люди, нуждающиеся в медицинской помощи',
    'Медицинские работники и специалисты'
  ],
  'retail': [
    'Женщины 25-45 лет, активные покупатели онлайн',
    'Семьи с детьми, покупающие товары для дома',
    'Молодежь 18-30 лет, следящая за трендами',
    'Пенсионеры, ищущие качественные товары по доступным ценам',
    'Коллекционеры и любители уникальных товаров'
  ]
};

export default function AudienceSelector({ onAudienceChange, initialAudience }: AudienceSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedAudience, setSelectedAudience] = useState<string>('');
  const [customAudience, setCustomAudience] = useState<string>(initialAudience || '');
  const [mode, setMode] = useState<'predefined' | 'custom'>('predefined');

  const handlePredefinedSelect = (audience: string) => {
    setSelectedAudience(audience);
    setCustomAudience(audience);
    onAudienceChange(audience);
  };

  const handleCustomChange = (value: string) => {
    setCustomAudience(value);
    onAudienceChange(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Целевая аудитория
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            type="button"
            variant={mode === 'predefined' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('predefined')}
          >
            Выбрать из списка
          </Button>
          <Button
            type="button"
            variant={mode === 'custom' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('custom')}
          >
            <Plus className="w-4 h-4 mr-1" />
            Ввести вручную
          </Button>
        </div>

        {mode === 'predefined' && (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Сфера деятельности</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите сферу" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="business">Бизнес и предпринимательство</SelectItem>
                  <SelectItem value="tech">IT и технологии</SelectItem>
                  <SelectItem value="education">Образование</SelectItem>
                  <SelectItem value="health">Здоровье и медицина</SelectItem>
                  <SelectItem value="retail">Ритейл и e-commerce</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedCategory && (
              <div className="space-y-2">
                <Label>Целевая аудитория</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {PREDEFINED_AUDIENCES[selectedCategory as keyof typeof PREDEFINED_AUDIENCES]?.map((audience, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handlePredefinedSelect(audience)}
                      className={`w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors ${
                        selectedAudience === audience ? 'border-primary bg-primary/5' : 'border-gray-200'
                      }`}
                    >
                      <div className="text-sm">{audience}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {mode === 'custom' && (
          <div className="space-y-2">
            <Label htmlFor="custom-audience">Опишите вашу целевую аудиторию</Label>
            <Textarea
              id="custom-audience"
              value={customAudience}
              onChange={(e) => handleCustomChange(e.target.value)}
              placeholder="Например: предприниматели 25-45 лет, работающие в сфере IT услуг, с доходом от 100 000 рублей в месяц, активно использующие digital-каналы для развития бизнеса"
              rows={4}
            />
          </div>
        )}

        {customAudience && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-800">
              <strong>Выбранная аудитория:</strong>
              <div className="mt-1">{customAudience}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
