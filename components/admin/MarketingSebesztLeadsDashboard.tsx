"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Phone, 
  Mail,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  X
} from 'lucide-react';
import { leadCaptureService, MarketingSebesztConsultation } from '@/lib/services/leadCaptureService';

interface ConsultationStats {
  total: number;
  new: number;
  contacted: number;
  booked: number;
  completed: number;
  cancelled: number;
  conversionRate: number;
  bookingRate: number;
}

interface FilterOptions {
  status: string;
  dateRange: {
    start: string;
    end: string;
  };
  occupation: string;
  search: string;
}

const MarketingSebesztLeadsDashboard: React.FC = () => {
  const [leads, setLeads] = useState<MarketingSebesztConsultation[]>([]);
  const [stats, setStats] = useState<ConsultationStats>({
    total: 0,
    new: 0,
    contacted: 0,
    booked: 0,
    completed: 0,
    cancelled: 0,
    conversionRate: 0,
    bookingRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  
  const [filters, setFilters] = useState<FilterOptions>({
    status: '',
    dateRange: {
      start: '',
      end: ''
    },
    occupation: '',
    search: ''
  });

  // Load leads and stats
  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [consultationsData, statsData] = await Promise.all([
        leadCaptureService.getConsultations({
          status: filters.status ? filters.status as any : undefined,
          startDate: filters.dateRange.start ? new Date(filters.dateRange.start) : undefined,
          endDate: filters.dateRange.end ? new Date(filters.dateRange.end) : undefined,
          consultationType: 'marketing_sebeszet'
        }),
        leadCaptureService.getConsultationStats()
      ]);

      setLeads(consultationsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter leads based on search and occupation
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = !filters.search || 
        lead.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        lead.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        lead.phone.includes(filters.search);
      
      const matchesOccupation = !filters.occupation || lead.occupation === filters.occupation;
      
      return matchesSearch && matchesOccupation;
    });
  }, [leads, filters.search, filters.occupation]);

  const handleStatusUpdate = async (consultationId: string, newStatus: MarketingSebesztConsultation['status']) => {
    try {
      await leadCaptureService.updateConsultationStatus(consultationId, newStatus);
      await loadData(); // Reload data
    } catch (error) {
      console.error('Error updating consultation status:', error);
    }
  };

  const handleExport = async () => {
    try {
      const csv = await leadCaptureService.exportLeadsToCSV(filteredLeads);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `marketing_sebeszet_leads_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting leads:', error);
    }
  };

  const getStatusColor = (status: MarketingSebesztConsultation['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'booked': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const statusOptions = [
    { value: '', label: 'Összes státusz' },
    { value: 'new', label: 'Új' },
    { value: 'contacted', label: 'Megkeresett' },
    { value: 'booked', label: 'Lefoglalva' },
    { value: 'completed', label: 'Befejezve' },
    { value: 'cancelled', label: 'Lemondva' }
  ];

  const occupationOptions = [
    { value: '', label: 'Összes foglalkozás' },
    { value: 'cegvezetes', label: 'Cégvezetés' },
    { value: 'ertekesites', label: 'Értékesítés' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'hr', label: 'HR' },
    { value: 'penzugy', label: 'Pénzügy' },
    { value: 'egyeb', label: 'Egyéb' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="Összes konzultáció"
          value={stats.total}
          icon={<Users className="w-6 h-6" />}
          color="bg-blue-500"
        />
        <StatsCard
          title="Új igénylés"
          value={stats.new}
          icon={<AlertCircle className="w-6 h-6" />}
          color="bg-yellow-500"
        />
        <StatsCard
          title="Lefoglalási arány"
          value={`${stats.bookingRate.toFixed(1)}%`}
          icon={<Calendar className="w-6 h-6" />}
          color="bg-green-500"
        />
        <StatsCard
          title="Befejezett"
          value={stats.completed}
          icon={<CheckCircle className="w-6 h-6" />}
          color="bg-purple-500"
        />
        <StatsCard
          title="Konverzió"
          value={`${stats.conversionRate.toFixed(1)}%`}
          icon={<TrendingUp className="w-6 h-6" />}
          color="bg-indigo-500"
        />
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Keresés név, email vagy telefon alapján..."
                className="pl-10 pr-4 py-2 border rounded-lg w-64"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>

            <select
              className="px-4 py-2 border rounded-lg"
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-2 border rounded-lg"
              value={filters.occupation}
              onChange={(e) => setFilters(prev => ({ ...prev, occupation: e.target.value }))}
            >
              {occupationOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>

            <div className="flex border rounded-lg">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-2 ${viewMode === 'table' ? 'bg-teal-500 text-white' : 'text-gray-700'} rounded-l-lg`}
              >
                Táblázat
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-2 ${viewMode === 'cards' ? 'bg-teal-500 text-white' : 'text-gray-700'} rounded-r-lg`}
              >
                Kártyák
              </button>
            </div>
          </div>
        </div>

        {/* Date Range Filters */}
        <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Kezdő dátum:</label>
            <input
              type="date"
              className="px-3 py-2 border rounded-lg"
              value={filters.dateRange.start}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                dateRange: { ...prev.dateRange, start: e.target.value }
              }))}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Végső dátum:</label>
            <input
              type="date"
              className="px-3 py-2 border rounded-lg"
              value={filters.dateRange.end}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                dateRange: { ...prev.dateRange, end: e.target.value }
              }))}
            />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        {filteredLeads.length} konzultáció találat {leads.length !== filteredLeads.length && `(${leads.length} összes közül)`}
      </div>

      {/* Leads Display */}
      {viewMode === 'table' ? (
        <LeadsTable 
          leads={filteredLeads}
          onStatusUpdate={handleStatusUpdate}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
        />
      ) : (
        <LeadsCards 
          leads={filteredLeads}
          onStatusUpdate={handleStatusUpdate}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
        />
      )}
    </div>
  );
};

// Stats Card Component
const StatsCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white rounded-lg shadow p-6"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`${color} text-white p-3 rounded-lg`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

// Consultations Table Component
const LeadsTable: React.FC<{
  leads: MarketingSebesztConsultation[];
  onStatusUpdate: (consultationId: string, status: MarketingSebesztConsultation['status']) => void;
  getStatusColor: (status: MarketingSebesztConsultation['status']) => string;
  getStatusIcon: (status: MarketingSebesztConsultation['status']) => React.ReactNode;
}> = ({ leads, onStatusUpdate, getStatusColor, getStatusIcon }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Lead információ
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Foglalkozás
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Státusz
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dátum
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Műveletek
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {leads.map(lead => (
            <tr key={lead.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="font-medium text-gray-900">{lead.name}</div>
                  <div className="text-sm text-gray-500 flex items-center space-x-4">
                    <span className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {lead.email}
                    </span>
                    <span className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {lead.phone}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="capitalize">{lead.occupation}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={lead.status}
                  onChange={(e) => onStatusUpdate(lead.id!, e.target.value as any)}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border-0 ${getStatusColor(lead.status)}`}
                >
                  <option value="new">Új</option>
                  <option value="contacted">Megkeresett</option>
                  <option value="booked">Lefoglalva</option>
                  <option value="completed">Befejezve</option>
                  <option value="cancelled">Lemondva</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {lead.createdAt && typeof lead.createdAt === 'object' && 'toDate' in lead.createdAt
                  ? lead.createdAt.toDate().toLocaleDateString('hu-HU')
                  : new Date().toLocaleDateString('hu-HU')
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-teal-600 hover:text-teal-900 mx-2">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Consultations Cards Component
const LeadsCards: React.FC<{
  leads: MarketingSebesztConsultation[];
  onStatusUpdate: (consultationId: string, status: MarketingSebesztConsultation['status']) => void;
  getStatusColor: (status: MarketingSebesztConsultation['status']) => string;
  getStatusIcon: (status: MarketingSebesztConsultation['status']) => React.ReactNode;
}> = ({ leads, onStatusUpdate, getStatusColor, getStatusIcon }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {leads.map(lead => (
      <motion.div
        key={lead.id}
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{lead.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{lead.occupation}</p>
          </div>
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
            {getStatusIcon(lead.status)}
            <span className="ml-1 capitalize">{lead.status}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="w-4 h-4 mr-2" />
            {lead.email}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            {lead.phone}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {lead.createdAt && typeof lead.createdAt === 'object' && 'toDate' in lead.createdAt
              ? lead.createdAt.toDate().toLocaleDateString('hu-HU')
              : new Date().toLocaleDateString('hu-HU')
            }
          </div>
        </div>

        <div className="flex space-x-2">
          <select
            value={lead.status}
            onChange={(e) => onStatusUpdate(lead.id!, e.target.value as any)}
            className="flex-1 px-3 py-2 border rounded-lg text-sm"
          >
            <option value="new">Új</option>
            <option value="contacted">Megkeresett</option>
            <option value="booked">Lefoglalva</option>
            <option value="completed">Befejezve</option>
            <option value="cancelled">Lemondva</option>
          </select>
          <button className="px-3 py-2 text-teal-600 hover:text-teal-700">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    ))}
  </div>
);

export default MarketingSebesztLeadsDashboard;