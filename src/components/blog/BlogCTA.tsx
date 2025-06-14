
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BlogCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Хотите больше полезного контента?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Подпишитесь на нашу рассылку и получайте свежие статьи и кейсы первыми
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Input 
            placeholder="Ваш email"
            className="bg-white text-gray-900"
          />
          <Button variant="secondary" size="lg">
            Подписаться
          </Button>
        </div>
      </div>
    </section>
  );
}
