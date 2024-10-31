"use client";
import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "exnaton-frontend/lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "exnaton-frontend/components/ui/popover";
import { RootState } from "exnaton-frontend/lib/store";
import { setEndDate, setStartDate } from "exnaton-frontend/store/FiltersSlice";
import { useAppDispatch, useAppSelector } from "exnaton-frontend/lib/hook";

const DatePicker = () => {
	const dispatch = useAppDispatch();
	const { startDate, endDate } = useAppSelector((state: RootState) => state.filters);
	const parsedEndDate = endDate ? parseISO(endDate) : null;
	const parsedStartDate = startDate ? parseISO(startDate) : null;
	const [localStartDate, setLocalStartDate] = useState(parsedStartDate || parseISO("2023-02-01"));
	const [localEndDate, setLocalEndDate] = useState(parsedEndDate || parseISO("2023-02-01"));
	const [isStartPopoverOpen, setStartPopoverOpen] = useState(false);
	const [isEndPopoverOpen, setEndPopoverOpen] = useState(false);

	const handleStartDateSelect = (date: Date | undefined) => {
		const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
		dispatch(setStartDate(formattedDate));
		setLocalStartDate(date || parseISO("2023-02-01"));
		setStartPopoverOpen(false);
	};

	const handleEndDateSelect = (date: Date | undefined) => {
		const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
		dispatch(setEndDate(formattedDate));
		setLocalEndDate(date || parseISO("2023-03-01"));
		setEndPopoverOpen(false);
	};

	return (
		<div className="flex flex-col gap-4">
			<Popover open={isStartPopoverOpen} onOpenChange={setStartPopoverOpen}>
				<label className="block text-gray-700 text-sm font-semibold mb-1">Start Date</label>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						onClick={() => setStartPopoverOpen(true)}
						className={cn("w-full pl-3 text-left font-normal", !startDate && "text-muted-foreground")}
					>
						{parsedStartDate ? format(parsedStartDate, "PPP") : <span>Pick a start date</span>}
						<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full p-0" align="start">
					<Calendar
						mode="single"
						selected={parsedStartDate || undefined}
						onSelect={handleStartDateSelect}
						month={localStartDate}
						disabled={(date) => date > new Date() || date < parseISO("2023-02-01")}
						initialFocus
					/>
				</PopoverContent>
			</Popover>

			<Popover open={isEndPopoverOpen} onOpenChange={setEndPopoverOpen}>
				<label className="block text-gray-700 text-sm font-semibold mb-1">End Date</label>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						onClick={() => setEndPopoverOpen(true)}
						className={cn("w-full pl-3 text-left font-normal", !endDate && "text-muted-foreground")}
					>
						{parsedEndDate ? format(parsedEndDate, "PPP") : <span>Pick an end date</span>}
						<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						selected={parsedEndDate || undefined}
						onSelect={handleEndDateSelect}
						month={localEndDate}
						disabled={(date) => date > new Date() || date < parseISO("2023-02-01")}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default DatePicker;
