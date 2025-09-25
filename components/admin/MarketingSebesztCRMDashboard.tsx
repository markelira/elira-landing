"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,
  Phone,
  Mail,
  MessageCircle,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Edit,
  Save,
  Plus,
  Filter,
  Download,
  Search,
  Eye,
  Star,
  BarChart3,
  Target,
  DollarSign,
  Award,
  ArrowUp,
  ArrowDown,
  PieChart,
  Activity,
  FileText,
  Send
} from 'lucide-react';
import { leadCaptureService, MarketingSebesztConsultation } from '@/lib/services/leadCaptureService';

interface CRMStats {
  total: number;
  new: number;
  contacted: number;
  booked: number;
  completed: number;
  cancelled: number;
  conversionRate: number;
  bookingRate: number;
  thisWeek: number;
  lastWeek: number;
  thisMonth: number;
  avgResponseTime: number; // in hours
  totalRevenuePotential: number;
}

interface ConsultationWithNotes extends MarketingSebesztConsultation {
  isEditing?: boolean;
  tempNotes?: string;
}

const MarketingSebesztCRMDashboard: React.FC = () => {
  const [consultations, setConsultations] = useState<ConsultationWithNotes[]>([]);
  const [stats, setStats] = useState<CRMStats>({
    total: 0,
    new: 0,
    contacted: 0,
    booked: 0,
    completed: 0,
    cancelled: 0,
    conversionRate: 0,
    bookingRate: 0,
    thisWeek: 0,
    lastWeek: 0,
    thisMonth: 0,
    avgResponseTime: 0,
    totalRevenuePotential: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'dashboard' | 'pipeline' | 'analytics' | 'calendar'>('dashboard');
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationWithNotes | null>(null);
  const [filters, setFilters] = useState({
    status: '',
    dateRange: 'all',
    search: ''
  });

  // Load data
  useEffect(() => {
    loadCRMData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadCRMData, 30000);
    return () => clearInterval(interval);
  }, [filters]);

  const loadCRMData = async () => {
    setLoading(true);
    try {
      const [consultationsData, statsData] = await Promise.all([
        leadCaptureService.getConsultations({
          status: filters.status ? filters.status as any : undefined,
          consultationType: 'marketing_sebeszet'
        }),
        calculateAdvancedStats()
      ]);

      setConsultations(consultationsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading CRM data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAdvancedStats = async (): Promise<CRMStats> => {
    try {
      const allConsultations = await leadCaptureService.getConsultations({
        consultationType: 'marketing_sebeszet'
      });

      const now = new Date();
      const thisWeekStart = new Date(now.setDate(now.getDate() - now.getDay()));
      const lastWeekStart = new Date(thisWeekStart.getTime() - 7 * 24 * 60 * 60 * 1000);
      const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

      const stats = allConsultations.reduce((acc, consultation) => {
        const createdDate = consultation.createdAt instanceof Date 
          ? consultation.createdAt 
          : new Date();

        acc.total++;
        acc[consultation.status]++;

        if (createdDate >= thisWeekStart) acc.thisWeek++;
        if (createdDate >= lastWeekStart && createdDate < thisWeekStart) acc.lastWeek++;
        if (createdDate >= thisMonthStart) acc.thisMonth++;

        return acc;
      }, {
        total: 0,
        new: 0,
        contacted: 0,
        booked: 0,
        completed: 0,
        cancelled: 0,
        thisWeek: 0,
        lastWeek: 0,
        thisMonth: 0
      });

      return {
        ...stats,
        conversionRate: stats.total > 0 ? (stats.completed / stats.total) * 100 : 0,
        bookingRate: stats.total > 0 ? ((stats.booked + stats.completed) / stats.total) * 100 : 0,
        avgResponseTime: 2.5, // Mock data - should be calculated from actual response times
        totalRevenuePotential: (stats.booked + stats.completed) * 150000 // 150k HUF avg project value
      };
    } catch (error) {
      console.error('Error calculating stats:', error);
      return {
        total: 0,
        new: 0,
        contacted: 0,
        booked: 0,
        completed: 0,
        cancelled: 0,
        conversionRate: 0,
        bookingRate: 0,
        thisWeek: 0,
        lastWeek: 0,
        thisMonth: 0,
        avgResponseTime: 0,
        totalRevenuePotential: 0
      };
    }
  };

  const filteredConsultations = useMemo(() => {
    return consultations.filter(consultation => {
      const matchesStatus = !filters.status || consultation.status === filters.status;
      const matchesSearch = !filters.search || 
        consultation.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        consultation.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        consultation.phone.includes(filters.search);
      return matchesStatus && matchesSearch;
    });
  }, [consultations, filters]);

  const handleStatusUpdate = async (consultationId: string, newStatus: MarketingSebesztConsultation['status']) => {
    try {
      await leadCaptureService.updateConsultationStatus(consultationId, newStatus);
      await loadCRMData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleNotesUpdate = async (consultationId: string, notes: string) => {
    try {
      await leadCaptureService.updateConsultationStatus(consultationId, 'contacted', {
        adminNotes: notes,
        updatedAt: new Date() as any
      });
      
      setConsultations(prev => prev.map(c => 
        c.id === consultationId 
          ? { ...c, adminNotes: notes, isEditing: false, tempNotes: undefined }
          : c
      ));
    } catch (error) {
      console.error('Error updating notes:', error);
    }
  };

  const getStatusColor = (status: MarketingSebesztConsultation['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contacted': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'booked': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: MarketingSebesztConsultation['status']) => {
    switch (status) {
      case 'new': return <AlertCircle className="w-4 h-4" />;
      case 'contacted': return <Phone className="w-4 h-4" />;
      case 'booked': return <Calendar className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getUrgencyLevel = (consultation: MarketingSebesztConsultation): 'high' | 'medium' | 'low' => {
    const createdDate = consultation.createdAt instanceof Date 
      ? consultation.createdAt 
      : new Date();
    
    const hoursSinceCreated = (Date.now() - createdDate.getTime()) / (1000 * 60 * 60);
    
    if (consultation.status === 'new' && hoursSinceCreated > 24) return 'high';
    if (consultation.status === 'contacted' && hoursSinceCreated > 72) return 'medium';
    return 'low';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Marketing Sebészet CRM</h1>
              <p className="text-gray-600 mt-1">Teljes konzultációs rendszer és lead management</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {[
                  { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                  { key: 'pipeline', label: 'Pipeline', icon: Target },
                  { key: 'analytics', label: 'Analytics', icon: PieChart },
                  { key: 'calendar', label: 'Calendar', icon: Calendar }
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveView(key as any)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                      activeView === key
                        ? 'bg-white text-teal-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'dashboard' && (
          <DashboardView 
            stats={stats}
            consultations={filteredConsultations}
            filters={filters}
            setFilters={setFilters}
            onStatusUpdate={handleStatusUpdate}
            onNotesUpdate={handleNotesUpdate}
            onSelectConsultation={setSelectedConsultation}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
            getUrgencyLevel={getUrgencyLevel}
          />
        )}

        {activeView === 'pipeline' && (
          <PipelineView 
            consultations={filteredConsultations}
            onStatusUpdate={handleStatusUpdate}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
          />
        )}

        {activeView === 'analytics' && (
          <AnalyticsView stats={stats} consultations={consultations} />
        )}

        {activeView === 'calendar' && (
          <CalendarView consultations={filteredConsultations} />
        )}
      </div>

      {/* Consultation Detail Modal */}
      {selectedConsultation && (
        <ConsultationDetailModal
          consultation={selectedConsultation}
          onClose={() => setSelectedConsultation(null)}
          onStatusUpdate={handleStatusUpdate}
          onNotesUpdate={handleNotesUpdate}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
        />
      )}
    </div>
  );
};

// Dashboard View Component
const DashboardView: React.FC<{
  stats: CRMStats;
  consultations: ConsultationWithNotes[];
  filters: any;
  setFilters: any;
  onStatusUpdate: any;
  onNotesUpdate: any;
  onSelectConsultation: any;
  getStatusColor: any;
  getStatusIcon: any;
  getUrgencyLevel: any;
}> = ({ stats, consultations, filters, setFilters, onStatusUpdate, onNotesUpdate, onSelectConsultation, getStatusColor, getStatusIcon, getUrgencyLevel }) => (
  <div className="space-y-8">
    {/* Key Metrics */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Összes konzultáció"
        value={stats.total}
        icon={<Users className="w-6 h-6" />}
        color="bg-blue-500"
        trend={stats.thisWeek > stats.lastWeek ? 'up' : 'down'}
        trendValue={`${Math.abs(stats.thisWeek - stats.lastWeek)} ezen a héten`}
      />
      
      <MetricCard
        title="Lefoglalási arány"
        value={`${stats.bookingRate.toFixed(1)}%`}
        icon={<Calendar className="w-6 h-6" />}
        color="bg-green-500"
        trend="up"
        trendValue="+12% az elmúlt hónapban"
      />
      
      <MetricCard
        title="Átlag válaszidő"
        value={`${stats.avgResponseTime}h`}
        icon={<Clock className="w-6 h-6" />}
        color="bg-orange-500"
        trend="down"
        trendValue="Jobb, mint a cél (4h)"
      />
      
      <MetricCard
        title="Bevételi potenciál"
        value={`${(stats.totalRevenuePotential / 1000000).toFixed(1)}M Ft`}
        icon={<DollarSign className="w-6 h-6" />}
        color="bg-purple-500"
        trend="up"
        trendValue={`${stats.booked + stats.completed} aktív projekt`}
      />
    </div>

    {/* Action Required Section */}
    <ActionRequiredSection 
      consultations={consultations}
      onStatusUpdate={onStatusUpdate}
      onSelectConsultation={onSelectConsultation}
      getStatusColor={getStatusColor}
      getStatusIcon={getStatusIcon}
      getUrgencyLevel={getUrgencyLevel}
    />

    {/* Recent Consultations */}
    <RecentConsultationsSection 
      consultations={consultations.slice(0, 10)}
      filters={filters}
      setFilters={setFilters}
      onStatusUpdate={onStatusUpdate}
      onNotesUpdate={onNotesUpdate}
      onSelectConsultation={onSelectConsultation}
      getStatusColor={getStatusColor}
      getStatusIcon={getStatusIcon}
    />
  </div>
);

// Pipeline View Component  
const PipelineView: React.FC<{
  consultations: ConsultationWithNotes[];
  onStatusUpdate: any;
  getStatusColor: any;
  getStatusIcon: any;
}> = ({ consultations, onStatusUpdate, getStatusColor, getStatusIcon }) => {
  const stages = [
    { key: 'new', title: 'Új kérelmek', color: 'bg-blue-50' },
    { key: 'contacted', title: 'Megkeresett', color: 'bg-yellow-50' },
    { key: 'booked', title: 'Lefoglalva', color: 'bg-green-50' },
    { key: 'completed', title: 'Befejezve', color: 'bg-purple-50' }
  ];

  const getConsultationsByStatus = (status: string) => {
    return consultations.filter(c => c.status === status);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Értékesítési Pipeline</h2>
        <div className="text-sm text-gray-600">
          Összes aktív: {consultations.length} konzultáció
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {stages.map(stage => {
          const stageConsultations = getConsultationsByStatus(stage.key);
          return (
            <div key={stage.key} className={`${stage.color} rounded-lg p-4`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{stage.title}</h3>
                <span className="bg-white px-2 py-1 rounded-full text-sm font-medium">
                  {stageConsultations.length}
                </span>
              </div>

              <div className="space-y-3">
                {stageConsultations.map(consultation => (
                  <PipelineCard
                    key={consultation.id}
                    consultation={consultation}
                    onStatusUpdate={onStatusUpdate}
                    getStatusColor={getStatusColor}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Analytics View Component
const AnalyticsView: React.FC<{
  stats: CRMStats;
  consultations: ConsultationWithNotes[];
}> = ({ stats, consultations }) => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-gray-900">Analitikai Áttekintés</h2>
    
    {/* Charts and Analytics would go here */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Konverziós Funnel</h3>
        {/* Conversion funnel chart */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Új kérelmek</span>
            <span className="font-bold">{stats.new}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{width: '100%'}}></div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Havi Teljesítmény</h3>
        <div className="text-center">
          <div className="text-3xl font-bold text-teal-600">{stats.thisMonth}</div>
          <div className="text-sm text-gray-600">konzultáció ezen a hónapban</div>
        </div>
      </div>
    </div>
  </div>
);

// Calendar View Component
const CalendarView: React.FC<{
  consultations: ConsultationWithNotes[];
}> = ({ consultations }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Konzultációs Naptár</h2>
    
    <div className="bg-white rounded-lg shadow p-6">
      <div className="text-center text-gray-500 py-12">
        <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-semibold mb-2">Naptár Integráció</h3>
        <p>Itt jelenne meg a Minup calendar integráció a lefoglalt időpontokkal.</p>
      </div>
    </div>

    {/* Upcoming Consultations */}
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Közelgő Konzultációk</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {consultations
          .filter(c => c.status === 'booked')
          .slice(0, 5)
          .map(consultation => (
            <div key={consultation.id} className="p-6 flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Calendar className="w-8 h-8 text-teal-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{consultation.name}</h4>
                <p className="text-sm text-gray-600">{consultation.email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Időpont egyeztetés alatt</p>
                <p className="text-xs text-gray-500">30 perces konzultáció</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
);

// Helper Components
const MetricCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: 'up' | 'down';
  trendValue?: string;
}> = ({ title, value, icon, color, trend, trendValue }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-lg shadow p-6"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {trend && trendValue && (
          <div className="flex items-center mt-2">
            {trend === 'up' ? (
              <ArrowUp className="w-4 h-4 text-green-500" />
            ) : (
              <ArrowDown className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm ml-1 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trendValue}
            </span>
          </div>
        )}
      </div>
      <div className={`${color} text-white p-3 rounded-lg`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

const ActionRequiredSection: React.FC<{
  consultations: ConsultationWithNotes[];
  onStatusUpdate: any;
  onSelectConsultation: any;
  getStatusColor: any;
  getStatusIcon: any;
  getUrgencyLevel: any;
}> = ({ consultations, onStatusUpdate, onSelectConsultation, getStatusColor, getStatusIcon, getUrgencyLevel }) => {
  const urgentConsultations = consultations.filter(c => getUrgencyLevel(c) === 'high');

  if (urgentConsultations.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
        <h3 className="text-lg font-semibold text-red-900">Azonnali Intézkedés Szükséges</h3>
        <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
          {urgentConsultations.length}
        </span>
      </div>

      <div className="grid gap-4">
        {urgentConsultations.slice(0, 3).map(consultation => (
          <div key={consultation.id} className="bg-white rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                {getStatusIcon(consultation.status)}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{consultation.name}</h4>
                <p className="text-sm text-gray-600">{consultation.email}</p>
                <p className="text-xs text-red-600">24+ óra válasz nélkül</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onStatusUpdate(consultation.id, 'contacted')}
                className="px-3 py-1 bg-teal-500 text-white rounded-lg text-sm hover:bg-teal-600"
              >
                Megkeresem
              </button>
              <button
                onClick={() => onSelectConsultation(consultation)}
                className="px-3 py-1 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50"
              >
                Részletek
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RecentConsultationsSection: React.FC<{
  consultations: ConsultationWithNotes[];
  filters: any;
  setFilters: any;
  onStatusUpdate: any;
  onNotesUpdate: any;
  onSelectConsultation: any;
  getStatusColor: any;
  getStatusIcon: any;
}> = ({ consultations, filters, setFilters, onStatusUpdate, onNotesUpdate, onSelectConsultation, getStatusColor, getStatusIcon }) => (
  <div className="bg-white rounded-lg shadow">
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Legutóbbi Konzultációk</h3>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Keresés..."
              className="pl-9 pr-4 py-2 border rounded-lg text-sm"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
            />
          </div>

          <select
            className="px-3 py-2 border rounded-lg text-sm"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="">Minden státusz</option>
            <option value="new">Új</option>
            <option value="contacted">Megkeresett</option>
            <option value="booked">Lefoglalva</option>
            <option value="completed">Befejezve</option>
          </select>
        </div>
      </div>
    </div>

    <div className="divide-y divide-gray-200">
      {consultations.map(consultation => (
        <ConsultationRow
          key={consultation.id}
          consultation={consultation}
          onStatusUpdate={onStatusUpdate}
          onNotesUpdate={onNotesUpdate}
          onSelectConsultation={onSelectConsultation}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
        />
      ))}
    </div>
  </div>
);

const ConsultationRow: React.FC<{
  consultation: ConsultationWithNotes;
  onStatusUpdate: any;
  onNotesUpdate: any;
  onSelectConsultation: any;
  getStatusColor: any;
  getStatusIcon: any;
}> = ({ consultation, onStatusUpdate, onNotesUpdate, onSelectConsultation, getStatusColor, getStatusIcon }) => (
  <div className="p-6 hover:bg-gray-50">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-teal-700">
            {consultation.name.charAt(0).toUpperCase()}
          </span>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900">{consultation.name}</h4>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              {consultation.email}
            </span>
            <span className="flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              {consultation.phone}
            </span>
            <span className="capitalize">{consultation.occupation}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(consultation.status)}`}>
          {getStatusIcon(consultation.status)}
          <span className="ml-1 capitalize">{consultation.status}</span>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onSelectConsultation(consultation)}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          <select
            value={consultation.status}
            onChange={(e) => onStatusUpdate(consultation.id, e.target.value)}
            className="px-2 py-1 border rounded text-xs"
          >
            <option value="new">Új</option>
            <option value="contacted">Megkeresett</option>
            <option value="booked">Lefoglalva</option>
            <option value="completed">Befejezve</option>
            <option value="cancelled">Lemondva</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

const PipelineCard: React.FC<{
  consultation: ConsultationWithNotes;
  onStatusUpdate: any;
  getStatusColor: any;
}> = ({ consultation, onStatusUpdate, getStatusColor }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
  >
    <div className="flex items-center justify-between mb-2">
      <h4 className="font-medium text-gray-900 truncate">{consultation.name}</h4>
      <div className={`w-3 h-3 rounded-full ${getStatusColor(consultation.status).includes('blue') ? 'bg-blue-500' : getStatusColor(consultation.status).includes('yellow') ? 'bg-yellow-500' : getStatusColor(consultation.status).includes('green') ? 'bg-green-500' : 'bg-purple-500'}`}></div>
    </div>
    
    <p className="text-sm text-gray-600 truncate">{consultation.email}</p>
    <p className="text-xs text-gray-500 capitalize">{consultation.occupation}</p>
    
    <div className="mt-3 flex items-center justify-between">
      <span className="text-xs text-gray-500">
        {consultation.createdAt instanceof Date 
          ? consultation.createdAt.toLocaleDateString('hu-HU')
          : new Date().toLocaleDateString('hu-HU')
        }
      </span>
      
      <div className="flex space-x-1">
        <button 
          onClick={() => onStatusUpdate(consultation.id, 'contacted')}
          className="p-1 text-gray-400 hover:text-teal-600"
        >
          <Phone className="w-3 h-3" />
        </button>
        <button 
          onClick={() => onStatusUpdate(consultation.id, 'booked')}
          className="p-1 text-gray-400 hover:text-green-600"
        >
          <Calendar className="w-3 h-3" />
        </button>
      </div>
    </div>
  </motion.div>
);

const ConsultationDetailModal: React.FC<{
  consultation: ConsultationWithNotes;
  onClose: () => void;
  onStatusUpdate: any;
  onNotesUpdate: any;
  getStatusColor: any;
  getStatusIcon: any;
}> = ({ consultation, onClose, onStatusUpdate, onNotesUpdate, getStatusColor, getStatusIcon }) => {
  const [notes, setNotes] = useState(consultation.adminNotes || '');
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Konzultáció Részletei</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Alapadatok</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Név</label>
                  <p className="text-gray-900">{consultation.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-900">{consultation.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Telefon</label>
                  <p className="text-gray-900">{consultation.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Foglalkozás</label>
                  <p className="text-gray-900 capitalize">{consultation.occupation}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Státusz & Dátumok</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Jelenlegi státusz</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(consultation.status)}`}>
                      {getStatusIcon(consultation.status)}
                      <span className="ml-1 capitalize">{consultation.status}</span>
                    </div>
                    <select
                      value={consultation.status}
                      onChange={(e) => onStatusUpdate(consultation.id, e.target.value)}
                      className="px-2 py-1 border rounded text-sm"
                    >
                      <option value="new">Új</option>
                      <option value="contacted">Megkeresett</option>
                      <option value="booked">Lefoglalva</option>
                      <option value="completed">Befejezve</option>
                      <option value="cancelled">Lemondva</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Létrehozva</label>
                  <p className="text-gray-900">
                    {consultation.createdAt instanceof Date 
                      ? consultation.createdAt.toLocaleString('hu-HU')
                      : new Date().toLocaleString('hu-HU')
                    }
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">UTM Forrás</label>
                  <p className="text-gray-900">{consultation.utm_source || 'Közvetlen'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Jegyzetek</h3>
              <button
                onClick={() => setIsEditingNotes(!isEditingNotes)}
                className="px-3 py-1 text-sm bg-teal-500 text-white rounded-lg hover:bg-teal-600"
              >
                {isEditingNotes ? 'Mentés' : 'Szerkesztés'}
              </button>
            </div>

            {isEditingNotes ? (
              <div className="space-y-3">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full border rounded-lg p-3 resize-none"
                  placeholder="Jegyzetek hozzáadása..."
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      onNotesUpdate(consultation.id!, notes);
                      setIsEditingNotes(false);
                    }}
                    className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 text-sm"
                  >
                    Mentés
                  </button>
                  <button
                    onClick={() => {
                      setNotes(consultation.adminNotes || '');
                      setIsEditingNotes(false);
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Mégse
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 min-h-[100px]">
                {consultation.adminNotes ? (
                  <p className="text-gray-900">{consultation.adminNotes}</p>
                ) : (
                  <p className="text-gray-500 italic">Még nincsenek jegyzetek...</p>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Gyors műveletek</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => window.open(`tel:${consultation.phone}`)}
                className="flex items-center justify-center space-x-2 py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Phone className="w-4 h-4" />
                <span>Hívás</span>
              </button>
              
              <button
                onClick={() => window.open(`mailto:${consultation.email}`)}
                className="flex items-center justify-center space-x-2 py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </button>
              
              <button
                onClick={() => onStatusUpdate(consultation.id, 'booked')}
                className="flex items-center justify-center space-x-2 py-3 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                <Calendar className="w-4 h-4" />
                <span>Lefoglal</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MarketingSebesztCRMDashboard;