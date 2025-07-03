
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin,
  Clock,
  Users,
  Coffee,
  Wifi,
  Car,
  Phone,
  Mail,
  Calendar,
  Building,
  Globe,
  Zap
} from "lucide-react";

const offices = [
  {
    city: "Москва",
    isHQ: true,
    address: "ул. Тверская, 15, БЦ 'Галерея Актер'",
    floor: "12 этаж, офисы 1201-1205",
    area: "450 м²",
    team: 35,
    phone: "+7 (495) 123-45-67",
    email: "moscow@copyprocloud.ru",
    workingHours: "Пн-Пт: 9:00-19:00",
    amenities: [
      "Переговорные комнаты",
      "Зона отдыха",
      "Кухня",
      "Высокоскоростной интернет",
      "Парковка",
      "Охрана 24/7"
    ],
    description: "Главный офис с полным циклом разработки контента и центром управления проектами"
  },
  {
    city: "Санкт-Петербург",
    isHQ: false,
    address: "Невский пр., 85, БЦ 'Невский'",
    floor: "7 этаж, офис 701",
    area: "280 м²",
    team: 17,
    phone: "+7 (812) 987-65-43",
    email: "spb@copyprocloud.ru", 
    workingHours: "Пн-Пт: 9:00-18:00",
    amenities: [
      "Креативные зоны",
      "Библиотека",
      "Зона коворкинга",
      "Видеосвязь с центральным офисом",
      "Метро в 5 минутах"
    ],
    description: "Региональный офис с фокусом на креативные проекты и локализацию контента"
  }
];

const virtualPresence = [
  { country: "Беларусь", city: "Минск", specialists: 5, focus: "Локализация для рынка СНГ" },
  { country: "Казахстан", city: "Алматы", specialists: 3, focus: "Финансовый контент" },
  { country: "Украина", city: "Киев", specialists: 4, focus: "IT и технический копирайтинг" },
  { country: "Армения", city: "Ереван", specialists: 2, focus: "Многоязычный контент" }
];

const officeFeatures = [
  {
    icon: Users,
    title: "Команды экспертов",
    description: "Специализированные отделы для разных типов контента"
  },
  {
    icon: Zap,
    title: "Высокие технологии",
    description: "Современное оборудование и ПО для эффективной работы"
  },
  {
    icon: Coffee,
    title: "Комфортная среда",
    description: "Пространства для творчества и продуктивной работы"
  },
  {
    icon: Globe,
    title: "Глобальная связность",
    description: "Видеосвязь и координация между всеми офисами"
  }
];

export default function OfficeSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Building className="w-4 h-4 mr-2" />
            Наши офисы
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Где мы работаем и творим
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Современные офисы в ключевых городах России и удаленные специалисты 
            по всему миру создают синергию опыта и креативности.
          </p>
        </div>

        {/* Office Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {offices.map((office, index) => (
            <Card key={index} className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-slate-800">{office.city}</h3>
                    {office.isHQ && (
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                        Главный офис
                      </Badge>
                    )}
                  </div>
                  <p className="text-slate-600 mb-4">{office.description}</p>
                </div>
              </div>

              {/* Address and Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-800">{office.address}</div>
                    <div className="text-sm text-slate-600">{office.floor}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-green-600" />
                    <span className="text-slate-700">{office.area}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span className="text-slate-700">{office.team} человек</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <a href={`tel:${office.phone}`} className="text-slate-700 hover:text-blue-600 transition-colors">
                    {office.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-green-600" />
                  <a href={`mailto:${office.email}`} className="text-slate-700 hover:text-green-600 transition-colors">
                    {office.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-slate-700">{office.workingHours}</span>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Удобства офиса:</h4>
                <div className="flex flex-wrap gap-2">
                  {office.amenities.map((amenity, amenityIndex) => (
                    <Badge key={amenityIndex} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white border-0">
                  <Calendar className="w-4 h-4 mr-2" />
                  Записаться на встречу
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Virtual Presence */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-slate-800">
            Удаленные специалисты
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {virtualPresence.map((location, index) => (
              <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-slate-800 mb-1">{location.city}</h4>
                <div className="text-sm text-slate-600 mb-3">{location.country}</div>
                <div className="text-2xl font-bold text-green-600 mb-2">{location.specialists}</div>
                <div className="text-xs text-slate-500 mb-3">специалистов</div>
                <Badge variant="secondary" className="text-xs">
                  {location.focus}
                </Badge>
              </Card>
            ))}
          </div>
        </div>

        {/* Office Features */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              Что делает наши офисы особенными
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Каждое рабочее пространство спроектировано для максимальной продуктивности 
              и комфорта наших специалистов
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {officeFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-slate-800 mb-3">{feature.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <Card className="p-8 lg:p-12 bg-gradient-to-r from-slate-900 to-slate-800 text-white border-0 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Хотите встретиться лично?
            </h3>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Мы всегда рады личным встречам с клиентами. Приходите к нам в офис 
              или мы приедем к вам для обсуждения проекта.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="bg-slate-800/50 rounded-xl p-6">
                <h4 className="font-semibold text-white mb-4 text-center">Реквизиты для связи</h4>
                <div className="space-y-3 text-sm">
                  <div className="text-center">
                    <div className="text-slate-300 font-medium">ИП Рыбалко Евгения Олеговна</div>
                    <div className="text-slate-400">ИНН: 773165156383 | ОГРНИП: 310774607801041</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-600">
                    <div className="text-center">
                      <Phone className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                      <div className="font-semibold mb-1">Позвоните нам</div>
                      <div className="text-slate-300">+7 (925) 733-86-48</div>
                    </div>
                    <div className="text-center">
                      <Mail className="w-8 h-8 mx-auto mb-2 text-green-400" />
                      <div className="font-semibold mb-1">Напишите нам</div>
                      <div className="text-slate-300">optteem@mail.ru</div>
                    </div>
                    <div className="text-center">
                      <Calendar className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                      <div className="font-semibold mb-1">Telegram</div>
                      <div className="text-slate-300">@Koopeerayter</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white border-0 px-8 py-4">
              <Calendar className="w-5 h-5 mr-2" />
              Запланировать встречу
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
