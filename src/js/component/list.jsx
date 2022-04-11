import propTypes from "prop-types";
import React, { useState } from "react";

const List = (props) => {
	const [style, setStyle] = useState({ display: "none" });

	return (
		<li
			className="Li list-group-item col-4 border-0 shadow p-3 bg-white mb-0"
			onMouseOver={(e) => setStyle({ display: "block" })}
			onMouseOut={(e) => setStyle({ display: "none" })}>
			{props.inputTask}
			<button
				type="button"
				className="btn-close"
				aria-label="Close"
				onClick={props.quit}
				style={style}
			/>
		</li>
	);
};

List.propTypes = {
	inputTask: propTypes.string,
	quit: propTypes.func,
};

export default List;
