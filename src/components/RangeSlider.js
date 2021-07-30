import React from 'react';
import styled from 'styled-components';
import { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
// elements & components
import { Grid, Text } from '../elements';


/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 이 컴포넌트를 사용할 때 필수 props
 * @담당자 : 
*/

const RangeSlider = ({min, max, onChange}) => {
// dispatch
// props
  const [minVal, setMin] = useState(min);
  const [maxVal, setMax] = useState(max);
  const minRef = useRef(min);
  const maxRef = useRef(max);

  const range = useRef(null);
// useEffect & useCallback
  // Convert to percentage
  const getPercent = useCallback((value) => {
    Math.round(((value-min) / (max - min)) * 100);
  }, [min, max]);

  // Set width of the range to change from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [minVal, getPercent]);

  // Set width of the range to change from the right side
  useEffect(() => {
    const minPercent = getPercent(minRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <React.Fragment>
      <RangeText>
        <Text size="20px" bold>{minVal} kacl ~ {maxVal} kcal</Text>
      </RangeText>
      <SliderContainer>
        <Grid>
          <Thumb
            type="range"
            // style={{zIndex: "3"}}
            min={min}
            max={max}
            value={minVal}
            onChange={(e) => {
              const value = Math.min(Number(e.target.value), maxVal - 1);
              setMin(value);
              minRef.current = value;
            }}
            style={{ zIndex: minVal > max - 100 ? "5" : "3" }}
          />
          <Thumb
            type="range"
            style={{zIndex: "4"}}
            min={min}
            max={max}
            value={maxVal}
            onChange={(e) => {
              const value = Math.max(Number(e.target.value), minVal + 1);
              setMax(value);
              maxRef.current = value;
            }}
          />
        </Grid>
        <Slider>
          <SliderTrack/>
          <SliderRange ref={range}/>
        </Slider>
      </SliderContainer>
      
      {/* <SliderValue style={{left: "6px"}}>{minVal}</SliderValue>
      <SliderValue style={{right: "-4px"}}>{maxVal}</SliderValue> */}
    </React.Fragment>
  );
}

RangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

// RangeSlider.defaultProps = {

// }

const RangeText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const SliderContainer = styled.div`
  max-width: 400px;
`;

const Slider = styled.div`
  position: relative;
  width: 370px;
`;

const SliderTrack = styled.div`
  border-radius: 3px;
  height: 5px;
  position: absolute;
  background: lightgray;
  width: 100%;
  z-index: 1;
`;

const SliderRange = styled.div`
  border-radius: 3px;
  height: 5px;
  position: absolute;
  background: orange;
  z-index: 2;
`;

const Thumb = styled.input`
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  pointer-events: none;
  position: absolute;
  height: 0;
  width: 370px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    background-color: #f1f5f7;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px #ced4da;
    cursor: pointer;
    height: 18px;
    width: 18px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
  }
`;

const SliderValue = styled.div`
  color: #dee2e6;
  font-size: 12px;
  margin-top: 20px;
  position: absolute;
`;

export default RangeSlider;