import { GridLoader } from 'react-spinners'

const loading = () => {
  return (
    <div className="min-h-dvh flex justify-center items-center">
        <GridLoader color={'#bc15f4'} />
    </div>
  )
}

export default loading
