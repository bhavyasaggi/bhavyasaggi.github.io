import { useRef, useEffect } from 'react'

export default function useChanged(val: any) {
  const valRef = useRef(val)
  useEffect(() => {
    valRef.current = val
  }, [val])
  return val !== valRef.current
}
