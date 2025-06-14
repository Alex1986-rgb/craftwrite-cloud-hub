
import PageContent from "@/components/common/PageContent";

export default function AboutContent() {
  return (
    <PageContent 
      title="О компании CopyPro Cloud"
    >
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          CopyPro Cloud — ведущая команда профессиональных SEO-копирайтеров, которая помогает бизнесу 
          достигать целей через качественный контент.
        </p>
        <p className="text-gray-600 mb-6">
          Мы специализируемся на создании текстов, которые не только привлекают внимание, 
          но и приводят к конверсиям. Наша команда состоит из опытных специалистов в области 
          контент-маркетинга, SEO-оптимизации и продающих текстов.
        </p>
      </div>
    </PageContent>
  );
}
