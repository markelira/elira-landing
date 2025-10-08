'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  ChevronUp, 
  ChevronDown,
  CheckCircle,
  XCircle,
  HelpCircle,
  AlertCircle,
  Clock,
  Award,
  Copy,
  Settings,
  GripVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Question {
  id: string;
  type: 'single' | 'multiple' | 'true-false' | 'fill-blank' | 'matching';
  question: string;
  points: number;
  explanation?: string;
  required: boolean;
  order: number;
  // For single/multiple choice
  options?: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
  // For fill in the blank
  correctAnswers?: string[];
  // For matching
  pairs?: Array<{
    id: string;
    left: string;
    right: string;
  }>;
}

interface QuizSettings {
  passingScore: number;
  timeLimit?: number; // in minutes
  allowRetakes: boolean;
  maxRetakes?: number;
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
  showExplanations: 'always' | 'after-submit' | 'never';
  showScore: 'always' | 'after-submit' | 'never';
  requireAllQuestions: boolean;
}

interface QuizBuilderProps {
  lessonId: string;
  content?: {
    questions?: Question[];
    settings?: QuizSettings;
  };
  onSave: (content: any) => Promise<void>;
}

export default function QuizBuilder({ lessonId, content = {}, onSave }: QuizBuilderProps) {
  const [questions, setQuestions] = useState<Question[]>(content.questions || []);
  const [settings, setSettings] = useState<QuizSettings>(content.settings || {
    passingScore: 70,
    allowRetakes: true,
    maxRetakes: 3,
    randomizeQuestions: false,
    randomizeOptions: false,
    showExplanations: 'after-submit',
    showScore: 'after-submit',
    requireAllQuestions: true,
  });
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);

  const questionTypes = [
    { value: 'single', label: 'Single Choice', icon: <CheckCircle className="w-4 h-4" /> },
    { value: 'multiple', label: 'Multiple Choice', icon: <CheckCircle className="w-4 h-4" /> },
    { value: 'true-false', label: 'True/False', icon: <XCircle className="w-4 h-4" /> },
    { value: 'fill-blank', label: 'Fill in the Blank', icon: <Edit2 className="w-4 h-4" /> },
    { value: 'matching', label: 'Matching', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const addQuestion = (type: Question['type']) => {
    const newQuestion: Question = {
      id: `q_${Date.now()}`,
      type,
      question: '',
      points: 10,
      required: true,
      order: questions.length,
      options: type === 'single' || type === 'multiple' ? [
        { id: `opt_${Date.now()}_1`, text: '', isCorrect: false },
        { id: `opt_${Date.now()}_2`, text: '', isCorrect: false },
      ] : undefined,
      correctAnswers: type === 'fill-blank' ? [''] : undefined,
      pairs: type === 'matching' ? [
        { id: `pair_${Date.now()}_1`, left: '', right: '' },
      ] : undefined,
    };

    if (type === 'true-false') {
      newQuestion.options = [
        { id: `opt_${Date.now()}_true`, text: 'True', isCorrect: false },
        { id: `opt_${Date.now()}_false`, text: 'False', isCorrect: false },
      ];
    }

    setQuestions([...questions, newQuestion]);
    setEditingQuestion(newQuestion.id);
    setExpandedQuestions(new Set(Array.from(expandedQuestions).concat([newQuestion.id])));
  };

  const updateQuestion = (questionId: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, ...updates } : q
    ));
  };

  const deleteQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const duplicateQuestion = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      const newQuestion = {
        ...question,
        id: `q_${Date.now()}`,
        order: questions.length,
        options: question.options?.map(opt => ({
          ...opt,
          id: `opt_${Date.now()}_${Math.random()}`,
        })),
        pairs: question.pairs?.map(pair => ({
          ...pair,
          id: `pair_${Date.now()}_${Math.random()}`,
        })),
      };
      setQuestions([...questions, newQuestion]);
    }
  };

  const moveQuestion = (questionId: string, direction: 'up' | 'down') => {
    const index = questions.findIndex(q => q.id === questionId);
    if (
      (direction === 'up' && index > 0) ||
      (direction === 'down' && index < questions.length - 1)
    ) {
      const newQuestions = [...questions];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      [newQuestions[index], newQuestions[targetIndex]] = 
      [newQuestions[targetIndex], newQuestions[index]];
      
      // Update order values
      newQuestions.forEach((q, i) => q.order = i);
      setQuestions(newQuestions);
    }
  };

  const addOption = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question?.options) {
      const newOption = {
        id: `opt_${Date.now()}`,
        text: '',
        isCorrect: false,
      };
      updateQuestion(questionId, {
        options: [...question.options, newOption],
      });
    }
  };

  const updateOption = (questionId: string, optionId: string, updates: any) => {
    const question = questions.find(q => q.id === questionId);
    if (question?.options) {
      updateQuestion(questionId, {
        options: question.options.map(opt =>
          opt.id === optionId ? { ...opt, ...updates } : opt
        ),
      });
    }
  };

  const deleteOption = (questionId: string, optionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question?.options && question.options.length > 2) {
      updateQuestion(questionId, {
        options: question.options.filter(opt => opt.id !== optionId),
      });
    }
  };

  const addPair = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question?.pairs) {
      const newPair = {
        id: `pair_${Date.now()}`,
        left: '',
        right: '',
      };
      updateQuestion(questionId, {
        pairs: [...question.pairs, newPair],
      });
    }
  };

  const updatePair = (questionId: string, pairId: string, updates: any) => {
    const question = questions.find(q => q.id === questionId);
    if (question?.pairs) {
      updateQuestion(questionId, {
        pairs: question.pairs.map(pair =>
          pair.id === pairId ? { ...pair, ...updates } : pair
        ),
      });
    }
  };

  const deletePair = (questionId: string, pairId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question?.pairs && question.pairs.length > 1) {
      updateQuestion(questionId, {
        pairs: question.pairs.filter(pair => pair.id !== pairId),
      });
    }
  };

  const toggleQuestionExpanded = (questionId: string) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const calculateTotalPoints = () => {
    return questions.reduce((sum, q) => sum + q.points, 0);
  };

  const handleSave = async () => {
    // Validate quiz
    if (questions.length === 0) {
      toast.error('Please add at least one question');
      return;
    }

    const invalidQuestions = questions.filter(q => !q.question);
    if (invalidQuestions.length > 0) {
      toast.error('Please fill in all question texts');
      return;
    }

    setSaving(true);
    try {
      const contentData = {
        questions,
        settings,
        totalPoints: calculateTotalPoints(),
        lastModified: new Date().toISOString(),
      };

      await onSave(contentData);
      toast.success('Quiz saved successfully');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save quiz');
    } finally {
      setSaving(false);
    }
  };

  const renderQuestionEditor = (question: Question) => {
    const isExpanded = expandedQuestions.has(question.id);
    const isEditing = editingQuestion === question.id;

    return (
      <Card key={question.id} className="overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
              
              <button
                onClick={() => toggleQuestionExpanded(question.id)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              <Badge variant="outline">
                {questionTypes.find(t => t.value === question.type)?.label}
              </Badge>

              <div className="flex-1">
                {isEditing ? (
                  <Input
                    value={question.question}
                    onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                    placeholder="Enter question text..."
                    className="font-medium"
                  />
                ) : (
                  <p className="font-medium">
                    {question.question || 'Untitled Question'}
                  </p>
                )}
              </div>

              <Badge>{question.points} pts</Badge>

              {question.required && (
                <Badge className="bg-red-100 text-red-800">Required</Badge>
              )}
            </div>

            <div className="flex items-center space-x-1 ml-4">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => moveQuestion(question.id, 'up')}
                disabled={question.order === 0}
              >
                <ChevronUp className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => moveQuestion(question.id, 'down')}
                disabled={question.order === questions.length - 1}
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setEditingQuestion(isEditing ? null : question.id)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => duplicateQuestion(question.id)}
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => deleteQuestion(question.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="p-4 space-y-4">
            {/* Question Settings */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Points</label>
                <Input
                  type="number"
                  value={question.points}
                  onChange={(e) => updateQuestion(question.id, { points: parseInt(e.target.value) || 0 })}
                  min={0}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Explanation (Optional)</label>
                <Input
                  value={question.explanation || ''}
                  onChange={(e) => updateQuestion(question.id, { explanation: e.target.value })}
                  placeholder="Explain the correct answer..."
                />
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={question.required}
                  onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm">Required question</span>
              </label>
            </div>

            {/* Question Type Specific Content */}
            {(question.type === 'single' || question.type === 'multiple' || question.type === 'true-false') && question.options && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Answer Options:</p>
                {question.options.map((option, index) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <input
                      type={question.type === 'single' || question.type === 'true-false' ? 'radio' : 'checkbox'}
                      checked={option.isCorrect}
                      onChange={(e) => {
                        if (question.type === 'single' || question.type === 'true-false') {
                          // For single choice, uncheck all others
                          question.options?.forEach(opt => {
                            updateOption(question.id, opt.id, { isCorrect: opt.id === option.id });
                          });
                        } else {
                          updateOption(question.id, option.id, { isCorrect: e.target.checked });
                        }
                      }}
                      className="w-4 h-4"
                      disabled={question.type === 'true-false'}
                    />
                    {question.type === 'true-false' ? (
                      <span className="flex-1">{option.text}</span>
                    ) : (
                      <Input
                        value={option.text}
                        onChange={(e) => updateOption(question.id, option.id, { text: e.target.value })}
                        placeholder={`Option ${index + 1}`}
                        className="flex-1"
                      />
                    )}
                    {question.type !== 'true-false' && question.options && question.options.length > 2 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteOption(question.id, option.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {question.type !== 'true-false' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addOption(question.id)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Option
                  </Button>
                )}
              </div>
            )}

            {question.type === 'fill-blank' && question.correctAnswers && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Correct Answers (comma separated for multiple acceptable answers):</p>
                <Input
                  value={question.correctAnswers.join(', ')}
                  onChange={(e) => updateQuestion(question.id, {
                    correctAnswers: e.target.value.split(',').map(a => a.trim()).filter(a => a)
                  })}
                  placeholder="answer1, answer2, answer3"
                />
                <p className="text-xs text-gray-500">
                  Use ___ in the question text to indicate the blank
                </p>
              </div>
            )}

            {question.type === 'matching' && question.pairs && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Matching Pairs:</p>
                {question.pairs.map((pair, index) => (
                  <div key={pair.id} className="flex items-center space-x-2">
                    <Input
                      value={pair.left}
                      onChange={(e) => updatePair(question.id, pair.id, { left: e.target.value })}
                      placeholder={`Item ${index + 1}`}
                      className="flex-1"
                    />
                    <span>→</span>
                    <Input
                      value={pair.right}
                      onChange={(e) => updatePair(question.id, pair.id, { right: e.target.value })}
                      placeholder={`Match ${index + 1}`}
                      className="flex-1"
                    />
                    {(question.pairs?.length || 0) > 1 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deletePair(question.id, pair.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addPair(question.id)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Pair
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Quiz Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Quiz Settings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              <Award className="w-4 h-4 inline mr-1" />
              Passing Score (%)
            </label>
            <Input
              type="number"
              value={settings.passingScore}
              onChange={(e) => setSettings({ ...settings, passingScore: parseInt(e.target.value) || 0 })}
              min={0}
              max={100}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Time Limit (minutes, 0 = unlimited)
            </label>
            <Input
              type="number"
              value={settings.timeLimit || 0}
              onChange={(e) => setSettings({ ...settings, timeLimit: parseInt(e.target.value) || undefined })}
              min={0}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Show Explanations
            </label>
            <select
              value={settings.showExplanations}
              onChange={(e) => setSettings({ ...settings, showExplanations: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="always">Always</option>
              <option value="after-submit">After Submit</option>
              <option value="never">Never</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Show Score
            </label>
            <select
              value={settings.showScore}
              onChange={(e) => setSettings({ ...settings, showScore: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="always">Always</option>
              <option value="after-submit">After Submit</option>
              <option value="never">Never</option>
            </select>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.allowRetakes}
              onChange={(e) => setSettings({ ...settings, allowRetakes: e.target.checked })}
              className="w-4 h-4 text-blue-600"
            />
            <span>Allow retakes</span>
          </label>

          {settings.allowRetakes && (
            <div className="ml-7">
              <label className="block text-sm font-medium mb-1">Max Retakes (0 = unlimited)</label>
              <Input
                type="number"
                value={settings.maxRetakes || 0}
                onChange={(e) => setSettings({ ...settings, maxRetakes: parseInt(e.target.value) || undefined })}
                min={0}
                className="w-32"
              />
            </div>
          )}

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.randomizeQuestions}
              onChange={(e) => setSettings({ ...settings, randomizeQuestions: e.target.checked })}
              className="w-4 h-4 text-blue-600"
            />
            <span>Randomize question order</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.randomizeOptions}
              onChange={(e) => setSettings({ ...settings, randomizeOptions: e.target.checked })}
              className="w-4 h-4 text-blue-600"
            />
            <span>Randomize answer options</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.requireAllQuestions}
              onChange={(e) => setSettings({ ...settings, requireAllQuestions: e.target.checked })}
              className="w-4 h-4 text-blue-600"
            />
            <span>Require all questions to be answered</span>
          </label>
        </div>
      </Card>

      {/* Questions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Questions ({questions.length})
          </h3>
          <div className="text-sm text-gray-600">
            Total Points: {calculateTotalPoints()}
          </div>
        </div>

        {questions.map(question => renderQuestionEditor(question))}

        {questions.length === 0 && (
          <Card className="p-12 text-center">
            <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No questions yet. Add your first question to get started.</p>
          </Card>
        )}
      </div>

      {/* Add Question Buttons */}
      <Card className="p-4">
        <p className="text-sm font-medium mb-3">Add New Question:</p>
        <div className="flex flex-wrap gap-2">
          {questionTypes.map(type => (
            <Button
              key={type.value}
              variant="outline"
              size="sm"
              onClick={() => addQuestion(type.value as Question['type'])}
            >
              {type.icon}
              <span className="ml-2">{type.label}</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving || questions.length === 0}
          className="px-8"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Quiz'}
        </Button>
      </div>
    </div>
  );
}