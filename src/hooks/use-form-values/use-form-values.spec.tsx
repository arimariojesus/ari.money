import { renderHook } from "@testing-library/react-hooks";
import { useFormValues } from ".";

const makeSut = () => {
  const initialState = {
    test: 0,
  };

  const hookUtils = renderHook(() => useFormValues(initialState));

  return {
    initialState,
    ...hookUtils
  };
};

describe('UseFormValues Hook', () => {
  it('should return initially formValues correctly', () => {
    const { initialState, result } = makeSut();
    expect(result.current.formValues).toStrictEqual(initialState);
  });
});
