
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Service } from '@/data/types/service';

interface ServiceInfoCardProps {
  selectedService: Service;
}

export default function ServiceInfoCard({ selectedService }: ServiceInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">О услуге</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Сложность:</span>
          <Badge variant="secondary">{selectedService.difficulty}</Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Популярность:</span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < selectedService.popularity ? "text-yellow-400" : "text-gray-300"}>
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground">{selectedService.detail}</p>
        </div>
      </CardContent>
    </Card>
  );
}
