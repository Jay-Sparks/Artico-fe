

function ErrorPage(error) {
    return (
        <>
            <div>ErrorPage</div>
            <p>{error.message.err.toString()}</p>

        </>
    )
}

export default ErrorPage
