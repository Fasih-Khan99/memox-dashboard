"use client";

import { useState, useMemo } from 'react';
import { agents } from '@/lib/mockData';
import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Dynamic extraction of unique languages and statuses for dropdowns
  const uniqueLanguages = useMemo(() => {
    return Array.from(new Set(agents.map((agent) => agent.language)));
  }, []);

  const uniqueStatuses = useMemo(() => {
    return Array.from(new Set(agents.map((agent) => agent.status)));
  }, []);

  // Filter and search logic
  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      // Search matches agent name or language
      const matchesSearch =
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.language.toLowerCase().includes(searchQuery.toLowerCase());

      // Language filter
      const matchesLanguage = languageFilter === 'all' || agent.language === languageFilter;

      // Status filter
      const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;

      return matchesSearch && matchesLanguage && matchesStatus;
    });
  }, [searchQuery, languageFilter, statusFilter]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Voice Agents</h1>

      {/* Controls: Search and Filters (Matching Calls Page UI) */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {/* Top Left: Search Bar */}
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search agent name or language..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Top Right: Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
          >
            <option value="all" className="text-xs md:text-sm lg-text:sm px-4 py-2 border border-gray-300 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">All Languages</option>
            {uniqueLanguages.map((lang) => (
              <option key={lang} value={lang} className="text-xs md:text-sm lg-text:sm px-4 py-2 border border-gray-300 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">{lang}</option>
            ))}
          </select>

          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all" className="text-xs md:text-sm lg-text:sm px-4 py-2 border border-gray-300 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">All Statuses</option>
            {uniqueStatuses.map((status) => (
              <option key={status} value={status} className="text-xs md:text-sm lg-text:sm px-4 py-2 border border-gray-300 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Agents Grid */}
      {filteredAgents.length === 0 ? (
        <div className="bg-white rounded-lg shadow border border-gray-100 p-8 text-center text-gray-500">
          No agents found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAgents.map((agent) => (
            <Link href={`/agents/${agent.id}`} key={agent.id} className="block group">
              <div className="bg-white p-5 rounded-lg shadow border border-gray-100 hover:shadow-md transition-all group-hover:border-blue-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                      {agent.name}
                    </h2>
                    <p className="text-gray-500 text-sm">{agent.language}</p>
                  </div>
                  <StatusBadge status={agent.status} />
                </div>

                <div className="pt-4 border-t border-gray-50 flex justify-between items-center text-sm">
                  <div className="text-gray-600">
                    Calls Today: <span className="font-bold text-gray-900">{agent.metrics.callsToday}</span>
                  </div>
                  <div className="text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}