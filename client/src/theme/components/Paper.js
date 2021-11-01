import { Paper as MuiPaper } from '@mui/material'

// props:
// count: options count
// size: 'normal' | 'small'  - size of options
export const ResizablePaper = ({ onScrollBottom, ...props }) => {
    return <MuiPaper resizable {...props} {...(onScrollBottom && {onScroll: (event) => {
        const listboxNode = event.currentTarget
        if (listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight) {
            onScrollBottom()
        }
    }})}/>
}

ResizablePaper.defaultProps = {
    size: 'normal',
    count: 1
}

export default MuiPaper
