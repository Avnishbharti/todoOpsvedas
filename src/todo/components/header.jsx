import { useCallback } from "react";
import { Input } from "./input";

import { ADD_ITEM } from "../constants";

export function Header({ dispatch }) {
	const time = new Date();

	const hours = time.getHours();
	const minutes = time.getMinutes();
	const seconds = time.getSeconds();

	const addItem = useCallback(
		(title) => {
			console.log("jhghgw", title);
			dispatch({
				type: ADD_ITEM,
				payload: {
					title: title,
					addedTime: `${hours}:${minutes}:${seconds}`,
					completedTime: "",
				},
			});
		},
		[dispatch],
	);

	return (
		<header className="header" data-testid="header">
			<h1>todos</h1>
			<Input
				onSubmit={addItem}
				label="New Todo Input"
				placeholder="What needs to be done?"
			/>
		</header>
	);
}
