const { database, getSnapshot } = require('./database')

async function initializeRoomsFromDatabase() {
  try {
    const snapshot = await getSnapshot('rooms')
    if (snapshot.exists()) {
      const persistedRooms = snapshot.val()
      // Directly assign the object from Firebase to the rooms variable
      let rooms = { ...persistedRooms }
      return rooms
    } else {
      console.log('No rooms data available in database.')
    }
  } catch (error) {
    console.error('Failed to fetch rooms data:', error)
  }
}

async function initializeAvatarsFromDatabase() {
  try {
    const snapshot = await getSnapshot('avatars')
    if (snapshot.exists()) {
      const persistedAvatars = snapshot.val()
      // Directly assign the object from Firebase to the rooms variable
      let avatars = { ...persistedAvatars }
      return avatars
    } else {
      console.log('No Avatars data available in database.')
    }
  } catch (error) {
    console.error('Failed to fetch Avatars data:', error)
  }
}

async function initializeClientsFromDatabase() {
  try {
    const snapshot = await getSnapshot('clients')
    if (snapshot.exists()) {
      const persistedClients = snapshot.val()
      // Directly assign the object from Firebase to the rooms variable
      let ads = { ...persistedClients }
      return ads
    } else {
      console.log('No clients data available in database.')
    }
  } catch (error) {
    console.error('Failed to fetch clients data:', error)
  }
}

async function initializeTriviaQuestionsFromDb() {
  try {
    const snapshot = await getSnapshot('questions')
    if (snapshot.exists()) {
      const persistedQuestions = snapshot.val()
      // Directly assign the object from Firebase to the rooms variable
      let triviaGameQuestions = { ...persistedQuestions }
      return triviaGameQuestions
    } else {
      console.log('No Trivia Questions data available in database.')
    }
  } catch (error) {
    console.error('Failed to fetch Trivia Questions data:', error)
  }
}

module.exports = {
  initializeRoomsFromDatabase,
  initializeClientsFromDatabase,
  initializeAvatarsFromDatabase,
  initializeTriviaQuestionsFromDb,
}
