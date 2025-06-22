
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/data/testimonials';

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Отзывы клиентов</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Более 500 успешных проектов и довольных клиентов
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  {testimonial.service_slug && (
                    <Badge variant="outline" className="text-xs">
                      {testimonial.service_slug}
                    </Badge>
                  )}
                </div>

                <div className="relative mb-4">
                  <Quote className="w-6 h-6 text-gray-300 absolute -top-2 -left-1" />
                  <p className="text-gray-700 leading-relaxed pl-6">
                    {testimonial.review_text}
                  </p>
                </div>

                {testimonial.results_achieved && (
                  <div className="bg-green-50 border-l-4 border-green-200 p-3 mb-4">
                    <h4 className="text-sm font-semibold text-green-800 mb-1">Результат:</h4>
                    <p className="text-sm text-green-700">{testimonial.results_achieved}</p>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  {testimonial.client_avatar_url && (
                    <img
                      src={testimonial.client_avatar_url}
                      alt={testimonial.client_name}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div>
                    <div className="font-semibold">{testimonial.client_name}</div>
                    {testimonial.client_company && (
                      <div className="text-sm text-gray-600">{testimonial.client_company}</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
