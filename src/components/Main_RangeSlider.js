import React from 'react';
import styled from 'styled-components';
import { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
// elements & components
import { Grid, Text } from '../elements';


/** 
 * @param {*} props
 * @returns 레인지 슬라이더
 * @역할 레인지 슬라이더 조절할 수 있게
 * @필수값 min(number)최소값, max(number)최대값, onChange(func)함수
 * @담당자 : 박용태
*/

const RangeSlider = ({min, max, onChange}) => {

  const [minVal, setMin] = useState(min);
  const [maxVal, setMax] = useState(max);
  const minRef = useRef(min);
  const maxRef = useRef(max);
  const range = useRef();

  // percentage 변환 함수
  const getPercent = useCallback((value) => {
    return Math.round(((value-min) / (max - min)) * 100);
  }, [min, max]);

  // 왼쪽 SliderRange 조절
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [minVal, getPercent]);

  // 오른쪽 SliderRange 조절
  useEffect(() => {
    const minPercent = getPercent(minRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // 변화 값 반환
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <React.Fragment>
      <RangeText>
        <Text size="13px" m_size="13px" color="#8C8C8C" bold>{Math.round(minVal/100)*100} kacl ~ {Math.round(maxVal/100)*100} kcal</Text>
      </RangeText>

      <SliderContainer>

        {/* 양쪽 thumb */}
        <ThumbContainer >
          <Thumb
            type="range"
            min={min}
            max={max}
            value={minVal}
            onChange={(e) => {
              const value = Math.min(Number(e.target.value), maxVal - 100);
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
              const value = Math.max(Number(e.target.value), minVal + 100);
              setMax(value);
              maxRef.current = value;
            }}
          />
        </ThumbContainer>

        {/* 작대기 배경 및 작대기 */}
        <Slider>
          <SliderTrack/>
          <SliderRange ref={range}/>
        </Slider>

      </SliderContainer>

    </React.Fragment>
  );
}

RangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

const RangeText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  line-height: 18px;

`;

const SliderContainer = styled.div`
  width: 100%;
`;

const ThumbContainer = styled.div`
  width: 100%;
  position: relative;
`;

const Slider = styled.div`
  position: relative;
  width: 100%;
`;

const SliderTrack = styled.div`
  border-radius: 4.5px;
  height: 9px;
  position: absolute;
  background: #E4E4E4;
  width: 100%;
  z-index: 1;
`;

const SliderRange = styled.div`
  border-radius: 4.5px;
  height: 9px;
  position: absolute;
  background: #FFE999;
  z-index: 2;
`;

const Thumb = styled.input`
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  pointer-events: none;
  position: absolute;
  height: 0;
  width: 100%;
  max-width: 370px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    background-color: #F19F13;
    border: none;
    border-radius: 50%;
    /* box-shadow: 0 0 1px 1px #ced4da; */
    cursor: pointer;
    height: 16px;
    width: 16px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
  }
`;

export default RangeSlider;