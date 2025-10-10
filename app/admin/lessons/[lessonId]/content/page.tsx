'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Settings,
  Video,
  FileText,
  HelpCircle,
  File,
  Image,
  Music,
  Monitor,
  Users,
  PlayCircle,
  BookOpen,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import VideoEditor from '@/components/admin/content/VideoEditor';
import TextEditor from '@/components/admin/content/TextEditor';
import QuizBuilder from '@/components/admin/content/QuizBuilder';
import PDFViewer from '@/components/admin/content/PDFViewer';
import MediaLibrary from '@/components/admin/MediaLibrary';
import { toast } from 'sonner';
import { auth } from '@/lib/firebase';
import { FIREBASE_FUNCTIONS_URL } from '@/lib/config';

interface LessonData {
  id: string;
  title: string;
  description?: string;
  type: 'VIDEO' | 'TEXT' | 'QUIZ' | 'PDF' | 'AUDIO' | 'SLIDES' | 'LIVE_SESSION' | 'INTERACTIVE';
  estimatedTime: number;
  isFreePreview: boolean;
  content: any;
  resources: Array<{
    id: string;
    title: string;
    url: string;
    type: string;
  }>;
  moduleId: string;
  courseId: string;
  order: number;
  isPublished: boolean;
  completionCriteria?: {
    type: 'view' | 'time' | 'interaction' | 'quiz';
    value?: number; // percentage for quiz, seconds for time
  };
}

export default function LessonContentPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.lessonId as string;
  
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'resources' | 'settings'>('content');
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    fetchLessonData();
  }, [lessonId]);

  // Warn about unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [unsavedChanges]);

  const fetchLessonData = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) {
        router.push('/login');
        return;
      }

      const token = await user.getIdToken();
      const response = await fetch(
        `${FIREBASE_FUNCTIONS_URL}/api/lessons/${lessonId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch lesson');
      }

      const data = await response.json();
      setLesson(data.lesson);
    } catch (error) {
      console.error('Error fetching lesson:', error);
      toast.error('Lecke adatok betöltése sikertelen');
      router.push('/admin/courses');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContent = async (content: any) => {
    if (!lesson) return;
    
    setSaving(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Authentication required');

      const token = await user.getIdToken();
      const response = await fetch(
        `${FIREBASE_FUNCTIONS_URL}/api/lessons/${lessonId}/content`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save content');
      }

      setLesson({ ...lesson, content });
      setUnsavedChanges(false);
      toast.success('Tartalom sikeresen mentve');
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Tartalom mentése sikertelen');
    } finally {
      setSaving(false);
    }
  };

  const handleAddResource = async (file: any) => {
    if (!lesson) return;
    
    const newResource = {
      id: `res_${Date.now()}`,
      title: file.name,
      url: file.url,
      type: file.type,
    };

    const updatedResources = [...lesson.resources, newResource];
    
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Authentication required');

      const token = await user.getIdToken();
      const response = await fetch(
        `${FIREBASE_FUNCTIONS_URL}/api/lessons/${lessonId}/resources`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newResource),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add resource');
      }

      setLesson({ ...lesson, resources: updatedResources });
      toast.success('Resource added successfully');
    } catch (error) {
      console.error('Error adding resource:', error);
      toast.error('Failed to add resource');
    }
  };

  const handleDeleteResource = async (resourceId: string) => {
    if (!lesson) return;
    
    const updatedResources = lesson.resources.filter(r => r.id !== resourceId);
    
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Authentication required');

      const token = await user.getIdToken();
      const response = await fetch(
        `${FIREBASE_FUNCTIONS_URL}/api/lessons/${lessonId}/resources/${resourceId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete resource');
      }

      setLesson({ ...lesson, resources: updatedResources });
      toast.success('Resource deleted successfully');
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast.error('Failed to delete resource');
    }
  };

  const handleUpdateSettings = async (settings: Partial<LessonData>) => {
    if (!lesson) return;
    
    setSaving(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Authentication required');

      const token = await user.getIdToken();
      const response = await fetch(
        `${FIREBASE_FUNCTIONS_URL}/api/lessons/${lessonId}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(settings),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update settings');
      }

      setLesson({ ...lesson, ...settings });
      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'VIDEO': return <Video className="w-5 h-5" />;
      case 'TEXT': return <FileText className="w-5 h-5" />;
      case 'QUIZ': return <HelpCircle className="w-5 h-5" />;
      case 'PDF': return <File className="w-5 h-5" />;
      case 'AUDIO': return <Music className="w-5 h-5" />;
      case 'SLIDES': return <Monitor className="w-5 h-5" />;
      case 'LIVE_SESSION': return <Users className="w-5 h-5" />;
      case 'INTERACTIVE': return <PlayCircle className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Lecke nem található</h2>
          <Button onClick={() => router.push('/admin/courses')}>
            Vissza a kurzusokhoz
          </Button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'content', label: 'Tartalom', icon: getLessonIcon(lesson.type) },
    { id: 'resources', label: 'Források', icon: <Image className="w-4 h-4" /> },
    { id: 'settings', label: 'Beállítások', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => {
                  if (unsavedChanges && !confirm('You have unsaved changes. Are you sure you want to leave?')) {
                    return;
                  }
                  router.back();
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Vissza
              </Button>
              <div>
                <h1 className="text-xl font-semibold flex items-center">
                  {getLessonIcon(lesson.type)}
                  <span className="ml-2">{lesson.title}</span>
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge>{lesson.type}</Badge>
                  <Badge variant="outline">
                    <Clock className="w-3 h-3 mr-1" />
                    {lesson.estimatedTime} min
                  </Badge>
                  {lesson.isFreePreview && (
                    <Badge className="bg-green-100 text-green-800">
                      Free Preview
                    </Badge>
                  )}
                  {lesson.isPublished ? (
                    <Badge className="bg-blue-100 text-blue-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Published
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-800">
                      Draft
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {unsavedChanges && (
                <Badge className="bg-yellow-100 text-yellow-800">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Unsaved changes
                </Badge>
              )}
              <Button
                variant="outline"
                onClick={() => window.open(`/courses/${lesson.courseId}/lessons/${lessonId}`, '_blank')}
              >
                <Eye className="w-4 h-4 mr-2" />
                Előnézet
              </Button>
              <Button
                onClick={() => handleSaveContent(lesson.content)}
                disabled={saving || !unsavedChanges}
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Mentés...' : 'Mentés'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'content' && (
          <div>
            {lesson.type === 'VIDEO' && (
              <VideoEditor
                lessonId={lessonId}
                content={lesson.content}
                onSave={(content) => {
                  setUnsavedChanges(true);
                  return handleSaveContent(content);
                }}
              />
            )}
            {lesson.type === 'TEXT' && (
              <TextEditor
                lessonId={lessonId}
                content={lesson.content}
                onSave={(content) => {
                  setUnsavedChanges(true);
                  return handleSaveContent(content);
                }}
              />
            )}
            {lesson.type === 'QUIZ' && (
              <QuizBuilder
                lessonId={lessonId}
                content={lesson.content}
                onSave={(content) => {
                  setUnsavedChanges(true);
                  return handleSaveContent(content);
                }}
              />
            )}
            {lesson.type === 'PDF' && (
              <PDFViewer
                lessonId={lessonId}
                content={lesson.content}
                onSave={(content) => {
                  setUnsavedChanges(true);
                  return handleSaveContent(content);
                }}
              />
            )}
            {(lesson.type === 'AUDIO' || lesson.type === 'SLIDES' || lesson.type === 'LIVE_SESSION' || lesson.type === 'INTERACTIVE') && (
              <Card className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  {getLessonIcon(lesson.type)}
                </div>
                <p className="text-gray-600">
                  {lesson.type} content editor coming soon
                </p>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Lesson Resources</h3>
                <Button
                  onClick={() => setShowMediaLibrary(true)}
                >
                  <Image className="w-4 h-4 mr-2" />
                  Add from Library
                </Button>
              </div>

              {lesson.resources.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <File className="w-12 h-12 mx-auto mb-2" />
                  <p>No resources added yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {lesson.resources.map(resource => (
                    <div
                      key={resource.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <File className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{resource.title}</p>
                          <p className="text-sm text-gray-500">{resource.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <Button
                            size="sm"
                            variant="outline"
                          >
                            View
                          </Button>
                        </a>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteResource(resource.id)}
                          className="text-red-600"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {showMediaLibrary && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Select from Media Library</h3>
                  <Button
                    variant="outline"
                    onClick={() => setShowMediaLibrary(false)}
                  >
                    Close
                  </Button>
                </div>
                <MediaLibrary
                  selectable
                  allowMultiple
                  courseId={lesson.courseId}
                  lessonId={lessonId}
                  onSelect={handleAddResource}
                />
              </Card>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Lesson Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Lesson Title
                  </label>
                  <input
                    type="text"
                    value={lesson.title}
                    onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={lesson.description || ''}
                    onChange={(e) => setLesson({ ...lesson, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Estimated Time (minutes)
                    </label>
                    <input
                      type="number"
                      value={lesson.estimatedTime}
                      onChange={(e) => setLesson({ ...lesson, estimatedTime: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      min={1}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Completion Criteria
                    </label>
                    <select
                      value={lesson.completionCriteria?.type || 'view'}
                      onChange={(e) => setLesson({
                        ...lesson,
                        completionCriteria: {
                          type: e.target.value as any,
                          value: lesson.completionCriteria?.value,
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="view">View Once</option>
                      <option value="time">Minimum Time</option>
                      <option value="interaction">User Interaction</option>
                      {lesson.type === 'QUIZ' && <option value="quiz">Pass Quiz</option>}
                    </select>
                  </div>
                </div>

                {lesson.completionCriteria?.type === 'time' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Minimum View Time (seconds)
                    </label>
                    <input
                      type="number"
                      value={lesson.completionCriteria.value || 0}
                      onChange={(e) => setLesson({
                        ...lesson,
                        completionCriteria: {
                          ...lesson.completionCriteria!,
                          value: parseInt(e.target.value) || 0,
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      min={0}
                    />
                  </div>
                )}

                {lesson.completionCriteria?.type === 'quiz' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Minimum Passing Score (%)
                    </label>
                    <input
                      type="number"
                      value={lesson.completionCriteria.value || 70}
                      onChange={(e) => setLesson({
                        ...lesson,
                        completionCriteria: {
                          ...lesson.completionCriteria!,
                          value: parseInt(e.target.value) || 70,
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      min={0}
                      max={100}
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={lesson.isFreePreview}
                      onChange={(e) => setLesson({ ...lesson, isFreePreview: e.target.checked })}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <span className="font-medium">Free Preview</span>
                      <p className="text-sm text-gray-600">Allow non-enrolled users to view this lesson</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={lesson.isPublished}
                      onChange={(e) => setLesson({ ...lesson, isPublished: e.target.checked })}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <span className="font-medium">Published</span>
                      <p className="text-sm text-gray-600">Make this lesson visible to enrolled students</p>
                    </div>
                  </label>
                </div>

                <div className="pt-4 border-t">
                  <Button
                    onClick={() => handleUpdateSettings({
                      title: lesson.title,
                      description: lesson.description,
                      estimatedTime: lesson.estimatedTime,
                      isFreePreview: lesson.isFreePreview,
                      isPublished: lesson.isPublished,
                      completionCriteria: lesson.completionCriteria,
                    })}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Settings'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}