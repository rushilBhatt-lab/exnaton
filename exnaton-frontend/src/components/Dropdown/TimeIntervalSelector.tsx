"use client";

import React, { FC } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { timeIntervals } from "exnaton-frontend/utils/utils";

interface Props {
	selectedInterval: string;
	setSelectedInterval: (interval: string) => void;
}

const TimeIntervalSelector: FC<Props> = ({ selectedInterval, setSelectedInterval }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="w-full">
					{selectedInterval ? selectedInterval : "Select Interval"}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Select Interval</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{timeIntervals.map((interval) => (
					<DropdownMenuItem key={interval} onSelect={() => setSelectedInterval(interval)}>
						{interval}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default TimeIntervalSelector;
