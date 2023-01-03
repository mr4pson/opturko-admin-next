import { NextRouter } from 'next/router';
import { signin } from '../../redux/slicers/authSlicer';
import { AppDispatch } from '../../redux/store';

const onSubmit =
  (router: NextRouter, dispatch: AppDispatch) => async (values: any) => {
    const result = (await dispatch(signin(values))) as any;

    if (!result.error) {
      router.push('/categories');
    }
  };

export { onSubmit };
