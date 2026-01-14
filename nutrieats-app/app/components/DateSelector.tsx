'use client';

import React, { useRef, useEffect, useState } from 'react';

interface DateSelectorProps {
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
}

export default function DateSelector({ selectedDate, onSelectDate }: DateSelectorProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

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

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="w-full mb-6 md:mb-8 relative">
            <div className="flex flex-col gap-3 mb-4 md:mb-6 px-1">
                <div className="flex items-center justify-between">
                    <div className="relative group w-fit">
                        <button
                            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                            className="flex items-center gap-2 cursor-pointer bg-white dark:bg-gray-800 border-2 border-transparent hover:border-[#1a4d3e]/20 dark:hover:border-[#2d6a58]/40 px-3 py-1.5 rounded-xl transition-all group/header"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5 text-[#1a4d3e] dark:text-[#2d6a58] group-hover/header:text-[#16422f] transition-colors"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                            </svg>
                            <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white capitalize text-nowrap">
                                {currentMonth.toLocaleDateString('default', { month: 'short', year: 'numeric' })}
                            </h2>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className={`w-4 h-4 text-gray-400 group-hover/header:text-[#1a4d3e] transition-transform duration-300 ${isDatePickerOpen ? 'rotate-180' : ''}`}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>

                        {/* Custom Date Picker Popover */}
                        {isDatePickerOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-40 bg-transparent"
                                    onClick={() => setIsDatePickerOpen(false)}
                                ></div>
                                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:absolute md:top-12 md:left-0 md:translate-x-0 md:translate-y-0 z-50 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-gray-700 w-[300px] sm:w-[320px] animate-in fade-in zoom-in-95 duration-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                            </svg>
                                        </button>
                                        <span className="font-bold text-gray-900 dark:text-white">
                                            {currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
                                        </span>
                                        <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-7 gap-1 mb-2">
                                        {weekDays.map(day => (
                                            <div key={day} className="text-center text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-wider py-1">
                                                {day}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-7 gap-1">
                                        {calendarDates.map((date, index) => {
                                            const selected = isSameDay(date, selectedDate);
                                            const today = isToday(date);
                                            const isCurrentMonth = date.getMonth() === currentMonth.getMonth();

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => {
                                                        onSelectDate(date);
                                                        setIsDatePickerOpen(false);
                                                    }}
                                                    className={`
                                                        relative aspect-square flex items-center justify-center rounded-xl text-sm font-bold transition-all
                                                        ${selected
                                                            ? 'bg-[#1a4d3e] text-white shadow-lg'
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
                            </>
                        )}
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
                    </div>
                </div>
            </div>

            {/* Desktop Calendar Strip */}
            <div className="hidden md:flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 relative group/calendar">
                <button
                    onClick={scrollLeft}
                    className="p-2 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-400 hover:text-[#1a4d3e] hover:bg-[#1a4d3e]/10 transition-colors flex-shrink-0"
                    aria-label="Scroll left"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide snap-x pt-2 flex-grow mask-fade-sides"
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
                                    flex flex-col items-center justify-center min-w-[60px] h-[80px] rounded-2xl transition-all duration-300 snap-center border
                                    ${selected
                                        ? 'bg-[#1a4d3e] border-[#1a4d3e] text-white shadow-lg shadow-[#1a4d3e]/30 scale-110 z-10'
                                        : 'bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-400 dark:text-gray-500'
                                    }
                                `}
                            >
                                <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${selected ? 'text-green-100' : 'text-gray-400 dark:text-gray-500'}`}>
                                    {date.toLocaleDateString('default', { weekday: 'short' })}
                                </span>
                                <span className={`text-xl font-bold leading-none ${selected ? 'text-white' : 'text-gray-900 dark:text-gray-300'}`}>
                                    {date.getDate()}
                                </span>
                                {today && !selected && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1a4d3e] mt-1.5"></span>
                                )}
                                {today && selected && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 opacity-70"></span>
                                )}
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={scrollRight}
                    className="p-2 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-400 hover:text-[#1a4d3e] hover:bg-[#1a4d3e]/10 transition-colors flex-shrink-0"
                    aria-label="Scroll right"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
