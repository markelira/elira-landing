'use client';

import React, { useState, useCallback } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Video,
  Table,
  Minus,
  Undo,
  Redo,
  Save,
  Eye,
  Edit3,
  Type,
  Heading1,
  Heading2,
  Heading3,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { uploadFile } from '@/lib/upload';

interface TextEditorProps {
  lessonId: string;
  content?: {
    html?: string;
    markdown?: string;
    estimatedReadTime?: number;
  };
  onSave: (content: any) => Promise<void>;
}

export default function TextEditor({ lessonId, content = {}, onSave }: TextEditorProps) {
  const [editorContent, setEditorContent] = useState(content.html || '');
  const [isPreview, setIsPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [estimatedReadTime, setEstimatedReadTime] = useState(content.estimatedReadTime || 0);

  // Calculate reading time (average 200 words per minute)
  const calculateReadTime = useCallback((text: string) => {
    const words = text.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(words / 200);
  }, []);

  // Format commands
  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateContent();
  };

  const updateContent = () => {
    const editor = document.getElementById('text-editor');
    if (editor) {
      const content = editor.innerHTML;
      setEditorContent(content);
      setEstimatedReadTime(calculateReadTime(content));
    }
  };

  // Insert link
  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      formatText('createLink', url);
    }
  };

  // Insert image
  const insertImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const result = await uploadFile(file, {
          category: 'lesson',
          purpose: 'content-image',
          entityId: lessonId,
        });

        if (result.success && result.urls?.original) {
          formatText('insertImage', result.urls.original);
          toast.success('Kép sikeresen beszúrva');
        }
      } catch (error) {
        console.error('Image upload error:', error);
        toast.error('Kép feltöltése sikertelen');
      }
    };

    input.click();
  };

  // Insert table
  const insertTable = () => {
    const rows = prompt('Number of rows:', '3');
    const cols = prompt('Number of columns:', '3');
    
    if (rows && cols) {
      let tableHTML = '<table class="min-w-full divide-y divide-gray-200"><tbody>';
      for (let i = 0; i < parseInt(rows); i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < parseInt(cols); j++) {
          tableHTML += '<td class="px-4 py-2 border">Cell</td>';
        }
        tableHTML += '</tr>';
      }
      tableHTML += '</tbody></table>';
      
      document.execCommand('insertHTML', false, tableHTML);
      updateContent();
    }
  };

  // Insert code block
  const insertCodeBlock = () => {
    const code = prompt('Enter code:');
    if (code) {
      const codeHTML = `<pre class="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto"><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
      document.execCommand('insertHTML', false, codeHTML);
      updateContent();
    }
  };

  // Insert YouTube video
  const insertVideo = () => {
    const url = prompt('Enter YouTube URL:');
    if (url) {
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?]*)/)?.[1];
      if (videoId) {
        const videoHTML = `<div class="aspect-video my-4"><iframe src="https://www.youtube.com/embed/${videoId}" class="w-full h-full rounded-lg" allowfullscreen></iframe></div>`;
        document.execCommand('insertHTML', false, videoHTML);
        updateContent();
      }
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const contentData = {
        html: editorContent,
        estimatedReadTime,
        lastModified: new Date().toISOString(),
      };

      await onSave(contentData);
      toast.success('Szöveges tartalom sikeresen mentve');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Szöveges tartalom mentése sikertelen');
    } finally {
      setSaving(false);
    }
  };

  const toolbarButtons = [
    { icon: <Undo className="w-4 h-4" />, action: () => formatText('undo'), title: 'Undo' },
    { icon: <Redo className="w-4 h-4" />, action: () => formatText('redo'), title: 'Redo' },
    { separator: true },
    { icon: <Heading1 className="w-4 h-4" />, action: () => formatText('formatBlock', 'h1'), title: 'Heading 1' },
    { icon: <Heading2 className="w-4 h-4" />, action: () => formatText('formatBlock', 'h2'), title: 'Heading 2' },
    { icon: <Heading3 className="w-4 h-4" />, action: () => formatText('formatBlock', 'h3'), title: 'Heading 3' },
    { icon: <Type className="w-4 h-4" />, action: () => formatText('formatBlock', 'p'), title: 'Paragraph' },
    { separator: true },
    { icon: <Bold className="w-4 h-4" />, action: () => formatText('bold'), title: 'Bold' },
    { icon: <Italic className="w-4 h-4" />, action: () => formatText('italic'), title: 'Italic' },
    { icon: <Underline className="w-4 h-4" />, action: () => formatText('underline'), title: 'Underline' },
    { separator: true },
    { icon: <AlignLeft className="w-4 h-4" />, action: () => formatText('justifyLeft'), title: 'Align Left' },
    { icon: <AlignCenter className="w-4 h-4" />, action: () => formatText('justifyCenter'), title: 'Align Center' },
    { icon: <AlignRight className="w-4 h-4" />, action: () => formatText('justifyRight'), title: 'Align Right' },
    { separator: true },
    { icon: <List className="w-4 h-4" />, action: () => formatText('insertUnorderedList'), title: 'Bullet List' },
    { icon: <ListOrdered className="w-4 h-4" />, action: () => formatText('insertOrderedList'), title: 'Numbered List' },
    { icon: <Quote className="w-4 h-4" />, action: () => formatText('formatBlock', 'blockquote'), title: 'Quote' },
    { separator: true },
    { icon: <Link className="w-4 h-4" />, action: insertLink, title: 'Insert Link' },
    { icon: <Image className="w-4 h-4" />, action: insertImage, title: 'Insert Image' },
    { icon: <Video className="w-4 h-4" />, action: insertVideo, title: 'Insert Video' },
    { icon: <Table className="w-4 h-4" />, action: insertTable, title: 'Insert Table' },
    { icon: <Code className="w-4 h-4" />, action: insertCodeBlock, title: 'Insert Code' },
    { separator: true },
    { icon: <Minus className="w-4 h-4" />, action: () => formatText('insertHorizontalRule'), title: 'Horizontal Line' },
  ];

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <Card className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 flex-wrap">
            {toolbarButtons.map((button, index) => 
              button.separator ? (
                <div key={index} className="w-px h-6 bg-gray-300 mx-1" />
              ) : (
                <button
                  key={index}
                  onClick={button.action}
                  title={button.title}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                  disabled={isPreview}
                >
                  {button.icon}
                </button>
              )
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreview(!isPreview)}
            >
              {isPreview ? (
                <>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Editor/Preview */}
      <Card className="p-6">
        {isPreview ? (
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: editorContent }} />
          </div>
        ) : (
          <div
            id="text-editor"
            contentEditable
            onInput={updateContent}
            onPaste={(e) => {
              e.preventDefault();
              const text = e.clipboardData.getData('text/plain');
              document.execCommand('insertText', false, text);
              updateContent();
            }}
            className="min-h-[400px] focus:outline-none prose max-w-none"
            style={{
              fontFamily: 'inherit',
            }}
            dangerouslySetInnerHTML={{ __html: editorContent }}
          />
        )}
        
        {!editorContent && !isPreview && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-gray-400">Kezd el írni a lecke tartalmát...</p>
          </div>
        )}
      </Card>

      {/* Footer Info */}
      <Card className="p-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <span>
              <FileText className="w-4 h-4 inline mr-1" />
              {editorContent.replace(/<[^>]*>/g, '').split(/\s+/).length} words
            </span>
            <span>
              Becsült olvasási idő: {estimatedReadTime} perc
            </span>
          </div>
          
          <Button
            onClick={handleSave}
            disabled={saving || !editorContent}
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Mentés...' : 'Tartalom mentése'}
          </Button>
        </div>
      </Card>

      {/* Styles for content */}
      <style jsx global>{`
        #text-editor {
          font-size: 16px;
          line-height: 1.75;
        }
        
        #text-editor h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1.5rem 0 1rem;
        }
        
        #text-editor h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 1.25rem 0 0.75rem;
        }
        
        #text-editor h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem;
        }
        
        #text-editor p {
          margin: 1rem 0;
        }
        
        #text-editor ul,
        #text-editor ol {
          margin: 1rem 0;
          padding-left: 2rem;
        }
        
        #text-editor li {
          margin: 0.5rem 0;
        }
        
        #text-editor blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
        }
        
        #text-editor pre {
          background: #1f2937;
          color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        
        #text-editor code {
          background: #f3f4f6;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: monospace;
        }
        
        #text-editor pre code {
          background: transparent;
          padding: 0;
        }
        
        #text-editor table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }
        
        #text-editor td,
        #text-editor th {
          border: 1px solid #e5e7eb;
          padding: 0.5rem;
        }
        
        #text-editor img {
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
        }
        
        #text-editor a {
          color: #3b82f6;
          text-decoration: underline;
        }
        
        #text-editor hr {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 2rem 0;
        }
      `}</style>
    </div>
  );
}