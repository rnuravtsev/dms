import { useEffect, useRef } from 'react'

const VIRTUAL_LIST_CLASSNAME = '.infinite-scroll-component__outerdiv'

export const useClientHeight = () => {
  const listRef = useRef<number | undefined>(800)

  useEffect(() => {
    listRef.current = document?.querySelector(
      VIRTUAL_LIST_CLASSNAME,
    )?.clientHeight
  }, [])
}
