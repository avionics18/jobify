const NoResultsFound = ({ text = "No results found!" }) => {
    return (
        <p className="flex flex-col items-center gap-5">
            <img
                className="w-40"
                src="assets/empty_state.svg"
                alt="Empty State"
            />
            <span className="text-3xl font-light">{text}</span>
        </p>
    );
};

export default NoResultsFound;
