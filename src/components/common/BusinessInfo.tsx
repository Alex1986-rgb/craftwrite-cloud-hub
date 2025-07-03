import React, { useState } from 'react';
import { Copy, Check, Building2, CreditCard, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface BusinessInfoProps {
  variant?: 'full' | 'compact' | 'footer';
  className?: string;
}

const businessData = {
  name: 'ИП Рыбалко Евгения Олеговна',
  inn: '773165156383',
  ogrnip: '310774607801041',
  account: '40802810002620001214',
  bank: 'АО «Альфа-Банк»',
  bik: '044525593',
  corrAccount: '30101810200000000593'
};

export default function BusinessInfo({ variant = 'full', className = '' }: BusinessInfoProps) {
  const [copiedField, setCopiedField] = useState<string>('');

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      toast.success(`${fieldName} скопирован`);
      setTimeout(() => setCopiedField(''), 2000);
    } catch (err) {
      toast.error('Не удалось скопировать');
    }
  };

  const CopyableField = ({ label, value, fieldKey }: { label: string; value: string; fieldKey: string }) => (
    <div className="flex items-center justify-between p-2 bg-slate-800/30 rounded-lg group hover:bg-slate-700/30 transition-colors">
      <div className="flex-1">
        <div className="text-xs text-slate-400 mb-1">{label}</div>
        <div className="text-sm text-white font-mono">{value}</div>
      </div>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => copyToClipboard(value, label)}
        className="ml-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copiedField === label ? (
          <Check className="h-3 w-3 text-green-400" />
        ) : (
          <Copy className="h-3 w-3 text-slate-400" />
        )}
      </Button>
    </div>
  );

  if (variant === 'footer') {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="text-sm">
          <div className="text-slate-300 font-medium mb-2">{businessData.name}</div>
          <div className="text-xs text-slate-400 space-y-1">
            <div>ИНН: {businessData.inn}</div>
            <div>ОГРНИП: {businessData.ogrnip}</div>
          </div>
        </div>
        <details className="group">
          <summary className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer list-none flex items-center gap-1">
            Банковские реквизиты
            <span className="transition-transform group-open:rotate-180">▼</span>
          </summary>
          <div className="mt-2 text-xs text-slate-400 space-y-1 pl-2 border-l border-slate-600">
            <div>Банк: {businessData.bank}</div>
            <div>Счет: {businessData.account}</div>
            <div>БИК: {businessData.bik}</div>
            <div>Корр. счет: {businessData.corrAccount}</div>
          </div>
        </details>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-slate-200/50 ${className}`}>
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          Реквизиты ИП
        </h3>
        
        <div className="space-y-3">
          <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
            <div className="text-sm font-semibold text-slate-800 mb-2">{businessData.name}</div>
            <div className="text-xs space-y-1">
              <div><span className="text-slate-600">ИНН:</span> <span className="font-mono">{businessData.inn}</span></div>
              <div><span className="text-slate-600">ОГРНИП:</span> <span className="font-mono">{businessData.ogrnip}</span></div>
            </div>
          </div>
          
          <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
            <div className="text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Банковские реквизиты
            </div>
            <div className="text-xs space-y-1">
              <div><span className="text-slate-600">Банк:</span> {businessData.bank}</div>
              <div><span className="text-slate-600">Счет:</span> <span className="font-mono">{businessData.account}</span></div>
              <div><span className="text-slate-600">БИК:</span> <span className="font-mono">{businessData.bik}</span></div>
              <div><span className="text-slate-600">Корр. счет:</span> <span className="font-mono">{businessData.corrAccount}</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 ${className}`}>
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Building2 className="w-5 h-5 text-blue-400" />
        Реквизиты ИП
      </h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-slate-700/30 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-400 mb-3">Основная информация</h4>
          <div className="space-y-2">
            <CopyableField label="Наименование" value={businessData.name} fieldKey="name" />
            <CopyableField label="ИНН" value={businessData.inn} fieldKey="inn" />
            <CopyableField label="ОГРНИП" value={businessData.ogrnip} fieldKey="ogrnip" />
          </div>
        </div>
        
        <div className="p-4 bg-slate-700/30 rounded-lg">
          <h4 className="text-sm font-semibold text-green-400 mb-3">Банковские реквизиты</h4>
          <div className="space-y-2">
            <CopyableField label="Банк" value={businessData.bank} fieldKey="bank" />
            <CopyableField label="Номер счета" value={businessData.account} fieldKey="account" />
            <CopyableField label="БИК" value={businessData.bik} fieldKey="bik" />
            <CopyableField label="Корр. счет" value={businessData.corrAccount} fieldKey="corrAccount" />
          </div>
        </div>
      </div>
    </div>
  );
}