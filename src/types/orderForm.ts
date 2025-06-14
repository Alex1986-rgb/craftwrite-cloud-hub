
export interface OrderFormState {
  // Basic info
  name: string;
  email: string;
  phone?: string;
  
  // Service details
  service: string;
  details: string;
  
  // Advanced options
  deadline: string;
  additionalServices: string[];
  targetAudience: string;
  seoKeywords: string;
  preferredStyle: string;
  additionalRequirements: string;
  
  // Additional questions
  additional: Record<string, string>;
}

export const defaultFormState: OrderFormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  details: "",
  deadline: "standard",
  additionalServices: [],
  targetAudience: "",
  seoKeywords: "",
  preferredStyle: "",
  additionalRequirements: "",
  additional: {}
};
