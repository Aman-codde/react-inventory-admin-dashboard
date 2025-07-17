const Pagination = ({onPrev, onNext, currentPage, totalPages}) => {
    return(
        <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
            onClick={onPrev}
            disabled={currentPage === 1}
            style={{ marginRight: "0.5rem", padding: "0.5rem 0.75rem" }} // Adjusted padding & margin
            >
            Previous
            </button>
            <span style={{ margin: "0 0.5rem" }}>
            {" "}
            {/* Added margin for spacing */}
            Page {currentPage} of {totalPages > 0 ? totalPages : 1}
            </span>
            <button
            onClick={onNext}
            disabled={currentPage === totalPages || totalPages === 0}
            style={{ marginLeft: "0.5rem", padding: "0.5rem 0.75rem" }} // Adjusted padding & margin
            >
            Next
            </button>
        </div>
    )
}

export default Pagination;