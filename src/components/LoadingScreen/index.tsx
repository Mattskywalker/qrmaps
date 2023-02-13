
import { Spinner, Stack, View } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'

import styled from 'styled-components/native'

interface LoadingScreenProps {
  disableLogo?: boolean,
}
export default function LoadingScreen({ disableLogo = true }: LoadingScreenProps) {
  return (
    <Stack alignItems={'center'} justifyContent={'center'} flex={1} width={'100%'} height={'100%'} >
      <Spinner size={'lg'} />
    </Stack>
  )
}

const styles = StyleSheet.create({
  loader: {
    position: 'relative',
    width: 48,
    height: 48,
    background: '#82cc11',
    transform: [{ rotateX: '65deg' }, { rotate: '45deg' }],
    color: '#fff',
    animation: 'layers1 1s linear infinite alternate',

  }
})
