import ErrorMessage from "./ErrorMessage"

const pageNotFound = () => {
    return (
        <>
            <div className="container">
                <div className="pageContainer">
                    <div className="errorContainer">
                        <ErrorMessage />
                    </div>
                </div>
            </div>
        </>
    )
}

export default pageNotFound;
