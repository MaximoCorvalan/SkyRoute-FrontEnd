
import LoaderGif from '../../../assets/Loader1.gif'; // Cambia a Loader2.gif si prefieres el otro
import './Loader.css';
export const Loader = () => {
  return (
    <div className='Loader-Container'>
      <img src={LoaderGif} className='Loader__gift' alt="Loading..." />
    </div>
  )
}
