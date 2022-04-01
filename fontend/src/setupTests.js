import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
test('hi test',()=>{
    let data=10;
    expect(data).toBe(10);
})