const ErrorBoundary = ({error} : {error: Error}) => {
  return (
    <div>
        <h2 className="text-center text-3xl">Parece que ha ocurrido un error! recarga la página, por favor.</h2>
        {error.message}
    </div>
  )
}

export default ErrorBoundary;
