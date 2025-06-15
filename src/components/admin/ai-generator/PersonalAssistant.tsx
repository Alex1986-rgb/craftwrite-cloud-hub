
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Settings, 
  Brain, 
  Target,
  Save,
  RotateCcw
} from 'lucide-react';
import { AIAssistantService } from '@/services/aiAssistantService';

interface UserProfile {
  experience: 'новичок' | 'средний' | 'эксперт';
  preferredStyle: 'официальный' | 'дружелюбный' | 'продающий' | 'информативный';
  interests: string[];
  commonMistakes: string[];
}

interface PersonalAssistantProps {
  onProfileUpdate?: (profile: UserProfile) => void;
}

export default function PersonalAssistant({ onProfileUpdate }: PersonalAssistantProps) {
  const [profile, setProfile] = useState<UserProfile>({
    experience: 'средний',
    preferredStyle: 'дружелюбный',
    interests: [],
    commonMistakes: []
  });
  
  const [newInterest, setNewInterest] = useState('');
  const [newMistake, setNewMistake] = useState('');

  useEffect(() => {
    // Загрузка профиля из localStorage
    const savedProfile = localStorage.getItem('aiAssistantProfile');
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      AIAssistantService.setUserProfile(parsedProfile);
    }
  }, []);

  const saveProfile = () => {
    localStorage.setItem('aiAssistantProfile', JSON.stringify(profile));
    AIAssistantService.setUserProfile(profile);
    if (onProfileUpdate) {
      onProfileUpdate(profile);
    }
  };

  const resetProfile = () => {
    const defaultProfile: UserProfile = {
      experience: 'средний',
      preferredStyle: 'дружелюбный',
      interests: [],
      commonMistakes: []
    };
    setProfile(defaultProfile);
    localStorage.removeItem('aiAssistantProfile');
    AIAssistantService.setUserProfile(defaultProfile);
  };

  const addInterest = () => {
    if (newInterest.trim() && !profile.interests.includes(newInterest.trim())) {
      setProfile(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const addMistake = () => {
    if (newMistake.trim() && !profile.commonMistakes.includes(newMistake.trim())) {
      setProfile(prev => ({
        ...prev,
        commonMistakes: [...prev.commonMistakes, newMistake.trim()]
      }));
      setNewMistake('');
    }
  };

  const removeMistake = (mistake: string) => {
    setProfile(prev => ({
      ...prev,
      commonMistakes: prev.commonMistakes.filter(m => m !== mistake)
    }));
  };

  const getExperienceBadgeColor = (experience: string) => {
    switch (experience) {
      case 'новичок': return 'bg-blue-100 text-blue-800';
      case 'средний': return 'bg-yellow-100 text-yellow-800';
      case 'эксперт': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStyleBadgeColor = (style: string) => {
    switch (style) {
      case 'официальный': return 'bg-slate-100 text-slate-800';
      case 'дружелюбный': return 'bg-green-100 text-green-800';
      case 'продающий': return 'bg-orange-100 text-orange-800';
      case 'информативный': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPersonalizedAdvice = () => {
    const advice = [];
    
    if (profile.experience === 'новичок') {
      advice.push('Начните с простых текстов и постепенно усложняйте задачи');
      advice.push('Изучите базовые принципы: одна идея - один абзац');
    } else if (profile.experience === 'эксперт') {
      advice.push('Экспериментируйте с продвинутыми техниками убеждения');
      advice.push('Фокусируйтесь на метриках и A/B тестировании');
    }

    if (profile.preferredStyle === 'продающий') {
      advice.push('Всегда начинайте с проблемы клиента');
      advice.push('Используйте конкретные цифры и факты');
    }

    return advice;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-purple-600" />
          Персональный помощник
          <Badge className={`ml-auto ${getExperienceBadgeColor(profile.experience)}`}>
            {profile.experience}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="advice">Советы</TabsTrigger>
            <TabsTrigger value="learning">Обучение</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Опыт</label>
                <Select 
                  value={profile.experience} 
                  onValueChange={(value: any) => setProfile(prev => ({ ...prev, experience: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="новичок">Новичок</SelectItem>
                    <SelectItem value="средний">Средний уровень</SelectItem>
                    <SelectItem value="эксперт">Эксперт</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Предпочитаемый стиль</label>
                <Select 
                  value={profile.preferredStyle} 
                  onValueChange={(value: any) => setProfile(prev => ({ ...prev, preferredStyle: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="официальный">Официальный</SelectItem>
                    <SelectItem value="дружелюбный">Дружелюбный</SelectItem>
                    <SelectItem value="продающий">Продающий</SelectItem>
                    <SelectItem value="информативный">Информативный</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Интересы</label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Добавить интерес..."
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                />
                <Button onClick={addInterest} size="sm">
                  Добавить
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {profile.interests.map((interest) => (
                  <Badge 
                    key={interest} 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-red-100"
                    onClick={() => removeInterest(interest)}
                  >
                    {interest} ×
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Частые ошибки</label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Добавить ошибку..."
                  value={newMistake}
                  onChange={(e) => setNewMistake(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addMistake()}
                />
                <Button onClick={addMistake} size="sm">
                  Добавить
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {profile.commonMistakes.map((mistake) => (
                  <Badge 
                    key={mistake} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-red-100"
                    onClick={() => removeMistake(mistake)}
                  >
                    {mistake} ×
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={saveProfile} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Сохранить
              </Button>
              <Button variant="outline" onClick={resetProfile}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Сбросить
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="advice" className="space-y-3 mt-4">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Персональные советы</span>
            </div>
            {getPersonalizedAdvice().map((advice, index) => (
              <div key={index} className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">{advice}</p>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="learning" className="space-y-3 mt-4">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-green-600" />
              <span className="font-medium">Обучающие материалы</span>
            </div>
            
            <div className="space-y-3">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Основы копирайтинга</h4>
                <p className="text-sm text-slate-600 mb-2">
                  Изучите фундаментальные принципы создания продающих текстов
                </p>
                <Badge className={getStyleBadgeColor(profile.preferredStyle)}>
                  {profile.preferredStyle} стиль
                </Badge>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">SEO-оптимизация</h4>
                <p className="text-sm text-slate-600 mb-2">
                  Научитесь создавать тексты, которые нравятся поисковым системам
                </p>
                <Badge variant="outline">Техническое SEO</Badge>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Психология продаж</h4>
                <p className="text-sm text-slate-600 mb-2">
                  Понимание мотивации клиентов для создания убедительных текстов
                </p>
                <Badge variant="secondary">Конверсионный дизайн</Badge>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
