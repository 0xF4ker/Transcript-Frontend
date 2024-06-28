// src/CollapsibleRow.tsx

import React, { useState } from "react";
import { Box, Button, Collapse, Typography } from "@mui/material";

interface CollapsibleRowProps {
	row: any;
}

const CollapsibleRow: React.FC<CollapsibleRowProps> = ({ row }) => {
	const [open, setOpen] = useState(false);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	return (
		<Box>
			<Button onClick={handleToggle}>{open ? "Hide" : "Show"} Details</Button>
			<Collapse in={open}>
				<Box mt={2}>
					<Typography variant="body2">Additional details for {row.name}</Typography>
					{/* Add more detailed information about the row here */}
				</Box>
			</Collapse>
		</Box>
	);
};

export default CollapsibleRow;
