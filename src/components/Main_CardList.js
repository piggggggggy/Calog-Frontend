import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useInView } from 'react-hook-inview';
import theme from '../shared/theme';

// elements & components
import Card from './Main_Card';
import { Text } from '../elements';
import Loading from '../pages/Loading3';


/** 
 * @param {*} props
 * @returns 검색결과
 * @역할 검색결과를 보여주는 컴포넌트
 * @담당자 : 박용태
*/

const CardList = (props) => {

  // const search_list = props.search_list;
  const search_list = useSelector((state) => state.search.filtered_list);
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
  const is_loaded = useSelector((state) => state.record.is_loaded);
  const [page, setPage] = useState({
    start: 0,
    end: 20,
  })

  const nextPage = () => {
    setPage({
      start: page.start,
      end: page.end + 20,
    })
  }

  console.log(page.end);

  if (!is_loaded || search_list.length === 0) {
    return <Loading/>;
  };

  return (
    <React.Fragment>
      {search_list.length === 0 ?
        <EmptyResult>
            {getRandom(1, 4) === 1 ? 
              <Fats>
                <svg width="282" height="256" viewBox="0 0 282 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M209.25 127.75L257.75 79.2499" stroke="#E4E4E4" stroke-width="20" stroke-linecap="round"/>
                  <path d="M209.25 79.25L257.75 127.75" stroke="#E4E4E4" stroke-width="20" stroke-linecap="round"/>
                  <path d="M131.786 176.62C131.786 176.62 98.2533 164.388 86 113.155" stroke="#565656" stroke-width="4.65702" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M205.753 172.365C220.606 237.327 176.085 256 140.5 256C104.916 256 77.1806 232.702 90.5771 172.365C101.634 122.559 106.059 81 144.71 81C183.362 81 194.797 124.438 205.753 172.365Z" fill="#6993FF"/>
                  <path d="M124.127 119.422C124.844 118.7 125.246 117.724 125.246 116.707C125.246 115.69 124.843 114.714 124.127 113.993C123.409 113.274 122.435 112.87 121.42 112.869C120.405 112.87 119.432 113.275 118.714 113.993C117.997 114.714 117.594 115.689 117.594 116.707C117.593 117.724 117.996 118.701 118.714 119.422C119.432 120.14 120.405 120.544 121.42 120.545C122.435 120.545 123.409 120.14 124.127 119.422Z" fill="white"/>
                  <path d="M143.261 119.422C142.544 120.14 141.571 120.544 140.556 120.545C139.541 120.544 138.567 120.14 137.85 119.422C137.132 118.701 136.729 117.724 136.729 116.706C136.729 115.689 137.132 114.713 137.85 113.993C138.567 113.274 139.541 112.87 140.556 112.869C141.571 112.87 142.544 113.274 143.261 113.993C143.979 114.713 144.382 115.689 144.382 116.706C144.382 117.724 143.979 118.701 143.261 119.422Z" fill="white"/>
                  <path d="M124.559 127.284C125.141 127.628 125.563 128.189 125.732 128.844C126.399 131.073 128.776 132.057 130.919 132.057C133.061 132.057 135.441 131.064 136.105 128.844C136.284 128.201 136.707 127.653 137.285 127.318C137.862 126.983 138.548 126.889 139.193 127.055C139.84 127.222 140.396 127.635 140.741 128.206C141.088 128.777 141.197 129.462 141.045 130.112C139.724 134.585 135.472 137.176 130.919 137.176C126.539 137.176 121.912 134.622 120.792 130.118C120.628 129.461 120.73 128.765 121.076 128.183C121.42 127.6 121.981 127.178 122.637 127.009C123.289 126.844 123.979 126.942 124.559 127.284Z" fill="white"/>
                  <path d="M181.066 162.64C181.066 162.64 214.599 150.408 226.852 99.1743" stroke="#565656" stroke-width="4.65702" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22.0366 8.9558H17.0704V24.2182H16.8591L6.36326 8.9558H1.97238V33H6.96202V17.7258H7.14986L17.7162 33H22.0366V8.9558ZM46.7062 21.6851C46.7062 14.3039 42.1206 10.0608 36.1317 10.0608C30.1096 10.0608 25.5571 14.3039 25.5571 21.6851C25.5571 29.0442 30.1096 33.3094 36.1317 33.3094C42.1206 33.3094 46.7062 29.0663 46.7062 21.6851ZM30.3306 21.6851C30.3306 16.8564 32.6289 14.2265 36.1317 14.2265C39.6344 14.2265 41.9438 16.8564 41.9438 21.6851C41.9438 26.5138 39.6344 29.1436 36.1317 29.1436C32.6289 29.1436 30.3306 26.5138 30.3306 21.6851ZM58.2293 33.3522C63.6886 33.3522 67.0816 29.607 67.0816 24.0539C67.0816 18.4655 63.6886 14.732 58.2293 14.732C52.7818 14.732 49.3771 18.4655 49.3771 24.0539C49.3771 29.607 52.7818 33.3522 58.2293 33.3522ZM54.3668 24.0186C54.3668 20.8605 55.6934 18.4889 58.2646 18.4889C60.777 18.4889 62.0919 20.8605 62.0919 24.0186C62.0919 27.1885 60.777 29.5366 58.2646 29.5366C55.6934 29.5366 54.3668 27.1885 54.3668 24.0186ZM76.5492 33.2901C81.045 33.2901 83.8392 30.2058 83.8392 25.6326C83.8392 21.0304 81.045 17.9558 76.5492 17.9558C72.063 17.9558 69.2591 21.0304 69.2591 25.6326C69.2591 30.2058 72.063 33.2901 76.5492 33.2901ZM73.3682 25.6036C73.3682 23.0028 74.4608 21.0497 76.5782 21.0497C78.6472 21.0497 79.7301 23.0028 79.7301 25.6036C79.7301 28.2141 78.6472 30.1478 76.5782 30.1478C74.4608 30.1478 73.3682 28.2141 73.3682 25.6036ZM89.6112 33.2935C91.1022 33.2935 92.3937 32.049 92.4054 30.511C92.3937 28.9848 91.1022 27.7403 89.6112 27.7403C88.0732 27.7403 86.8053 28.9848 86.8288 30.511C86.8053 32.049 88.0732 33.2935 89.6112 33.2935ZM99.2331 33.2935C100.724 33.2935 102.016 32.049 102.027 30.511C102.016 28.9848 100.724 27.7403 99.2331 27.7403C97.6951 27.7403 96.4272 28.9848 96.4507 30.511C96.4272 32.049 97.6951 33.2935 99.2331 33.2935ZM108.855 33.2935C110.346 33.2935 111.637 32.049 111.649 30.511C111.637 28.9848 110.346 27.7403 108.855 27.7403C107.317 27.7403 106.049 28.9848 106.073 30.511C106.049 32.049 107.317 33.2935 108.855 33.2935Z" fill="#8C8C8C"/>
                </svg>
              </Fats>
              : getRandom(1, 4) === 2 ?
              <Fats>
                <svg width="282" height="250" viewBox="0 0 282 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M209.25 127.75L257.75 79.2499" stroke="#E4E4E4" stroke-width="20" stroke-linecap="round"/>
                  <path d="M209.25 79.25L257.75 127.75" stroke="#E4E4E4" stroke-width="20" stroke-linecap="round"/>
                  <path d="M222.323 165.5C240.656 223.695 186.717 250 142.792 250C98.8676 250 63.6205 219.551 80.1557 165.5C93.8045 120.883 103.271 81 147.195 81C191.12 81 208.798 122.565 222.323 165.5Z" fill="#FFE899"/>
                  <path d="M139.352 125.984C140.136 125.193 140.576 124.125 140.576 123.011C140.576 121.898 140.136 120.83 139.352 120.04C138.567 119.254 137.502 118.811 136.392 118.81C135.281 118.812 134.217 119.254 133.433 120.04C132.648 120.829 132.207 121.898 132.207 123.011C132.207 124.125 132.647 125.194 133.433 125.984C134.217 126.77 135.281 127.212 136.392 127.214C137.502 127.213 138.567 126.77 139.352 125.984Z" fill="#F19F13"/>
                  <path d="M160.279 125.984C159.494 126.77 158.43 127.212 157.32 127.214C156.21 127.212 155.145 126.77 154.361 125.984C153.576 125.194 153.135 124.125 153.135 123.011C153.135 121.898 153.576 120.829 154.361 120.04C155.145 119.254 156.21 118.812 157.32 118.81C158.43 118.812 159.494 119.254 160.279 120.04C161.064 120.829 161.504 121.898 161.504 123.011C161.505 124.125 161.064 125.194 160.279 125.984Z" fill="#F19F13"/>
                  <path d="M139.825 134.595C140.462 134.972 140.923 135.586 141.108 136.303C141.837 138.743 144.438 139.821 146.78 139.821C149.123 139.821 151.727 138.734 152.453 136.303C152.648 135.599 153.112 134.999 153.744 134.632C154.375 134.266 155.124 134.163 155.831 134.345C156.538 134.527 157.145 134.979 157.523 135.604C157.903 136.23 158.022 136.979 157.855 137.691C156.411 142.588 151.761 145.424 146.78 145.424C141.991 145.424 136.93 142.628 135.705 137.698C135.525 136.978 135.637 136.217 136.016 135.579C136.392 134.941 137.006 134.479 137.722 134.294C138.435 134.113 139.191 134.221 139.825 134.595Z" fill="#F19F13"/>
                  <path d="M169.464 130.451L166.153 133.765" stroke="#ED6358" stroke-width="1.78431" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M173.793 130.451L170.482 133.765" stroke="#ED6358" stroke-width="1.78431" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M161.569 141.922C161.569 141.922 153.858 138.971 155.408 132.235" stroke="#F19F13" stroke-width="4.84314" stroke-miterlimit="10" stroke-linecap="round"/>
                  <path d="M22.0366 8.9558H17.0704V24.2182H16.8591L6.36326 8.9558H1.97238V33H6.96202V17.7258H7.14986L17.7162 33H22.0366V8.9558ZM46.7062 21.6851C46.7062 14.3039 42.1206 10.0608 36.1317 10.0608C30.1096 10.0608 25.5571 14.3039 25.5571 21.6851C25.5571 29.0442 30.1096 33.3094 36.1317 33.3094C42.1206 33.3094 46.7062 29.0663 46.7062 21.6851ZM30.3306 21.6851C30.3306 16.8564 32.6289 14.2265 36.1317 14.2265C39.6344 14.2265 41.9438 16.8564 41.9438 21.6851C41.9438 26.5138 39.6344 29.1436 36.1317 29.1436C32.6289 29.1436 30.3306 26.5138 30.3306 21.6851ZM58.2293 33.3522C63.6886 33.3522 67.0816 29.607 67.0816 24.0539C67.0816 18.4655 63.6886 14.732 58.2293 14.732C52.7818 14.732 49.3771 18.4655 49.3771 24.0539C49.3771 29.607 52.7818 33.3522 58.2293 33.3522ZM54.3668 24.0186C54.3668 20.8605 55.6934 18.4889 58.2646 18.4889C60.777 18.4889 62.0919 20.8605 62.0919 24.0186C62.0919 27.1885 60.777 29.5366 58.2646 29.5366C55.6934 29.5366 54.3668 27.1885 54.3668 24.0186ZM76.5492 33.2901C81.045 33.2901 83.8392 30.2058 83.8392 25.6326C83.8392 21.0304 81.045 17.9558 76.5492 17.9558C72.063 17.9558 69.2591 21.0304 69.2591 25.6326C69.2591 30.2058 72.063 33.2901 76.5492 33.2901ZM73.3682 25.6036C73.3682 23.0028 74.4608 21.0497 76.5782 21.0497C78.6472 21.0497 79.7301 23.0028 79.7301 25.6036C79.7301 28.2141 78.6472 30.1478 76.5782 30.1478C74.4608 30.1478 73.3682 28.2141 73.3682 25.6036ZM89.6112 33.2935C91.1022 33.2935 92.3937 32.049 92.4054 30.511C92.3937 28.9848 91.1022 27.7403 89.6112 27.7403C88.0732 27.7403 86.8053 28.9848 86.8288 30.511C86.8053 32.049 88.0732 33.2935 89.6112 33.2935ZM99.2331 33.2935C100.724 33.2935 102.016 32.049 102.027 30.511C102.016 28.9848 100.724 27.7403 99.2331 27.7403C97.6951 27.7403 96.4272 28.9848 96.4507 30.511C96.4272 32.049 97.6951 33.2935 99.2331 33.2935ZM108.855 33.2935C110.346 33.2935 111.637 32.049 111.649 30.511C111.637 28.9848 110.346 27.7403 108.855 27.7403C107.317 27.7403 106.049 28.9848 106.073 30.511C106.049 32.049 107.317 33.2935 108.855 33.2935Z" fill="#8C8C8C"/>
                </svg>
              </Fats>
              :
              <Fats>
                <svg width="282" height="250" viewBox="0 0 282 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M209.25 127.75L257.75 79.2499" stroke="#E4E4E4" stroke-width="20" stroke-linecap="round"/>
                  <path d="M209.25 79.25L257.75 127.75" stroke="#E4E4E4" stroke-width="20" stroke-linecap="round"/>
                  <path d="M166.648 155.795C166.648 155.795 205.155 155.401 237 202.646" stroke="#565656" stroke-width="5.03771" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M80.5769 166.5C62.49 224.006 115.706 250 159.042 250C202.378 250 237.152 219.912 220.839 166.5C207.362 122.411 198.032 83 154.698 83C111.364 83 93.9204 124.073 80.5769 166.5Z" fill="#EC6262"/>
                  <path d="M184.587 128.071C185.13 128.071 185.667 127.963 186.168 127.755C186.669 127.546 187.124 127.241 187.507 126.855C188.282 126.075 188.716 125.019 188.716 123.918C188.716 122.818 188.281 121.762 187.507 120.982C187.124 120.597 186.669 120.291 186.168 120.083C185.667 119.874 185.13 119.767 184.587 119.767C183.492 119.768 182.442 120.205 181.668 120.982C180.894 121.762 180.459 122.818 180.459 123.918C180.459 125.019 180.893 126.075 181.668 126.855C182.442 127.632 183.492 128.069 184.587 128.071Z" fill="white"/>
                  <path d="M159.813 123.918C159.812 122.818 160.247 121.762 161.022 120.982C161.405 120.597 161.86 120.291 162.36 120.083C162.861 119.874 163.399 119.767 163.941 119.767C165.036 119.768 166.086 120.205 166.86 120.982C167.635 121.762 168.069 122.818 168.069 123.918C168.07 125.019 167.635 126.075 166.86 126.855C166.086 127.632 165.036 128.069 163.941 128.071C163.399 128.071 162.861 127.963 162.36 127.755C161.86 127.546 161.405 127.241 161.022 126.855C160.247 126.075 159.812 125.019 159.813 123.918Z" fill="white"/>
                  <path d="M183.254 135.012C183.962 135.191 184.571 135.645 184.945 136.274C185.322 136.902 185.436 137.654 185.262 138.365C184.08 143.238 179.101 146.032 174.376 146.056C169.462 146.081 164.86 143.303 163.408 138.472C163.241 137.768 163.356 137.028 163.726 136.407C164.096 135.788 164.693 135.338 165.389 135.154C166.085 134.971 166.825 135.069 167.45 135.428C168.074 135.788 168.534 136.378 168.732 137.072C169.461 139.476 172.034 140.531 174.347 140.519C176.66 140.507 179.218 139.429 179.923 137.015C180.102 136.305 180.555 135.696 181.182 135.32C181.805 134.947 182.55 134.836 183.254 135.012Z" fill="white"/>
                  <path d="M107.352 163.352C107.352 163.352 68.8451 162.958 37 210.202" stroke="#565656" stroke-width="5.03771" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22.0366 8.9558H17.0704V24.2182H16.8591L6.36326 8.9558H1.97238V33H6.96202V17.7258H7.14986L17.7162 33H22.0366V8.9558ZM46.7062 21.6851C46.7062 14.3039 42.1206 10.0608 36.1317 10.0608C30.1096 10.0608 25.5571 14.3039 25.5571 21.6851C25.5571 29.0442 30.1096 33.3094 36.1317 33.3094C42.1206 33.3094 46.7062 29.0663 46.7062 21.6851ZM30.3306 21.6851C30.3306 16.8564 32.6289 14.2265 36.1317 14.2265C39.6344 14.2265 41.9438 16.8564 41.9438 21.6851C41.9438 26.5138 39.6344 29.1436 36.1317 29.1436C32.6289 29.1436 30.3306 26.5138 30.3306 21.6851ZM58.2293 33.3522C63.6886 33.3522 67.0816 29.607 67.0816 24.0539C67.0816 18.4655 63.6886 14.732 58.2293 14.732C52.7818 14.732 49.3771 18.4655 49.3771 24.0539C49.3771 29.607 52.7818 33.3522 58.2293 33.3522ZM54.3668 24.0186C54.3668 20.8605 55.6934 18.4889 58.2646 18.4889C60.777 18.4889 62.0919 20.8605 62.0919 24.0186C62.0919 27.1885 60.777 29.5366 58.2646 29.5366C55.6934 29.5366 54.3668 27.1885 54.3668 24.0186ZM76.5492 33.2901C81.045 33.2901 83.8392 30.2058 83.8392 25.6326C83.8392 21.0304 81.045 17.9558 76.5492 17.9558C72.063 17.9558 69.2591 21.0304 69.2591 25.6326C69.2591 30.2058 72.063 33.2901 76.5492 33.2901ZM73.3682 25.6036C73.3682 23.0028 74.4608 21.0497 76.5782 21.0497C78.6472 21.0497 79.7301 23.0028 79.7301 25.6036C79.7301 28.2141 78.6472 30.1478 76.5782 30.1478C74.4608 30.1478 73.3682 28.2141 73.3682 25.6036ZM89.6112 33.2935C91.1022 33.2935 92.3937 32.049 92.4054 30.511C92.3937 28.9848 91.1022 27.7403 89.6112 27.7403C88.0732 27.7403 86.8053 28.9848 86.8288 30.511C86.8053 32.049 88.0732 33.2935 89.6112 33.2935ZM99.2331 33.2935C100.724 33.2935 102.016 32.049 102.027 30.511C102.016 28.9848 100.724 27.7403 99.2331 27.7403C97.6951 27.7403 96.4272 28.9848 96.4507 30.511C96.4272 32.049 97.6951 33.2935 99.2331 33.2935ZM108.855 33.2935C110.346 33.2935 111.637 32.049 111.649 30.511C111.637 28.9848 110.346 27.7403 108.855 27.7403C107.317 27.7403 106.049 28.9848 106.073 30.511C106.049 32.049 107.317 33.2935 108.855 33.2935Z" fill="#8C8C8C"/>
                </svg>
              </Fats>
          }
          
          <Text size="28px" m_size="22px" bold margin="7vh 0 2vh 0" >앗! 검색결과가 없어요 ㅠㅠ</Text>
          <Text size="17px" m_size="15px" bold>다른 키워드를 검색해주세요!</Text>
        </EmptyResult>
        :
        <CardContainer>
          {search_list && search_list.slice(page.start, page.end).map((result, idx) => {     
            return <Card key={result.foodId} {...result}/>;
            })}
          {search_list?.length > page.end ? 
            <MoreBtn onClick={nextPage}>
              <Text size="13px" m_size="13px" padding="0" margin="0">더보기</Text>
            </MoreBtn> 
          : ''}
        </CardContainer>
      }
    </React.Fragment>
  );
}

CardList.defaultProps = {

}

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  column-gap: 1.8vh;
`;

const EmptyResult = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Fats = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media ${theme.device.mobileM} {
    width: 60%;
    height: 30vh;
  } 
`;

const MoreBtn = styled.div`
  width: 100%;
  height: 4vh;
  padding: 1.1vh 6%;
  background: rgba(196, 196, 196, 0.19);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default CardList;