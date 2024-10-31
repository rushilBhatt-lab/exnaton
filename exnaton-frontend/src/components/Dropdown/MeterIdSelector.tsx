"use client";

import React, { useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";

import { fetchMuids, setSelectedMuid } from "exnaton-frontend/store/FiltersSlice";
import { useAppDispatch, useAppSelector } from "exnaton-frontend/lib/hook";
import { RootState } from "exnaton-frontend/lib/store";

const MeterIdSelector = () => {
	const dispatch = useAppDispatch();
	const { muids, selectedMuid, loading, error } = useAppSelector((state: RootState) => state.filters);

	useEffect(() => {
		dispatch(fetchMuids());
	}, [dispatch]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="w-full">
					{selectedMuid ? selectedMuid.slice(0, 4) : "Select MUID"}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Select your meter Id</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{loading && <div>Loading...</div>}
				{error && <div>Error: {error}</div>}
				{muids.map((item) => (
					<DropdownMenuItem key={item.muid} onSelect={() => dispatch(setSelectedMuid(item.muid))}>
						{item.muid.slice(0, 4)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default MeterIdSelector;
