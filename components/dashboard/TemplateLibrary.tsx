'use client';

import { useState, useEffect } from 'react';
import { FileText, Mail, Users, Search, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTemplateDownload } from '@/hooks/useTemplateDownload';
import { Template, TemplateCategory } from '@/types/database';
import { auth } from '@/lib/firebase';

const categoryIcons: Record<TemplateCategory, any> = {
  landing_page: FileText,
  email_campaign: Mail,
  buyer_persona: Users,
  research_framework: Search,
  ad_copy: FileText,
};

const categoryLabels: Record<TemplateCategory, string> = {
  landing_page: 'Landing oldalak',
  email_campaign: 'Email kampányok',
  buyer_persona: 'Buyer personák',
  research_framework: 'Kutatási keretrendszer',
  ad_copy: 'Hirdetés szövegek',
};

export function TemplateLibrary() {
  const { user } = useAuth();
  const { trackDownload } = useTemplateDownload();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | null>(null);

  useEffect(() => {
    fetchTemplates();
  }, [user]);

  const fetchTemplates = async () => {
    if (!user) return;

    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      const response = await fetch('/api/templates', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();

      if (data.success) {
        setTemplates(data.templates || []);
      }
    } catch (error) {
      console.error('[TemplateLibrary] Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (template: Template) => {
    // Track download
    await trackDownload(template.templateId, template.courseId);

    // Open file in new tab
    if (template.fileUrl) {
      window.open(template.fileUrl, '_blank');
    }
  };

  const categories: { id: TemplateCategory; label: string; count: number }[] = [
    {
      id: 'landing_page',
      label: 'Landing oldalak',
      count: templates.filter(t => t.category === 'landing_page').length,
    },
    {
      id: 'email_campaign',
      label: 'Email kampányok',
      count: templates.filter(t => t.category === 'email_campaign').length,
    },
    {
      id: 'buyer_persona',
      label: 'Buyer personák',
      count: templates.filter(t => t.category === 'buyer_persona').length,
    },
    {
      id: 'research_framework',
      label: 'Kutatási keretrendszer',
      count: templates.filter(t => t.category === 'research_framework').length,
    },
  ];

  const filteredTemplates = selectedCategory
    ? templates.filter(t => t.category === selectedCategory)
    : templates;

  if (loading) {
    return <div className="animate-pulse bg-gray-200 rounded-xl h-64"></div>;
  }

  if (templates.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Marketing sablonok
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Még nincsenek elérhető sablonok. A sablonok hamarosan elérhetővé válnak a kurzusod során.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Marketing sablonok
        </h3>
        <span className="text-xs font-medium text-gray-500">
          {templates.length} sablon
        </span>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {categories.map((category) => {
          const Icon = categoryIcons[category.id];
          const isSelected = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(isSelected ? null : category.id)}
              className={`p-4 border rounded-lg text-left transition-all ${
                isSelected
                  ? 'border-purple-300 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50/50'
              }`}
            >
              <Icon
                className={`w-5 h-5 mb-2 ${
                  isSelected ? 'text-purple-600' : 'text-gray-600'
                }`}
              />
              <p className="text-sm font-medium text-gray-900">{category.label}</p>
              <p className="text-xs text-gray-500">{category.count} sablon</p>
            </button>
          );
        })}
      </div>

      {/* Template List */}
      <div className="space-y-2">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500">
              Nincs sablon ebben a kategóriában
            </p>
          </div>
        ) : (
          filteredTemplates.map((template) => {
            const Icon = categoryIcons[template.category];

            return (
              <div
                key={template.templateId}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {template.title}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {template.description}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownload(template)}
                  className="ml-4 flex-shrink-0"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            );
          })
        )}
      </div>

      {filteredTemplates.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Button variant="outline" size="sm" className="w-full">
            <ExternalLink className="w-4 h-4 mr-2" />
            Sablon könyvtár megtekintése
          </Button>
        </div>
      )}
    </div>
  );
}
