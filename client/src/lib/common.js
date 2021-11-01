import { CircularProgress, Box } from "@mui/material"

export function capitalize( w) {
    return w.charAt(0).toUpperCase() + w.slice(1)
}

export const FullPageLoader = () => (
    <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={100} variant='indeterminate' disableShrink={true} />
    </Box>
)