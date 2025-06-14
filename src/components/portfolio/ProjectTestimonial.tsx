
import { Star } from "lucide-react";

type ProjectTestimonialProps = {
  testimonial: {
    text: string;
    author: string;
    position: string;
  };
};

export default function ProjectTestimonial({ testimonial }: ProjectTestimonialProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-primary via-blue-600 to-purple-600 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container max-w-5xl mx-auto px-4 text-center relative z-10">
        <div className="flex justify-center mb-8">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
          ))}
        </div>
        
        <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-12">Отзыв клиента</h2>
        
        <blockquote className="text-2xl md:text-3xl italic mb-12 leading-relaxed font-light">
          "{testimonial.text}"
        </blockquote>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 inline-block">
          <div className="font-semibold text-2xl mb-2">{testimonial.author}</div>
          <div className="opacity-90 text-lg">{testimonial.position}</div>
        </div>
      </div>
    </section>
  );
}
