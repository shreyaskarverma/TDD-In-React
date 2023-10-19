import React from "react";
import { shallow } from 'enzyme';
import Square from "../Square/Square";

describe("Basic rendering of square", () => {

    it('should render without crashing', () => {
        const wrapper = shallow(<Square value={null} onClick={() => { }} />);
        expect(wrapper.exists()).toBe(true);
    });

    it('should display empty value if nothing is passed as the paramter', () => {
        const wrapper = shallow(<Square />);
        expect(wrapper.text()).toEqual('');
    });
});

describe("Testing square functionality", () => {

    it('should display the value provided in parameter', () => {
        const wrapper = shallow(<Square value="X" onSquareClick={() => {}} />);
        expect(wrapper.text()).toBe('X');
    });

    it('should call the provided click handler when clicked', () => {
        const onClick = jest.fn();
        const wrapper = shallow(<Square value="X" onSquareClick={onClick} />);
        wrapper.simulate('click');
        expect(onClick).toHaveBeenCalled();
    });
});

