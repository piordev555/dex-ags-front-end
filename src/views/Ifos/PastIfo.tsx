import React from 'react'
import { ifosConfig } from 'config/constants'
import { Ifo } from 'config/constants/types'
import styled from 'styled-components'
import IfoCardV2Data from './components/IfoCardV2Data'
import IfoCardV1Data from './components/IfoCardV1Data'
import IfoLayout from './components/IfoLayout'

const inactiveIfo: Ifo[] = ifosConfig.filter((ifo) => !ifo.isActive)

const PastIfo = () => {
  return (
    <IfoLayout id="past-ifos">
      {inactiveIfo.map((ifo) =>
        ifo.version === 1 ? (
          <IfoCardV1Data key={ifo.id} ifo={ifo} />
        ) : (
          <IfoCardV2Data key={ifo.id} ifo={ifo} isInitiallyVisible={false} />
        ),
      )}
      {(!inactiveIfo || inactiveIfo.length === 0) && <EmptyCard>There is no past IDO.</EmptyCard>}
    </IfoLayout>
  )
}

const EmptyCard = styled.div`
  width: 100%;
  background: url(/images/hero.png);
  background-size: cover;
  height: 400px;
  text-align: center;
  padding-top: 100px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 24px;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 850px;
  }
`
export default PastIfo
