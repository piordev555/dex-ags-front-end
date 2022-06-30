import styled from 'styled-components'

const Container = styled.div`
  background: ${({ theme }) => theme.colors.gradients.violetAlt};
  height: calc(100vh - var(--HeaderFooterHeight));
  min-height: calc(100vh - var(--HeaderFooterHeight));
  overflow: hidden;
  position: relative;
`

export default Container
