import renderer from 'react-test-renderer';
import Start from './Start';
import { Tool } from 'Router';

it('renders Start page', () => {
  const handleClick = jest.fn();

  const props = {
    onClick: handleClick,
    tool: Tool.Tool903,
  };

  renderer.create(<Start {...props} />);
});
