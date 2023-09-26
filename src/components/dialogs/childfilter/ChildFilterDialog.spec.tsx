import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChildFilterDialog from './ChildFilterDialog';
import { ReportActionType } from 'reducers/ReportReducer';

test('Child Filter Dialog display and interaction', async () => {
  const mockDispatch = jest.fn();

  const allErrors = [
    ['1510', 'UPN invalid (wrong check letter at character 1)', 320],
  ];

  render(
    <ChildFilterDialog
      dispatch={mockDispatch}
      filterString='User1'
      allErrors={allErrors}
      data={{ selectedError: '', selectedErrorKey: '' }}
    />
  );

  expect(screen.getByText('1510')).toBeInTheDocument();

  const el = await screen.findByText('1510');

  fireEvent.click(el);

  expect(mockDispatch).toHaveBeenCalledWith({
    type: ReportActionType.HIDE_ROWS,
    payload: {
      filter: undefined,
      selectedError: allErrors[0][0],
      selectedErrorKey:
        'row-1510-UPN invalid (wrong check letter at character 1)-320',
    },
  });
});
