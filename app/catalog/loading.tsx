import css from './loading.module.css'

const Loading = () => {
  return (
    <>
      <div className={css.background}>
        <div className={css.container}>
          <div className={css.spinner}></div>
          <h1 className={css.title}>Loading tracks...</h1>
          <p>Please wait while we fetch the best travel trucks for you</p>
        </div>
      </div>
    </>
  );
};

export default Loading;
