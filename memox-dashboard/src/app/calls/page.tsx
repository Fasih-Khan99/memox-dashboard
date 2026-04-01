"use client";

import { useState, useMemo } from 'react';
import { calls } from '@/lib/mockData';
import Link from 'next/link';

export default function CallsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [dateFilter, setDateFilter] = useState('all');
    const [outcomeFilter, setOutcomeFilter] = useState('all');

    const uniqueDates = Array.from(
        new Set(calls.map((call) => call.startTime))
    );
    const uniqueOutcomes = Array.from(
        new Set(calls.map((call) => call.outcome).filter(Boolean))
    );

    // Filter and search logic
    const filteredCalls = useMemo(() => {
        return calls.filter((call) => {
            // Search matches company, contact, or agent name
            const matchesSearch =
                call.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                call.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
                call.agentName.toLowerCase().includes(searchQuery.toLowerCase());

            // Date matches 
            const matchesDate = dateFilter === 'all' || call.startTime === dateFilter;

            // Outcome matches (treating null as 'ongoing' if needed, but here we just match standard outcomes)
            const matchesOutcome = outcomeFilter === 'all' || call.outcome === outcomeFilter;

            return matchesSearch && matchesDate && matchesOutcome;
        });
    }, [searchQuery, dateFilter, outcomeFilter]);

    const getSentimentColor = (sentiment: string) => {
        switch (sentiment) {
            case 'positive': return 'text-green-600 bg-green-50';
            case 'negative': return 'text-red-600 bg-red-50';
            default: return 'text-yellow-600 bg-yellow-50';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'text-green-600 bg-green-50';
            case 'in-progress': return 'text-red-600 bg-red-50';
            default: return 'text-yellow-600 bg-yellow-50';
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Call History</h1>

            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                {/* Top Left: Search Bar */}
                <div className="w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Search company, contact, or agent..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Top Right: Filters */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    >
                        <option value="all" className="text-xs md:text-sm lg-text:sm px-4 py-2 border border-gray-300 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">All Dates</option>
                        {uniqueDates.map((date) => (
                            <option key={date} value={date} className="text-xs md:text-sm lg-text:sm px-4 py-2 border border-gray-300 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">{date}</option>
                        ))}
                    </select>

                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={outcomeFilter}
                        onChange={(e) => setOutcomeFilter(e.target.value)}
                    >
                        <option value="all" className="text-xs md:text-sm lg-text:sm px-4 py-2 border border-gray-300 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">All Outcomes</option>
                        {uniqueOutcomes.map((outcome) => (
                            <option key={outcome} value={outcome as string} className="text-xs md:text-sm lg-text:sm px-4 py-2 border border-gray-300 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                {/* Format 'meeting_booked' to 'Meeting Booked' */}
                                {String(outcome).replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                <div className="hidden md:grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600">
                    <div className="col-span-2">Company / Contact</div>
                    <div>Agent</div>
                    <div>Duration</div>
                    <div>Sentiment</div>
                    <div>Status</div>
                </div>

                <div className="divide-y divide-gray-100">
                    {filteredCalls.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No calls found matching your criteria.
                        </div>
                    ) : (
                        filteredCalls.map((call) => (
                            <Link href={`/calls/${call.id}`} key={call.id} className="block hover:bg-gray-50 transition">
                                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 items-center">
                                    <div className="col-span-2">
                                        <div className="font-medium text-gray-900">{call.company}</div>
                                        <div className="text-sm text-gray-500">{call.contact}</div>
                                    </div>
                                    <div className="text-sm text-gray-700 md:block hidden">{call.agentName}</div>
                                    <div className="text-sm text-gray-500">
                                        {Math.floor(call.duration / 60)}m {call.duration % 60}s
                                    </div>
                                    <div>
                                        <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${getSentimentColor(call.sentiment)}`}>
                                            {call.sentiment}
                                        </span>
                                    </div>
                                    <div className="flex justify-between md:block items-center">
                                        <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${getStatusColor(call.status)}`}>
                                            {call.status}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}