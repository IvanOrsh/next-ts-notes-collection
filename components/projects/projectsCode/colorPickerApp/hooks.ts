import { useCallback, useMemo } from 'react';
import { useContext } from './context';

export const useDispatch = () => {
  const { dispatch } = useContext();

  return useMemo(() => dispatch, [dispatch]);
};

export const useHexColor = () => {
  const { hexColor } = useContext();
  return useMemo(() => hexColor, [hexColor]);
};

export const useUpdateHexCode = () => {
  const dispatch = useDispatch();
  return useCallback(
    (hexColor: string) =>
      dispatch({
        type: 'update-hex-color',
        payload: {
          hexColor,
        },
      }),
    [dispatch],
  );
};

export const useUpdateRGB = () => {
  const dispatch = useDispatch();
  return useCallback(
    (rgb: [number, number, number]) =>
      dispatch({
        type: 'update-rgb-color',
        payload: {
          rgb,
        },
      }),
    [dispatch],
  );
};

export const useUpdateHSL = () => {
  const dispatch = useDispatch();
  return useCallback(
    (hsl: [number, number, number]) =>
      dispatch({
        type: 'update-hsl-color',
        payload: {
          hsl,
        },
      }),
    [dispatch],
  );
};

export const useUpdateHSV = () => {
  const dispatch = useDispatch();
  return useCallback(
    (hsv: [number, number, number]) =>
      dispatch({
        type: 'update-hsv-color',
        payload: {
          hsv,
        },
      }),
    [dispatch],
  );
};

export const useUpdateCMYK = () => {
  const dispatch = useDispatch();
  return useCallback(
    (cmyk: [number, number, number, number]) =>
      dispatch({
        type: 'update-cmyk-color',
        payload: {
          cmyk,
        },
      }),
    [dispatch],
  );
};
