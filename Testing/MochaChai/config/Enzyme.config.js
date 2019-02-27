import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

//在使用Enzyme 前需要先适配React对应的版本
Enzyme.configure({
    adapter:new Adapter()
})
export default Enzyme;