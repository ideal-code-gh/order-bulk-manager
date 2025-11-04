import { defaultTheme, Provider } from '@adobe/react-spectrum'
import Grid from './Grid/Grid'

export default () => {
  return (
    <Provider theme={defaultTheme}>
      <Grid />
    </Provider>
  )
}
