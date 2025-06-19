
import React from "react";

export const TrustIndicators = () => {
  return (
    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <div className="p-4">
        <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
        <div className="text-sm text-slate-600">Соблюдение гарантий</div>
      </div>
      <div className="p-4">
        <div className="text-2xl font-bold text-green-600 mb-1">5000+</div>
        <div className="text-sm text-slate-600">Довольных клиентов</div>
      </div>
      <div className="p-4">
        <div className="text-2xl font-bold text-purple-600 mb-1">98%</div>
        <div className="text-sm text-slate-600">Возвращаются к нам</div>
      </div>
      <div className="p-4">
        <div className="text-2xl font-bold text-orange-600 mb-1">24/7</div>
        <div className="text-sm text-slate-600">Поддержка клиентов</div>
      </div>
    </div>
  );
};
