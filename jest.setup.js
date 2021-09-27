import 'react-native-gesture-handler/jestSetup'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'

jest.mock('react-native-gesture-handler', () => {})
jest.mock('@react-navigation/stack', () => {})
jest.mock('@react-navigation/bottom-tabs', () => {})
jest.mock('@react-navigation/elements', () => {})
jest.mock('react-native-safe-area-context', () => {})

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)

const items = {}

jest.mock('react-native', () => ({
  AsyncStorage: {
    setItem: jest.fn((item, value) => {
      return new Promise((resolve, _reject) => {
        items[item] = value
        resolve(value)
      })
    }),
    multiSet: jest.fn((item, value) => {
      return new Promise((resolve, _reject) => {
        items[item] = value
        resolve(value)
      })
    }),
    getItem: jest.fn((item, _value) => {
      return new Promise((resolve, _reject) => {
        resolve(items[item])
      })
    }),
    multiGet: jest.fn((item) => {
      return new Promise((resolve, _reject) => {
        resolve(items[item])
      })
    }),
    removeItem: jest.fn((item) => {
      return new Promise((resolve, _reject) => {
        resolve(delete items[item])
      })
    }),
    getAllKeys: jest.fn((items) => {
      return new Promise((resolve) => {
        resolve(items.keys())
      })
    })
  }
}))

jest.mock('react-native', () => ({
  StyleSheet: {
    create: () => ({})
  },
  Platform: {
    OS: jest.fn(() => 'android'),
    select: () => ({}),
    version: jest.fn(() => 25),
  },
  Dimensions: {
    get: () => ({})
  }
}))