import { memo } from "react"

const Loader = memo(({width}) => {
    return (
        <img draggable={false} src="/src/assets/loader.svg" alt="Loading..." style={{width: width ? width : "40px"}} />
    )
})

export default Loader