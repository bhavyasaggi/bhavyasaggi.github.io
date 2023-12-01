import { useRef, useCallback, useEffect } from 'react'

// TODO: replace with useSWR
export default function useFetch(defaultResource, defaultOptions = {}) {
  const defaultResourceRef = useRef(defaultResource)
  const defaultOptionsRef = useRef(defaultOptions)

  const fetchCb = useCallback((resource, options = {}) => {
    const defaultResourceCurrent = defaultResourceRef.current || ''
    const defaultOptionsCurrent = defaultOptionsRef.current || {}
    const abortController = new AbortController()
    const fetchPromise = (url, fetchOptions = {}) =>
      fetch(url || resource || defaultResourceCurrent, {
        ...defaultOptionsCurrent,
        ...options,
        ...fetchOptions,
        signal: abortController.signal,
      })
    return [fetchPromise, abortController]
  }, [])

  useEffect(() => {
    defaultResourceRef.current = defaultResource
    defaultOptionsRef.current = defaultOptions
  }, [defaultResource, defaultOptions])

  return fetchCb
}
