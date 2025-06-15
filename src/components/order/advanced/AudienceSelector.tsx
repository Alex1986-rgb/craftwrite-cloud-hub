
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, Plus } from 'lucide-react';

interface AudienceSelectorProps {
  onAudienceChange: (audience: string) => void;
  initialAudience?: string;
}

const PREDEFINED_AUDIENCES = {
  'business-b2b': [
    'Руководители малого и среднего бизнеса (25-50 лет)',
    'Топ-менеджеры крупных корпораций',
    'Предприниматели в сфере IT и технологий',
    'Владельцы производственных предприятий',
    'Директора по маркетингу и продажам',
    'Закупщики и снабженцы предприятий',
    'Консультанты и бизнес-тренеры'
  ],
  'business-b2c': [
    'Семьи с детьми (средний доход)',
    'Молодые специалисты 25-35 лет',
    'Активные пенсионеры 60+',
    'Студенты и выпускники вузов',
    'Фрилансеры и удаленные сотрудники',
    'Домохозяйки 30-45 лет',
    'Предприниматели-одиночки'
  ],
  'tech': [
    'Разработчики программного обеспечения',
    'Системные администраторы',
    'DevOps и инженеры автоматизации',
    'UX/UI дизайнеры',
    'Продуктовые менеджеры',
    'CTO и технические директора',
    'Студенты IT-специальностей',
    'Стартаперы в технологической сфере'
  ],
  'education': [
    'Студенты высших учебных заведений',
    'Школьники старших классов',
    'Преподаватели и педагоги',
    'Родители школьников',
    'Специалисты, повышающие квалификацию',
    'Организаторы тренингов и курсов',
    'HR-менеджеры, занимающиеся обучением',
    'Методисты и разработчики курсов'
  ],
  'health': [
    'Люди, ведущие здоровый образ жизни (25-55 лет)',
    'Родители с маленькими детьми',
    'Спортсмены и любители фитнеса',
    'Люди с хроническими заболеваниями',
    'Пожилые люди, заботящиеся о здоровье',
    'Медицинские работники',
    'Диетологи и фитнес-тренеры',
    'Психологи и терапевты'
  ],
  'retail': [
    'Женщины 25-45 лет (активные покупательницы)',
    'Семьи с детьми дошкольного возраста',
    'Молодежь 18-30 лет, следящая за трендами',
    'Коллекционеры и любители уникальных товаров',
    'Пенсионеры, ищущие качество по доступной цене',
    'Владельцы домашних животных',
    'Любители рукоделия и творчества',
    'Покупатели экологичных товаров'
  ],
  'finance': [
    'Инвесторы-новички',
    'Опытные трейдеры и инвесторы',
    'Владельцы малого бизнеса',
    'Семьи, планирующие крупные покупки',
    'Люди предпенсионного возраста',
    'Молодые специалисты с растущим доходом',
    'Фрилансеры и самозанятые',
    'Финансовые консультанты'
  ],
  'real-estate': [
    'Семьи, планирующие покупку жилья',
    'Инвесторы в недвижимость',
    'Молодые семьи (первое жилье)',
    'Люди, планирующие переезд',
    'Владельцы коммерческой недвижимости',
    'Арендодатели и управляющие',
    'Риелторы и брокеры',
    'Девелоперы и застройщики'
  ]
};

const DEMOGRAPHIC_CHARACTERISTICS = [
  'Возраст 18-25 лет',
  'Возраст 26-35 лет',
  'Возраст 36-45 лет',
  'Возраст 46-55 лет',
  'Возраст 55+ лет',
  'Преимущественно мужчины',
  'Преимущественно женщины',
  'Высшее образование',
  'Средний доход',
  'Высокий доход',
  'Проживают в крупных городах',
  'Проживают в малых городах/селах',
  'Активные пользователи интернета',
  'Консервативные в выборе'
];

export default function AudienceSelector({ onAudienceChange, initialAudience }: AudienceSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedAudience, setSelectedAudience] = useState<string>('');
  const [customAudience, setCustomAudience] = useState<string>(initialAudience || '');
  const [mode, setMode] = useState<'predefined' | 'constructor' | 'custom'>('predefined');
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<string[]>([]);

  const handlePredefinedSelect = (audience: string) => {
    setSelectedAudience(audience);
    setCustomAudience(audience);
    onAudienceChange(audience);
  };

  const handleCustomChange = (value: string) => {
    setCustomAudience(value);
    onAudienceChange(value);
  };

  const handleCharacteristicChange = (characteristic: string, checked: boolean) => {
    let updatedCharacteristics;
    if (checked) {
      updatedCharacteristics = [...selectedCharacteristics, characteristic];
    } else {
      updatedCharacteristics = selectedCharacteristics.filter(c => c !== characteristic);
    }
    setSelectedCharacteristics(updatedCharacteristics);
    
    const constructedAudience = updatedCharacteristics.join(', ');
    setCustomAudience(constructedAudience);
    onAudienceChange(constructedAudience);
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
        <div className="flex gap-2 flex-wrap">
          <Button
            type="button"
            variant={mode === 'predefined' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('predefined')}
          >
            Готовые варианты
          </Button>
          <Button
            type="button"
            variant={mode === 'constructor' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('constructor')}
          >
            Конструктор
          </Button>
          <Button
            type="button"
            variant={mode === 'custom' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('custom')}
          >
            <Plus className="w-4 h-4 mr-1" />
            Свое описание
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
                  <SelectItem value="business-b2b">B2B бизнес</SelectItem>
                  <SelectItem value="business-b2c">B2C бизнес</SelectItem>
                  <SelectItem value="tech">IT и технологии</SelectItem>
                  <SelectItem value="education">Образование</SelectItem>
                  <SelectItem value="health">Здоровье и медицина</SelectItem>
                  <SelectItem value="retail">Ритейл и товары</SelectItem>
                  <SelectItem value="finance">Финансы и инвестиции</SelectItem>
                  <SelectItem value="real-estate">Недвижимость</SelectItem>
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

        {mode === 'constructor' && (
          <div className="space-y-3">
            <Label>Выберите характеристики аудитории</Label>
            <div className="grid grid-cols-2 gap-2">
              {DEMOGRAPHIC_CHARACTERISTICS.map((characteristic, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`char-${index}`}
                    checked={selectedCharacteristics.includes(characteristic)}
                    onCheckedChange={(checked) => 
                      handleCharacteristicChange(characteristic, checked as boolean)
                    }
                  />
                  <Label htmlFor={`char-${index}`} className="text-sm">
                    {characteristic}
                  </Label>
                </div>
              ))}
            </div>
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
