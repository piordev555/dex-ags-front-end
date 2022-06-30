import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Route, useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Flex, Text } from '@pancakeswap/uikit'
import Container from 'components/Layout/Container'
import styled, { keyframes } from 'styled-components'
import Hero from './components/Hero'
import CurrentIfo from './CurrentIfo'
import PastIfo from './PastIfo'

const float = keyframes`
	0% {
		transform: translatey(0px);
	}
	50% {
		transform: translatey(10px);
	}
	100% {
		transform: translatey(0px);
	}
`

const FloatingRocket = styled.img`
  width: 80px;
  animation: ${float} 6s ease-in-out infinite;
  transform: translate3d(0, 0, 0);
`

const Ifos = () => {
  const { t } = useTranslation()
  const { path, url, isExact } = useRouteMatch()

  return (
    <Wrapper>
      {/* <Hero /> */}
      <Flex justifyContent="center" alignItems="center" mb="32px" mt="32px">
        <ButtonMenu activeIndex={!isExact ? 1 : 0} scale="sm" variant="subtle">
          <ButtonMenuItem as={Link} to={`${url}`}>
            {t('Next IDO')}
          </ButtonMenuItem>
          <ButtonMenuItem id="past-ifos-button" as={Link} to={`${url}/history`}>
            {t('Past IDO')}
          </ButtonMenuItem>
        </ButtonMenu>
      </Flex>
      <Flex justifyContent="center" mt="15px" mb="15px">
        <FloatingRocket src="/images/ifos/rocket.png" />
      </Flex>
      <Flex justifyContent="center" alignItems="center" mb="10px" flexWrap="wrap" flexDirection="column">
        <Text bold fontSize="24px" mb="8px">
          {t('Launchpad')}
        </Text>
        <Text fontSize="18px">Participate In Upcoming Protocols On Astar.</Text>
      </Flex>
      <Route exact path={`${path}`}>
        <CurrentIfo />
      </Route>
      <Route path={`${path}/history`}>
        <PastIfo />
      </Route>
    </Wrapper>
  )
}

const Wrapper = styled.div``

export default Ifos
