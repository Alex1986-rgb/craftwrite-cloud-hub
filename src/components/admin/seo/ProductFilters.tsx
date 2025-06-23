
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ProductFiltersProps {
  onFilterChange: (filters: any) => void;
}

export default function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [filters, setFilters] = useState({
    category: "",
    manufacturer: "",
    textType: "",
    language: "",
    characterCount: "",
    uniqueness: "",
    hasTemplate: "",
    useSynonymization: "",
    includeLSI: ""
  });

  const categories = ["кондиционеры", "вентиляция", "отопление"];
  const textTypes = ["seo", "landing", "description", "technical", "comparison"];
  const languages = ["ru", "en"];
  const characterRanges = ["1000-3000", "3000-7000", "7000+"];
  const uniquenessLevels = ["80%+", "90%+", "95%+"];

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = Object.keys(filters).reduce((acc, key) => ({ ...acc, [key]: "" }), {});
    setFilters(emptyFilters as any);
    onFilterChange(emptyFilters);
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div>
            <Label>Категория</Label>
            <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Все" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Производитель</Label>
            <Input
              placeholder="Поиск..."
              value={filters.manufacturer}
              onChange={(e) => handleFilterChange("manufacturer", e.target.value)}
            />
          </div>

          <div>
            <Label>Тип текста</Label>
            <Select value={filters.textType} onValueChange={(value) => handleFilterChange("textType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Все" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все</SelectItem>
                {textTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Язык</Label>
            <Select value={filters.language} onValueChange={(value) => handleFilterChange("language", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Все" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все</SelectItem>
                {languages.map(lang => (
                  <SelectItem key={lang} value={lang}>{lang.toUpperCase()}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Глубина</Label>
            <Select value={filters.characterCount} onValueChange={(value) => handleFilterChange("characterCount", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Все" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все</SelectItem>
                {characterRanges.map(range => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Уникальность</Label>
            <Select value={filters.uniqueness} onValueChange={(value) => handleFilterChange("uniqueness", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Все" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все</SelectItem>
                {uniquenessLevels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={clearFilters}>
            Очистить фильтры
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
