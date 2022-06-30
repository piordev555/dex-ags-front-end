import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Spinner } from '@pancakeswap/uikit'
import Page from '../Layout/Page'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: rgba(255, 255, 255, 0.5);
  min-height: calc(100vh - 2 * var(--HeaderFooterHeight));
  padding: 0;
  margin: 0;
`
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const RotatingPancakeIcon = styled.img`
  width: 128px;
  animation: ${rotate} 2s linear infinite;
  transform: translate3d(0, 0, 0);
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      {/* <SpinnerWrapper> */}
      <Spinner />
      {/* <RotatingPancakeIcon src="/images/ags.png" /> */}
      {/* </SpinnerWrapper> */}
    </Wrapper>
  )
}

export default PageLoader
