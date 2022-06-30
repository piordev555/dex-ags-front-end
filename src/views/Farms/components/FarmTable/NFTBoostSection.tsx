import React, { useState } from 'react'
import { Flex, Text, useModal } from '@pancakeswap/uikit'
import { mainnetTokens } from 'config/constants/tokens'
import styled from 'styled-components'
import NFTModal from '../NFTModal'

interface Props {
  farm: any
}

const Slot = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  padding: 2px;
  cursor: pointer;
  :hover {
    box-shadow: 0px 0px 5px 4px #d2a1ed;
  }
  img {
    border-radius: 10px;
  }
`

const CustomFlex = styled(Flex)`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 70%;
  }
`

const NFTBoostSection = ({ farm }: Props) => {
  const nfts = farm?.userData?.nfts
  const poolId = farm?.pid
  console.log('nfts: ', nfts, poolId)
  const img1 = nfts.slots ? nfts.slots : '/images/farms/unknown-nft.png'
  const img2 = nfts.slots ? nfts.slots : '/images/farms/unknown-nft.png'
  const img3 = nfts.slots ? nfts.slots : '/images/farms/unknown-nft.png'

  const [slotNum, setSlotNum] = useState(0)

  const handleConfirm = () => {
    console.log('handleCOnfirm: ')
  }

  const [onPresentDeposit] = useModal(
    <NFTModal onConfirm={handleConfirm} nfts={nfts} slotNumber={slotNum} />,
    true,
    true,
    'NFTModal',
  )

  const handleSlotClick = (slotId: number) => {
    onPresentDeposit()
    setSlotNum(slotId)
  }

  return (
    <CustomFlex width="fit-content" mt="20px" flexWrap="wrap" justifyContent="space-between" style={{ gap: '30px' }}>
      <Flex flexDirection="column">
        <Text>Stake AGS NFTs to increase {mainnetTokens.cake.symbol} earnings</Text>
        <Flex alignItems="center">
          <Text>Current Boost Rate: </Text>
          <Text ml="15px" fontSize="28px">
            +{nfts.boosts.toJSON()}%
          </Text>
        </Flex>
      </Flex>
      <Flex justifyContent="space-between" style={{ gap: '20px' }}>
        <Slot onClick={() => handleSlotClick(0)}>
          <img src={img1} alt="slot0" />
        </Slot>
        <Slot onClick={() => handleSlotClick(1)}>
          <img src={img2} alt="slot1" />
        </Slot>
        <Slot onClick={() => handleSlotClick(2)}>
          <img src={img3} alt="slot2" />
        </Slot>
      </Flex>
    </CustomFlex>
  )
}

export default NFTBoostSection
