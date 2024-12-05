'use client'
import React, { useEffect, useState } from 'react'
import ClientOnly from './ClientOnly'
import { useGeneralStore } from '@/stores/general'
import AuthOverlay from './AuthOverlay'
import EditProfileOverlay from './profile/EditProfileOverlay'

export default function AllOverlays() {

  let { isLoginOpen, isEditProfileOpen } = useGeneralStore()

  return (
    <>
    <ClientOnly>
      {isLoginOpen ? <AuthOverlay /> : null}
      {isEditProfileOpen ? <EditProfileOverlay /> : null}
    </ClientOnly>
    </>
  )
}
