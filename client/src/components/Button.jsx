function Button(props) {
	const { name, className, handleClick, icons } = props;
	return (
		<button className={className} onClick={handleClick}>
			{icons}
			{name}
		</button>
	);
}

export default Button;
