
interface QualityStatsProps {
  text: string;
}

export default function QualityStats({ text }: QualityStatsProps) {
  const wordsCount = text.split(' ').length;
  const avgWordsPerSentence = Math.round(wordsCount / (text.split(/[.!?]+/).length - 1) || 0);

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
      <div className="text-center">
        <div className="text-lg font-bold text-blue-900">{text.length}</div>
        <div className="text-sm text-blue-700">Символов</div>
      </div>
      <div className="text-center">
        <div className="text-lg font-bold text-blue-900">{wordsCount}</div>
        <div className="text-sm text-blue-700">Слов</div>
      </div>
      <div className="text-center">
        <div className="text-lg font-bold text-blue-900">{avgWordsPerSentence}</div>
        <div className="text-sm text-blue-700">Слов/предложение</div>
      </div>
    </div>
  );
}
