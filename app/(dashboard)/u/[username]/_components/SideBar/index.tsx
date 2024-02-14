import React from 'react'
import { Wrapper } from './Wrapper'
import { Toggle } from './Toggle'
import { Navigation } from './Navigation'

export const SideBar = () => {

  return (
    <Wrapper>
        <Toggle/>
        <Navigation />
    </Wrapper>
  )
}
