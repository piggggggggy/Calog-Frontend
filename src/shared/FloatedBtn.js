import React, { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import theme from "./theme";

// moment
import moment from "moment";

// s3
import S3 from "react-aws-s3";
import imageCompression from "browser-image-compression";

// elements & components
import { Text } from "../elements";

// modules
import instance from "../redux/modules/instance";

// sentry
import * as Sentry from "@sentry/react";

// icons
import { TiDeleteOutline } from "react-icons/ti";

/**
 * @param {*} props
 * @returns 플롯버튼
 * @역할 pc 버전에서 우측 하단에 띄울 피드백 버튼
 * @담당자 : 박용태
 */

const FloatedBtn = (props) => {
  // feedback contents
  const phone = useRef();
  const good = useRef();
  const bad = useRef();
  const instagram = useRef();
  const date = moment().format("YYYY-MM-DD");

  // modal on off
  const [modal, setModal] = useState(true);

  // s3 이미지 업로드
  const file = useRef();
  const [_file, setFile] = useState(null);

  const deleteFile = () => {
    setFile(null);
  };

  const checkName = (e) => {
    setFile(e.target.files);
  };

  const accessKey = process.env.REACT_APP_S3_FEEDBACK_ACCESSKEY;
  const secretKey = process.env.REACT_APP_S3_FEEDBACK_SECRETKEY;
  const s3Bucket = process.env.REACT_APP_FEEDBACK_BUCKET_NAME;
  const region = process.env.REACT_APP_FEEDBACK_REGION;

  const config = {
    bucketName: s3Bucket,
    region: region,
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  };

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 720,
  };

  // feedback
  const submit = async (e) => {
    e.preventDefault();

    const phoneNum = phone.current.value;
    const instagramId = instagram.current.value;
    const goodContents = good.current.value;
    const badContents = bad.current.value;

    if (_file !== null) {
      const S3upload = new S3(config);
      const fileName = file.current.files[0].name;
      const refFile = file.current.files[0];

      try {
        const resizeFile = await imageCompression(refFile, options);
        S3upload.uploadFile(resizeFile, fileName).then((res) => {
          if (res.status === 204) {
            const url = res.location;

            if (goodContents && badContents) {
              instance
                .post("/api/notice/feedback", {
                  title: "피드백",
                  contents: goodContents + " / " + badContents,
                  date: date,
                  phoneNum: phoneNum,
                  instagramId: instagramId,
                  url: url,
                })
                .then((res) => {
                  setComplete(true);
                  deleteFile();
                })
                .catch((err) => {
                  Sentry.captureException(`Catched Error : ${err}`);
                  console.log("피드백전송에 오류가 있어요!", err);
                  window.alert(err, "피드백 작성에 오류가 있어요!");
                });
            } else {
              window.alert("필수항목을 모두 입력해주세요!");
            }
          }
        });
      } catch (err) {
        window.alert("제출에 실패했어요. 관리자에게 문의해주세요!");
      }
    } else {
      if (goodContents && badContents) {
        instance
          .post("/api/notice/feedback", {
            title: "피드백",
            contents: goodContents + " / " + badContents,
            date: date,
            phoneNum: phoneNum,
            instagramId: instagramId,
            url: "",
          })
          .then((res) => {
            setComplete(true);
            deleteFile();
          })
          .catch((err) => {
            Sentry.captureException(`Catched Error : ${err}`);
          });
      } else {
        window.alert("필수항목을 모두 입력해주세요!");
      }
    }
  };

  // on Modal!
  const onModal = () => {
    setModal(false);
    setComplete(false);
  };

  // off Modal!!
  const offModal = () => {
    setModal(true);
    deleteFile();
  };

  // 작성 후 화면전환
  const [complete, setComplete] = useState(false);

  return (
    <React.Fragment>
      {modal ? (
        <>
          {/* 플롯버튼 */}
          <ButtonContainer>
            <FloatedBody>
              <Text
                size="13px"
                lineheight="20px"
                bold
                color="#737373"
                padding="0"
                margin="0"
              >
                더 나은 서비스를 위하여
              </Text>
              <Text
                size="20px"
                lineheight="34px"
                bold
                color="#2A2A2A"
                padding="0"
                margin="0"
              >
                피드백을 해주세요!
              </Text>
            </FloatedBody>
            <FloatCircle onClick={onModal}>
              <svg
                width="50"
                height="58"
                viewBox="0 0 50 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29.6621 57.8696C22.1022 57.8696 14.2632 56.0185 8.40517 51.0122C0.928658 44.6233 -0.94327 33.9707 0.402535 24.6511C1.87025 14.4958 6.83481 5.75854 16.8538 2.13979C21.1254 0.596684 25.7162 0 30.2428 0C33.1482 0.00977408 36.0469 0.278176 38.9047 0.802029C41.8851 1.33671 44.4024 2.16012 46.4566 3.27226C48.5109 4.38441 49.537 5.7623 49.5348 7.40592C49.5348 8.04754 49.167 9.03185 48.4312 10.3589C47.5041 12.0256 46.3203 14.451 44.4852 15.2786C42.3166 16.2571 39.4132 14.0499 37.336 13.365C35.7094 12.8303 33.6568 12.563 31.178 12.563C23.9597 12.563 19.0754 17.8194 17.7777 24.6271C16.7479 30.0359 17.436 36.7168 21.0227 41.1135C23.047 43.5934 26.0145 44.92 29.1825 45.1237C33.8343 45.4268 38.2503 43.8966 42.6374 42.5668C44.4018 42.0311 45.4557 42.4465 46.6299 43.8035C47.5641 44.8841 48.3639 46.074 49.0119 47.347C49.6696 48.6302 49.9989 49.6322 50 50.3529C50 51.8554 49.1477 53.09 47.4431 54.0567C45.7386 55.0235 43.6864 55.7928 41.2868 56.3649C39.0121 56.9169 36.7021 57.3119 34.3733 57.5471C32.1639 57.7621 30.5936 57.8696 29.6621 57.8696Z"
                  fill="#F19F13"
                />
                <path
                  d="M27.3504 27.8062C27.5444 27.6118 27.6986 27.3813 27.8043 27.1277C27.9104 26.8737 27.965 26.601 27.9647 26.3257C27.9647 25.7713 27.745 25.2395 27.3536 24.8468C27.1604 24.6526 26.931 24.4983 26.6783 24.3928C26.424 24.2873 26.1515 24.2328 25.8762 24.2324C25.6009 24.232 25.3282 24.2865 25.0742 24.3928C24.8209 24.4974 24.5908 24.6511 24.3973 24.8451C24.0059 25.2378 23.7861 25.7697 23.7861 26.3241C23.7867 26.5994 23.8412 26.8718 23.9465 27.1262C24.0512 27.3799 24.2049 27.6105 24.3989 27.8047C24.5924 27.9987 24.8225 28.1524 25.0758 28.257C25.3298 28.3633 25.6025 28.4178 25.8778 28.4174C26.1532 28.4178 26.4258 28.3633 26.6798 28.257C26.9326 28.1515 27.1621 27.9972 27.3552 27.803L27.3504 27.8062Z"
                  fill="#F19F13"
                />
                <path
                  d="M37.78 27.8059C37.5873 28.0003 37.3577 28.1542 37.1047 28.2583C36.8506 28.3646 36.578 28.4191 36.3026 28.4187C36.0273 28.4194 35.7545 28.3648 35.5006 28.2583C35.2475 28.1526 35.0176 27.9984 34.8237 27.8044C34.6297 27.6102 34.476 27.3796 34.3713 27.1258C34.2655 26.8717 34.2109 26.5991 34.2109 26.3238C34.2109 25.7694 34.4307 25.2375 34.8221 24.8448C35.016 24.6508 35.2459 24.4966 35.499 24.3909C35.7531 24.285 36.0257 24.2305 36.301 24.2305C36.5764 24.2301 36.849 24.2846 37.1031 24.3909C37.3561 24.495 37.5857 24.6489 37.7784 24.8433C38.1698 25.236 38.3895 25.7677 38.3895 26.3222C38.3898 26.5975 38.3352 26.8701 38.2291 27.1242C38.1234 27.3778 37.9692 27.6083 37.7752 27.8027L37.78 27.8059Z"
                  fill="#F19F13"
                />
                <path
                  d="M27.5887 32.0894C27.9062 32.2772 28.1367 32.5827 28.2303 32.9395C28.5928 34.1554 29.8889 34.6912 31.0566 34.6912C32.2244 34.6912 33.5205 34.1538 33.883 32.9395C33.9812 32.5899 34.2112 32.2921 34.5246 32.1086C34.8387 31.9259 35.2123 31.8745 35.564 31.9659C35.9166 32.0553 36.2198 32.28 36.4078 32.5914C36.5955 32.904 36.6531 33.2779 36.5682 33.6325C35.848 36.0691 33.5317 37.4822 31.0502 37.4822C28.6618 37.4822 26.1402 36.0883 25.5307 33.6325C25.4393 33.2751 25.4936 32.896 25.6814 32.5786C25.7748 32.4211 25.898 32.2833 26.044 32.1728C26.1878 32.0641 26.3511 31.984 26.5252 31.937C26.7027 31.8913 26.8876 31.8816 27.069 31.9081C27.2505 31.9335 27.425 31.9952 27.5822 32.0894H27.5887Z"
                  fill="#F19F13"
                />
                <path
                  d="M38.4576 35.8271C38.4576 35.8271 34.5726 34.3128 35.3538 30.8545"
                  stroke="#F19F13"
                  strokeWidth="2.56649"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
              </svg>
            </FloatCircle>
          </ButtonContainer>
        </>
      ) : (
        //피드백 보내기
        <FeedbackModal>
          {complete ? (
            <>
              <ModalComplete>
                <Text
                  size="22px"
                  lineheight="30.5px"
                  bold
                  color="#FFFFFF"
                  padding="0"
                  margin="0"
                >
                  소중한 의견
                </Text>
                <Text
                  size="22px"
                  lineheight="30.5px"
                  bold
                  color="#FFFFFF"
                  padding="0"
                  margin="0"
                >
                  감사드립니다 :)
                </Text>
                <Text
                  size="22px"
                  lineheight="30.5px"
                  color="#FFFFFF"
                  padding="0"
                  margin="0"
                >
                  더 좋은 서비스로
                </Text>
                <Text
                  size="22px"
                  lineheight="30.5px"
                  color="#FFFFFF"
                  padding="0"
                  margin="0"
                >
                  보답하겠습니다!
                </Text>
                <Fats>
                  <div>
                    <svg
                      width="113"
                      height="92"
                      viewBox="0 0 113 92"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M72.4297 40.2256C72.4297 40.2256 93.348 40.0124 110.648 65.6132"
                        stroke="#565656"
                        strokeWidth="2.72985"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M25.6728 46.0265C15.8473 77.1882 44.7565 91.2737 68.2983 91.2737C91.84 91.2737 110.731 74.9693 101.869 46.0265C94.5479 22.1352 89.479 0.779297 65.9382 0.779297C42.3974 0.779297 32.9216 23.0363 25.6728 46.0265Z"
                        fill="#EC6262"
                      />
                      <path
                        d="M82.1754 25.2018C82.47 25.2018 82.7618 25.1437 83.034 25.0307C83.3061 24.9176 83.5532 24.752 83.7612 24.5432C84.1821 24.1205 84.4184 23.5481 84.4181 22.9516C84.4181 22.3553 84.1819 21.7833 83.7612 21.3608C83.5532 21.152 83.3061 20.9863 83.034 20.8733C82.7618 20.7603 82.47 20.7021 82.1754 20.7021C81.5804 20.7029 81.01 20.9398 80.5896 21.3608C80.1688 21.7833 79.9326 22.3553 79.9326 22.9516C79.9324 23.5481 80.1686 24.1205 80.5896 24.5432C81.01 24.9642 81.5804 25.201 82.1754 25.2018Z"
                        fill="white"
                      />
                      <path
                        d="M68.7168 22.9516C68.7168 22.3553 68.953 21.7833 69.3738 21.3608C69.5817 21.152 69.8288 20.9863 70.101 20.8733C70.3731 20.7603 70.6649 20.7021 70.9596 20.7021C71.5546 20.7029 72.1249 20.9398 72.5454 21.3608C72.9661 21.7833 73.2023 22.3553 73.2023 22.9516C73.2025 23.5481 72.9663 24.1205 72.5454 24.5432C72.1249 24.9642 71.5546 25.201 70.9596 25.2018C70.6649 25.2018 70.3731 25.1437 70.101 25.0307C69.8288 24.9176 69.5817 24.752 69.3738 24.5432C68.9528 24.1205 68.7166 23.5481 68.7168 22.9516Z"
                        fill="white"
                      />
                      <path
                        d="M81.4667 28.9876C81.8508 29.0868 82.1798 29.3344 82.3814 29.6761C82.5845 30.0174 82.6443 30.4252 82.5478 30.8104C81.8916 33.4473 79.1791 34.9474 76.612 34.9474C73.9427 34.9474 71.4504 33.429 70.6754 30.807C70.5871 30.4254 70.6513 30.0244 70.8542 29.6894C71.0568 29.3547 71.3825 29.1126 71.7614 29.015C72.14 28.9175 72.5417 28.9728 72.8799 29.1688C73.2182 29.3657 73.4664 29.6867 73.5718 30.0636C73.9609 31.3683 75.3555 31.9471 76.612 31.9471C77.8685 31.9471 79.2614 31.37 79.6514 30.0636C79.7506 29.6795 79.9983 29.3505 80.34 29.1489C80.6794 28.9482 81.0846 28.8902 81.4667 28.9876Z"
                        fill="white"
                      />
                      <path
                        d="M40.2179 44.3204C40.2179 44.3204 19.2995 44.1071 2 69.7079"
                        stroke="#565656"
                        strokeWidth="2.72985"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <svg
                      width="82"
                      height="92"
                      viewBox="0 0 82 92"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M79.2895 46.0255C89.1151 77.1873 60.2058 91.2728 36.6641 91.2728C13.1223 91.2728 -5.76872 74.9683 3.09353 46.0255C10.4087 22.1342 15.4824 0.77832 39.0241 0.77832C62.5659 0.77832 72.0408 23.0353 79.2895 46.0255Z"
                        fill="#FFE899"
                      />
                      <path
                        d="M34.8196 24.8664C35.24 24.4434 35.4758 23.8712 35.4758 23.2748C35.4757 22.6787 35.2398 22.1068 34.8196 21.684C34.399 21.2628 33.8283 21.0259 33.233 21.0254C32.638 21.0261 32.0676 21.263 31.6472 21.684C31.2264 22.1065 30.9902 22.6785 30.9902 23.2748C30.99 23.8714 31.2262 24.4437 31.6472 24.8664C32.0676 25.2874 32.638 25.5243 33.233 25.525C33.8283 25.5245 34.399 25.2876 34.8196 24.8664Z"
                        fill="#F19F13"
                      />
                      <path
                        d="M46.0356 24.8664C45.6151 25.2874 45.0448 25.5243 44.4498 25.525C43.8548 25.5243 43.2844 25.2874 42.864 24.8664C42.443 24.4437 42.2068 23.8714 42.207 23.2748C42.207 22.6785 42.4432 22.1065 42.864 21.684C43.2844 21.263 43.8548 21.0261 44.4498 21.0254C45.0448 21.0261 45.6151 21.263 46.0356 21.684C46.4563 22.1065 46.6925 22.6785 46.6925 23.2748C46.6928 23.8714 46.4565 24.4437 46.0356 24.8664Z"
                        fill="#F19F13"
                      />
                      <path
                        d="M35.0733 29.4776C35.4147 29.6794 35.662 30.0083 35.761 30.3923C36.1519 31.6987 37.5456 32.2758 38.8013 32.2758C40.0569 32.2758 41.4523 31.6937 41.8415 30.3923C41.9462 30.015 42.1946 29.6938 42.5333 29.4975C42.8715 29.3015 43.2732 29.2462 43.6518 29.3437C44.0307 29.4413 44.3564 29.6833 44.5591 30.0181C44.7624 30.353 44.8262 30.7543 44.737 31.1357C43.9628 33.7577 41.4706 35.2761 38.8013 35.2761C36.2342 35.2761 33.5216 33.7793 32.8655 31.1391C32.7688 30.7538 32.8286 30.346 33.0318 30.0048C33.2334 29.6631 33.5624 29.4155 33.9465 29.3162C34.3287 29.2195 34.7336 29.2775 35.0733 29.4776Z"
                        fill="#F19F13"
                      />
                      <path
                        d="M50.959 27.2578L49.1846 29.0322"
                        stroke="#ED6358"
                        strokeWidth="0.955447"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M53.2793 27.2578L51.5049 29.0322"
                        stroke="#ED6358"
                        strokeWidth="0.955447"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M46.7277 33.4006C46.7277 33.4006 42.5948 31.8204 43.4258 28.2139"
                        stroke="#F19F13"
                        strokeWidth="2.59335"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <svg
                      width="86"
                      height="103"
                      viewBox="0 0 86 103"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M28.2744 56.0508C28.2744 56.0508 8.61817 48.8807 1.43555 18.8486"
                        stroke="#565656"
                        strokeWidth="2.72985"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M71.6324 53.5562C80.3391 91.6355 54.2412 102.581 33.3824 102.581C12.5236 102.581 -3.73422 88.9243 4.11856 53.5562C10.5999 24.3613 13.1937 0 35.8503 0C58.5069 0 65.2098 25.4625 71.6324 53.5562Z"
                        fill="#6993FF"
                      />
                      <path
                        d="M23.7845 22.5207C24.2048 22.0977 24.4407 21.5255 24.4406 20.9291C24.4406 20.333 24.2047 19.7611 23.7845 19.3383C23.3638 18.9171 22.7931 18.6802 22.1978 18.6797C21.6028 18.6804 21.0325 18.9173 20.612 19.3383C20.1913 19.7608 19.9551 20.3328 19.9551 20.9291C19.9548 21.5257 20.1911 22.098 20.612 22.5207C21.0325 22.9417 21.6028 23.1786 22.1978 23.1793C22.7931 23.1788 23.3638 22.9419 23.7845 22.5207Z"
                        fill="white"
                      />
                      <path
                        d="M35.0004 22.5207C34.58 22.9417 34.0096 23.1786 33.4146 23.1793C32.8196 23.1786 32.2493 22.9417 31.8288 22.5207C31.4079 22.098 31.1716 21.5257 31.1719 20.9291C31.1719 20.3328 31.4081 19.7608 31.8288 19.3383C32.2493 18.9173 32.8196 18.6804 33.4146 18.6797C34.0096 18.6804 34.58 18.9173 35.0004 19.3383C35.4212 19.7608 35.6574 20.3328 35.6574 20.9291C35.6576 21.5257 35.4214 22.098 35.0004 22.5207Z"
                        fill="white"
                      />
                      <path
                        d="M24.0381 27.1299C24.3795 27.3317 24.6268 27.6607 24.7259 28.0446C25.1167 29.351 26.5104 29.9282 27.7661 29.9282C29.0218 29.9282 30.4171 29.3461 30.8063 28.0446C30.911 27.6674 31.1594 27.3462 31.4982 27.1499C31.8364 26.9538 32.2381 26.8985 32.6166 26.996C32.9956 27.0936 33.3213 27.3357 33.5239 27.6704C33.7272 28.0053 33.7911 28.4066 33.7019 28.7881C32.9277 31.41 30.4354 32.9285 27.7661 32.9285C25.199 32.9285 22.4864 31.4316 21.8303 28.7914C21.7337 28.4062 21.7935 27.9984 21.9966 27.6571C22.1983 27.3155 22.5273 27.0678 22.9114 26.9686C23.2935 26.8719 23.6985 26.9299 24.0381 27.1299Z"
                        fill="white"
                      />
                      <path
                        d="M57.1611 47.8555C57.1611 47.8555 76.8174 40.6854 84 10.6533"
                        stroke="#565656"
                        strokeWidth="2.72985"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </Fats>
              </ModalComplete>
            </>
          ) : (
            <>
              <ModalContainer>
                <ModalText>
                  칼로그
                  <span
                    style={{
                      fontSize: "22px",
                      fontWeight: "400",
                      lineHeight: "30.5px",
                      color: "#FFFFFF",
                    }}
                  >
                    를 위한
                  </span>
                </ModalText>
                <ModalText style={{ marginBottom: "20px" }}>
                  다양한 피드백
                  <span
                    style={{
                      fontSize: "22px",
                      fontWeight: "400",
                      lineHeight: "30.5px",
                      color: "#FFFFFF",
                    }}
                  >
                    들을 작성해주세요!
                  </span>
                </ModalText>

                <InputForm>
                  <p>
                    칼로그 장점
                    <span
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      *
                    </span>
                  </p>
                  <InputDiv style={{ padding: "10px" }}>
                    <ModalTextarea
                      ref={good}
                      type="text"
                      placeholder="칼로그 장점을 작성해주세요."
                    ></ModalTextarea>
                  </InputDiv>
                </InputForm>

                <InputForm>
                  <p>
                    칼로그 불편한 점
                    <span
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      *
                    </span>
                  </p>
                  <InputDiv style={{ padding: "10px" }}>
                    <ModalTextarea
                      ref={bad}
                      type="text"
                      placeholder="칼로그의 불편한 점을 작성해주세요."
                    ></ModalTextarea>
                  </InputDiv>
                </InputForm>

                <InputForm>
                  <p>이미지 업로드(선택)</p>
                  <UploadContainer>
                    <FileNameBox
                      style={
                        _file !== null
                          ? { color: "#2B2B2B", fontSize: "13px" }
                          : {
                              color: `${theme.color.gray_4}`,
                              padding: "4.3% 6%",
                            }
                      }
                    >
                      {_file !== null ? _file[0].name : "이미지를 업로드"}
                      {_file !== null ? (
                        <div onClick={deleteFile}>
                          <TiDeleteOutline color="#BABABA" size="18px" />
                        </div>
                      ) : (
                        <></>
                      )}
                    </FileNameBox>
                    <UploadBtn htmlFor="feedbackImg">
                      <div>사진찾기</div>
                    </UploadBtn>
                    <ModalInput
                      ref={file}
                      type="file"
                      id="feedbackImg"
                      style={{ display: "none" }}
                      onChange={checkName}
                    />
                  </UploadContainer>
                </InputForm>

                <InputForm>
                  <p>전화번호(선택)</p>
                  <InputDiv>
                    <ModalInput
                      ref={phone}
                      type="text"
                      placeholder="'-'빼고 전화번호 입력"
                    ></ModalInput>
                  </InputDiv>
                  <span>
                    *이벤트에 참여하시는 모든 분들은 반드시 입력해주세요.
                  </span>
                </InputForm>

                <InputForm>
                  <p>인스타그램 아이디(선택)</p>
                  <InputDiv>
                    <ModalInput
                      ref={instagram}
                      type="text"
                      placeholder="인스타그램 아이디 입력"
                    ></ModalInput>
                  </InputDiv>
                  <span>
                    *인스타그램 이벤트에 참여하시는 분들은 반드시 입력해주세요.
                  </span>
                </InputForm>

                <SubmitBtn onClick={submit}>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      lineHeight: "22px",
                      color: "#3C3C3C",
                    }}
                  >
                    작성하기
                  </div>
                </SubmitBtn>
              </ModalContainer>
            </>
          )}
          <CloseModal
            onClick={() => {
              offModal();
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.77832 23.335L23.3347 7.77861"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M7.77832 7.77832L23.3347 23.3347"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </CloseModal>
        </FeedbackModal>
      )}
    </React.Fragment>
  );
};

FloatedBtn.defaultProps = {};

const ButtonContainer = styled.div`
  position: fixed;
  right: 6%;
  bottom: 30px;
  width: 320px;
  height: 90px;

  @media only screen and (max-width: 1750px) {
    right: 5%;
  }
  @media only screen and (max-width: 1650px) {
    right: 3%;
  }
  @media only screen and (max-width: 1580px) {
    right: 5%;
  }
  @media only screen and (max-width: 1450px) {
    right: 3%;
  }
  @media only screen and (max-width: 1240px) {
    right: 2%;
  }
  @media only screen and (max-width: 1100px) {
    right: 0%;
  }
  @media only screen and (max-width: 1025px) {
    display: none;
  }
`;

const FloatedBody = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 56px;
  background: #ffffff;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 40px;

  @media only screen and (max-width: 1580px) {
    display: none;
  }
`;

const FloatCircle = styled.div`
  position: absolute;
  right: -4px;
  bottom: -4px;
  width: 98px;
  height: 98px;
  border: none;
  border-radius: 50%;
  background: #ffffff;
  z-index: 100;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media only screen and (max-width: 1100px) {
    width: 8.9vw;
    height: 8.9vw;
  }
`;

const FadeIn = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`;

const FeedbackModal = styled.div`
  position: fixed;
  right: 6%;
  bottom: 30px;
  height: 839px;
  width: 397px;
  box-shadow: 0px 4px 38px 3px rgba(0, 0, 0, 0.06);
  border: none;
  border-radius: 20px;
  background: #ffffff;
  z-index: 300;
  animation: ${FadeIn} 0.5s ease;
`;

const ModalContainer = styled.div`
  position: relative;
  background: linear-gradient(
    180deg,
    #6993ff 28.86%,
    rgba(216, 215, 215, 0) 97.27%
  );
  border: none;
  border-radius: 20px;
  padding: 46px 33px 35px 33px;
`;

const ModalText = styled.div`
  width: 100%;
  font-size: 22px;
  font-weight: bold;
  line-height: 30.5px;
  color: #ffffff;
`;

const InputForm = styled.div`
  width: 100%;
  margin-bottom: 12px;

  & > p {
    font-size: 15px;
    line-height: 19px;
    padding: 0;
    margin: 0 0 7px 0;
    color: #ffffff;
  }

  & > span {
    font-size: 11px;
    line-height: 24px;
    color: #ff5983;
    display: block;
  }
`;

const InputDiv = styled.div`
  width: 100%;
  border: none;
  border-radius: 5.3px;
  background: #ffffff;
  padding: 10px 10px;
`;

const UploadContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 76% 22%;
  column-gap: 2%;
`;

const FileNameBox = styled.div`
  position: relative;
  padding: 10px 10px;
  border: none;
  border-radius: 5.3px;
  font-size: 14px;
  line-height: 21px;
  color: #a9a9a9;
  background: #ffffff;

  & > div {
    position: absolute;
    height: 100%;
    right: 5px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
  }
`;

const UploadBtn = styled.label`
  border: none;
  border-radius: 5.3px;
  background: #ffe899;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  & > div {
    font-size: 13px;
    font-weight: bold;
    color: #3c3c3c;
  }
`;

const ModalInput = styled.input`
  font-size: 14px;
  line-height: 21px;
  border: none;
  outline: none;

  &::placeholder {
    color: #a9a9a9;
  }
`;

const ModalTextarea = styled.textarea`
  width: 100%;
  height: 106px;
  font-size: 14px;
  line-height: 21px;
  border: none;
  outline: none;
  resize: none;

  &::placeholder {
    color: #a9a9a9;
  }
`;

const SubmitBtn = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffe899;
  border: none;
  border-radius: 60px;
  cursor: pointer;
`;

const ModalComplete = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    180deg,
    #6993ff 28.86%,
    rgba(216, 215, 215, 0) 97.27%
  );
  border: none;
  border-radius: 20px;
  padding: 46px 33px 30px 33px;
`;

const Fats = styled.div`
  position: absolute;
  bottom: 30px;
  width: 83.3%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const CloseModal = styled.div`
  position: absolute;
  right: 18px;
  top: 30px;
  width: 30px;
  height: 30px;
`;

export default FloatedBtn;
