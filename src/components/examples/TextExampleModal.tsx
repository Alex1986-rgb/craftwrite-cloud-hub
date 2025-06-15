
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EnhancedTextExample } from "@/data/types/textExample";
import { Download, Eye, BarChart3 } from "lucide-react";

interface TextExampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  example: EnhancedTextExample | null;
}

const TextExampleModal = ({ isOpen, onClose, example }: TextExampleModalProps) => {
  if (!example) return null;

  const renderBlock = (block: any, index: number) => {
    switch (block.type) {
      case 'heading':
        const HeadingTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag key={index} className={`font-bold mb-4 ${
            block.level === 1 ? 'text-2xl' : block.level === 2 ? 'text-xl' : 'text-lg'
          }`}>
            {block.content}
          </HeadingTag>
        );
      
      case 'paragraph':
        return (
          <p key={index} className="mb-4 leading-relaxed text-slate-700">
            {block.content}
          </p>
        );
      
      case 'list':
        return (
          <ul key={index} className="mb-4 space-y-2">
            {block.items?.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      
      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50 rounded-r-lg">
            <p className="italic text-slate-700 mb-2">"{block.content}"</p>
            {block.author && (
              <cite className="text-sm font-semibold">
                — {block.author}
                {block.position && <span className="text-slate-500">, {block.position}</span>}
              </cite>
            )}
          </blockquote>
        );
      
      case 'table':
        return (
          <div key={index} className="mb-4 overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300 text-sm">
              <thead>
                <tr className="bg-slate-100">
                  {block.tableData?.headers.map((header: string, i: number) => (
                    <th key={i} className="border border-slate-300 px-3 py-2 font-semibold text-left">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.tableData?.rows.map((row: string[], i: number) => (
                  <tr key={i} className="hover:bg-slate-50">
                    {row.map((cell: string, j: number) => (
                      <td key={j} className="border border-slate-300 px-3 py-2">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      case 'cta':
        return (
          <div key={index} className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg mb-4 text-center font-bold">
            {block.content}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Eye className="w-5 h-5 text-blue-600" />
            {example.title}
          </DialogTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">{example.category}</Badge>
            <Badge 
              style={{ backgroundColor: example.colors.primary + '20', color: example.colors.primary }}
            >
              {example.description}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Content blocks */}
          <div className="prose max-w-none">
            {example.blocks.map((block, index) => renderBlock(block, index))}
          </div>

          {/* Metrics */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="flex items-center gap-2 font-semibold mb-3">
              <BarChart3 className="w-4 h-4" />
              Метрики и характеристики
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(example.metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-sm text-slate-600 capitalize">{key}</div>
                  <div className="font-semibold text-slate-900">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Скачать пример
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500">
              Заказать такой же
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TextExampleModal;
