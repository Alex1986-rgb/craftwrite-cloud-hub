
export const formatCardNumber = (value: string): string => {
  // Удаляем все нецифровые символы
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  
  // Добавляем пробелы каждые 4 цифры
  const matches = v.match(/\d{4,16}/g);
  const match = matches && matches[0] || '';
  const parts = [];
  
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  
  if (parts.length) {
    return parts.join(' ');
  } else {
    return v;
  }
};

export const formatExpiryDate = (value: string): string => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  
  if (v.length >= 2) {
    return v.substring(0, 2) + '/' + v.substring(2, 4);
  }
  
  return v;
};

export const validateCardNumber = (cardNumber: string): boolean => {
  const num = cardNumber.replace(/\s/g, '');
  
  if (!/^\d{13,19}$/.test(num)) {
    return false;
  }
  
  // Алгоритм Луна
  let sum = 0;
  let isEven = false;
  
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num.charAt(i), 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

export const validateExpiryDate = (expiryDate: string): boolean => {
  const match = expiryDate.match(/^(\d{2})\/(\d{2})$/);
  
  if (!match) {
    return false;
  }
  
  const month = parseInt(match[1], 10);
  const year = parseInt(match[2], 10) + 2000;
  
  if (month < 1 || month > 12) {
    return false;
  }
  
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return false;
  }
  
  return true;
};

export const validateCVV = (cvv: string): boolean => {
  return /^\d{3,4}$/.test(cvv);
};

export const getCardType = (cardNumber: string): string => {
  const num = cardNumber.replace(/\s/g, '');
  
  if (/^4/.test(num)) {
    return 'visa';
  }
  
  if (/^5[1-5]/.test(num) || /^2[2-7]/.test(num)) {
    return 'mastercard';
  }
  
  if (/^220[0-4]/.test(num)) {
    return 'mir';
  }
  
  return 'unknown';
};
