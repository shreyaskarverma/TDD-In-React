import React from "react";
import { shallow } from 'enzyme';
import { screen, render } from '@testing-library/react';
import Board from './Board';

describe("Basic rendering of board", () => {

    it("should render without crashing", () => {
        const wrapper = shallow(<Board />);
        expect(wrapper.exists()).toBe(true);
    });

    it("should have 9 squares", () => {
        const wrapper = shallow(<Board />);
        const squareComponents = wrapper.find('Square');
        expect(squareComponents.length).toBe(9);

    })

    it("should have initial status as 'Next player: X' and no winner", () => {
        const wrapper = shallow(<Board />);
        const statusElement = wrapper.find('.status');
        expect(statusElement.text()).toBe('Next player: X');
        expect(statusElement.text()).not.toMatch('Winner:');
    });
    
})

describe("Testing board functionality", () => {

    it("should update square value on click", () => {
        const wrapper = shallow(<Board />);
        const firstSquare = wrapper.find('Square').at(0);
        firstSquare.props().onSquareClick();
        const updatedSquare = wrapper.find('Square').at(0);
        expect(updatedSquare.prop('value')).toBe('X');
    });
      

    it("should not update value on clicking an already filled square", () => {
        const wrapper = shallow(<Board />);
        const firstSquare = wrapper.find('Square').at(0);
        firstSquare.props().onSquareClick();
        firstSquare.props().onSquareClick();
        const updatedSquare = wrapper.find('Square').at(0);
        const updatedValue = updatedSquare.prop('value');
        expect(updatedValue).toBe('X');
    });

    it("should alternate between 'X' and 'O' after every move", () => {
        const wrapper = shallow(<Board />);
        const firstSquare = wrapper.find('Square').at(0);
        firstSquare.props().onSquareClick();
        const secondSquare = wrapper.find('Square').at(1);
        secondSquare.props().onSquareClick();
        const updatedFirstSquare = wrapper.find('Square').at(0);
        const updatedSecondSquare = wrapper.find('Square').at(1);
        expect(updatedFirstSquare.prop('value')).not.toMatch(updatedSecondSquare.prop('value'));
    })

    it("should declare the winner correctly", () => {
        const wrapper = shallow(<Board />);
        wrapper.find('Square').at(0).props().onSquareClick(); // X
        wrapper.find('Square').at(1).props().onSquareClick(); // O
        wrapper.find('Square').at(3).props().onSquareClick(); // X
        wrapper.find('Square').at(4).props().onSquareClick(); // O
        wrapper.find('Square').at(6).props().onSquareClick(); // X
        const statusElement = wrapper.find('.status');
        expect(statusElement.text()).toMatch("Winner");
      });

      

})