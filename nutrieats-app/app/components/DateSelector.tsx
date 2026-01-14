'use client';

import React, { useRef, useEffect, useState } from 'react';

interface DateSelectorProps {
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
}

export default function DateSelector({ selectedDate, onSelectDate }: DateSelectorProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));

    // Generate nearest 30 days (15 before, 15 after) based on selectedDate for sliding bar
    const dates: Date[] = [];
    for (let i = -15; i <= 15; i++) {
        const d = new Date(selectedDate);
        d.setDate(selectedDate.getDate() + i);
        dates.push(d);
    }

    // Generate calendar grid for current month
    const generateCalendarDates = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay()); // Start from Sunday

        const calendarDates: Date[] = [];
        const currentDate = new Date(startDate);

        // Generate 6 weeks (42 days) to ensure full month coverage
        for (let i = 0; i < 42; i++) {
            calendarDates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return calendarDates;
    };

    const calendarDates = generateCalendarDates();

    const isSameDay = (d1: Date, d2: Date) => {
        return d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear();
    };

    const isToday = (date: Date) => isSameDay(date, new Date());

    const scrollToDate = (date: Date, behavior: ScrollBehavior = 'smooth') => {
        if (scrollContainerRef.current) {
            const activeIndex = dates.findIndex(d => isSameDay(d, date));
            if (activeIndex !== -1) {
                // Item width (64px) + gap (8px) = 72px
                const scrollPos = (activeIndex * 72) - (scrollContainerRef.current.clientWidth / 2) + 32;
                scrollContainerRef.current.scrollTo({ left: scrollPos, behavior });
            }
        }
    };

    const handleTodayClick = () => {
        const today = new Date();
        onSelectDate(today);
        setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    useEffect(() => {
        scrollToDate(selectedDate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate]);

    // Update current month when selected date changes
    useEffect(() => {
        setCurrentMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
    }, [selectedDate]);

    const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            onSelectDate(new Date(e.target.value));
        }
    };

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="w-full mb-6 md:mb-8 overflow-x-clip">
            {/* Toolbar: Month Year | Today | Calendar */}
            <div className="flex flex-col gap-3 mb-4 md:mb-6 px-1">
                <div className="flex items-center justify-between">
                    <div className="relative group w-fit">
                        <input
                            type="date"
                            value={selectedDate.toISOString().split('T')[0]}
                            onChange={handleDateInputChange}
                            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                        />
                        <div className="flex items-center cursor-pointer bg-white dark:bg-gray-800 border-2 border-transparent hover:border-[#1a4d3e]/20 dark:hover:border-[#2d6a58]/40 px-3 py-1.5 rounded-xl transition-all">
                            <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white capitalize text-nowrap">
                                {currentMonth.toLocaleDateString('default', { month: 'short', year: 'numeric' })}
                            </h2>
                        </div>
                    </div>

                    {/* Month navigation for mobile calendar */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            onClick={handlePrevMonth}
                            className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-lg hover:border-[#1a4d3e]/30 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-[#1a4d3e] dark:text-[#2d6a58]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button
                            onClick={handleNextMonth}
                            className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-lg hover:border-[#1a4d3e]/30 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-[#1a4d3e] dark:text-[#2d6a58]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleTodayClick}
                        className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${isToday(selectedDate)
                            ? 'bg-[#1a4d3e] text-white shadow-md'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                    >
                        Today
                    </button>
                    <div className="relative w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl hover:border-[#1a4d3e]/30 transition-all cursor-pointer">
                        <input
                            type="date"
                            value={selectedDate.toISOString().split('T')[0]}
                            onChange={handleDateInputChange}
                            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#1a4d3e] dark:text-[#2d6a58]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Mobile Calendar Grid */}
            <div className="md:hidden bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                {/* Week day headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekDays.map(day => (
                        <div key={day} className="text-center text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-wider py-1">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar dates */}
                <div className="grid grid-cols-7 gap-1">
                    {calendarDates.map((date, index) => {
                        const selected = isSameDay(date, selectedDate);
                        const today = isToday(date);
                        const isCurrentMonth = date.getMonth() === currentMonth.getMonth();

                        return (
                            <button
                                key={index}
                                onClick={() => onSelectDate(date)}
                                className={`
                                    relative aspect-square flex items-center justify-center rounded-xl text-sm font-bold transition-all
                                    ${selected
                                        ? 'bg-gradient-to-br from-[#1a4d3e] to-[#0f2e25] text-white shadow-lg scale-105'
                                        : isCurrentMonth
                                            ? 'bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                            : 'bg-transparent text-gray-300 dark:text-gray-600'
                                    }
                                `}
                            >
                                {date.getDate()}
                                {today && !selected && (
                                    <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-[#1a4d3e]"></span>
                                )}
                                {today && selected && (
                                    <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-white opacity-70"></span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Desktop Calendar Strip */}
            <div
                ref={scrollContainerRef}
                className="hidden md:flex overflow-x-auto gap-2 pb-6 scrollbar-hide snap-x pt-2 px-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {dates.map((date) => {
                    const selected = isSameDay(date, selectedDate);
                    const today = isToday(date);

                    return (
                        <button
                            key={date.toISOString()}
                            onClick={() => onSelectDate(date)}
                            className={`
                                flex flex-col items-center justify-center min-w-[64px] h-[86px] rounded-[1.5rem] transition-all duration-300 snap-center
                                ${selected
                                    ? 'bg-gradient-to-br from-[#1a4d3e] to-[#0f2e25] text-white shadow-xl scale-[1.05] z-10'
                                    : 'bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500 hover:bg-white/80 dark:hover:bg-gray-800/80 border border-transparent shadow-sm'
                                }
                            `}
                        >
                            <span className={`text-[10px] font-black uppercase tracking-tighter mb-1.5 ${selected ? 'text-green-50/70' : 'text-gray-400 dark:text-gray-600'}`}>
                                {date.toLocaleDateString('default', { weekday: 'short' })}
                            </span>
                            <span className={`text-2xl font-black leading-none ${selected ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                                {date.getDate()}
                            </span>

                            {today && !selected && (
                                <span className="absolute -top-1 right-3 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1a4d3e] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1a4d3e]"></span>
                                </span>
                            )}

                            {today && selected && (
                                <span className="w-1 h-1 rounded-full bg-white mt-1.5 opacity-50"></span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
