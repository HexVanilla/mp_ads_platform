import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  Box,
  Dialog,
  DialogTitle,
} from '@mui/material'
const PlayerCard = ({ player, showButton, avatarImages, markAsReady }) => {
  return (
    <Card sx={{ m: 2 }}>
      <CardContent>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <img
            src={avatarImages[player.avatar].url}
            style={{
              width: '100%',
              maxWidth: '6rem',
              borderRadius: '1rem',
              marginBottom: '1rem',
            }}
          />
          <Typography variant="h4" sx={{ m: 1 }}>
            {player.sessionPoints}
          </Typography>
          <Typography variant="subtitle1" sx={{ m: 1 }}>
            {player.name.toUpperCase()}
          </Typography>
          <Typography
            variant="overline"
            color={player.status === 'ready' ? 'success' : 'error'}
            sx={{ m: 1 }}
          >
            {player.status}
          </Typography>
        </div>
        {showButton && (
          <Button size="small" variant="outlined" onClick={markAsReady}>
            Set Ready!
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default PlayerCard
