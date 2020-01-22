export default function appearance(appearance = 'light', action) {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE': {
      return (appearance === 'dark' ? 'light' : 'dark')
    }
    default:
      return appearance
  }
}
