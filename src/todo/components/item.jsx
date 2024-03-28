import { memo, useState, useCallback, useEffect } from "react";
import classnames from "classnames";

import { Input } from "./input";

import { TOGGLE_ITEM, REMOVE_ITEM, UPDATE_ITEM } from "../constants";

export const Item = memo(function Item({
	todo,
	dispatch,
	index,
	setCheckedList,
	checkedList,
}) {
	const time = new Date();

	const hours = time.getHours();
	const minutes = time.getMinutes();
	const seconds = time.getSeconds();

	const [isWritable, setIsWritable] = useState(false);
	const { title, completed, id, completedTime, addedTime } = todo;

	const [isFading, setIsFading] = useState(false);

	const toggleItem = useCallback(() => {
		dispatch({
			type: TOGGLE_ITEM,
			payload: { id: id, completedTime: `${hours}:${minutes}:${seconds}` },
		});

		console.log("Hello inmnnn incuuuu out  ", id);

		// if (checkedList?.includes(id)) {
		// 	console.log("Hello inmnnn incuuuu");
			setCheckedList((prev) =>
				prev?.includes(id)
					? prev?.filter((item) => item !== id)
					: [id, ...prev],
			);
		// } else {
		// 	console.log("Hello inmnnn incuuuu elsssss");
		// 	setCheckedList((prev) => [id, ...prev]);
		// }
	}, [dispatch]);
	const removeItem = useCallback(
		() => dispatch({ type: REMOVE_ITEM, payload: { id } }),
		[dispatch],
	);
	const updateItem = useCallback(
		(id, title) => {
			console.log("updateItem");
			dispatch({
				type: UPDATE_ITEM,
				payload: {
					id: id,
					title: title,
					completedTime: `${hours}:${minutes}:${seconds}`,
				},
			});
		},
		[dispatch],
	);

	const handleDoubleClick = useCallback(() => {
		setIsWritable(true);
	}, []);

	const handleBlur = useCallback(() => {
		setIsWritable(false);
	}, []);

	const handleUpdate = useCallback(
		(title) => {
			if (title.length === 0) removeItem(id);
			else updateItem(id, title);

			setIsWritable(false);
		},
		[id, removeItem, updateItem],
	);

	useEffect(() => {
		if (!completed && !isFading) {
			setIsFading(true);
			const fadeTimer = setTimeout(() => {
				setIsFading(false);
			}, 15000);
			return () => clearTimeout(fadeTimer);
		}
	}, [completed, isFading]);

	return (
		<li
			className={classnames({ completed: todo.completed })}
			data-testid="todo-item"
		>
			<div className="view">
				{isWritable ? (
					<Input
						onSubmit={handleUpdate}
						label="Edit Todo Input"
						defaultValue={title}
						onBlur={handleBlur}
					/>
				) : (
					<div style={{ display: "flex", gap: "24px" }}>
						<input
							className="toggle"
							type="checkbox"
							data-testid="todo-item-toggle"
							checked={completed}
							onChange={toggleItem}
						/>
						<label
							data-testid="todo-item-label"
							onDoubleClick={handleDoubleClick}
							className="fading"
							style={{
								width: "40%",
								color:
									checkedList[2] === id
										? "yellow"
										: checkedList[1] === id
											? "magenta"
											: checkedList[0] === id
												? "green"
												: "gray",
							}}
						>
							{title}
						</label>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<p style={{ fontSize: "12px", margin: 0 }}>Added time</p>
							<p style={{ fontSize: "13px", margin: 0 }}>{addedTime}</p>
						</div>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<p style={{ fontSize: "12px", margin: 0 }}>Completed time</p>
							<p style={{ fontSize: "13px", margin: 0 }}>{completedTime}</p>
						</div>
						<button
							className="destroy"
							data-testid="todo-item-button"
							onClick={removeItem}
						/>
					</div>
				)}
			</div>
		</li>
	);
});
