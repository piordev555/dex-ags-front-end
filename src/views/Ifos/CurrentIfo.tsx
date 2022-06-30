import React from 'react'
import { ifosConfig } from 'config/constants'
import useGetPublicIfoV2Data from 'views/Ifos/hooks/v2/useGetPublicIfoData'
import useGetWalletIfoV2Data from 'views/Ifos/hooks/v2/useGetWalletIfoData'
import styled from 'styled-components'
import IfoFoldableCard from './components/IfoFoldableCard'
import IfoLayout from './components/IfoLayout'
import IfoSteps from './components/IfoSteps'
import IfoQuestions from './components/IfoQuestions'

/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = ifosConfig.find((ifo) => ifo.isActive)

const Ifo = () => {
  const publicIfoData = useGetPublicIfoV2Data(activeIfo)
  const walletIfoData = useGetWalletIfoV2Data(activeIfo)

  return (
    <IfoLayout id="current-ifo">
      <CardWrapper>
        <IfoFoldableCard
          ifo={activeIfo}
          publicIfoData={publicIfoData}
          walletIfoData={walletIfoData}
          isInitiallyVisible
        />
      </CardWrapper>
      <IfoSteps ifo={activeIfo} walletIfoData={walletIfoData} />
      {/* <IfoQuestions /> */}
    </IfoLayout>
  )
}

const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: url('/images/hero.png');
  background-size: cover;
  padding-bottom: 40px;
  min-height: 800px;
  @media (max-width: 1024px) {
    min-height: 600px;
  }
`
export default Ifo
