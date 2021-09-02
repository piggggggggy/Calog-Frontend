import React, { useState } from "react";

// css
import { Grid, Image, Text } from "../elements";
import styled from "styled-components";

// redux
import { delImage, addImage, delImgAll } from "../redux/modules/record";
import { useDispatch, useSelector } from "react-redux";

// image
import imageCompression from "browser-image-compression";
import imageAdd from "../img/addimg.png";

// lazyLoad
import LazyLoad from "react-lazyload";

// slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// history
import { history } from "../redux/configStore";

/**
 * @역할 기록 페이지에서 이미지 미리보기 컴포넌트 >> 1차 피드백 후 개선 사항 : 캘린더 상세에서 이미지 추가로 변경
 * @담당자 : 김나영
 */

const CalendarDate_Image = (props) => {
  const dispatch = useDispatch();

  const { setBtnFunc, fileInfo, type, same_list } = props;

  // 유저가 셀렉한 이미지 미리보기 리스트
  const data = useSelector((state) => state.record.img);
  const url_list = data.files;

  // 각 미리보기의 삭제 버튼 >> 이미지를 셀렉했을 때마다 미리보기가 추가되는게 아닌 default 박스가 있고 거기에 채워지는 방식으로 디자인됨
  const delBtnA = (e) => {
    e.preventDefault();
    dispatch(delImage(0));
    if (url_list?.length === 1) {
      setBtnFunc({
        color: "#9E9E9E",
        fontColor: "white",
      });
      dispatch(delImgAll());
    }
  };

  const delBtnB = (e) => {
    e.preventDefault();
    dispatch(delImage(1));
  };

  const delBtnC = (e) => {
    e.preventDefault();
    dispatch(delImage(2));
  };

  // 이미지
  const [fileUrl, setFileUrl] = useState({
    file: [],
  });

  const { file } = fileUrl;

  // 리사이징 옵션
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  // 리사이징 후 프리뷰
  const chgPreview = async (e) => {
    const imageFile = e.target.files;
    const newFileList = Array.from(imageFile);

    if (data?.length === 0 || data.type === type) {
      // 원본
      let files = [];

      for (let idx = 0; idx < imageFile?.length; idx++) {
        let image = imageFile[idx];

        // 리사이징
        try {
          const compressedFile = await imageCompression(image, options);
          const imageUrl = URL.createObjectURL(compressedFile);
          files.push(imageUrl);
        } catch (error) {
          window.alert(
            "앗, 이미지 업로드에 오류가 있어요! 관리자에게 문의해주세요😿"
          );
        }
      }
      setFileUrl({
        file: files,
      });
      dispatch(addImage({ files, type, newFileList }));
      setBtnFunc({
        color: "#FFE899",
        fontColor: "black",
      });
      fileInfo({
        imageFile,
      });
    } else {
      const imageFile = e.target.files;
      let files = [];

      for (let idx = 0; idx < imageFile?.length; idx++) {
        let image = imageFile[idx];

        // 리사이징
        try {
          const compressedFile = await imageCompression(image, options);
          const imageUrl = URL.createObjectURL(compressedFile);
          files.push(imageUrl);
        } catch (error) {
          window.alert(
            "앗, 이미지 업로드에 오류가 있어요! 관리자에게 문의해주세요😿"
          );
        }
      }

      setFileUrl({
        file: files,
      });

      let result = window.confirm("기록중인 데이터가 있어요! 변경하시겠어요?");
      if (result) {
        dispatch(delImgAll());
        dispatch(addImage({ files, type, newFileList }));
      } else {
        history.replace();
      }
    }
  };

  // slick setting
  // dots 유 / 반복 유 / 속도 / 한 번에 보여줄 스크롤 / 스크롤 시 1장 / 자동 넘김 방지
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  return (
    <React.Fragment>
      {same_list?.length === 0 ? (
        <React.Fragment>
          <Text size="13px" margin="2% 9.7% 0 9.7%" m_size="12px">
            이미지가 여러장인 경우, 한번에 선택이 가능해요!
          </Text>
          <LazyLoad>
            <label htmlFor="imgFile">
              {/* 미리보기 이미지 리스트가 없을 때 */}
              {(url_list?.length === 0 || data.type !== type) && (
                <Grid is_flex padding="4% 6%">
                  <Grid
                    bg={"#EEEEEE"}
                    width="31%"
                    height="12.9vh"
                    border_radius="8px"
                  >
                    <Image src={imageAdd} cursor="pointer" />
                  </Grid>
                  <Grid
                    bg={"#EEEEEE"}
                    width="31%"
                    height="12.9vh"
                    border_radius="8px"
                  >
                    <Image src={imageAdd} cursor="pointer" />
                  </Grid>
                  <Grid
                    bg={"#EEEEEE"}
                    width="31%"
                    height="12.9vh"
                    border_radius="8px"
                  >
                    <Image src={imageAdd} cursor="pointer" />
                  </Grid>
                </Grid>
              )}

              {/* 이미지 추가 1 */}
              {url_list?.length === 1 && data.type === type && (
                <Grid is_flex padding="4% 6%">
                  <Grid
                    bg={"#EEEEEE"}
                    width="31%"
                    height="12.9vh"
                    border_radius="8px"
                  >
                    <DelBtn onClick={delBtnA}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="10" cy="10" r="10" fill="#404040" />
                        <path
                          d="M9.99958 8.48936L12.7746 5.71436L14.2853 7.22507L11.5103 10.0001L14.2853 12.7751L12.7746 14.2858L9.99958 11.5108L7.22458 14.2858L5.71387 12.7751L8.48887 10.0001L5.71387 7.22507L7.22458 5.71436L9.99958 8.48936Z"
                          fill="white"
                        />
                      </svg>
                    </DelBtn>
                    <Image
                      src={url_list[0]}
                      height="12.9vh"
                      b_size="100% 100%"
                      border_radius="8px"
                    />
                  </Grid>
                  <Grid
                    bg={"#EEEEEE"}
                    width="31%"
                    height="12.9vh"
                    border_radius="8px"
                  >
                    <Image src={imageAdd} cursor="pointer" />
                  </Grid>
                  <Grid
                    bg={"#EEEEEE"}
                    width="31%"
                    height="12.9vh"
                    border_radius="8px"
                  >
                    <Image src={imageAdd} cursor="pointer" />
                  </Grid>
                </Grid>
              )}

              {/* 이미지 추가 2 */}
              {url_list?.length === 2 && data.type === type && (
                <Grid is_flex padding="4% 6%">
                  <Grid
                    bg={"#EEEEEE"}
                    width="31%"
                    height="12.9vh"
                    border_radius="8px"
                  >
                    <DelBtn onClick={delBtnA}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="10" cy="10" r="10" fill="#404040" />
                        <path
                          d="M9.99958 8.48936L12.7746 5.71436L14.2853 7.22507L11.5103 10.0001L14.2853 12.7751L12.7746 14.2858L9.99958 11.5108L7.22458 14.2858L5.71387 12.7751L8.48887 10.0001L5.71387 7.22507L7.22458 5.71436L9.99958 8.48936Z"
                          fill="white"
                        />
                      </svg>
                    </DelBtn>
                    <Image
                      src={url_list[0]}
                      height="12.9vh"
                      b_size="100% 100%"
                      border_radius="8px"
                    />
                  </Grid>
                  <Grid
                    bg={"#EEEEEE"}
                    width="31%"
                    height="12.9vh"
                    border_radius="8px"
                  >
                    <DelBtn onClick={delBtnB}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="10" cy="10" r="10" fill="#404040" />
                        <path
                          d="M9.99958 8.48936L12.7746 5.71436L14.2853 7.22507L11.5103 10.0001L14.2853 12.7751L12.7746 14.2858L9.99958 11.5108L7.22458 14.2858L5.71387 12.7751L8.48887 10.0001L5.71387 7.22507L7.22458 5.71436L9.99958 8.48936Z"
                          fill="white"
                        />
                      </svg>
                    </DelBtn>
                    <Image
                      src={url_list[1]}
                      height="12.9vh"
                      b_size="100% 100%"
                      border_radius="8px"
                    />
                  </Grid>
                  <Grid
                    bg={"#EEEEEE"}
                    width="31%"
                    height="12.9vh"
                    border_radius="8px"
                  >
                    <Image src={imageAdd} cursor="pointer" />
                  </Grid>
                </Grid>
              )}

              {/* 이미지 추가 3 */}
              {url_list?.length === 3 && data.type === type && (
                <Grid is_flex padding="4% 6%">
                  <Grid
                    bg={"#FFFBED"}
                    width="31%"
                    height="12.9vh"
                    border_radius="8px"
                  >
                    <DelBtn onClick={delBtnA}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="10" cy="10" r="10" fill="#404040" />
                        <path
                          d="M9.99958 8.48936L12.7746 5.71436L14.2853 7.22507L11.5103 10.0001L14.2853 12.7751L12.7746 14.2858L9.99958 11.5108L7.22458 14.2858L5.71387 12.7751L8.48887 10.0001L5.71387 7.22507L7.22458 5.71436L9.99958 8.48936Z"
                          fill="white"
                        />
                      </svg>
                    </DelBtn>
                    <Image
                      src={url_list[0]}
                      height="12.9vh"
                      b_size="100% 100%"
                      border_radius="8px"
                    />
                  </Grid>
                  <Grid
                    bg={"#FFFBED"}
                    width="31%"
                    height="12.9vh"
                    border_radius="8px"
                  >
                    <DelBtn onClick={delBtnB}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="10" cy="10" r="10" fill="#404040" />
                        <path
                          d="M9.99958 8.48936L12.7746 5.71436L14.2853 7.22507L11.5103 10.0001L14.2853 12.7751L12.7746 14.2858L9.99958 11.5108L7.22458 14.2858L5.71387 12.7751L8.48887 10.0001L5.71387 7.22507L7.22458 5.71436L9.99958 8.48936Z"
                          fill="white"
                        />
                      </svg>
                    </DelBtn>
                    <Image
                      src={url_list[1]}
                      height="12.9vh"
                      b_size="100% 100%"
                      border_radius="8px"
                    />
                  </Grid>
                  <Grid
                    bg={"#FFFBED"}
                    width="31%"
                    height="12.9vh"
                    border_radius="8px"
                  >
                    <DelBtn onClick={delBtnC}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="10" cy="10" r="10" fill="#404040" />
                        <path
                          d="M9.99958 8.48936L12.7746 5.71436L14.2853 7.22507L11.5103 10.0001L14.2853 12.7751L12.7746 14.2858L9.99958 11.5108L7.22458 14.2858L5.71387 12.7751L8.48887 10.0001L5.71387 7.22507L7.22458 5.71436L9.99958 8.48936Z"
                          fill="white"
                        />
                      </svg>
                    </DelBtn>
                    <Image
                      src={url_list[2]}
                      height="12.9vh"
                      b_size="100% 100%"
                      border_radius="8px"
                    />
                  </Grid>
                </Grid>
              )}
              <FileBox
                type="file"
                multiple
                accept="image/*"
                onChange={chgPreview}
                id="imgFile"
              />
            </label>
          </LazyLoad>
        </React.Fragment>
      ) : (
        // case2-2) 이미지가 있을 때
        <Grid
          margin="4% 9.7% 0 9.7%"
          bg={"#eee"}
          width="81%"
          height="221px"
          border_radius="8px"
          m_margin="4% 9.7% 0 9.7%"
        >
          <Slider {...settings}>
            {same_list?.map((i, idx) => {
              return (
                <Grid height="221px" cursor="pointer">
                  <Image height="221px" src={i} b_size="100% 100%" />
                </Grid>
              );
            })}
          </Slider>
        </Grid>
      )}
    </React.Fragment>
  );
};

const DelBtn = styled.div`
  position: relative;
  float: right;
  margin-top: -5%;
  cursor: pointer;
`;

const FileBox = styled.input`
  display: none;
`;

export default CalendarDate_Image;
