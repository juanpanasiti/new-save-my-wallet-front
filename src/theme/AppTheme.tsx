import { CssBaseline, ThemeProvider } from "@mui/material"
import { mainTheme } from "./"

interface Props {
    children: React.ReactNode
}
export const AppTheme = ({children}:Props) => {
  return (
    <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
  )
}
