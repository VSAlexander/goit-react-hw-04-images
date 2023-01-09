import { Oval } from 'react-loader-spinner';
import css from './Loader.module.css';

export function Loader() {
  return (
    <div className={css.loaderWrapper}>
      <Oval
        height={80}
        width={80}
        color="#4653aa"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4653aa"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
}
