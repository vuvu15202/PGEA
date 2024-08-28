import { useContext } from 'react'
import { PopupContext } from 'src/context/PopupContext'

export const usePopup = () => useContext(PopupContext)
