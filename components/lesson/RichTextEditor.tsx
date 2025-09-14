"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Type,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Image,
  Video,
  Table,
  Code,
  Save,
  Download,
  Upload,
  Loader2,
  Eye,
  FileText,
  Hash,
  Plus,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import styles from './RichTextEditor.module.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className="h-64 border rounded-lg flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  ),
});

// Import Quill styles (only on client side)
let quillStyles: Promise<any> | undefined;
let resizeImageModule: any;

if (typeof window !== 'undefined') {
  quillStyles = import('react-quill/dist/quill.snow.css').then(() => {});
  try {
    resizeImageModule = require('quill-resize-image');
  } catch (error) {
    console.warn('Quill resize image module not available:', error);
  }
}

interface RichTextEditorProps {
  initialContent?: string;
  placeholder?: string;
  onSave?: (content: string, metadata: EditorMetadata) => void;
  onAutoSave?: (content: string) => void;
  autoSaveInterval?: number;
  readOnly?: boolean;
  showWordCount?: boolean;
  showReadingTime?: boolean;
  enableSlashCommands?: boolean;
  maxLength?: number;
}

interface EditorMetadata {
  wordCount: number;
  readingTime: number;
  lastModified: Date;
  hasImages: boolean;
  hasVideos: boolean;
  hasTables: boolean;
  hasCode: boolean;
}

interface SlashCommand {
  trigger: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  action: (quill: any) => void;
}

export default function RichTextEditor({
  initialContent = '',
  placeholder = 'Kezdj el írni...',
  onSave,
  onAutoSave,
  autoSaveInterval = 30000,
  readOnly = false,
  showWordCount = true,
  showReadingTime = true,
  enableSlashCommands = true,
  maxLength,
}: RichTextEditorProps) {
  const [content, setContent] = useState<string>(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashPosition, setSlashPosition] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [imageUploadModal, setImageUploadModal] = useState(false);
  const [videoEmbedModal, setVideoEmbedModal] = useState(false);
  const [tableModal, setTableModal] = useState(false);

  const quillRef = useRef<any>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedContent = useRef<string>(initialContent);

  // Calculate editor metadata
  const getEditorMetadata = useCallback((htmlContent: string): EditorMetadata => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    const wordCount = textContent.trim().split(/\s+/).filter(word => word.length > 0).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200)); // 200 words per minute
    
    return {
      wordCount,
      readingTime,
      lastModified: new Date(),
      hasImages: htmlContent.includes('<img'),
      hasVideos: htmlContent.includes('<iframe') || htmlContent.includes('<video'),
      hasTables: htmlContent.includes('<table'),
      hasCode: htmlContent.includes('<pre>') || htmlContent.includes('<code>'),
    };
  }, []);

  // Slash commands configuration
  const slashCommands: SlashCommand[] = [
    {
      trigger: '/heading1',
      label: 'Főcím',
      description: 'Hozz létre egy nagy címet',
      icon: <Type className="h-4 w-4" />,
      action: (quill) => {
        const range = quill.getSelection();
        if (range) {
          quill.formatText(range.index, range.length, 'header', 1);
        }
      },
    },
    {
      trigger: '/heading2',
      label: 'Alcím',
      description: 'Hozz létre egy közepes címet',
      icon: <Type className="h-4 w-4" />,
      action: (quill) => {
        const range = quill.getSelection();
        if (range) {
          quill.formatText(range.index, range.length, 'header', 2);
        }
      },
    },
    {
      trigger: '/list',
      label: 'Lista',
      description: 'Hozz létre egy pontozott listát',
      icon: <List className="h-4 w-4" />,
      action: (quill) => {
        const range = quill.getSelection();
        if (range) {
          quill.formatLine(range.index, range.length, 'list', 'bullet');
        }
      },
    },
    {
      trigger: '/numbered',
      label: 'Számozott lista',
      description: 'Hozz létre egy számozott listát',
      icon: <ListOrdered className="h-4 w-4" />,
      action: (quill) => {
        const range = quill.getSelection();
        if (range) {
          quill.formatLine(range.index, range.length, 'list', 'ordered');
        }
      },
    },
    {
      trigger: '/image',
      label: 'Kép',
      description: 'Szúrj be egy képet',
      icon: <Image className="h-4 w-4" />,
      action: () => setImageUploadModal(true),
    },
    {
      trigger: '/video',
      label: 'Videó',
      description: 'Beágyazz egy videót',
      icon: <Video className="h-4 w-4" />,
      action: () => setVideoEmbedModal(true),
    },
    {
      trigger: '/table',
      label: 'Táblázat',
      description: 'Szúrj be egy táblázatot',
      icon: <Table className="h-4 w-4" />,
      action: () => setTableModal(true),
    },
    {
      trigger: '/code',
      label: 'Kód',
      description: 'Hozz létre egy kódblokot',
      icon: <Code className="h-4 w-4" />,
      action: (quill) => {
        const range = quill.getSelection();
        if (range) {
          quill.formatText(range.index, range.length, 'code-block', true);
        }
      },
    },
  ];

  // Quill modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
    // Only add resize module if available
    ...(resizeImageModule && {
      resize: {
        locale: {
          altTip: 'Tartsd lenyomva az Alt gombot egyenletes méretezéshez',
          floatLeft: 'Balra',
          floatRight: 'Jobbra',
          center: 'Középre',
          restore: 'Eredeti',
        },
      },
    }),
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'align', 'color', 'background',
    'script', 'code-block', 'direction',
  ];

  // Auto-save functionality
  useEffect(() => {
    if (onAutoSave && content !== lastSavedContent.current && hasUnsavedChanges) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }

      autoSaveTimeoutRef.current = setTimeout(() => {
        onAutoSave(content);
        lastSavedContent.current = content;
        setHasUnsavedChanges(false);
        toast.success('Automatikus mentés kész');
      }, autoSaveInterval);
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [content, hasUnsavedChanges, onAutoSave, autoSaveInterval]);

  // Handle content changes
  const handleChange = (value: string) => {
    setContent(value);
    setHasUnsavedChanges(value !== lastSavedContent.current);

    // Check for slash commands
    if (enableSlashCommands && quillRef.current) {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      
      if (range) {
        const text = quill.getText(Math.max(0, range.index - 20), 20);
        if (text.includes('/')) {
          const slashIndex = text.lastIndexOf('/');
          const command = text.substring(slashIndex);
          setSearchTerm(command);
          
          if (command.length > 1) {
            const bounds = quill.getBounds(range.index);
            setSlashPosition({
              x: bounds.left,
              y: bounds.bottom,
            });
            setShowSlashMenu(true);
          }
        } else {
          setShowSlashMenu(false);
        }
      }
    }
  };

  // Manual save
  const handleSave = async () => {
    if (!onSave) return;

    setIsSaving(true);
    try {
      const metadata = getEditorMetadata(content);
      await onSave(content, metadata);
      lastSavedContent.current = content;
      setHasUnsavedChanges(false);
      toast.success('Sikeresen mentve');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Mentési hiba történt');
    } finally {
      setIsSaving(false);
    }
  };

  // Export functionality
  const exportAsHTML = () => {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `content-${Date.now()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('HTML export kész');
  };

  // Convert HTML to Markdown (basic implementation)
  const htmlToMarkdown = (html: string): string => {
    return html
      .replace(/<h1>/g, '# ').replace(/<\/h1>/g, '\n')
      .replace(/<h2>/g, '## ').replace(/<\/h2>/g, '\n')
      .replace(/<h3>/g, '### ').replace(/<\/h3>/g, '\n')
      .replace(/<strong>/g, '**').replace(/<\/strong>/g, '**')
      .replace(/<em>/g, '_').replace(/<\/em>/g, '_')
      .replace(/<u>/g, '__').replace(/<\/u>/g, '__')
      .replace(/<p>/g, '').replace(/<\/p>/g, '\n\n')
      .replace(/<br>/g, '\n')
      .replace(/<li>/g, '- ').replace(/<\/li>/g, '\n')
      .replace(/<ul>/g, '').replace(/<\/ul>/g, '\n')
      .replace(/<ol>/g, '').replace(/<\/ol>/g, '\n')
      .replace(/<a href="([^"]+)">([^<]+)<\/a>/g, '[$2]($1)')
      .replace(/<img[^>]+src="([^"]+)"[^>]*>/g, '![]($1)')
      .replace(/<[^>]+>/g, ''); // Remove remaining HTML tags
  };

  const exportAsMarkdown = () => {
    const markdown = htmlToMarkdown(content);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `content-${Date.now()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Markdown export kész');
  };

  // Filter slash commands based on search term
  const filteredSlashCommands = slashCommands.filter(cmd =>
    cmd.trigger.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cmd.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Execute slash command
  const executeSlashCommand = (command: SlashCommand) => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      
      if (range) {
        // Remove the slash command text
        const text = quill.getText();
        const slashIndex = text.lastIndexOf('/', range.index);
        if (slashIndex >= 0) {
          quill.deleteText(slashIndex, range.index - slashIndex);
        }
      }
      
      command.action(quill);
    }
    setShowSlashMenu(false);
    setSearchTerm('');
  };

  const metadata = getEditorMetadata(content);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Rich Text Editor</CardTitle>
            <div className="flex items-center gap-2">
              {hasUnsavedChanges && (
                <Badge variant="outline" className="text-yellow-600">
                  Nem mentett változások
                </Badge>
              )}
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportAsHTML}
                  disabled={readOnly}
                >
                  <Download className="h-4 w-4 mr-2" />
                  HTML
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportAsMarkdown}
                  disabled={readOnly}
                >
                  <Download className="h-4 w-4 mr-2" />
                  MD
                </Button>
                
                {onSave && (
                  <Button
                    onClick={handleSave}
                    disabled={isSaving || readOnly || !hasUnsavedChanges}
                    size="sm"
                  >
                    {isSaving ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Mentés
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Editor */}
      <Card className="relative">
        <CardContent className="p-0">
          <div className={styles['editor-container']}>
            <ReactQuill
              value={content}
              onChange={handleChange}
              modules={modules}
              formats={formats}
              placeholder={placeholder}
              readOnly={readOnly}
              style={{ minHeight: '400px' }}
            />
          </div>

          {/* Slash Commands Menu */}
          {showSlashMenu && filteredSlashCommands.length > 0 && (
            <div
              className={`absolute ${styles['slash-menu']}`}
              style={{
                left: slashPosition.x,
                top: slashPosition.y + 10,
              }}
            >
              <div className="p-2 space-y-1">
                {filteredSlashCommands.slice(0, 6).map((command, index) => (
                  <button
                    key={command.trigger}
                    className={styles['slash-menu-item']}
                    onClick={() => executeSlashCommand(command)}
                  >
                    <div className={styles['slash-menu-icon']}>
                      {command.icon}
                    </div>
                    <div className={styles['slash-menu-content']}>
                      <div className={styles['slash-menu-title']}>{command.label}</div>
                      <div className={styles['slash-menu-description']}>{command.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statistics */}
      {(showWordCount || showReadingTime) && (
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex gap-4">
                {showWordCount && (
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>{metadata.wordCount} szó</span>
                  </div>
                )}
                
                {showReadingTime && (
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>{metadata.readingTime} perc olvasás</span>
                  </div>
                )}

                {maxLength && (
                  <div className={`flex items-center gap-2 ${
                    content.length > maxLength ? 'text-red-500' : ''
                  }`}>
                    <Hash className="h-4 w-4" />
                    <span>{content.length} / {maxLength} karakter</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {metadata.hasImages && (
                  <Badge variant="outline">
                    <Image className="h-3 w-3 mr-1" />
                    Képek
                  </Badge>
                )}
                
                {metadata.hasVideos && (
                  <Badge variant="outline">
                    <Video className="h-3 w-3 mr-1" />
                    Videók
                  </Badge>
                )}
                
                {metadata.hasTables && (
                  <Badge variant="outline">
                    <Table className="h-3 w-3 mr-1" />
                    Táblázatok
                  </Badge>
                )}
                
                {metadata.hasCode && (
                  <Badge variant="outline">
                    <Code className="h-3 w-3 mr-1" />
                    Kód
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Upload Modal */}
      <AlertDialog open={imageUploadModal} onOpenChange={setImageUploadModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kép feltöltése</AlertDialogTitle>
            <AlertDialogDescription>
              Válassz egy képet a feltöltéshez
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border rounded"
            />
            
            <div className="space-y-2">
              <Label>Kép URL (opcionális)</Label>
              <Input placeholder="https://example.com/image.jpg" />
            </div>
            
            <div className="space-y-2">
              <Label>Alt szöveg</Label>
              <Input placeholder="Kép leírása akadálymentesítéshez" />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Mégsem</AlertDialogCancel>
            <AlertDialogAction>Beszúrás</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Video Embed Modal */}
      <AlertDialog open={videoEmbedModal} onOpenChange={setVideoEmbedModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Videó beágyazása</AlertDialogTitle>
            <AlertDialogDescription>
              YouTube vagy Vimeo videó URL-jének megadása
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Videó URL</Label>
              <Input placeholder="https://www.youtube.com/watch?v=..." />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Szélesség</Label>
                <Input placeholder="560" type="number" />
              </div>
              <div className="space-y-2">
                <Label>Magasság</Label>
                <Input placeholder="315" type="number" />
              </div>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Mégsem</AlertDialogCancel>
            <AlertDialogAction>Beágyazás</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Table Modal */}
      <AlertDialog open={tableModal} onOpenChange={setTableModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Táblázat létrehozása</AlertDialogTitle>
            <AlertDialogDescription>
              Válaszd ki a táblázat méretét
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Sorok száma</Label>
                <Input placeholder="3" type="number" min="1" max="20" />
              </div>
              <div className="space-y-2">
                <Label>Oszlopok száma</Label>
                <Input placeholder="3" type="number" min="1" max="10" />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="table-header" />
              <Label htmlFor="table-header">Első sor fejléc</Label>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Mégsem</AlertDialogCancel>
            <AlertDialogAction>Létrehozás</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}