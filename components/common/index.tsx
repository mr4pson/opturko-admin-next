import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { devices } from '../../common/constants/devices.constant';

const Global = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
  }

  body {
    background: #f3f7fc;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    transition: all 0.3s;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    -ms-transition: all 0.3s;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  max-width: 1240px;
  width: 100%;
  margin: auto;
  padding: 0 15px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PageContainer = styled.main`
  padding-top: 101px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 30px;

  @media ${devices.mobile} {
    padding-top: 91px;
  }
`;

const Section = styled.div`
  width: 100%;
  padding: 15px 20px;
  background: #ffffff;
  box-shadow: 1px 1px 16px rgba(40, 51, 68, 0.05);
  border-radius: 10px;
`;

const PageTitle = styled.h1`
  margin: 0 0 20px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export {
  FlexContainer,
  ContentContainer,
  PageContainer,
  Global,
  Section,
  PageTitle,
};
