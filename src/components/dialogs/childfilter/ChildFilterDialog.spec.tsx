import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChildFilterDialog from './ChildFilterDialog';
import { ReportActionType } from 'reducers/ReportReducer';

test('Child Filter Dialog display and interaction', () => {
  const mockDispatch = jest.fn();

  render(
    <ChildFilterDialog
      dispatch={mockDispatch}
      filterString='User1'
      allErrors={[[]]}
      data={{ selectedError: '', selectedErrorKey: '' }}
    />
  );

  expect(screen.getByDisplayValue('User1')).toBeInTheDocument();

  fireEvent.change(screen.getByDisplayValue('User1'), {
    target: {
      value: 'User2',
    },
  });

  expect(mockDispatch).toHaveBeenCalledWith({
    type: ReportActionType.HIDE_ROWS,
    payload: {
      filter: 'User2',
      selectedError: '',
      selectedErrorKey: '',
    },
  });
});
