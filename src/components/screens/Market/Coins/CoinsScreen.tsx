import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

import theme from '@theme'
import { useFetchCoinsQuery } from '@store/api/coinsApi'
import { useFetchCoinUnitsQuery } from '@store/api/coinUnitsApi'
import CoinFilters from './components/CoinFilters'
import CoinsList from './components/CoinsList'
import SearchPlaceholder from '@common/SearchPlaceholder'
import { CoinAddTradeModalType } from '@customtypes/coins/coin'
import AddToTradeModal from '@common/AddToTradeModal'

const CoinsScreen: React.FC = () => {
  const [activeUnit, setActiveUnit] = useState<string>('btc')
  const [activeCoinIdsIndex, setActiveCoinIdsIndex] = useState<number>(0)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [activeCoin, setActiveCoin] = useState<CoinAddTradeModalType | null>(
    null,
  )
  const [activeCoinQuantity, setActiveCoinQuantity] = useState<number>(0)
  const { data: coinUnits } = useFetchCoinUnitsQuery()
  const { data, isFetching: isFetchingCoinIds } = useFetchCoinsQuery()

  const onCloseModal = (): void => {
    setIsModalVisible(false)
    setActiveCoin(null)
    setActiveCoinQuantity(0)
  }

  const onShowModal = (coin: CoinAddTradeModalType): void => {
    setIsModalVisible(true)
    setActiveCoin(coin)
  }

  const onAmountChange = (isIncreasing: boolean) => (): void => {
    if (isIncreasing) {
      setActiveCoinQuantity((value) => value + 1)
    } else if (!isIncreasing && !!activeCoinQuantity) {
      setActiveCoinQuantity((value) => value - 1)
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <SearchPlaceholder
        coinListData={data?.coinListData}
        coinUnits={coinUnits}
      />
      <CoinFilters
        activeUnit={activeUnit}
        setActiveUnit={setActiveUnit}
        coinUnits={coinUnits}
      />
      <CoinsList
        activeUnit={activeUnit}
        coinListPaginated={data?.coinListPaginated}
        isFetchingCoinIds={isFetchingCoinIds}
        activeCoinIdsIndex={activeCoinIdsIndex}
        setActiveCoinIdsIndex={setActiveCoinIdsIndex}
        onShowModal={onShowModal}
      />
      <AddToTradeModal
        isModalVisible={isModalVisible}
        onCloseModal={onCloseModal}
        activeCoin={activeCoin}
        activeCoinQuantity={activeCoinQuantity}
        onAmountChange={onAmountChange}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme?.colors?.dark,
  },
})

export default CoinsScreen
