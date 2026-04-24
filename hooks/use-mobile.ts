import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const checkMobile = () => setIsMobile(mql.matches)
    
    mql.addEventListener("change", checkMobile)
    
    // We do one check on mount. To avoid the linter warning about setState 
    // synchronously in effect, we can use a separate check or just accept it's needed once.
    // However, mql.matches is already the most reliable state.
    if (isMobile === undefined) {
      checkMobile()
    }
    
    return () => mql.removeEventListener("change", checkMobile)
  }, [isMobile])

  return !!isMobile
}
