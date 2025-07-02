export function formatAIMessage(text: string): string {
  if (!text) return '';

  let formatted = text;

  // Handle bold text (**text**)
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-primary">$1</strong>');

  // Handle italic text (*text*)
  formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

  // Handle code blocks (```code```)
  formatted = formatted.replace(/```(.*?)```/gs, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono">$1</code>');

  // Handle inline code (`code`)
  formatted = formatted.replace(/`(.*?)`/g, '<code class="bg-muted px-1 rounded text-sm font-mono">$1</code>');

  // Handle horizontal dividers (---)
  formatted = formatted.replace(/^---+$/gm, '<hr class="border-t border-border my-4" />');

  // Handle section headers with emojis
  formatted = formatted.replace(/^(🔹|💡|📋|⚡|🎯|✨|🚀|📊) \*\*(.*?)\*\*$/gm, 
    '<div class="flex items-center gap-2 font-semibold text-primary mb-3 mt-4"><span class="text-lg">$1</span><span>$2</span></div>');

  // Handle numbered lists
  formatted = formatted.replace(/^(\d+)\. (.*?)$/gm, 
    '<div class="flex gap-2 mb-2"><span class="text-primary font-semibold min-w-[1.5rem]">$1.</span><span>$2</span></div>');

  // Handle bullet points with dashes
  formatted = formatted.replace(/^   - \*(.*?)\* — (.*?)$/gm, 
    '<div class="flex gap-2 mb-2 ml-4"><span class="text-muted-foreground">•</span><span><em class="text-primary">$1</em> — $2</span></div>');

  // Handle regular bullet points
  formatted = formatted.replace(/^- (.*?)$/gm, 
    '<div class="flex gap-2 mb-2"><span class="text-primary">•</span><span>$1</span></div>');

  // Handle line breaks
  formatted = formatted.replace(/\n/g, '<br />');

  // Clean up excessive breaks
  formatted = formatted.replace(/(<br \/>){3,}/g, '<br /><br />');

  return formatted;
}