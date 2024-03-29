import { act, renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import { useFormValues } from ".";
import { render, screen } from "../../utils";

const makeSut = (initialState: any = { test: 0 }) => {
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
  
  it('should set formValues correctly', () => {
    const { initialState, result } = makeSut();
    
    expect(result.current.formValues).toStrictEqual(initialState);

    const changedValue = {
      test: 100,
    };
    
    act(() => {
      result.current.setFormValues(changedValue);
    });
    expect(result.current.formValues).toStrictEqual(changedValue);
  });
  
  it('should handle input changes correctly', () => {
    const formValues = {
      text: '123',
      number: 123,
      checkbox: false,
      radio: false,
    };
    const { result } = makeSut(formValues);

    expect(result.current.formValues).toStrictEqual(formValues);

    const inputs = (
      <>
        <input
          type="text"
          aria-label="text"
          name="text"
          onChange={result.current.handleChangeFormValues}
        />
        <input
          type="number"
          aria-label="number"
          name="number"
          onChange={result.current.handleChangeFormValues}
        />
        <input
          type="checkbox"
          aria-label="checkbox"
          name="checkbox"
          onChange={result.current.handleChangeFormValues}
        />
        <input
          type="radio"
          aria-label="radio"
          name="radio"
          onChange={result.current.handleChangeFormValues}
        />
      </>
    );
    
    render(inputs);
    
    const textInput = screen.getByLabelText('text');
    const numberInput = screen.getByLabelText('number');
    const checkboxInput = screen.getByLabelText('checkbox');
    const radioInput = screen.getByLabelText('radio');
    
    userEvent.type(textInput, 'test');
    expect(result.current.formValues.text).toBe('test');
    expect(result.current.formValues.number).toBe(formValues.number);
    expect(result.current.formValues.checkbox).toBe(formValues.checkbox);
    expect(result.current.formValues.radio).toBe(formValues.radio);
    
    userEvent.type(numberInput, '1000');
    expect(result.current.formValues.text).toBe('test');
    expect(result.current.formValues.number).toBe(1000);
    expect(result.current.formValues.checkbox).toBe(formValues.checkbox);
    expect(result.current.formValues.radio).toBe(formValues.radio);
    
    userEvent.click(checkboxInput);
    expect(result.current.formValues.text).toBe('test');
    expect(result.current.formValues.number).toBe(1000);
    expect(result.current.formValues.checkbox).toBe(true);
    expect(result.current.formValues.radio).toBe(formValues.radio);
    
    userEvent.click(radioInput);
    expect(result.current.formValues.text).toBe('test');
    expect(result.current.formValues.number).toBe(1000);
    expect(result.current.formValues.checkbox).toBe(true);
    expect(result.current.formValues.radio).toBe(true);
  });
  
  it('should call submit callback', () => {
    const { result } = makeSut();
    const submitCallback = jest.fn();

    const form = (
      <form onSubmit={result.current.handleSubmitFormValues(submitCallback)}>
        <input
          type="text"
          aria-label="text"
          name="text"
          onChange={result.current.handleChangeFormValues}
        />
        <button type="submit">Submit</button>
      </form>
    );

    render(form);

    act(() => {
      const submitButton = screen.getByRole('button', { name: /submit/i });
      userEvent.click(submitButton);
    });

    expect(submitCallback).toHaveBeenCalled();
  });
  
  it('should set loading state correctly', async () => {
    jest.useFakeTimers();
    const { result, waitForNextUpdate } = makeSut();
    const submitCallback = () => new Promise(resolve => setTimeout(resolve, 0));

    const form = (
      // @ts-ignore
      <form onSubmit={result.current.handleSubmitFormValues(submitCallback)}>
        <input
          type="text"
          aria-label="text"
          name="text"
          onChange={result.current.handleChangeFormValues}
        />
        <button type="submit">Submit</button>
      </form>
    );

    render(form);
    expect(result.current.loadingFormValues).toBe(false);

    act(() => {
      const submitButton = screen.getByRole('button', { name: /submit/i });
      userEvent.click(submitButton);
    });

    expect(result.current.loadingFormValues).toBe(true);
    jest.runAllTimers();
    await waitForNextUpdate();
    expect(result.current.loadingFormValues).toBe(false);
  });

  it('should clear formValues', () => {
    const { initialState, result } = makeSut();
    
    expect(result.current.formValues).toStrictEqual(initialState);

    const changedValue = {
      test: 100,
    };
    
    act(() => {
      result.current.setFormValues(changedValue);
    });
    expect(result.current.formValues).toStrictEqual(changedValue);
    
    act(() => {
      result.current.handleClearFormValues();
    });
    expect(result.current.formValues).toStrictEqual(initialState);
  });
});
