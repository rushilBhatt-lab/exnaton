import React from "react";

const ChartSkeleton = () => {
	return (
		<div className="border border-gray-300 shadow rounded-lg p-4  mx-auto w-[800px]">
			<div className="flex justify-between px-6 py-4">
				<div>
					<div className="h-4 bg-gray-300 rounded w-48 mb-2"></div>
					<div className="h-3 bg-gray-200 rounded w-32"></div>
				</div>
				<div className="h-8 bg-gray-300 rounded w-20"></div>
			</div>
			<div className="p-6">
				<div className="relative h-60 w-full bg-gray-100 rounded-lg">
					<div className="absolute left-0 top-0 h-full w-6 bg-gray-200"></div>

					<div className="absolute bottom-0 left-0 h-6 w-full bg-gray-200"></div>

					<div className="absolute top-8 left-8 h-2 w-3/4 bg-gray-300 rounded-full animate-pulse"></div>
					<div className="absolute top-16 left-8 h-2 w-2/3 bg-gray-300 rounded-full animate-pulse"></div>
					<div className="absolute top-24 left-8 h-2 w-1/2 bg-gray-300 rounded-full animate-pulse"></div>
					<div className="absolute top-36 left-8 h-2 w-3/4 bg-gray-300 rounded-full animate-pulse"></div>
					<div className="absolute top-44 left-8 h-2 w-2/3 bg-gray-300 rounded-full animate-pulse"></div>
				</div>
			</div>
		</div>
	);
};

export default ChartSkeleton;
